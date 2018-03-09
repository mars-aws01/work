# -*- coding: utf-8 -*-

import base64
import email
import email.utils
import hashlib
import sys
import logging
import ngas2

from email.mime.multipart import MIMEMultipart
from ngas2.utils.smime import SMIMEHelper
from ngkitty.extensions.str_ext import is_none_or_whitespace
from ngas2.models.context import AS2Context
from ngas2.models.agreement import (MdnMode, SignatureAlgorithm)
from ngas2.protocol import (encode_as2_identity)
from ngas2.protocol.exception import (AS2Exception,
                                      AS2SignatureException,
                                      AS2CompressException,
                                      AS2EncryptException,
                                      AS2MicCalculateException)

logger = logging.getLogger(__name__)

'''
Sender Encoder
'''


class SendEncoder(object):
    def __init__(self, message_id, data_feed_name, data_feed_content, context):
        if not isinstance(context, AS2Context):
            raise ValueError('context invalid')

        if is_none_or_whitespace(message_id):
            raise ValueError('message id is null or empty')

        if is_none_or_whitespace(data_feed_name):
            self.data_feed_name = ngas2.__title__
        else:
            self.data_feed_name = data_feed_name

        self.data_feed_content = data_feed_content
        self.context = context
        self.message_id = message_id
        self.headers = None
        self.body = None
        self.mime_message = None
        self.is_mic = False
        self.mic_content = None
        self.mic_digest = None
        self.mic_algorithm = None
        self.mic_description = None

    def encode(self):
        try:
            self._init_header()
            self._init_body()
            self._init_agreement_flag()
            self._init_mime_message()

            self._compress()
            self._signature()
            self._encryption()

            self._mic_calculate()

            self._request_mdn()
            self._update_header()

            self._convert_to_binary()

            return self.headers, self.body
        except AS2Exception as ex:
            self.context.trace_error(ex.msg)
            raise
        except:
            self.context.trace_error(sys.exc_info()[1])
            raise

    '''
    Init AS2 Header
    '''

    def _init_header(self):
        self.headers = {}

        self.headers['AS2-Version'] = '1.2'
        self.headers['EDIINT-Features'] = 'CEM,multiple-attachments,AS2-Reliability'
        self.headers['MIME-Version'] = '1.0'
        self.headers['Message-ID'] = self.message_id
        self.headers['AS2-From'] = encode_as2_identity(self.context.agreement.local_identity)
        self.headers['AS2-To'] = encode_as2_identity(self.context.agreement.trading_identity)
        self.headers['Subject'] = 'NgAS2 Message'
        self.headers['Date'] = email.Utils.formatdate(localtime=True)

        self.context.trace("init as2 header finished")

    def _init_body(self):
        self.body = self.data_feed_content

        self.context.trace("init data feed content finished")

    def _init_agreement_flag(self):
        self.is_compressed = self.context.agreement.outbound_agreement.is_compressed
        self.is_signed = self.context.agreement.outbound_agreement.is_signed
        self.is_encrypted = self.context.agreement.outbound_agreement.is_encrypted
        self.is_request_mdn = self.context.agreement.outbound_agreement.is_request_mdn

    def _init_mime_message(self):
        self.mime_message = email.Message.Message()
        self.mime_message.set_payload(self.body, 'utf-8')
        self.mime_message.set_type(self.context.agreement.outbound_agreement.message_content_type)
        self.mime_message.add_header('Content-Disposition', 'attachment', filename=self.data_feed_name)
        del self.mime_message['MIME-Version']

        self.body = self.mime_message.get_payload()

        self.mic_content = self.body

        self.context.trace("init mime message finished")

    def _compress(self):
        if not self.is_compressed:
            self.context.trace("compress ignored")
            return

        try:
            f_mime_string = SMIMEHelper.format_with_cr_lf(
                SMIMEHelper.mime_to_string(self.mime_message))

            self.mic_content = f_mime_string

            self.mime_message = SMIMEHelper.compress_to_mime(f_mime_string)
            del self.mime_message['MIME-Version']

            self.body = self.mime_message.get_payload()

            self.context.trace("compress finished")
        except:
            logger.exception("compress failed; message-id: {id}".format(id=self.message_id))
            raise AS2CompressException("compress failed; due to: {message}", message=sys.exc_info()[1])

    def _signature(self):
        if not self.is_signed:
            self.context.trace("signature ignored")
            return

        cert_thumbprint = self.context.agreement.outbound_agreement.message_signature_certificate.thumbprint
        cert_local_file_path = self.context.agreement.outbound_agreement.message_signature_certificate.local_file_path
        cert_pass_phrase = self.context.agreement.outbound_agreement.message_signature_certificate.pass_phrase
        cert_signature_algorithm = self.context.agreement.outbound_agreement.message_signature_algorithm

        try:
            f_mime_string = SMIMEHelper.format_with_cr_lf(
                SMIMEHelper.mime_to_string(self.mime_message))

            self.mic_content = f_mime_string
            self.mic_algorithm = self.context.agreement.outbound_agreement.message_signature_algorithm

            detached_signed_message = SMIMEHelper.sign_to_mime_detached(
                f_mime_string,
                cert_local_file_path,
                cert_pass_phrase,
                cert_signature_algorithm)

            signature = SMIMEHelper.get_signature_from_mime(detached_signed_message)
            if signature is None:
                raise Exception("signature is none from detached signed mime message")

            signed_mime_message = MIMEMultipart('signed', boundary=SMIMEHelper.get_random_boundary(),
                                                protocol="application/pkcs7-signature")
            del signed_mime_message['MIME-Version']

            signed_mime_message.set_param('micalg', self.mic_algorithm)
            signed_mime_message.attach(self.mime_message)
            signed_mime_message.attach(signature)

            self.body = SMIMEHelper.format_with_cr_lf(SMIMEHelper.extract_payload(signed_mime_message))
            self.mime_message = signed_mime_message

            self.context.trace("signature finished; thumbprint: {thumbprint}, algorithm: {algorithm}",
                               thumbprint=cert_thumbprint,
                               algorithm=cert_signature_algorithm)
        except:
            logger.exception("signature failed; message-id: {id}".format(id=self.message_id))
            raise AS2SignatureException(
                "signature failed; thumbprint: {thumbprint}, algorithm: {algorithm}, due to: {message}",
                thumbprint=cert_thumbprint,
                algorithm=cert_signature_algorithm,
                message=sys.exc_info()[1])

    def _encryption(self):
        if not self.is_encrypted:
            self.context.trace("encryption ignored")
            return

        cert_thumbprint = self.context.agreement.outbound_agreement.message_encryption_certificate.thumbprint
        cert_local_file_path = self.context.agreement.outbound_agreement.message_encryption_certificate.local_file_path
        cert_encrypt_algorithm = self.context.agreement.outbound_agreement.message_encryption_algorithm

        try:
            f_mime_string = SMIMEHelper.format_with_cr_lf(
                SMIMEHelper.mime_to_string(self.mime_message))

            # encrypt without sign and compress
            if not self.is_signed and not self.is_compressed:
                self.mic_content = f_mime_string

            encrypted_mime_message = SMIMEHelper.encrypt_to_mime(
                f_mime_string,
                cert_local_file_path,
                cert_encrypt_algorithm)

            encrypted_mime_message.set_type('application/pkcs7-mime')

            self.body = encrypted_mime_message.get_payload()
            self.mime_message = encrypted_mime_message

            self.context.trace("encryption finished; thumbprint: {thumbprint}, algorithm: {algorithm}",
                               thumbprint=cert_thumbprint,
                               algorithm=cert_encrypt_algorithm)
        except:
            logger.exception("encryption failed; message-id: {id}".format(id=self.message_id))
            raise AS2EncryptException(
                "encryption failed; thumbprint: {thumbprint}, algorithm: {algorithm}, due to: {message}",
                thumbprint=cert_thumbprint,
                algorithm=cert_encrypt_algorithm,
                message=sys.exc_info()[1])

    def _request_mdn(self):
        if not self.is_request_mdn:
            self.context.trace("request mdn ignored")
            return

        disposition_notification_to = self.context.agreement.outbound_agreement.disposition_notification_to
        is_mdn_signed = self.context.agreement.outbound_agreement.is_mdn_signed
        mic_alg_desc = ''
        mdn_mode = self.context.agreement.outbound_agreement.mdn_mode
        async_mdn_url = self.context.agreement.outbound_agreement.async_mdn_url

        self.headers['Disposition-Notification-To'] = disposition_notification_to

        if mdn_mode == MdnMode.async:
            self.headers['Receipt-Delivery-Option'] = async_mdn_url

        if is_mdn_signed:
            signed_receipt_protocol = 'signed-receipt-protocol=required,pkcs7-signature'
            signed_receipt_mic_alg_prefix = 'signed-receipt-micalg='
            mdn_signature_algorithm = self.context.agreement.outbound_agreement.mdn_signature_algorithm

            if is_none_or_whitespace(mdn_signature_algorithm):
                mic_alg_desc = 'optional,{micalg}'.format(
                    micalg=','.join(SignatureAlgorithm.all))
            else:
                mic_alg_desc = 'required,{micalg}'.format(
                    micalg=mdn_signature_algorithm)

            signed_receipt_mic_alg = signed_receipt_mic_alg_prefix + mic_alg_desc

            self.headers['Disposition-Notification-Options'] = signed_receipt_protocol + '; ' + signed_receipt_mic_alg

        self.context.trace("request mdn finished; mode: {mode}, signed: {signed}, algorithm: {algorithm}",
                           mode=mdn_mode,
                           signed=is_mdn_signed,
                           algorithm=mic_alg_desc)

    def _mic_calculate(self):
        try:
            if self.mic_algorithm is None:
                self.mic_algorithm = 'sha1'

            calculate_mic = getattr(hashlib, self.mic_algorithm.replace('-', ''), hashlib.sha1)

            self.mic_digest = calculate_mic(self.mic_content).digest().encode('base64').strip()
            self.mic_description = "{digest}, {micalg}".format(
                digest=self.mic_digest,
                micalg=self.mic_algorithm)
            self.is_mic = True

            self.context.trace("mic calculate finished; mic={mic}", mic=self.mic_description)
        except:
            logger.exception("mic calculate failed; message-id: {id}".format(id=self.message_id))
            raise AS2MicCalculateException("mic calculate failed; due to: {message}", message=sys.exc_info()[1])

    def _update_header(self):
        self.headers.update(self.mime_message.items())
        self.context.trace("update as2 header")

    def _convert_to_binary(self):
        content_transfer_encoding = self.headers.get('Content-Transfer-Encoding', '')
        if content_transfer_encoding == 'base64':
            del self.headers['Content-Transfer-Encoding']
            self.body = base64.decodestring(self.body)
            self.context.trace("content converted from base64 to binary")
        else:
            self.context.trace("content already binary")
