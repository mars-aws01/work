# -*- coding: utf-8 -*-

import os
import unittest
import email
import base64

from ngas2.utils.smime import SMIMEHelper
from email.mime.multipart import MIMEMultipart

from nose.tools import (assert_equal, assert_not_equal, raises)


class TestSMIMEHelper(unittest.TestCase):
    clearText = None

    @classmethod
    def setup_class(cls):
        cls.clearText = "This is test message."

    @classmethod
    def teardown_class(cls):
        cls.clearText = None

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_aes_encrypt(self):
        pwd = SMIMEHelper.aes_encrypt(data='123456', key='f290f63f-7310-4bd2-ac7d-17fd866354d1')
        assert_not_equal(None, pwd)
        assert_equal('gvTFH3+s+OqiyC0Lq5VhbA==', pwd)

    def test_aes_decrypt(self):
        plain = SMIMEHelper.aes_decrypt(data='gvTFH3+s+OqiyC0Lq5VhbA==', key='f290f63f-7310-4bd2-ac7d-17fd866354d1')
        assert_not_equal(None, plain)
        assert_equal('123456', plain)

    '''
    Compress content to mime object
    '''

    def test_compress_to_mime(self):
        mime = SMIMEHelper.compress_to_mime(self.clearText)

        assert_not_equal(None, mime)
        assert_equal(mime['Content-Transfer-Encoding'], 'base64')
        assert_equal(mime['Content-Disposition'], 'attachment; filename="smime.p7z"')
        assert_equal(True, 'smime-type="compressed-data"' in mime['Content-Type'])

    def test_decompress_text(self):
        b64_decompress_content = '''ME8GCyqGSIb3DQEJEAEJoEAwPgIBADANBgsqhkiG9w0BCRADCDAqBgkqhkiG9w0BBwGgHQQbeJwL
        ycgsVgCiktTiEoXc1OLixPRUPQBULQeo
        '''

        decompress_content = base64.decodestring(b64_decompress_content)
        content = SMIMEHelper.decompress_text(decompress_content)

        assert_equal(content, self.clearText)

    '''
    extract payload from mime multipart message
    '''

    def test_extract_payload_with_multipart(self):
        signed_mime_message = MIMEMultipart('signed', protocol="application/pkcs7-signature")

        payload = SMIMEHelper.extract_payload(signed_mime_message)

        assert_not_equal(None, payload)
        assert_not_equal("", payload)
        assert_equal(True, payload.startswith("--"))

    '''
    extract payload from mime  message
    '''

    def test_extract_payload(self):
        text_plain = "test message"

        mime_message = email.Message.Message()
        mime_message.set_payload(text_plain)

        payload = SMIMEHelper.extract_payload(mime_message)

        assert_not_equal(None, payload)
        assert_not_equal("", payload)
        assert_equal(text_plain, payload)

    def __get_cert_path(self, name):
        return os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'cert', name))

    '''
        encrypt content with self-signature cert (alg: aes_128_cbc)
    '''

    def test_encrypt_public_cert_without_ca_aes_128_cbc(self):
        crt_path = self.__get_cert_path('P1_public.cer')
        alg = "aes_128_cbc"

        rst = SMIMEHelper.encrypt_to_mime(self.clearText, crt_path, alg)

        assert_not_equal(None, rst._headers)
        assert_equal(('MIME-Version', '1.0'), rst._headers[0])

    '''
        encrypt content with self-signature cert (alg: aes_128_cbc)
    '''

    def test_encrypt_public_cert_without_ca_aes_128_cbc_unicode(self):
        crt_path = u'' + self.__get_cert_path('P1_public.cer')
        alg = u"aes_128_cbc"

        rst = SMIMEHelper.encrypt_to_mime(self.clearText, crt_path, alg)

        assert_not_equal(None, rst._headers)
        assert_equal(('MIME-Version', '1.0'), rst._headers[0])

    '''
        encrypt content with CA-signature cert (alg: aes_128_cbc)
    '''

    def test_encrypt_public_cert_with_ca_aes_128_cbc(self):
        crt_path = self.__get_cert_path('edi04_with_ca.crt')
        alg = "aes_128_cbc"

        rst = SMIMEHelper.encrypt_to_mime(self.clearText, crt_path, alg)

        assert_not_equal(None, rst._headers)
        assert_equal(('MIME-Version', '1.0'), rst._headers[0])

    '''
        encrypt content with self-signature cert (alg: des_ede3_cbc)
    '''

    def test_encrypt_public_cert_without_ca_des_ede3_cbc(self):
        crt_path = self.__get_cert_path('P1_public.cer')
        alg = "des_ede3_cbc"

        rst = SMIMEHelper.encrypt_to_mime(self.clearText, crt_path, alg)

        assert_not_equal(None, rst._headers)
        assert_equal(('MIME-Version', '1.0'), rst._headers[0])

    '''
        encrypt content with CA-signature cert (alg: des_ede3_cbc)
    '''

    def test_encrypt_public_cert_with_ca_des_ede3_cbc(self):
        crt_path = self.__get_cert_path('edi04_with_ca.crt')
        alg = "des_ede3_cbc"

        rst = SMIMEHelper.encrypt_to_mime(self.clearText, crt_path, alg)

        assert_not_equal(None, rst._headers)
        assert_equal(('MIME-Version', '1.0'), rst._headers[0])

    '''
       (CA Cert) decrypt Content-Type: application/x-pkcs7-mime; smime-type=enveloped-data
    '''

    def test_decrypt_private_key_with_ca_aes_128_cbc(self):
        encrypted_text = '''MIME-Version: 1.0
Content-Disposition: attachment; filename="smime.p7m"
Content-Type: application/x-pkcs7-mime; smime-type=enveloped-data;
 name="smime.p7m"
Content-Transfer-Encoding: base64

MIICQgYJKoZIhvcNAQcDoIICMzCCAi8CAQAxggHsMIIB6AIBADCBzzCBujELMAkG
A1UEBhMCVVMxFjAUBgNVBAoTDUVudHJ1c3QsIEluYy4xKDAmBgNVBAsTH1NlZSB3
d3cuZW50cnVzdC5uZXQvbGVnYWwtdGVybXMxOTA3BgNVBAsTMChjKSAyMDEyIEVu
dHJ1c3QsIEluYy4gLSBmb3IgYXV0aG9yaXplZCB1c2Ugb25seTEuMCwGA1UEAxMl
RW50cnVzdCBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eSAtIEwxSwIQHnF4IP05B10A
AAAAUNw1czANBgkqhkiG9w0BAQEFAASCAQCeEwTDvzE8KQgO+Pt/vcGfj/ZMKu20
dJz6AufIIBvHmWIQFGAL/PQ3Fk/Awxcyvz9/LvOXvNEAHnxifRXb2LqnoW+Uxoys
gY7eccsx/cQleZ+/GIeY3INPF74BX7ywzhxjy018wvfY8PkuCtWSe8vYKZTmksY4
qdrFxaWIhLHHZDNbRaZ/vrk/BpxZvm5BQdd1B1+g6E8+PVNX8Z/lJXcHmpkdKmEe
WZZtqYUQoZpp70eMPMifl0Beyp2bgP6DwGvPmk2Wv7pNE1+wu3K7C5XoAQ6NfeZp
bhu51OP2Rb28NFwFqSt984vbThCzaRDZyL4eLi5oUtw5H8L7IUQuh3Z2MDoGCSqG
SIb3DQEHATALBglghkgBZQMEAQGAIIIt/NjfM683MbhOQTMf3JuRgSYHx+je3OjP
GnNVcfZP
'''

        key_file_path = self.__get_cert_path('edi04_with_ca.pem')
        pass_phrase = "newegg@123"

        rst = SMIMEHelper.decrypt_from_text(encrypted_text, key_file_path, pass_phrase)

        assert_equal(self.clearText, rst)

    '''
        decrypt Content-Type: application/x-pkcs7-mime; smime-type=enveloped-data
    '''

    def test_decrypt_private_key_without_ca_des_ede3_cbc(self):
        encrypted_text = '''MIME-Version: 1.0
Content-Disposition: attachment; filename="smime.p7m"
Content-Type: application/x-pkcs7-mime; smime-type=enveloped-data;
 name="smime.p7m"
Content-Transfer-Encoding: base64

MIICAgYJKoZIhvcNAQcDoIIB8zCCAe8CAQAxggGrMIIBpwIBADCBjjCBgDELMAkG
A1UEBhMCQ04xCzAJBgNVBAgMAlNDMQswCQYDVQQHDAJDRDEPMA0GA1UECgwGTmV3
ZWdnMQwwCgYDVQQLDANFREkxGDAWBgNVBAMMD0FTMiBDZXJ0aWZpY2F0ZTEeMBwG
CSqGSIb3DQEJARYPdHIyOUBuZXdlZ2cuY29tAgkAtl4VWyGqGb4wDQYJKoZIhvcN
AQEBBQAEggEAzzzLpEFOzQDULtCBBcoDLobNGXSPUfSI45uatdlnqrwh8EsG2qan
Wbti6jMRIm6jvVX7u/lrI/gNK/zpWiMvg3VIgCN1vgPRE808Tx//EPXbyFH+ODGT
n/n77he+krbKY7kFwv86udat2OjzMaGjeQpQ2ILW3YYsf+Ce0zCa/AA0IYQeiZVN
G1ksb3kLstdYsU7hOi6OhgZlAYPZSe3zwnEjqe/uToOl8XedEkvmQvNbNbwEzJhB
44h9O7WTABD8DBHydgPahrOWqmcAOdPRjHHyRSnsss9HY9dCFjLHjiWexSszYLAr
5FgGcwITA+YSAMM3fujgFhJFAp1Z/xtQuDA7BgkqhkiG9w0BBwEwFAYIKoZIhvcN
AwcECIa9BZlgtfVYgBh82ue/PhnoQ6/wrwekWNPOkVJN8kX2xPw=
'''

        key_file_path = u'' + self.__get_cert_path('P1_private.pem')
        pass_phrase = u"123456"

        rst = SMIMEHelper.decrypt_from_text(encrypted_text, key_file_path, pass_phrase)

        assert_equal(self.clearText, rst)

    '''
        decrypt Content-Type: application/x-pkcs7-mime; smime-type=enveloped-data
        no pass_phrase
    '''

    @raises(Exception)
    def test_decrypt_private_key_without_ca_des_ede3_cbc_no_pass_phrase(self):
        encrypted_text = '''MIME-Version: 1.0
Content-Disposition: attachment; filename="smime.p7m"
Content-Type: application/x-pkcs7-mime; smime-type=enveloped-data;
 name="smime.p7m"
Content-Transfer-Encoding: base64

MIICAgYJKoZIhvcNAQcDoIIB8zCCAe8CAQAxggGrMIIBpwIBADCBjjCBgDELMAkG
A1UEBhMCQ04xCzAJBgNVBAgMAlNDMQswCQYDVQQHDAJDRDEPMA0GA1UECgwGTmV3
ZWdnMQwwCgYDVQQLDANFREkxGDAWBgNVBAMMD0FTMiBDZXJ0aWZpY2F0ZTEeMBwG
CSqGSIb3DQEJARYPdHIyOUBuZXdlZ2cuY29tAgkAtl4VWyGqGb4wDQYJKoZIhvcN
AQEBBQAEggEAzzzLpEFOzQDULtCBBcoDLobNGXSPUfSI45uatdlnqrwh8EsG2qan
Wbti6jMRIm6jvVX7u/lrI/gNK/zpWiMvg3VIgCN1vgPRE808Tx//EPXbyFH+ODGT
n/n77he+krbKY7kFwv86udat2OjzMaGjeQpQ2ILW3YYsf+Ce0zCa/AA0IYQeiZVN
G1ksb3kLstdYsU7hOi6OhgZlAYPZSe3zwnEjqe/uToOl8XedEkvmQvNbNbwEzJhB
44h9O7WTABD8DBHydgPahrOWqmcAOdPRjHHyRSnsss9HY9dCFjLHjiWexSszYLAr
5FgGcwITA+YSAMM3fujgFhJFAp1Z/xtQuDA7BgkqhkiG9w0BBwEwFAYIKoZIhvcN
AwcECIa9BZlgtfVYgBh82ue/PhnoQ6/wrwekWNPOkVJN8kX2xPw=
'''

        key_file_path = self.__get_cert_path('P1_private.pem')
        pass_phrase = None

        SMIMEHelper.decrypt_from_text(encrypted_text, key_file_path, pass_phrase)

    '''
           decrypt Content-Type: application/x-pkcs7-mime; smime-type=enveloped-data
           no pass_phrase
       '''

    @raises(Exception)
    def test_decrypt_private_key_without_ca_des_ede3_cbc_pass_phrase_is_empty(self):
        encrypted_text = '''MIME-Version: 1.0
    Content-Disposition: attachment; filename="smime.p7m"
    Content-Type: application/x-pkcs7-mime; smime-type=enveloped-data;
     name="smime.p7m"
    Content-Transfer-Encoding: base64

    MIICAgYJKoZIhvcNAQcDoIIB8zCCAe8CAQAxggGrMIIBpwIBADCBjjCBgDELMAkG
    A1UEBhMCQ04xCzAJBgNVBAgMAlNDMQswCQYDVQQHDAJDRDEPMA0GA1UECgwGTmV3
    ZWdnMQwwCgYDVQQLDANFREkxGDAWBgNVBAMMD0FTMiBDZXJ0aWZpY2F0ZTEeMBwG
    CSqGSIb3DQEJARYPdHIyOUBuZXdlZ2cuY29tAgkAtl4VWyGqGb4wDQYJKoZIhvcN
    AQEBBQAEggEAzzzLpEFOzQDULtCBBcoDLobNGXSPUfSI45uatdlnqrwh8EsG2qan
    Wbti6jMRIm6jvVX7u/lrI/gNK/zpWiMvg3VIgCN1vgPRE808Tx//EPXbyFH+ODGT
    n/n77he+krbKY7kFwv86udat2OjzMaGjeQpQ2ILW3YYsf+Ce0zCa/AA0IYQeiZVN
    G1ksb3kLstdYsU7hOi6OhgZlAYPZSe3zwnEjqe/uToOl8XedEkvmQvNbNbwEzJhB
    44h9O7WTABD8DBHydgPahrOWqmcAOdPRjHHyRSnsss9HY9dCFjLHjiWexSszYLAr
    5FgGcwITA+YSAMM3fujgFhJFAp1Z/xtQuDA7BgkqhkiG9w0BBwEwFAYIKoZIhvcN
    AwcECIa9BZlgtfVYgBh82ue/PhnoQ6/wrwekWNPOkVJN8kX2xPw=
    '''

        key_file_path = self.__get_cert_path('P1_private.pem')
        pass_phrase = ''

        SMIMEHelper.decrypt_from_text(encrypted_text, key_file_path, pass_phrase)

    '''
           decrypt Content-Type: application/x-pkcs7-mime; smime-type=enveloped-data
           pass_phrase failed
    '''

    @raises(Exception)
    def test_decrypt_private_key_without_ca_des_ede3_cbc_pass_phrase_failed(self):
        encrypted_text = '''MIME-Version: 1.0
    Content-Disposition: attachment; filename="smime.p7m"
    Content-Type: application/x-pkcs7-mime; smime-type=enveloped-data;
     name="smime.p7m"
    Content-Transfer-Encoding: base64

    MIICAgYJKoZIhvcNAQcDoIIB8zCCAe8CAQAxggGrMIIBpwIBADCBjjCBgDELMAkG
    A1UEBhMCQ04xCzAJBgNVBAgMAlNDMQswCQYDVQQHDAJDRDEPMA0GA1UECgwGTmV3
    ZWdnMQwwCgYDVQQLDANFREkxGDAWBgNVBAMMD0FTMiBDZXJ0aWZpY2F0ZTEeMBwG
    CSqGSIb3DQEJARYPdHIyOUBuZXdlZ2cuY29tAgkAtl4VWyGqGb4wDQYJKoZIhvcN
    AQEBBQAEggEAzzzLpEFOzQDULtCBBcoDLobNGXSPUfSI45uatdlnqrwh8EsG2qan
    Wbti6jMRIm6jvVX7u/lrI/gNK/zpWiMvg3VIgCN1vgPRE808Tx//EPXbyFH+ODGT
    n/n77he+krbKY7kFwv86udat2OjzMaGjeQpQ2ILW3YYsf+Ce0zCa/AA0IYQeiZVN
    G1ksb3kLstdYsU7hOi6OhgZlAYPZSe3zwnEjqe/uToOl8XedEkvmQvNbNbwEzJhB
    44h9O7WTABD8DBHydgPahrOWqmcAOdPRjHHyRSnsss9HY9dCFjLHjiWexSszYLAr
    5FgGcwITA+YSAMM3fujgFhJFAp1Z/xtQuDA7BgkqhkiG9w0BBwEwFAYIKoZIhvcN
    AwcECIa9BZlgtfVYgBh82ue/PhnoQ6/wrwekWNPOkVJN8kX2xPw=
    '''

        key_file_path = self.__get_cert_path('P1_private.pem')
        pass_phrase = '123'

        SMIMEHelper.decrypt_from_text(encrypted_text, key_file_path, pass_phrase)

    '''
       encrypt content with ca cert (alg: des_ede3_cbc)
    '''

    def test_encrypt_public_cert_with_ca_des_ede3_cbc(self):
        crt_path = self.__get_cert_path('mercury_ingrammicro_com.sha256.cer')
        alg = "des_ede3_cbc"

        rst = SMIMEHelper.encrypt_to_mime(self.clearText, crt_path, alg)

        assert_not_equal(None, rst._headers)
        assert_equal(('MIME-Version', '1.0'), rst._headers[0])

    '''
       mime to string
     '''

    def test_mime_to_string_public_cert_without_ca_des_ede3_cbc(self):
        crt_path = self.__get_cert_path('P1_public.cer')
        alg = "des_ede3_cbc"

        rst = SMIMEHelper.encrypt_to_mime(self.clearText, crt_path, alg)
        msg = SMIMEHelper.mime_to_string(rst, 0)

        assert_not_equal(None, msg)
        assert_equal(True, "MIME-Version" in msg)

    '''
       format mime string with (crlf)
    '''

    def test_format_with_cr_lf_public_cert_without_ca_des_ede3_cbc(self):
        crt_path = self.__get_cert_path('P1_public.cer')
        alg = "des_ede3_cbc"

        rst = SMIMEHelper.encrypt_to_mime(self.clearText, crt_path, alg)
        msg = SMIMEHelper.mime_to_string(rst)
        f_msg = SMIMEHelper.format_with_cr_lf(msg)

        assert_not_equal(msg, f_msg)
        assert_equal(True, "\r\n" in f_msg)

    '''
        sign message with sha-1
    '''

    def test_sign_private_cert_without_ca_sha_1(self):
        crt_path = self.__get_cert_path('P1_private.pem')
        pass_phrase = "123456"

        rst = SMIMEHelper.sign_to_mime_detached(self.clearText, crt_path, pass_phrase)

        assert_not_equal(None, rst)
        assert_equal('sha1', rst.get_param('micalg'))

    '''
        sign message (iso_8859_01) with sha-1
    '''

    def test_sign_private_cert_with_iso_8859_01_without_ca_sha_1(self):
        clearText = 'ISA¦00¦          ¦00¦          ¦16¦081940553PA10  ¦ZZ¦5626958823BVF  ¦170522¦1940¦U¦00401¦001038283¦0¦P¦`~'
        crt_path = self.__get_cert_path('P1_private.pem')
        pass_phrase = "123456"

        rst = SMIMEHelper.sign_to_mime_detached(clearText, crt_path, pass_phrase)

        assert_not_equal(None, rst)
        assert_equal('sha1', rst.get_param('micalg'))

    '''
        sign message (china) with sha-1
    '''

    def test_sign_private_cert_with_china_without_ca_sha_1(self):
        clearText = '测试文件'
        crt_path = self.__get_cert_path('P1_private.pem')
        pass_phrase = "123456"

        rst = SMIMEHelper.sign_to_mime_detached(clearText, crt_path, pass_phrase)

        assert_not_equal(None, rst)
        assert_equal('sha1', rst.get_param('micalg'))

    '''
        sign message (china-unicode) with sha-1
    '''

    def test_sign_private_cert_with_china_unicode_without_ca_sha_1(self):
        clearText = u'测试文件'
        clearText = clearText.encode('utf-8')

        crt_path = self.__get_cert_path('P1_private.pem')
        pass_phrase = "123456"

        rst = SMIMEHelper.sign_to_mime_detached(clearText, crt_path, pass_phrase)

        assert_not_equal(None, rst)
        assert_equal('sha1', rst.get_param('micalg'))

    '''
       (CA Cert) sign message with sha-1
    '''

    def test_sign_private_cert_with_ca_sha_1(self):
        crt_path = self.__get_cert_path('edi04_with_ca.pem')
        pass_phrase = "newegg@123"

        rst = SMIMEHelper.sign_to_mime_detached(self.clearText, crt_path, pass_phrase)

        assert_not_equal(None, rst)
        assert_equal('sha1', rst.get_param('micalg'))

    '''
    Get Signature from signed detached mime message
    '''

    def test_get_signature_from_mime_default(self):
        crt_path = self.__get_cert_path('edi04_with_ca.pem')
        pass_phrase = "newegg@123"

        rst = SMIMEHelper.sign_to_mime_detached(self.clearText, crt_path, pass_phrase)

        signature = SMIMEHelper.get_signature_from_mime(rst)

        assert_not_equal(None, signature)
        assert_equal(True, "Content-Disposition" in signature)
        assert_equal(True, "Content-Type" in signature)

    '''
    Get Signature from signed detached mime message (Override)
    '''

    def test_get_signature_from_mime_Override(self):
        crt_path = self.__get_cert_path('edi04_with_ca.pem')
        pass_phrase = "newegg@123"

        rst = SMIMEHelper.sign_to_mime_detached(self.clearText, crt_path, pass_phrase)

        signature = SMIMEHelper.get_signature_from_mime(rst, True, 'application/x-pkcs7-signature')

        assert_not_equal(None, signature)
        assert_equal(True, "Content-Disposition" in signature)
        assert_equal(True, "Content-Type" in signature)

    '''
    Get Signature from signed detached mime message (Override)
    '''

    def test_get_signature_from_mime_without_Override(self):
        crt_path = self.__get_cert_path('edi04_with_ca.pem')
        pass_phrase = "newegg@123"

        rst = SMIMEHelper.sign_to_mime_detached(self.clearText, crt_path, pass_phrase)

        signature = SMIMEHelper.get_signature_from_mime(rst, False, 'application/pkcs7-signature')

        assert_not_equal(None, signature)
        assert_equal(True, "Content-Disposition" in signature)
        assert_equal(True, "Content-Type" in signature)

    '''
        sign message with sha-256
    '''

    def test_sign_private_cert_without_ca_sha_256(self):
        crt_path = u'' + self.__get_cert_path('P1_private.pem')
        pass_phrase = u"123456"
        alg = u'sha256'

        rst = SMIMEHelper.sign_to_mime_detached(self.clearText, crt_path, pass_phrase, alg)

        assert_not_equal(None, rst)
        assert_equal('sha-256', rst.get_param('micalg'))

    '''
        sign message with sha-512
    '''

    def test_sign_private_cert_without_ca_sha_512(self):
        crt_path = self.__get_cert_path('P1_private.pem')
        pass_phrase = "123456"
        alg = 'sha512'

        rst = SMIMEHelper.sign_to_mime_detached(self.clearText, crt_path, pass_phrase, alg)

        assert_not_equal(None, rst)
        assert_equal('sha-512', rst.get_param('micalg'))

    '''
        sign message with md5
    '''

    def test_sign_private_cert_without_ca_md5(self):
        crt_path = self.__get_cert_path('P1_private.pem')
        pass_phrase = "123456"
        alg = 'md5'

        rst = SMIMEHelper.sign_to_mime_detached(self.clearText, crt_path, pass_phrase, alg)

        assert_not_equal(None, rst)
        assert_equal('md5', rst.get_param('micalg'))

    '''
        raise error when pass_phrase not supply
    '''

    @raises(Exception)
    def test_sign_private_cert_without_ca_md5_pass_phrase_is_none(self):
        crt_path = self.__get_cert_path('P1_private.pem')
        pass_phrase = None
        alg = 'md5'

        SMIMEHelper.sign_to_mime_detached(self.clearText, crt_path, pass_phrase, alg)

    '''
        raise error when pass_phrase not supply
    '''

    @raises(Exception)
    def test_sign_private_cert_without_ca_md5_pass_phrase_is_empty(self):
        crt_path = self.__get_cert_path('P1_private.pem')
        pass_phrase = ''
        alg = 'md5'

        SMIMEHelper.sign_to_mime_detached(self.clearText, crt_path, pass_phrase, alg)

    '''
        raise error when pass_phrase not supply
    '''

    @raises(Exception)
    def test_sign_private_cert_without_ca_md5_pass_phrase_is_error(self):
        crt_path = self.__get_cert_path('P1_private.pem')
        pass_phrase = "123"
        alg = 'md5'

        SMIMEHelper.sign_to_mime_detached(self.clearText, crt_path, pass_phrase, alg)

    '''
        verify  multipart/signed; protocol="application/pkcs7-signature"; micalg="sha1";
    '''

    def test_verify_mdn_multipart_signed_text_without_ca(self):
        signed_msg = '''message-id: <MOKOavlb2bapp02-node1-15d249455c2-1450468007ScanSourcePRD@avlb2bapp02>
Content-Type: multipart/signed;protocol="application/pkcs7-signature";micalg=sha1;boundary="_=32151894939666303Sterling32151894939666303MOKO"

--_=32151894939666303Sterling32151894939666303MOKO
Content-Type: multipart/report;Report-Type=disposition-notification;boundary="_=6597787784037321Sterling6597787784037321MOKO"

--_=6597787784037321Sterling6597787784037321MOKO

Your message was successfully received and processed.

--_=6597787784037321Sterling6597787784037321MOKO
Content-Type: message/disposition-notification

Original-Recipient: rfc822;ScanSourcePRD
Final-Recipient: rfc822;ScanSourcePRD
Original-Message-ID: <5787E1CB-1471-4262-BD68-1E06F3D5AE28@tr29-VirtualBox>
Received-Content-MIC: 9mVaiezSK13edeEvNeXcRMIS4YQ=,sha1
Disposition: Automatic-action/mdn-sent-automatically;processed

--_=6597787784037321Sterling6597787784037321MOKO--

--_=32151894939666303Sterling32151894939666303MOKO
Content-Type: Application/pkcs7-signature;name=EDIINTSIG.p7s
Content-Transfer-Encoding: base64

MIIIHgYJKoZIhvcNAQcCoIIIDzCCCAsCAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHAaCCBmcw
ggZjMIIFS6ADAgECAhBfmdlsShevBcAkKDoJXbq9MA0GCSqGSIb3DQEBCwUAMEQxCzAJBgNVBAYT
AlVTMRYwFAYDVQQKEw1HZW9UcnVzdCBJbmMuMR0wGwYDVQQDExRHZW9UcnVzdCBTU0wgQ0EgLSBH
MzAeFw0xNjA4MDEwMDAwMDBaFw0xODA4MTcyMzU5NTlaMG0xCzAJBgNVBAYTAlVTMRcwFQYDVQQI
DA5Tb3V0aCBDYXJvbGluYTETMBEGA1UEBwwKR3JlZW52aWxsZTETMBEGA1UECgwKU2NhblNvdXJj
ZTEbMBkGA1UEAwwSYjJiLnNjYW5zb3VyY2UuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
CgKCAQEApwghg+IJ36HDfedTdRi0CRfEFsD6KmCG+t0g33LAEcV0NjWN+xmJOwEII63dFiJnPL65
lrMHP8bS2vWjVENbPv6FDxa0izAdbcumaNRGjawEe9tuLyvA1f5zLpVnN2mO2nhJWfM4ObNMqq4v
eurRh2ExefnYKE3cUbutAVxdtSdau4Jjy0OvsZlK/XLMh4/AouY3ANINlo6l+zqYmFJsatiqdXDE
b3JvzE3yuCF999exbD9ab6UVIZ+FHHKNxB7UCgUljv00TRxHeN/TPJV8At67Wgee6kmvyuoDVJ8k
kbbaRpUyyLenWpV0fOM8zaLIs4lKkeESqTz+omAgoVWhCQIDAQABo4IDJjCCAyIwHQYDVR0RBBYw
FIISYjJiLnNjYW5zb3VyY2UuY29tMAkGA1UdEwQCMAAwDgYDVR0PAQH/BAQDAgWgMCsGA1UdHwQk
MCIwIKAeoByGGmh0dHA6Ly9nbi5zeW1jYi5jb20vZ24uY3JsMIGdBgNVHSAEgZUwgZIwgY8GBmeB
DAECAjCBhDA/BggrBgEFBQcCARYzaHR0cHM6Ly93d3cuZ2VvdHJ1c3QuY29tL3Jlc291cmNlcy9y
ZXBvc2l0b3J5L2xlZ2FsMEEGCCsGAQUFBwICMDUMM2h0dHBzOi8vd3d3Lmdlb3RydXN0LmNvbS9y
ZXNvdXJjZXMvcmVwb3NpdG9yeS9sZWdhbDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIw
HwYDVR0jBBgwFoAU0m/3lvSFP3I8MH0j2oV4m6N8WnwwVwYIKwYBBQUHAQEESzBJMB8GCCsGAQUF
BzABhhNodHRwOi8vZ24uc3ltY2QuY29tMCYGCCsGAQUFBzAChhpodHRwOi8vZ24uc3ltY2IuY29t
L2duLmNydDCCAX4GCisGAQQB1nkCBAIEggFuBIIBagFoAHYA3esdK3oNT6Ygi4GtgWhwfi6OnQHV
XIiNPRHEzbbsvswAAAFWR57TPwAABAMARzBFAiEAmboDpI/sNfpZH2JrJ5vOpKSco57LtHggr3rY
8Ru++VoCIB+GiozlPBOjT60ZGg9SEAYqePaDLiw/rW6lRW0B3xYjAHYApLkJkLQYWBSHuxOizGdw
Cjw1mAT5G9+443fNDsgN3BAAAAFWR57T5AAABAMARzBFAiEAisqkoq2XvdChPcvZjYaltl2nta7A
OVPEj+KlBpYsiMQCIGdXH4ohiVPRo9fSGrWWucs+t2NcaHoVHsRG04XXCkjfAHYAaPaY+B9kgr46
jO65KB1M/HFRXWeT1ETRCmesu09P+8QAAAFWR57T5gAABAMARzBFAiB8Z/fKljEg29Pw/e3T+oJn
38RhZEUcLDYKK1z+Xa4uGgIhAIV5Mw0a7CdwsQLfxYxZvCUlcCArsg8aZNsfOYOsgWaxMA0GCSqG
SIb3DQEBCwUAA4IBAQA9sbdzznGxTvuQMCMj7/LVuV6n9/nAt19dUcv8yWQZAC31hO0eQ6p0UE9I
I7YnjcnDmdWeLk8T0VzUO7vNU09InoMVKVald697kW7Wii3pSXHE56pZJbGrKKgtqLaMsBBhti+j
lT2Y3I2B4dNlpM6uQhf9anEc9eaN++bVnem8vndiT9OK8NItDrjRGtOlqPR8f0+6D+42wx8jQ/p/
lHvTtN/+ogSStUtXfvLErrsG0iDtzV4M5ihSo8uqn6Gj3tP+qePvFTwz0MUSZ8G0gm68xnD/MWMm
hbQRw+4DlDzU9y5fUQumFQHJQ/EL2whP0YlTgshuoayqogLqQY7kSCxCMYIBfzCCAXsCAQEwWDBE
MQswCQYDVQQGEwJVUzEWMBQGA1UEChMNR2VvVHJ1c3QgSW5jLjEdMBsGA1UEAxMUR2VvVHJ1c3Qg
U1NMIENBIC0gRzMCEF+Z2WxKF68FwCQoOgldur0wCQYFKw4DAhoFADANBgkqhkiG9w0BAQEFAASC
AQAFzW995IHYSfrYAlQbUkkCCQE5ewD+oQ1NUNsaMkxpFfmfNKcf/1xGImHBZiS70WbibR1/0REq
e1vDxVPwFXjGZeu+vMC1hSYpB7+i1ryJH5IQqcUcch+/KmYprEvV30xstwi1lt4M/uqO0Wmjoq+j
BZy6whjyXfxdoqlNdR+Cfj748Awo2VBOFUvbKQc8nuE1Nx7N03cu4PKeCad4z9eEMLULysBLNz1L
RqGb0+IJTT1lvLJc7YLBk2+EVnfoyZJy02HlVc/6ETaKI1DhhSoUh9p21vnZIZN9azo6h34MFxhn
x7bKm3h7pv/rnq/MuteNVqjpTk6/aQhzhjjZRueI
--_=32151894939666303Sterling32151894939666303MOKO--
    '''

        s = email.message_from_string(signed_msg)
        # email parse issue fixed
        for m in s.walk():
            if m.get_content_type() == 'message/disposition-notification':
                disposition = m.get_payload()
                if isinstance(disposition, (list, tuple)) and len(disposition) == 1:
                    notify = disposition[0]
                    notify_body = notify.get_payload()
                    if notify_body is None or notify_body == '':
                        m.set_payload(notify.as_string(unixfrom=False)[:-1])

        f_signed_msg = SMIMEHelper.format_with_cr_lf(s.as_string(unixfrom=False))
        crt_path = self.__get_cert_path('ScanSource_public.cer')
        ca_crt_path = self.__get_cert_path('ScanSource_CA_Cert_Chain.crt')
        is_verify_cert = False

        rst = SMIMEHelper.verify_signed_text(f_signed_msg, crt_path, ca_crt_path, is_verify_cert)

        assert_not_equal('', rst.strip())

    '''
        verify  multipart/signed; protocol="application/x-pkcs7-signature"; micalg="sha1";
    '''

    def test_verify_multipart_signed_text_without_ca(self):
        signed_msg = '''MIME-Version: 1.0
Content-Type: multipart/signed; protocol="application/x-pkcs7-signature";
 micalg="sha1"; boundary="----E67033C32AF07C4C5BE242D36DB48F2F"

This is an S/MIME signed message

------E67033C32AF07C4C5BE242D36DB48F2F

This is test message.
------E67033C32AF07C4C5BE242D36DB48F2F
Content-Type: application/x-pkcs7-signature; name="smime.p7s"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="smime.p7s"

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
LrhHEL4SK7yeHG0bSM/D+t4EzgRohA==

------E67033C32AF07C4C5BE242D36DB48F2F--
'''
        f_signed_msg = SMIMEHelper.format_with_cr_lf(signed_msg)
        crt_path = self.__get_cert_path('P1_public.cer')
        ca_crt_path = self.__get_cert_path('P1_public.cer')
        is_verify_cert = True

        rst = SMIMEHelper.verify_signed_text(f_signed_msg, crt_path, ca_crt_path, is_verify_cert)

        assert_equal(self.clearText, rst.strip())

    '''
       (CA Cert)  verify  multipart/signed; protocol="application/x-pkcs7-signature"; micalg="sha1";
    '''

    def test_verify_multipart_signed_text_with_ca(self):
        signed_msg = '''MIME-Version: 1.0
Content-Type: multipart/signed; protocol="application/x-pkcs7-signature";
 micalg="sha1"; boundary="----61FD602D4D31C5FCAE3D9C6C0E9789D2"

This is an S/MIME signed message

------61FD602D4D31C5FCAE3D9C6C0E9789D2
This is test message.
------61FD602D4D31C5FCAE3D9C6C0E9789D2
Content-Type: application/x-pkcs7-signature; name="smime.p7s"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="smime.p7s"

MIIIPwYJKoZIhvcNAQcCoIIIMDCCCCwCAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3
DQEHAaCCBTUwggUxMIIEGaADAgECAhAecXgg/TkHXQAAAABQ3DVzMA0GCSqGSIb3
DQEBCwUAMIG6MQswCQYDVQQGEwJVUzEWMBQGA1UEChMNRW50cnVzdCwgSW5jLjEo
MCYGA1UECxMfU2VlIHd3dy5lbnRydXN0Lm5ldC9sZWdhbC10ZXJtczE5MDcGA1UE
CxMwKGMpIDIwMTIgRW50cnVzdCwgSW5jLiAtIGZvciBhdXRob3JpemVkIHVzZSBv
bmx5MS4wLAYDVQQDEyVFbnRydXN0IENlcnRpZmljYXRpb24gQXV0aG9yaXR5IC0g
TDFLMB4XDTE3MDQxNDAwMTAxOVoXDTIwMDUwMjAwNDAxOFowbTELMAkGA1UEBhMC
VVMxEzARBgNVBAgTCkNhbGlmb3JuaWExGTAXBgNVBAcTEENpdHkgb2YgSW5kdXN0
cnkxEzARBgNVBAoTCk5ld2VnZyBJbmMxGTAXBgNVBAMTEGVkaTA0Lm5ld2VnZy5j
b20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/UKcNeFVX30ZANlx6
ElFDGDVGfV0s/qWOduQxsP6WRm4J93vYe2sYngAyM+r+P5IOVbC9VyA6GBeC2yzl
xLwV5eA50BfmpPRLEj+s86J8jV3yxs2NCku/kZqls/GvlpS78LWD51yhX8uoXvk+
4sHpt2xB83Ok5sGiSiq5I97gOsUwQc8ASsW6Ha5VTFymZu6dU7hTzgS0DSQwcNcA
G+fLHlMvAVfa0eW5y+bnFgXr15w/sfDigP1aAMb0oEeCKPLe2GDwJ6Av/M3GThI4
r6ZOLG9IDqt2dmJ5rcqeERfWZy3I7mtaWMEEeV7Cmy5M1KUvLPXWHbV4BcXiRcIH
C4DxAgMBAAGjggF9MIIBeTAOBgNVHQ8BAf8EBAMCBaAwEwYDVR0lBAwwCgYIKwYB
BQUHAwEwMwYDVR0fBCwwKjAooCagJIYiaHR0cDovL2NybC5lbnRydXN0Lm5ldC9s
ZXZlbDFrLmNybDBLBgNVHSAERDBCMDYGCmCGSAGG+mwKAQUwKDAmBggrBgEFBQcC
ARYaaHR0cDovL3d3dy5lbnRydXN0Lm5ldC9ycGEwCAYGZ4EMAQICMGgGCCsGAQUF
BwEBBFwwWjAjBggrBgEFBQcwAYYXaHR0cDovL29jc3AuZW50cnVzdC5uZXQwMwYI
KwYBBQUHMAKGJ2h0dHA6Ly9haWEuZW50cnVzdC5uZXQvbDFrLWNoYWluMjU2LmNl
cjAbBgNVHREEFDASghBlZGkwNC5uZXdlZ2cuY29tMB8GA1UdIwQYMBaAFIKicHTd
vFM/z3vU981/p2DGCky/MB0GA1UdDgQWBBSZd46F1MFczOuEYHhlf12dRxQPSjAJ
BgNVHRMEAjAAMA0GCSqGSIb3DQEBCwUAA4IBAQC2w2bTD/R7UNsJWQFqkiT4kcNp
/EJOeSPwoOVOM7FhBPcnM+vupB4CIlOHDLHBjWTFi1HClk8hiOwwO0kDgE5jI22a
xIibOICBoP4ydE6z6jolBJ72uqkFAo+jBLbg30fhKDb94rvNJB0DJ9RnTKPk24wr
5WyOyS7IEypdsp2qVSRu9C0qJrQK93N6RCqu4pURjyNrM52F0/wIjAqCgqx2n1+q
JzZvE4tcDdhfMYvylzH2Fegm6ADBtSaUSgIkIgfCGNxwFlDJr1w9aJwCIFwXlPNZ
HoacVC1xoRThkE+nctF96mOUqwta7x4c2MHn9oL6DNERieE2v+WowjyNAl/PMYIC
0jCCAs4CAQEwgc8wgboxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1FbnRydXN0LCBJ
bmMuMSgwJgYDVQQLEx9TZWUgd3d3LmVudHJ1c3QubmV0L2xlZ2FsLXRlcm1zMTkw
NwYDVQQLEzAoYykgMjAxMiBFbnRydXN0LCBJbmMuIC0gZm9yIGF1dGhvcml6ZWQg
dXNlIG9ubHkxLjAsBgNVBAMTJUVudHJ1c3QgQ2VydGlmaWNhdGlvbiBBdXRob3Jp
dHkgLSBMMUsCEB5xeCD9OQddAAAAAFDcNXMwCQYFKw4DAhoFAKCB2DAYBgkqhkiG
9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqGSIb3DQEJBTEPFw0xNzA1MDIwNzQ1NDJa
MCMGCSqGSIb3DQEJBDEWBBRNsmMYSxgjQ0t0wpH7Tcmeo4A0kjB5BgkqhkiG9w0B
CQ8xbDBqMAsGCWCGSAFlAwQBKjALBglghkgBZQMEARYwCwYJYIZIAWUDBAECMAoG
CCqGSIb3DQMHMA4GCCqGSIb3DQMCAgIAgDANBggqhkiG9w0DAgIBQDAHBgUrDgMC
BzANBggqhkiG9w0DAgIBKDANBgkqhkiG9w0BAQEFAASCAQBg5QsXfa4s5DTWp2AU
Kprt+29YC+ahlmf6uh7DxS0Jr7RBdo6NLNLZV/X99Y7NHlfZsURfCwBDDg1QJK+J
KC3lbopHmPfVmbDqLWKfOcKMoy3yFw6sGqAKqaqIAFcxCGeLFg/b1dSwawdrygj7
LjyT6DVbjfs/as7YRMWvuz3Y+zQoGzBWS5aU5yALnM1M3s2y01A5ZxIbe7TqzpAv
QKpyMt9d/P22ryAQRABxi5VhG+BRcCLuMFBlTaTv0ZGbdEz/+G7c2Cp9RuULT5K8
V6Nr5D2Y9ek9YCMrC8F4iBL9nviLp+L76qTx2xYDyqOBx0sfxZD83zAvRqGOWzUU
25bW

------61FD602D4D31C5FCAE3D9C6C0E9789D2--
'''
        f_signed_msg = SMIMEHelper.format_with_cr_lf(signed_msg)
        crt_path = self.__get_cert_path('edi04_with_ca.crt')
        ca_crt_path = self.__get_cert_path('edi04_ca_cert_chain.crt')
        is_verify_cert = False

        rst = SMIMEHelper.verify_signed_text(f_signed_msg, crt_path, ca_crt_path, is_verify_cert)

        assert_equal(self.clearText, rst.strip())

    '''
        verify application/x-pkcs7-mime; smime-type=signed-data;
    '''

    def test_verify_signed_data_without_ca(self):
        signed_msg = '''MIME-Version: 1.0
Content-Disposition: attachment; filename="smime.p7m"
Content-Type: application/x-pkcs7-mime; smime-type=signed-data; name="smime.p7m"
Content-Transfer-Encoding: base64

MIIKqwYJKoZIhvcNAQcCoIIKnDCCCpgCAQExDzANBglghkgBZQMEAgEFADAnBgkq
hkiG9w0BBwGgGgQYVGhpcyBpcyB0ZXN0IG1lc3NhZ2UuIA0KoIIHsjCCA9UwggK9
oAMCAQICCQC2XhVbIaoZvjANBgkqhkiG9w0BAQsFADCBgDELMAkGA1UEBhMCQ04x
CzAJBgNVBAgMAlNDMQswCQYDVQQHDAJDRDEPMA0GA1UECgwGTmV3ZWdnMQwwCgYD
VQQLDANFREkxGDAWBgNVBAMMD0FTMiBDZXJ0aWZpY2F0ZTEeMBwGCSqGSIb3DQEJ
ARYPdHIyOUBuZXdlZ2cuY29tMB4XDTE3MDMyODA5Mzc1NloXDTE4MDMyODA5Mzc1
NlowgYAxCzAJBgNVBAYTAkNOMQswCQYDVQQIDAJTQzELMAkGA1UEBwwCQ0QxDzAN
BgNVBAoMBk5ld2VnZzEMMAoGA1UECwwDRURJMRgwFgYDVQQDDA9BUzIgQ2VydGlm
aWNhdGUxHjAcBgkqhkiG9w0BCQEWD3RyMjlAbmV3ZWdnLmNvbTCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBANmjQYcuDWY3E/2vhyazv3PqI6VoalRg1ESH
5BouIRW7TB9yCB4O7gWuWNfSR+JnECUZDzDaTZxoY5Hb90MAfBdTzMZzH61nMJdZ
vf3P86QyuV0MTw+N0E/u2yuOwZAbNM6xAjd78hJNoQsMj+UCv5cnRhPtLE0H5j+X
4VRlPEVPwGZaKAB7EAZJZQj6vGkMA0ib3OhwH/osjWtMGZXxqaA6HeeHNBAGIU++
gIo9V60isr1XgjuRsdAjtedxZO0ptvgprAlZ+xsctnFiEpNykevvbyHnLrYp7nEP
ijCZz72AlqFQOUxNa1RrETNj4pROXj77zfynvKBTF0hD7hIVmrUCAwEAAaNQME4w
HQYDVR0OBBYEFLDWAwHDmOVAN++FDMygl9kIyUNIMB8GA1UdIwQYMBaAFLDWAwHD
mOVAN++FDMygl9kIyUNIMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEB
ALo3U+fAhvV8nZMX5n6BeCDfLuD8WiD1PZG/rqoZFp9yOPP2cuPSN6Jh7TO+85ho
/7eY17tZwTgPAX7+dq+Np0HbRTRcLiqDLG3dy9sQMZNqPVuEamIzopOfRt1Q3wh2
xCqHx8yeC368ueIrPQRdvZfDCVq5wBT8CR+zn73WC728ZlmKoeG6JChpttb/93Xa
CPYSRkVvcB2UtBzAHzUdReCLP+7l26rSWvSv2Pm8fU1vlch6ikC+Bazw61zukxh+
bqx1K4Y7gXtT9B0aYWxu1tcTeMMIEc69D6jX2qnC3ay1S/5s0wzlPK4618IAET+g
FYEsHAdihG2FElL1tRNxafwwggPVMIICvaADAgECAgkAtl4VWyGqGb4wDQYJKoZI
hvcNAQELBQAwgYAxCzAJBgNVBAYTAkNOMQswCQYDVQQIDAJTQzELMAkGA1UEBwwC
Q0QxDzANBgNVBAoMBk5ld2VnZzEMMAoGA1UECwwDRURJMRgwFgYDVQQDDA9BUzIg
Q2VydGlmaWNhdGUxHjAcBgkqhkiG9w0BCQEWD3RyMjlAbmV3ZWdnLmNvbTAeFw0x
NzAzMjgwOTM3NTZaFw0xODAzMjgwOTM3NTZaMIGAMQswCQYDVQQGEwJDTjELMAkG
A1UECAwCU0MxCzAJBgNVBAcMAkNEMQ8wDQYDVQQKDAZOZXdlZ2cxDDAKBgNVBAsM
A0VESTEYMBYGA1UEAwwPQVMyIENlcnRpZmljYXRlMR4wHAYJKoZIhvcNAQkBFg90
cjI5QG5ld2VnZy5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDZ
o0GHLg1mNxP9r4cms79z6iOlaGpUYNREh+QaLiEVu0wfcggeDu4FrljX0kfiZxAl
GQ8w2k2caGOR2/dDAHwXU8zGcx+tZzCXWb39z/OkMrldDE8PjdBP7tsrjsGQGzTO
sQI3e/ISTaELDI/lAr+XJ0YT7SxNB+Y/l+FUZTxFT8BmWigAexAGSWUI+rxpDANI
m9zocB/6LI1rTBmV8amgOh3nhzQQBiFPvoCKPVetIrK9V4I7kbHQI7XncWTtKbb4
KawJWfsbHLZxYhKTcpHr728h5y62Ke5xD4owmc+9gJahUDlMTWtUaxEzY+KUTl4+
+838p7ygUxdIQ+4SFZq1AgMBAAGjUDBOMB0GA1UdDgQWBBSw1gMBw5jlQDfvhQzM
oJfZCMlDSDAfBgNVHSMEGDAWgBSw1gMBw5jlQDfvhQzMoJfZCMlDSDAMBgNVHRME
BTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQC6N1PnwIb1fJ2TF+Z+gXgg3y7g/Fog
9T2Rv66qGRafcjjz9nLj0jeiYe0zvvOYaP+3mNe7WcE4DwF+/navjadB20U0XC4q
gyxt3cvbEDGTaj1bhGpiM6KTn0bdUN8IdsQqh8fMngt+vLniKz0EXb2XwwlaucAU
/Akfs5+91gu9vGZZiqHhuiQoabbW//d12gj2EkZFb3AdlLQcwB81HUXgiz/u5duq
0lr0r9j5vH1Nb5XIeopAvgWs8Otc7pMYfm6sdSuGO4F7U/QdGmFsbtbXE3jDCBHO
vQ+o19qpwt2stUv+bNMM5TyuOtfCABE/oBWBLBwHYoRthRJS9bUTcWn8MYICoTCC
Ap0CAQEwgY4wgYAxCzAJBgNVBAYTAkNOMQswCQYDVQQIDAJTQzELMAkGA1UEBwwC
Q0QxDzANBgNVBAoMBk5ld2VnZzEMMAoGA1UECwwDRURJMRgwFgYDVQQDDA9BUzIg
Q2VydGlmaWNhdGUxHjAcBgkqhkiG9w0BCQEWD3RyMjlAbmV3ZWdnLmNvbQIJALZe
FVshqhm+MA0GCWCGSAFlAwQCAQUAoIHkMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0B
BwEwHAYJKoZIhvcNAQkFMQ8XDTE3MDQyNzA4NDgwM1owLwYJKoZIhvcNAQkEMSIE
IH7HFu9Vg2a65GnbbfbJXxZA3v/uZ1JEfknhNXYAeFgAMHkGCSqGSIb3DQEJDzFs
MGowCwYJYIZIAWUDBAEqMAsGCWCGSAFlAwQBFjALBglghkgBZQMEAQIwCgYIKoZI
hvcNAwcwDgYIKoZIhvcNAwICAgCAMA0GCCqGSIb3DQMCAgFAMAcGBSsOAwIHMA0G
CCqGSIb3DQMCAgEoMA0GCSqGSIb3DQEBAQUABIIBAKw+XraBkJ71sdUjyitSpeLE
lnorlkIeXqJo3KYaTqCaeR49GddkWFje1CpHnlHPCvI2JyC98W9PdKnP70cjIGDc
2V2rM3VD/cFvXjMbYIRB7gsTD1QmZPivXNQTSoTPYcuzLgxMYQIzROTWN9Ex5tLQ
+IO4zRfVwjK6BsQPunLtPLBjZ0ibzPglGvU6nctj9QKaGSo6MtfX7zd3qF2Ufk2w
Fr34/9qPnWHzvNAdTNjP9BNpFEBn4VTSv0LYGnjBKmV6pSk7gkL5Rna6H5fEQ2aD
1kAYa9en++gdVyhBZ/q76baX/rivop7N2fgkkxasGlru4aJK/8P1JdbGDFDGtDA=

'''
        f_signed_msg = SMIMEHelper.format_with_cr_lf(signed_msg)
        crt_path = self.__get_cert_path('P1_public.cer')
        ca_crt_path = self.__get_cert_path('P1_public.cer')
        is_verify_cert = True

        rst = SMIMEHelper.verify_signed_text(f_signed_msg, crt_path, ca_crt_path, is_verify_cert)

        assert_equal(self.clearText, rst.strip())

    '''
        verify application/x-pkcs7-mime; smime-type=signed-data;
        no_verify_cert
    '''

    def test_verify_signed_data_no_verify_cert_without_ca(self):
        signed_msg = '''MIME-Version: 1.0
Content-Disposition: attachment; filename="smime.p7m"
Content-Type: application/x-pkcs7-mime; smime-type=signed-data; name="smime.p7m"
Content-Transfer-Encoding: base64

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
uxtwCuo/x84=

'''
        f_signed_msg = SMIMEHelper.format_with_cr_lf(signed_msg)
        crt_path = self.__get_cert_path('P1_public.cer')
        ca_crt_path = self.__get_cert_path('P1_public.cer')
        is_verify_cert = False

        rst = SMIMEHelper.verify_signed_text(f_signed_msg, crt_path, ca_crt_path, is_verify_cert)

        assert_equal(self.clearText, rst.strip())
