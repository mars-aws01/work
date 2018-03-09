# -*- coding: utf-8 -*-

from nose.tools import (assert_equal, assert_not_equal, raises)
from ngas2.models.agreement import (MdnMode)
from ngas2.models.msg import (StatusType, AS2MessageMdn)
from ngas2.protocol.exception import AS2MdnException
from ngas2.protocol.mdn import (MdnDecoder, MdnEncoder)
from tests.protocol import ProtocolTestBase

'''
test mdn decoder
'''


class TestMdnDecoder(ProtocolTestBase):
    @staticmethod
    def _get_mdn_header(content_type):
        headers = {
            'AS2-From': 'Newegg',
            'AS2-To': 'pyas2_01',
            'AS2-Version': '1.2',
            'Content-Type': content_type,
            'Date': 'Tue, 23 May 2017 01:38:30 GMT',
            'EDIINT-Features': 'multiple-attachments',
            'Message-ID': '<WCMIS241_4DF41F2B-A065-41B5-8689-E50D439A1594>',
            'Mime-Version': '1.0',
            'Server': 'Microsoft-IIS/10.0',
            'X-Powered-By': 'ASP.NET'
        }

        return headers

    '''
    verify signed message
    '''

    def test_verify_signed_message(self):
        headers = TestMdnDecoder._get_mdn_header(
            'multipart/signed; protocol="application/pkcs7-signature"; micalg="sha1"; boundary="_9B404EA6-32F6-4579-81C7-39270EDBD1E3_"')

        body = '''--_9B404EA6-32F6-4579-81C7-39270EDBD1E3_
Content-Type: multipart/report; report-type=disposition-notification;
	boundary="_7CD5ADE5-1AF2-4EF6-9150-B3C535C9738A_"

--_7CD5ADE5-1AF2-4EF6-9150-B3C535C9738A_
Content-Type: text/plain
Content-Transfer-Encoding: binary
Content-ID: {76690652-9237-4EAD-8FE3-A6A7B33979B9}
Content-Description: plain

receive from newegg (wcmis241) ok
--_7CD5ADE5-1AF2-4EF6-9150-B3C535C9738A_
Content-Type: message/disposition-notification
Content-Transfer-Encoding: 7bit
Content-ID: {E1C9732B-7C0A-4437-A728-BECD146ACF43}
Content-Description: body

Final-Recipient: rfc822; Newegg
Original-Message-ID: <20170511082601.15669.66568@tr29-Ubuntu>
Disposition: automatic-action/MDN-sent-automatically; processed
Received-Content-MIC: SGr2JzzMLWhiIorVZ6tMY7weJ8o=, sha1

--_7CD5ADE5-1AF2-4EF6-9150-B3C535C9738A_--

--_9B404EA6-32F6-4579-81C7-39270EDBD1E3_
Content-type: application/pkcs7-signature; name="smime.p7s"
Content-Transfer-Encoding: base64

MIAGCSqGSIb3DQEHAqCAMIACAQExCzAJBgUrDgMCGgUAMIAGCSqGSIb3DQEHAQAAoIIDGDCCAxQw
ggJ9oAMCAQICCQDUimz/JtYY8jANBgkqhkiG9w0BAQUFADCBojELMAkGA1UEBhMCVVMxCzAJBgNV
BAgMAkNBMREwDwYDVQQHDAhXaGl0dGllcjEXMBUGA1UECgwOTmV3ZWdnLmNvbSBJbmMxDDAKBgNV
BAsMA0VESTEjMCEGA1UEAwwaQVMyLlNlbGZUZXN0aW5nLk5ld2VnZy5jb20xJzAlBgkqhkiG9w0B
CQEWGHN1cHBvcnRtaXNlZGlAbmV3ZWdnLmNvbTAeFw0xNTA4MjIwMjQwNThaFw0yMDA4MjAwMjQw
NThaMIGiMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExETAPBgNVBAcMCFdoaXR0aWVyMRcwFQYD
VQQKDA5OZXdlZ2cuY29tIEluYzEMMAoGA1UECwwDRURJMSMwIQYDVQQDDBpBUzIuU2VsZlRlc3Rp
bmcuTmV3ZWdnLmNvbTEnMCUGCSqGSIb3DQEJARYYc3VwcG9ydG1pc2VkaUBuZXdlZ2cuY29tMIGf
MA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+82LebAq/ccKwQaQBYmsPjT2W/W45Duu9mHTnn1DQ
zyxaEyihpx/BqFDDCV/BhvWSM0eaCP5HlnoaluAAlEg6J6mUedaGmVw3LxX4JDCLk9KMz4S57jdx
8rH0HY7N2jH7QNM0Jx5Dum9VDa5qB3k/foUFYW0H5NT2tFLGj6052QIDAQABo1AwTjAdBgNVHQ4E
FgQUZnICFolCDgCDHjv5TyXlZafEUYQwHwYDVR0jBBgwFoAUZnICFolCDgCDHjv5TyXlZafEUYQw
DAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOBgQCPsJqIh6tJDiDxE7CkK2Y4qXYLB8tj5jfW
Of0pq9YRB/fyXWVNRNOIs/ict1tvuW3nhnWfAp1Yin+L6uxG4uZKazOYmxE3spkEIoLLXhLqQ++k
V9GUphk2uSes4aZbrcMchv5/mz3+NvIwuMjv5OQM55AM52ahAoIDpe5IblW4RjGCAVcwggFTAgEB
MIGwMIGiMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExETAPBgNVBAcMCFdoaXR0aWVyMRcwFQYD
VQQKDA5OZXdlZ2cuY29tIEluYzEMMAoGA1UECwwDRURJMSMwIQYDVQQDDBpBUzIuU2VsZlRlc3Rp
bmcuTmV3ZWdnLmNvbTEnMCUGCSqGSIb3DQEJARYYc3VwcG9ydG1pc2VkaUBuZXdlZ2cuY29tAgkA
1Ips/ybWGPIwCQYFKw4DAhoFADANBgkqhkiG9w0BAQEFAASBgLMTzL/uLpFN02Rtc4iWI/7ip+3u
VG5YnvtLd5A3a6Fxbuv0Ry4bVVUWzOa58/MDl55MxPXUYDy5+sDb37+o0dWDJ/xIGTlTUGBlOnl3
eyHfgd1dwHsiypohk+qtaU5h6e8XIHujrXSnaOq286YxQ5twKyrYFoqvQOtTE/qeHI+4AAAAAAAA

--_9B404EA6-32F6-4579-81C7-39270EDBD1E3_--

'''
        ctx = self.get_as2_context()

        ctx.agreement.outbound_agreement.is_signed = True
        ctx.agreement.outbound_agreement.is_compressed = False
        ctx.agreement.outbound_agreement.is_encrypted = True

        mdn_decoder = MdnDecoder(headers, body, MdnMode.sync, ctx)

        result = mdn_decoder.decode()

        assert_not_equal(mdn_decoder, None)
        assert_equal(result, 'successful')
        assert_equal(mdn_decoder.mic_digest, 'SGr2JzzMLWhiIorVZ6tMY7weJ8o=')
        assert_equal(mdn_decoder.mic_algorithm, 'sha1')
        assert_equal(mdn_decoder.original_message_id, '<20170511082601.15669.66568@tr29-Ubuntu>')
        assert_equal(mdn_decoder.mdn_message_id, '<WCMIS241_4DF41F2B-A065-41B5-8689-E50D439A1594>')

    '''
    verify text/plain message
    '''

    def test_verify_text_plain_message(self):
        headers = TestMdnDecoder._get_mdn_header(
            'multipart/report;report-type=disposition-notification;boundary="_6008ABC2-23F3-44FB-9D6F-F6934A2AEA94_"')

        body = '''--_6008ABC2-23F3-44FB-9D6F-F6934A2AEA94_
Content-Type: text/plain
Content-Transfer-Encoding: binary
Content-ID: {644BE653-F5E4-440B-98DD-F745DDF75E42}
Content-Description: plain

Message has been received by EaaS System.
--_6008ABC2-23F3-44FB-9D6F-F6934A2AEA94_
Content-Type: message/disposition-notification
Content-Transfer-Encoding: 7bit
Content-ID: {F8159914-EE84-4279-9E35-591315295EE2}
Content-Description: body

Final-Recipient: rfc822; NeweggVFUS
Original-Message-ID: <WCMIS133_B1EC4FD1-3A05-4542-A296-31CA0D7A3EFA>
Disposition: automatic-action/MDN-sent-automatically; processed
Received-Content-MIC: WqVq8IpJKYVaKCJ8vUrp09lqBoc=, sha1

--_6008ABC2-23F3-44FB-9D6F-F6934A2AEA94_--

'''

        ctx = super(TestMdnDecoder, self).get_as2_context()

        ctx.agreement.outbound_agreement.is_signed = True
        ctx.agreement.outbound_agreement.is_compressed = False
        ctx.agreement.outbound_agreement.is_encrypted = True
        ctx.agreement.outbound_agreement.is_mdn_signed = False

        mdn_decoder = MdnDecoder(headers, body, MdnMode.sync, ctx)

        result = mdn_decoder.decode()

        assert_not_equal(mdn_decoder, None)
        assert_equal(result, 'successful')
        assert_equal(mdn_decoder.mic_digest, 'WqVq8IpJKYVaKCJ8vUrp09lqBoc=')
        assert_equal(mdn_decoder.mic_algorithm, 'sha1')
        assert_equal(mdn_decoder.original_message_id, '<WCMIS133_B1EC4FD1-3A05-4542-A296-31CA0D7A3EFA>')
        assert_equal(mdn_decoder.mdn_message_id, '<WCMIS241_4DF41F2B-A065-41B5-8689-E50D439A1594>')

    '''
    verify text/plain (duplicate doc) message
    '''

    def test_verify_text_plain_duplicate_doc_message(self):
        headers = TestMdnDecoder._get_mdn_header(
            'multipart/report;report-type=disposition-notification;boundary="_6008ABC2-23F3-44FB-9D6F-F6934A2AEA94_"')

        body = '''--_6008ABC2-23F3-44FB-9D6F-F6934A2AEA94_
Content-Type: text/plain
Content-Transfer-Encoding: binary
Content-ID: {644BE653-F5E4-440B-98DD-F745DDF75E42}
Content-Description: plain

Message has been received by EaaS System.
--_6008ABC2-23F3-44FB-9D6F-F6934A2AEA94_
Content-Type: message/disposition-notification
Content-Transfer-Encoding: 7bit
Content-ID: {F8159914-EE84-4279-9E35-591315295EE2}
Content-Description: body

Final-Recipient: rfc822; NeweggVFUS
Original-Message-ID: <WCMIS133_B1EC4FD1-3A05-4542-A296-31CA0D7A3EFA>
Disposition: automatic-action/MDN-sent-automatically; processed/warning: duplicate-document
Received-Content-MIC: WqVq8IpJKYVaKCJ8vUrp09lqBoc=, sha1

--_6008ABC2-23F3-44FB-9D6F-F6934A2AEA94_--

'''

        ctx = super(TestMdnDecoder, self).get_as2_context()

        ctx.agreement.outbound_agreement.is_signed = True
        ctx.agreement.outbound_agreement.is_compressed = False
        ctx.agreement.outbound_agreement.is_encrypted = True
        ctx.agreement.outbound_agreement.is_mdn_signed = False

        mdn_decoder = MdnDecoder(headers, body, MdnMode.sync, ctx)

        result = mdn_decoder.decode()

        assert_not_equal(mdn_decoder, None)
        assert_equal(result, 'failed')
        assert_equal(mdn_decoder.mic_digest, 'WqVq8IpJKYVaKCJ8vUrp09lqBoc=')
        assert_equal(mdn_decoder.mic_algorithm, 'sha1')
        assert_equal(mdn_decoder.disposition_modifier_code, 'warning')
        assert_equal(mdn_decoder.disposition_modifier_value, 'duplicate-document')
        assert_equal(mdn_decoder.original_message_id, '<WCMIS133_B1EC4FD1-3A05-4542-A296-31CA0D7A3EFA>')
        assert_equal(mdn_decoder.mdn_message_id, '<WCMIS241_4DF41F2B-A065-41B5-8689-E50D439A1594>')


    '''
    verify message id
    '''

    @raises(AS2MdnException)
    def test_verify_message_id_is_null(self):
        self._verify_message_id(None)

    '''
    verify message id
    '''

    @raises(AS2MdnException)
    def test_verify_message_id_is_empty(self):
        self._verify_message_id('')

    '''
    verify message id
    '''

    @raises(AS2MdnException)
    def test_verify_message_id_is_white_space(self):
        self._verify_message_id('  ')

    def _verify_message_id(self, message_id):
        headers = TestMdnDecoder._get_mdn_header(
            'multipart/report;report-type=disposition-notification;boundary="_6008ABC2-23F3-44FB-9D6F-F6934A2AEA94_"')
        headers['Message-ID'] = message_id
        body = ''
        ctx = super(TestMdnDecoder, self).get_as2_context()
        mdn_decoder = MdnDecoder(headers, body, MdnMode.sync, ctx)
        mdn_decoder.decode()

    '''
    verify content type
    '''

    @raises(AS2MdnException)
    def test_verify_content_type_is_null(self):
        self._verify_content_type(None)

    '''
    verify content type
    '''

    @raises(AS2MdnException)
    def test_verify_content_type_is_empty(self):
        self._verify_content_type('')

    '''
    verify content type
    '''

    @raises(AS2MdnException)
    def test_verify_content_type_is_white_space(self):
        self._verify_content_type('  ')

    '''
    verify content type
    '''

    @raises(AS2MdnException)
    def test_verify_content_type_is_invalid(self):
        self._verify_content_type('multiple/test')

    def _verify_content_type(self, content_type):
        headers = TestMdnDecoder._get_mdn_header(content_type)
        body = ''
        ctx = super(TestMdnDecoder, self).get_as2_context()
        mdn_decoder = MdnDecoder(headers, body, MdnMode.sync, ctx)
        mdn_decoder.decode()


'''
Mdn Encoder Test Case
'''


class TestMdnEncoder(ProtocolTestBase):
    def setUp(self):
        ctx = super(TestMdnEncoder, self).get_as2_context()
        ctx.message.message_status = StatusType.successful
        ctx.message.message_is_mic = True
        ctx.message.message_mic_digest = 'oxaZUXw+2OUZL3gdT2s9MEy3wfE='
        ctx.message.message_mic_algorithm = 'sha1'
        ctx.message.message_mdn = AS2MessageMdn(mdn_message_id='123456789',
                                                mdn_mode=MdnMode.sync,
                                                original_message_id=ctx.message.message_id,
                                                mdn_mic_digest=ctx.message.message_mic_digest,
                                                mdn_mic_algorithm=ctx.message.message_mic_algorithm)
        ctx.message.message_mdn.mdn_disposition_mode = 'automatic-action/MDN-sent-automatically'
        ctx.message.message_mdn.mdn_disposition_type = 'processed'
        ctx.message.message_mdn.mdn_disposition_modifier_code = ''
        ctx.message.message_mdn.mdn_disposition_modifier_value = None

        self.context = ctx

    def tearDown(self):
        self.context = None

    def test_encoder_sync_signed_mdn_processed(self):
        mdn_encoder = MdnEncoder(self.context)

        headers, body = mdn_encoder.encode()

        assert_not_equal(None, headers)
        assert_equal(True, isinstance(headers, dict))
        assert_equal(8, len(headers))
        assert_equal('pyas2_01', headers['AS2-From'])
        assert_equal('Newegg', headers['AS2-To'])
        assert_equal('1.0', headers['MIME-Version'])

        assert_not_equal(None, body)
        assert_equal(True, 'Original-Recipient: rfc822; pyas2_01' in body)
        assert_equal(True, 'Final-Recipient: rfc822; pyas2_01' in body)

    def test_encoder_sync_text_plain_mdn_processed_with_error(self):
        self.context.agreement.inbound_agreement.is_mdn_signed = False
        self.context.message.message_mdn.mdn_disposition_modifier_code = 'error'
        self.context.message.message_mdn.mdn_disposition_modifier_value = 'decryption-failed'

        mdn_encoder = MdnEncoder(self.context)

        headers, body = mdn_encoder.encode()

        assert_not_equal(None, headers)
        assert_equal(True, isinstance(headers, dict))
        assert_equal(8, len(headers))

        assert_not_equal(None, body)
        assert_equal(True, 'processed/error: decryption-failed' in body)
