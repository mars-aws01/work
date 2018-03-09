# -*- coding: utf-8 -*-

# ==================================
# *author*:  Terry
# *function description*:
# ==================================

import M2Crypto
import email
import uuid
import zlib
import base64
import tempfile
import os

from asn1crypto import cms
from email.generator import Generator as MIMEGenerator
from cStringIO import StringIO

__author__ = "Terry.Y.Ren"

"""
    S/MIME Proxy
"""


class SMIMEProxy(M2Crypto.SMIME.SMIME):
    def __init__(self, memory_buffer_len=1024 * 1024):
        # type (int) -> None
        self.memory_buffer_len = memory_buffer_len

    '''
        create temp file
    '''

    @staticmethod
    def create_temp_file(data):
        with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
            tmp_file.write(data)
            tmp_file.close()
            return tmp_file.name

    '''
        encrypt bio
    '''

    def encrypt_bio(self, bio):
        encrypted_content = self.encrypt(bio
                                         , M2Crypto.SMIME.PKCS7_BINARY)

        with M2Crypto.BIO.MemoryBuffer() as out_buf:
            self.write(out_buf, encrypted_content)
            del encrypted_content
            return out_buf.read()

    '''
        encrypt string
    '''

    def encrypt_string(self, data):
        # type (str) -> str
        if len(data) <= self.memory_buffer_len:
            with M2Crypto.BIO.MemoryBuffer(data) as bio:
                return self.encrypt_bio(bio)

        try:
            tmp_file_name = self.create_temp_file(data)
            return self.encrypt_file(tmp_file_name)
        finally:
            os.unlink(tmp_file_name)

    '''
        encrypt file
    '''

    def encrypt_file(self, file_name):
        # type (str) -> str
        with M2Crypto.BIO.openfile(file_name) as file_bio:
            return self.encrypt_bio(file_bio)

    '''
        sign string
    '''

    def sign_string(self, data, cipher):
        # type (str, str) -> str
        if len(data) <= self.memory_buffer_len:
            with M2Crypto.BIO.MemoryBuffer(data) as data_bio:
                p7 = self.sign(data_bio
                               , M2Crypto.SMIME.PKCS7_DETACHED
                               , cipher)

            with M2Crypto.BIO.MemoryBuffer() as out_buf:
                with M2Crypto.BIO.MemoryBuffer(data) as data_bio_2:
                    self.write(out_buf, p7, data_bio_2)
                    del p7
                return out_buf.read()

        try:
            tmp_file_name = self.create_temp_file(data)
            return self.sign_file(tmp_file_name, cipher)
        finally:
            os.unlink(tmp_file_name)

    '''
       sign file
    '''

    def sign_file(self, file_name, cipher):
        # type (str, str) -> str
        with M2Crypto.BIO.openfile(file_name) as file_data_bio:
            p7 = self.sign(file_data_bio
                           , M2Crypto.SMIME.PKCS7_DETACHED
                           , cipher)

        with M2Crypto.BIO.MemoryBuffer() as out_buf:
            with M2Crypto.BIO.openfile(file_name) as file_data_bio_2:
                self.write(out_buf, p7, file_data_bio_2)
                del p7
            return out_buf.read()

    '''
        verify string
    '''

    def verify_string(self, data, is_verify_cert):
        if len(data) <= self.memory_buffer_len:
            try:
                with M2Crypto.BIO.MemoryBuffer(data) as bio:
                    p7, data_bio = M2Crypto.SMIME.smime_load_pkcs7_bio(bio)
                    if is_verify_cert:
                        return self.verify(p7, data_bio, M2Crypto.SMIME.PKCS7_SIGNED)
                    return self.verify(p7, data_bio, M2Crypto.SMIME.PKCS7_NOVERIFY)
            except M2Crypto.SMIME.PKCS7_Error as ex:
                if 'digest failure' != ex.message:
                    raise ex
        else:
             # verify big stream
            try:
                tmp_file_name = self.create_temp_file(data)
                return self.verify_file(tmp_file_name, is_verify_cert)
            except M2Crypto.SMIME.PKCS7_Error as ex:
                if 'digest failure' != ex.message:
                    raise ex
            finally:
                os.unlink(tmp_file_name)

    '''
        verify file
    '''

    def verify_file(self, file_name, is_verify_cert):
        p7, data_bio = M2Crypto.SMIME.smime_load_pkcs7(file_name)
        if is_verify_cert:
            return self.verify(p7, data_bio, M2Crypto.SMIME.PKCS7_SIGNED)

        return self.verify(p7, data_bio, M2Crypto.SMIME.PKCS7_NOVERIFY)

    '''
        decrypt string
    '''

    def decrypt_string(self, encrypt_data):
        if len(encrypt_data) <= self.memory_buffer_len:
            with M2Crypto.BIO.MemoryBuffer(encrypt_data) as bio:
                p7, data_bio = M2Crypto.SMIME.smime_load_pkcs7_bio(bio)
                return self.decrypt(p7)

        try:
            tmp_file_name = self.create_temp_file(encrypt_data)
            return self.decrypt_file(tmp_file_name)
        finally:
            os.unlink(tmp_file_name)

    '''
        decrypt file
    '''

    def decrypt_file(self, file_name):
        p7, data_bio = M2Crypto.SMIME.smime_load_pkcs7(file_name)
        return self.decrypt(p7)


'''
S/MIME helper
'''


class SMIMEHelper(object):
    # save memory data to temp file when it exceed max length (1M)
    bio_max_length = 1024 * 1024

    '''
        (reference) https://tools.ietf.org/html/rfc3274#section-2
    '''

    @staticmethod
    def compress_text(content):
        ci = cms.ContentInfo({
            'content_type': u'compressed_data',
            'content': {
                'version': u'v0',
                'compression_algorithm': {
                    'algorithm': u'zlib'
                },
                'encap_content_info': {
                    'content_type': u'data',
                    'content': zlib.compress(content)
                }
            },
        })

        cms_bytes = ci.dump()
        cms_b64 = base64.encodestring(cms_bytes)

        return cms_b64

    @staticmethod
    def decompress_text(compress_content):
        info = cms.ContentInfo.load(compress_content)
        compressed_data = info['content']

        return compressed_data.decompressed

    '''
    compress content to mime object
    '''

    @staticmethod
    def compress_to_mime(content):
        compressed_message = email.Message.Message()
        compressed_message.set_type('application/pkcs7-mime')
        compressed_message.set_param('smime-type', 'compressed-data')
        compressed_message.set_param('name', 'smime.p7z')

        compressed_message.add_header('Content-Transfer-Encoding', 'base64')
        compressed_message.add_header('Content-Disposition', 'attachment', filename='smime.p7z')

        compressed_message.set_payload(SMIMEHelper.compress_text(content))

        return compressed_message

    '''
    encrypt content to mime object
    '''

    @staticmethod
    def encrypt_to_mime(content, cert_file_path, cipher):
        if isinstance(cert_file_path, unicode):
            cert_file_path = str(cert_file_path)

        if isinstance(cipher, unicode):
            cipher = str(cipher)

        certificate = M2Crypto.X509.X509_Stack()
        certificate.push(M2Crypto.X509.load_cert(cert_file_path))

        s_mime = SMIMEProxy()
        s_mime.set_x509_stack(certificate)
        s_mime.set_cipher(M2Crypto.SMIME.Cipher(cipher))

        return email.message_from_string(s_mime.encrypt_string(content))

    @staticmethod
    def decrypt_from_text(encrypt_content, key_file_path, pass_phrase=None):
        if isinstance(key_file_path, unicode):
            key_file_path = str(key_file_path)

        if isinstance(pass_phrase, unicode):
            pass_phrase = str(pass_phrase)

        s_mime = SMIMEProxy()

        if pass_phrase is None or len(pass_phrase) == 0:
            s_mime.load_key(key_file_path, callback=M2Crypto.util.no_passphrase_callback)
        else:
            s_mime.load_key(key_file_path, callback=lambda *args: pass_phrase)

        return s_mime.decrypt_string(encrypt_content)

    @staticmethod
    def mime_to_string(mime, header_len=0):
        fp = StringIO()
        g = MIMEGenerator(fp, mangle_from_=False, maxheaderlen=header_len)
        g.flatten(mime)

        return fp.getvalue()

    @staticmethod
    def format_with_cr_lf(text):
        return text.replace('\r\n', '\n').replace('\r', '\n').replace('\n', '\r\n')

    @staticmethod
    def get_random_boundary():
        return '_' + str(uuid.uuid4()).upper() + '_'

    @staticmethod
    def sign_to_mime_detached(content, key_file_path, pass_phrase=None, cipher='sha1'):
        if isinstance(key_file_path, unicode):
            key_file_path = str(key_file_path)
        if isinstance(pass_phrase, unicode):
            pass_phrase = str(pass_phrase)
        if isinstance(cipher, unicode):
            cipher = str(cipher)

        s_mime = SMIMEProxy()

        if pass_phrase is None or len(pass_phrase) == 0:
            s_mime.load_key(key_file_path, callback=M2Crypto.util.no_passphrase_callback)
        else:
            s_mime.load_key(key_file_path, callback=lambda *args: pass_phrase)

        return email.message_from_string(s_mime.sign_string(content, cipher))

    @staticmethod
    def get_signature_from_mime(mime, is_override_type=True, content_type=None):
        if content_type is None:
            content_type = 'application/pkcs7-signature'

        for part in mime.get_payload():
            if part.get_content_type() in ['application/pkcs7-signature', 'application/x-pkcs7-signature']:
                if is_override_type:
                    part.set_type(content_type)

                # re-format signature (MIME base64 standard)
                original_signature = part.get_payload()
                signature = base64.decodestring(original_signature)
                b64_signature = base64.encodestring(signature)

                part.set_payload(b64_signature)

                return part
        return None

    @staticmethod
    def extract_payload(mime, **kv):
        if mime.is_multipart():
            header_len = kv.get('headerlen', 78)
            mime_str = SMIMEHelper.mime_to_string(mime, header_len)

            boundary = '--' + mime.get_boundary()

            temp = mime_str.split(boundary)
            temp.pop(0)
            return boundary + boundary.join(temp)
        else:
            return mime.get_payload()

    @staticmethod
    def verify_signed_text(text, cert_file_path, ca_cert_file_path, is_verify_cert):
        if isinstance(cert_file_path, unicode):
            cert_file_path = str(cert_file_path)

        if isinstance(ca_cert_file_path, unicode):
            ca_cert_file_path = str(ca_cert_file_path)

        s_mime = SMIMEProxy()

        signer_cert = M2Crypto.X509.X509_Stack()
        signer_cert.push(M2Crypto.X509.load_cert(cert_file_path))

        signer_store = M2Crypto.X509.X509_Store()
        signer_store.load_info(ca_cert_file_path)

        s_mime.set_x509_stack(signer_cert)
        s_mime.set_x509_store(signer_store)

        return s_mime.verify_string(text, is_verify_cert)

    @staticmethod
    def aes_encrypt(data, key, iv='9527', alg='aes_128_ecb'):
        cipher = M2Crypto.EVP.Cipher(alg=alg, key=key, iv=iv, op=1)
        buf = cipher.update(data) + cipher.final()
        del cipher
        return base64.b64encode(buf)

    @staticmethod
    def aes_decrypt(data, key, iv='9527', alg='aes_128_ecb'):
        data = base64.b64decode(data)
        cipher = M2Crypto.EVP.Cipher(alg=alg, key=key, iv=iv, op=0)
        buf = cipher.update(data) + cipher.final()
        del cipher
        return buf
