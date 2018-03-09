# -*- coding: utf-8 -*-

import uuid
import email
import logging
import sys
import ngas2

from email.mime.multipart import MIMEMultipart
from ngas2.models.agreement import (MdnMode)
from ngas2.models.context import AS2Context
from ngas2.models.msg import (StatusType, AS2Message, AS2MessageMdn)
from ngas2.protocol import (encode_as2_identity)
from ngas2.protocol.exception import AS2MdnException
from ngas2.utils.smime import SMIMEHelper
from ngkitty.extensions.str_ext import is_none_or_whitespace

logger = logging.getLogger(__name__)

'''
MDN Decoder
'''


class MdnDecoder(object):
    def __init__(self, headers, body, mode, context):
        if mode not in MdnMode.all:
            raise ValueError("mdn mode invalid")
        if headers is None or not isinstance(headers, dict):
            raise ValueError("mdn headers invalid")
        if body is None:
            raise ValueError("mdn body invalid")
        if context is None or not isinstance(context, AS2Context):
            raise ValueError("context invalid")

        self.headers = headers
        self.body = body
        self.mdn_mode = mode
        self.context = context

        self.mdn_message_id = None
        self.mdn_message_content_type = None
        self.mime_message = None
        self.original_message_id = None
        self.disposition_mode = None
        self.disposition_type = None
        self.disposition_modifier_code = None
        self.disposition_modifier_value = None
        self.disposition_description = None
        self.validate_status = None
        self.mic_description = None
        self.mic_algorithm = None
        self.mic_digest = None

    def _format_headers(self):
        self.headers = {k.lower().replace('_', '-'): v for k, v in self.headers.items()}

    def _init_mdn_message_id(self):
        msg_id = self.headers.get("message-id", str(uuid.uuid4()).upper())
        if is_none_or_whitespace(msg_id):
            raise AS2MdnException('mdn-message-id is required')
        if len(msg_id) > 998:
            raise AS2MdnException('mdn-message-id length is a maximum of 998 characters')

        self.mdn_message_id = msg_id.strip()

    def _init_mdn_message_content_type(self):
        content_type = self.headers.get("content-type")
        if is_none_or_whitespace(content_type):
            raise AS2MdnException('mdn-content-type is required')

        self.mdn_message_content_type = content_type.strip()

    def decode(self):
        try:
            self._format_headers()
            self._init_mdn_message_id()
            self._init_mdn_message_content_type()

            self._init_mime_message()
            self._format_mime_message()

            content_type = self.mime_message.get_content_type().lower()

            if content_type not in ['multipart/signed', 'multipart/report']:
                raise AS2MdnException('mdn-content-type:{type} invalid', type=content_type)

            if self.context.agreement.outbound_agreement.is_mdn_signed:
                self._verify_signed_message(content_type)
                self._fetch_mdn_content()
            else:
                self.context.trace("mdn signature verify ignore")

            return self._decode_mdn_content()
        except AS2MdnException as ex:
            self.context.trace_error(ex.msg)
            raise
        except:
            self.context.trace_error(sys.exc_info()[1])
            raise

    def _init_mime_message(self):
        try:
            message_id = "{key}: {value}".format(key="message-id", value=self.mdn_message_id)
            message_type = "{key}: {value}".format(key="content-type", value=self.mdn_message_content_type)

            headers = message_id + '\r\n' + message_type
            content = headers + '\r\n\r\n' + self.body

            self.mime_message = email.message_from_string(content)

            self.context.trace('init mdn mime message finished')
        except:
            logger.exception("init mdn mime message failed; mdn-message-id: {id}".format(
                id=self.mdn_message_id))
            raise AS2MdnException("init mdn mime message failed; due to: {message}"
                                  , message=sys.exc_info()[1])

    '''
    email.parse issue fixed, signature transfer encoding
    '''

    def _format_mime_message(self):
        for part in self.mime_message.walk():
            if not isinstance(part, email.message.Message):
                continue

            part_type = part.get_content_type().lower()
            if 'message/disposition-notification' == part_type:
                disposition = part.get_payload()
                if isinstance(disposition, (list, tuple)) and len(disposition) == 1:
                    notify = disposition[0]
                    notify_body = notify.get_payload()
                    if notify_body is None or notify_body == '':
                        part.set_payload(notify.as_string(unixfrom=False)[:-1])
                        self.context.trace('mdn disposition notification fixed')

            part_encoding = part.get('Content-Transfer-Encoding', '').lower()
            if 'application/pkcs7-signature' == part_type and 'base64' != part_encoding:
                del part['Content-Transfer-Encoding']
                email.encoders.encode_base64(part)
                self.context.trace('mdn signature content transfer encoding to base64')

    def _verify_signed_message(self, content_type):
        if content_type != 'multipart/signed':
            raise AS2MdnException('content-type invalid when signed required')

        mdn_signature_thumbprint = self.context.agreement.outbound_agreement.message_encryption_certificate.thumbprint
        mdn_signature_cert_path = self.context.agreement.outbound_agreement.message_encryption_certificate.local_file_path
        mdn_signature_cert_ca_path = self.context.agreement.outbound_agreement.message_encryption_certificate.local_ca_file_path
        mdn_signature_cert_verify = self.context.agreement.outbound_agreement.message_encryption_certificate.is_need_verify

        try:
            if is_none_or_whitespace(mdn_signature_cert_ca_path):
                mdn_signature_cert_ca_path = mdn_signature_cert_path

            f_mime_string = SMIMEHelper.format_with_cr_lf(
                SMIMEHelper.mime_to_string(self.mime_message))

            SMIMEHelper.verify_signed_text(
                f_mime_string,
                mdn_signature_cert_path,
                mdn_signature_cert_ca_path,
                mdn_signature_cert_verify)

            self.context.trace("mdn signature verify finished; thumbprint: {thumbprint}, verify certificate: {verify}"
                               , thumbprint=mdn_signature_thumbprint
                               , verify=mdn_signature_cert_verify)
        except:
            logger.exception("mdn signature verify failed; mdn-message-id: {id}".format(
                id=self.mdn_message_id))
            raise AS2MdnException(
                "mdn signature verify failed; thumbprint: {thumbprint}, verify certificate: {verify}, due to: {message}"
                , thumbprint=mdn_signature_thumbprint
                , verify=mdn_signature_cert_verify
                , message=sys.exc_info()[1])

    def _fetch_mdn_content(self):
        content_type = "multipart/report"
        payloads = [part for part in self.mime_message.get_payload()
                    if content_type == part.get_content_type().lower()]

        if len(payloads) != 1:
            raise AS2MdnException("fetch mdn content failed; due to payload:{type} invalid"
                                  , type=content_type)

        self.mime_message = payloads[0]

    '''
    decode original message id
    '''

    def _decode_original_message_id(self, mdn):
        original_message_id = mdn.get('Original-Message-ID')
        if is_none_or_whitespace(original_message_id):
            raise AS2MdnException('original-message-id is required')
        if len(original_message_id) > 998:
            raise AS2MdnException('original-message-id length is a maximum of 998 characters')

        self.original_message_id = original_message_id

    '''
    decode received content mic
    '''

    def _decode_received_content_mic(self, mdn):
        received_content_mic_description = mdn.get('Received-Content-MIC')

        self.mic_description = received_content_mic_description
        if is_none_or_whitespace(received_content_mic_description):
            return

        mic = self.mic_description.split(',')
        if len(mic) != 2:
            raise AS2MdnException('received-content-mic is invalid')

        self.mic_digest = mic[0].strip()
        self.mic_algorithm = mic[1].strip()

    '''
    decode disposition
    '''

    def _decode_disposition(self, mdn):
        disposition_description = mdn.get('Disposition')

        self.disposition_description = disposition_description
        if is_none_or_whitespace(disposition_description):
            raise AS2MdnException('disposition is required')

        disposition = self.disposition_description.split(';')
        if len(disposition) != 2:
            raise AS2MdnException('disposition is invalid')

        self.disposition_mode = disposition[0].strip()

        disposition_result = disposition[1].strip().split('/')
        if len(disposition_result) == 1:
            self.disposition_type = disposition_result[0].strip()
        elif len(disposition_result) == 2:
            self.disposition_type = disposition_result[0].strip()

            disposition_modifier = disposition_result[1].split(':')
            if len(disposition_modifier) == 1:
                self.disposition_modifier_code = disposition_modifier[0].strip()
            elif len(disposition_modifier) == 2:
                self.disposition_modifier_code = disposition_modifier[0].strip()
                self.disposition_modifier_value = disposition_modifier[1].strip()
            else:
                raise AS2MdnException('disposition modifier is invalid')
        else:
            raise AS2MdnException('disposition type or modifier is invalid')

    '''
    set validate status
    '''

    def _set_validate_status(self):
        if self.disposition_type == 'processed' and is_none_or_whitespace(
                self.disposition_modifier_code):
            self.validate_status = StatusType.successful
        else:
            self.validate_status = StatusType.failed

    def _decode_mdn_content(self):
        content_type = "message/disposition-notification"
        payloads = [part.get_payload() for part in self.mime_message.walk() if
                    content_type == part.get_content_type().lower()]

        if len(payloads) != 1:
            raise AS2MdnException("decode mdn content failed; due to payload:{type} invalid"
                                  , type=content_type)

        try:
            mdn_instance = payloads[0]
            if not isinstance(mdn_instance, str):
                raise AS2MdnException("decode mdn content failed; due to payload invalid")

            mdn = email.message_from_string(mdn_instance)

            self._decode_original_message_id(mdn)

            self._decode_received_content_mic(mdn)

            self._decode_disposition(mdn)

            self._set_validate_status()

            self.context.trace("decode mdn content finished")

            return self.validate_status
        except:
            logger.exception("decode mdn content failed; mdn-message-id: {id}".format(
                id=self.mdn_message_id))
            raise AS2MdnException("decode mdn content failed, due to: {message}"
                                  , message=sys.exc_info()[1])


'''
MDN Encoder
'''


class MdnEncoder(object):
    def _init_mode(self, mode):
        if mode not in MdnMode.all:
            raise ValueError("mdn mode invalid")

        self.mdn_mode = mode

    def _init_message_id(self, message_mdn):
        if is_none_or_whitespace(message_mdn.mdn_message_id):
            raise ValueError("mdn-message-id is required")
        if is_none_or_whitespace(message_mdn.original_message_id):
            raise ValueError("original-message-id is required")

        self.mdn_message_id = message_mdn.mdn_message_id
        self.original_message_id = message_mdn.original_message_id

    def _init_disposition(self, message_mdn):
        if message_mdn.mdn_disposition_mode not in ['automatic-action/MDN-sent-automatically',
                                                    'manual-action/MDN-sent-manually']:
            raise ValueError("mdn disposition mode invalid")
        if message_mdn.mdn_disposition_type not in ['processed', 'failed']:
            raise ValueError("mdn disposition type invalid")
        if not is_none_or_whitespace(
                message_mdn.mdn_disposition_modifier_code) \
                and message_mdn.mdn_disposition_modifier_code not in ['error', 'warning', 'failure']:
            raise ValueError("mdn disposition modifier code invalid")

        self.disposition_mode = message_mdn.mdn_disposition_mode
        self.disposition_type = message_mdn.mdn_disposition_type
        self.disposition_modifier_code = message_mdn.mdn_disposition_modifier_code
        self.disposition_modifier_value = message_mdn.mdn_disposition_modifier_value
        self.disposition_description = None

    def _init_mic(self, is_mic, message_mdn):
        if not isinstance(is_mic, bool):
            raise ValueError("mdn mic flag invalid")
        if is_mic and (
                    is_none_or_whitespace(message_mdn.mdn_mic_digest)
                or is_none_or_whitespace(message_mdn.mdn_mic_algorithm)
        ):
            raise ValueError("mdn mic digest or algorithm invalid")

        self.is_mic = is_mic
        self.mic_algorithm = message_mdn.mdn_mic_algorithm
        self.mic_digest = message_mdn.mdn_mic_digest
        self.mic_description = None

    def __init__(self, context):
        if context is None or not isinstance(context, AS2Context):
            raise ValueError("context invalid")
        if context.message is None or not isinstance(context.message, AS2Message):
            raise ValueError("context.message invalid")
        if context.message.message_mdn is None or not isinstance(context.message.message_mdn, AS2MessageMdn):
            raise ValueError("context.message.message_mdn invalid")

        self.context = context
        self.validate_status = None

    '''
    build mdn confirmation mime message
    '''

    def _build_confirmation_mime(self):
        confirmation_text = self.context.agreement.inbound_agreement.mdn_confirmation_text
        if is_none_or_whitespace(confirmation_text):
            confirmation_text = "received by {title}/{version}".format(title=ngas2.__title__,
                                                                       version=ngas2.__version__)

        mdn_confirmation_text = email.Message.Message()
        mdn_confirmation_text.set_payload("{confirmation_text}".format(confirmation_text=confirmation_text))
        mdn_confirmation_text.set_type('text/plain')
        del mdn_confirmation_text['MIME-Version']

        self.context.trace('build mdn confirmation information')

        return mdn_confirmation_text

    '''
    build feedback content mime message
    '''

    def _build_feedback_content_mime(self):
        mdn_feedback_content = email.Message.Message()
        mdn_feedback_content.set_type('message/disposition-notification')

        mdn_lines = []

        mdn_lines.append('Reporting-UA: {title}/{version}'.format(
            title=ngas2.__title__,
            version=ngas2.__version__))

        mdn_lines.append('Original-Recipient: rfc822; {local_identity}'.format(
            local_identity=self.context.agreement.local_identity))

        mdn_lines.append('Final-Recipient: rfc822; {local_identity}'.format(
            local_identity=self.context.agreement.local_identity))

        mdn_lines.append('Original-Message-ID: {message_id}'.format(
            message_id=self.original_message_id))

        disposition_description = 'Disposition: {mode}; {type}'.format(
            mode=self.disposition_mode,
            type=self.disposition_type
        )

        if not is_none_or_whitespace(self.disposition_modifier_code):
            disposition_description += '/{code}'.format(code=self.disposition_modifier_code)
            if not is_none_or_whitespace(self.disposition_modifier_value):
                disposition_description += ': {value}'.format(value=self.disposition_modifier_value)

        self.disposition_description = disposition_description

        mdn_lines.append(self.disposition_description)

        if self.disposition_type == 'processed' and is_none_or_whitespace(self.disposition_modifier_code):
            self.validate_status = StatusType.successful
        else:
            self.validate_status = StatusType.failed

        if self.is_mic:
            self.mic_description = 'Received-content-MIC: {digest}, {algorithm}'.format(
                digest=self.mic_digest,
                algorithm=self.mic_algorithm)

            mdn_lines.append(self.mic_description)

        mdn_feedback_content.set_payload('\r\n'.join(mdn_lines) + '\r\n')
        del mdn_feedback_content['MIME-Version']

        self.context.trace('build mdn processed result information')

        return mdn_feedback_content

    def _build_mdn_headers(self, mdn_message):
        headers = {
            'EDIINT-Features': 'CEM,multiple-attachments,AS2-Reliability',
            'Message-ID': self.mdn_message_id,
            'AS2-From': encode_as2_identity(self.context.agreement.local_identity),
            'AS2-To': encode_as2_identity(self.context.agreement.trading_identity), 'AS2-Version': '1.2',
            'Date': email.Utils.formatdate(localtime=True), 'MIME-Version': '1.0'
        }

        for k, v in mdn_message.items():
            headers[k] = v

        self.context.trace('build mdn headers')

        return headers

    def _signature_mdn_mime(self, mdn_report):
        signed_mdn_report = MIMEMultipart('signed',
                                          boundary=SMIMEHelper.get_random_boundary(),
                                          protocol="application/pkcs7-signature")
        signed_mdn_report.attach(mdn_report)

        cert_thumbprint = self.context.agreement.outbound_agreement.message_signature_certificate.thumbprint
        cert_local_file_path = self.context.agreement.outbound_agreement.message_signature_certificate.local_file_path
        cert_pass_phrase = self.context.agreement.outbound_agreement.message_signature_certificate.pass_phrase
        cert_signature_algorithm = self.context.agreement.inbound_agreement.mdn_signature_algorithm

        try:
            mime_message = SMIMEHelper.sign_to_mime_detached(
                SMIMEHelper.format_with_cr_lf(SMIMEHelper.mime_to_string(mdn_report)),
                cert_local_file_path,
                cert_pass_phrase,
                cert_signature_algorithm
            )

            signature = SMIMEHelper.get_signature_from_mime(mime_message)
            del signature['MIME-Version']

            signed_mdn_report.set_param('micalg', cert_signature_algorithm)
            signed_mdn_report.attach(signature)

            self.context.trace("mdn signature finished; thumbprint: {thumbprint}, algorithm: {algorithm}",
                               thumbprint=cert_thumbprint,
                               algorithm=cert_signature_algorithm)
        except:
            logger.exception('sign mdn failed')
            raise AS2MdnException(
                "mdn signature failed; thumbprint: {thumbprint}, algorithm: {algorithm}, due to: {message}",
                thumbprint=cert_thumbprint,
                algorithm=cert_signature_algorithm,
                message=sys.exc_info()[1])

        return signed_mdn_report

    def encode(self):
        try:
            self._init_mode(self.context.message.message_mdn.mdn_mode)

            self._init_message_id(self.context.message.message_mdn)

            self._init_disposition(self.context.message.message_mdn)

            self._init_mic(self.context.message.message_is_mic, self.context.message.message_mdn)

            mdn_report = MIMEMultipart('report',
                                       boundary=SMIMEHelper.get_random_boundary(),
                                       report_type="disposition-notification")

            mdn_confirmation_text = self._build_confirmation_mime()
            mdn_feedback_content = self._build_feedback_content_mime()

            mdn_report.attach(mdn_confirmation_text)
            mdn_report.attach(mdn_feedback_content)
            del mdn_report['MIME-Version']

            if self.context.agreement.inbound_agreement.is_mdn_signed:
                mdn_message = self._signature_mdn_mime(mdn_report)
            else:
                mdn_message = mdn_report
                self.context.trace("mdn signature ignore")

            mdn_headers = self._build_mdn_headers(mdn_message)

            mdn_body = SMIMEHelper.format_with_cr_lf(SMIMEHelper.extract_payload(mdn_message))

            return mdn_headers, mdn_body
        except AS2MdnException as ex:
            self.context.trace_error(ex.msg)
            raise
        except:
            self.context.trace_error(sys.exc_info()[1])
            raise
