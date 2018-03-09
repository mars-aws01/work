# -*- coding: utf-8 -*-

import email
import hashlib
import logging
import sys

from ngas2.models.context import AS2Context
from ngas2.protocol import (decode_as2_identity)
from ngas2.protocol.exception import (AS2Exception, AS2DecryptException, AS2VerifySignatureException,
                                      AS2DeCompressException)
from ngas2.utils.smime import SMIMEHelper
from ngkitty.extensions.str_ext import is_none_or_whitespace

logger = logging.getLogger(__name__)

'''
Receive Decoder
'''


class ReceiveDecoder(object):
    def __init__(self, headers, body, context):
        if not isinstance(context, AS2Context):
            raise ValueError('context invalid')
        if not isinstance(headers, dict):
            raise ValueError('headers invalid')
        if body is None:
            raise ValueError('body invalid')

        self.headers = headers
        self.body = body
        self.context = context
        self.message_id = None
        self.from_identity = None
        self.to_identity = None
        self.content_type = None
        self.content_transfer_encoding = None
        self.mime_message = None
        self.content = None
        self.is_mic = False
        self.mic_content = None
        self.mic_digest = None
        self.mic_algorithm = None
        self.mic_description = None

    def _format_headers(self):
        self.headers = {k.lower().replace('_', '-'): v for k, v in self.headers.items()}

    def _init_message_id(self):
        id = self.headers.get("message-id")
        if is_none_or_whitespace(id):
            raise AS2Exception('message-id is required')
        if len(id) > 998:
            raise AS2Exception('message-id length is a maximum of 998 characters')

        self.message_id = id.strip()

    def _init_from_identity(self):
        identity = self.headers.get("as2-from")
        if is_none_or_whitespace(identity):
            raise AS2Exception('as2-from is required')

        self.from_identity = decode_as2_identity(identity.strip())

    def _init_to_identity(self):
        identity = self.headers.get("as2-to")
        if is_none_or_whitespace(identity):
            raise AS2Exception('as2-to is required')

        self.to_identity = decode_as2_identity(identity.strip())

    def _init_content_type(self):
        content_type = self.headers.get("content-type")
        if is_none_or_whitespace(content_type):
            raise AS2Exception('content-type is required')

        self.content_type = content_type.lower().strip()

    def _init_agreement_flag(self):
        self.is_encrypted = self.context.agreement.inbound_agreement.is_encrypted
        self.is_signed = self.context.agreement.inbound_agreement.is_signed
        self.is_compressed = self.context.agreement.inbound_agreement.is_compressed

    def _init_mime_message(self):
        try:
            headers = "\r\n".join(["{key}: {value}".format(key=k, value=v) for k, v in self.headers.iteritems()])

            content = headers + '\r\n\r\n' + self.body

            self.mime_message = email.message_from_string(content)

            self.context.trace('init mime message finished')
        except:
            logger.exception("init mime message failed; message-id: {id}".format(id=self.message_id))
            raise AS2Exception("init mime message failed; due to: {message}", message=sys.exc_info()[1])

    def _decrypt(self):
        if not self.is_encrypted:
            self.context.trace("decrypt ignored")
            return

        content_type = self.mime_message.get_content_type().lower()
        s_mime_type = self.mime_message.get_param('smime-type')

        if content_type != 'application/pkcs7-mime':
            raise AS2DecryptException('decrypt failed; content-type:{type} invalid', type=content_type)

        if s_mime_type != 'enveloped-data':
            raise AS2DecryptException('decrypt failed; s/mime-type:{type} invalid', type=s_mime_type)

        cert_thumbprint = self.context.agreement.inbound_agreement.message_decrypt_certificate.thumbprint
        cert_local_file_path = self.context.agreement.inbound_agreement.message_decrypt_certificate.local_file_path
        cert_pass_phrase = self.context.agreement.inbound_agreement.message_decrypt_certificate.pass_phrase

        try:
            content_transfer_encoding = self.mime_message.get('Content-Transfer-Encoding', '').lower()
            if 'base64' != content_transfer_encoding:
                del self.mime_message['Content-Transfer-Encoding']
                email.encoders.encode_base64(self.mime_message)
                self.context.trace('content transfer encoding to base64')

            f_mime_string = SMIMEHelper.format_with_cr_lf(
                SMIMEHelper.mime_to_string(self.mime_message, 78)
            )

            decrypted_content = SMIMEHelper.decrypt_from_text(
                f_mime_string,
                cert_local_file_path,
                cert_pass_phrase
            )

            self.mime_message = email.message_from_string(decrypted_content)

            self.context.trace("decrypt finished; thumbprint: {thumbprint}",
                               thumbprint=cert_thumbprint)
        except:
            logger.exception("decrypt failed; message-id: {id}".format(id=self.message_id))
            raise AS2DecryptException("decrypt failed; thumbprint: {thumbprint}, due to: {message}",
                                      thumbprint=cert_thumbprint,
                                      message=sys.exc_info()[1])

    def _decompress_and_verify_signature(self):
        content_type = self.mime_message.get_content_type().lower()
        if 'application/pkcs7-mime' == content_type:
            self._decompress()
            self._verify_signature()
            self._mic_calculate()
        else:
            self._verify_signature()
            self._mic_calculate()
            self._decompress()

    '''
    verify signature
    '''

    def _verify_signature(self):
        if not self.is_signed:
            self.context.trace("verify signature ignored")
            return

        content_type = self.mime_message.get_content_type().lower()
        if content_type != 'multipart/signed':
            raise AS2VerifySignatureException('verify signature failed; content-type:{type} invalid',
                                              type=content_type)

        cert_thumbprint = self.context.agreement.inbound_agreement.message_verify_certificate.thumbprint
        cert_local_file_path = self.context.agreement.inbound_agreement.message_verify_certificate.local_file_path
        cert_ca_local_file_path = self.context.agreement.inbound_agreement.message_verify_certificate.local_ca_file_path
        cert_verify = self.context.agreement.inbound_agreement.message_verify_certificate.is_need_verify

        try:
            if is_none_or_whitespace(cert_ca_local_file_path):
                cert_ca_local_file_path = cert_local_file_path

            for part in self.mime_message.get_payload():
                if not isinstance(part, email.message.Message):
                    continue
                part_type = part.get_content_type().lower()
                part_encoding = part.get('Content-Transfer-Encoding', '').lower()
                if 'application/pkcs7-signature' == part_type and 'base64' != part_encoding:
                    del part['Content-Transfer-Encoding']
                    email.encoders.encode_base64(part)
                    self.context.trace('signature content transfer encoding to base64')

            f_mime_string = SMIMEHelper.format_with_cr_lf(
                SMIMEHelper.mime_to_string(self.mime_message))

            SMIMEHelper.verify_signed_text(
                f_mime_string,
                cert_local_file_path,
                cert_ca_local_file_path,
                cert_verify)

            self.mic_algorithm = self.mime_message.get_param('micalg').lower()

            parts = [part for part in self.mime_message.walk() if
                     part.get_content_type() not in ['multipart/signed', 'application/pkcs7-signature']]

            if len(parts) != 1:
                raise AS2VerifySignatureException(
                    "verify signature failed; due to multiple part content in mime message")

            self.mime_message = parts[0]

            self.context.trace("verify signature finished; thumbprint: {thumbprint}, verify certificate: {verify}",
                               thumbprint=cert_thumbprint,
                               verify=cert_verify)
        except:
            logger.exception("verify signature failed; message-id: {id}".format(id=self.message_id))
            raise AS2VerifySignatureException(
                "verify signature failed; thumbprint: {thumbprint}, verify certificate: {verify}, due to: {message}",
                thumbprint=cert_thumbprint,
                verify=cert_verify,
                message=sys.exc_info()[1])

    def _decompress(self):
        if not self.is_compressed:
            self.context.trace("decompress ignored")
            return

        content_type = self.mime_message.get_content_type().lower()
        s_mime_type = self.mime_message.get_param('smime-type')

        if content_type != 'application/pkcs7-mime':
            raise AS2DeCompressException('decompress failed; content-type:{type} invalid',
                                         type=content_type)
        if s_mime_type != 'compressed-data':
            raise AS2DecryptException('decompress failed; s/mime-type:{type} invalid', type=s_mime_type)

        try:
            decompress_content = self.mime_message.get_payload(decode=True)

            content = SMIMEHelper.decompress_text(decompress_content)

            self.mime_message = email.message_from_string(content)

            self.context.trace("decompress finished")
        except:
            logger.exception("decompress failed; message-id: {id}".format(id=self.message_id))
            raise AS2DeCompressException(
                "decompress failed; due to: {message}", message=sys.exc_info()[1])

    def _mic_calculate(self):
        if self.mime_message.is_multipart():
            raise AS2Exception('mic calculate failed; content is multipart')

        if self.is_encrypted or self.is_signed or self.is_compressed:
            headers = '\r\n'.join(["{key}: {value}".format(key=k, value=v) for k, v in self.mime_message.items()])
            body = self.mime_message.get_payload()
            self.mic_content = headers + '\r\n\r\n' + body
        else:
            self.mic_content = self.mime_message.get_payload()

        if self.mic_algorithm is None:
            self.mic_algorithm = 'sha1'

        calculate_mic = getattr(hashlib, self.mic_algorithm.replace('-', ''), hashlib.sha1)

        self.mic_digest = calculate_mic(self.mic_content).digest().encode('base64').strip()
        self.mic_description = "{digest}, {micalg}".format(
            digest=self.mic_digest,
            micalg=self.mic_algorithm)
        self.is_mic = True

        self.context.trace("mic calculate finished; mic description: {mic_description}",
                           mic_description=self.mic_description)

    def _fetch_content(self):
        charset = self.mime_message.get_charset()
        content_type = self.mime_message.get_content_type()
        content = self.mime_message.get_payload(decode=True)

        self.content = content
        self.content_length = len(content)
        self.content_hash = hashlib.md5(content).hexdigest()

        if not is_none_or_whitespace(content_type):
            self.content_type = content_type.lower()
        self.content_charset = None if charset is None else str(charset)

        self.context.trace("fetch content finished")

    def decode(self):
        try:
            self._format_headers()

            self._init_message_id()
            self._init_from_identity()
            self._init_to_identity()
            self._init_content_type()
            self._init_agreement_flag()

            self._init_mime_message()

            self._decrypt()
            self._decompress_and_verify_signature()

            self._fetch_content()
        except AS2Exception as ex:
            self.context.trace_error(ex.msg)
            raise
        except:
            self.context.trace_error(sys.exc_info()[1])
            raise
