# -*- coding: utf-8 -*-
import copy
import mock
from nose.tools import (assert_not_equal, assert_equal, assert_raises, raises)
from ngkitty.serialization import jsonserializer
from ngkitty.cloudstore import CloudStoreQueryResult
from ngas2.models.agreement import Agreement
from ngas2.protocol.exception import (AS2DeCompressException,
                                      AS2VerifySignatureException,
                                      AS2DecryptException)
from .test_partner_base import TestPartnerBase
from ngas2.management.partner import PartnerManager
from parameterized import parameterized


class TestPartnerReceiveMessage(TestPartnerBase):
    received_text_plain_headers = {
        'disposition-notification-to': 'eaas@as.com',
        'disposition-notification-options': 'signed-receipt-protocol=required,pkcs7-signature;signed-receipt-micalg=required,sha1',
        'ediint-features': 'multiple-attachments',
        'as2-version': '1.2',
        'content-transfer-encoding': 'binary',
        'as2-from': 'Newegg',
        'receipt-delivery-option': 'http://10.16.86.29:9009/as2-test/receive/async-mdn',
        'content-length': '47',
        'user-agent': 'Microsoft(R)BizTalk(R)Server2010',
        'connection': 'Close',
        'content-description': 'body',
        'as2-to': 'as2_01',
        'host': '10.16.86.29:9900',
        'mime-version': '1.0',
        'message-id': '<WCMIS241_D1B9FF5E-D318-4085-B27E-7225FF114A1E>',
        'content-type': 'application/edi-x12',
        'content-id': '{7890318C-5BAE-4E15-AE10-8F19C5768A8E}',
        'expect': '100-continue'
    }

    received_text_plain_content = 'This is test message from wcmis241 biztalk2010.'

    def setUp(self):
        super(TestPartnerReceiveMessage, self).setUp()

    def tearDown(self):
        super(TestPartnerReceiveMessage, self).tearDown()

    @mock.patch('ngas2.protocol.mdn.MdnEncoder.encode')
    @mock.patch('ngas2.protocol.receive.ReceiveDecoder.decode')
    def test_receive_with_decrypt_error(self,
                                        mock_receive_decode,
                                        mock_mdn_encode
                                        ):
        headers = TestPartnerReceiveMessage.received_text_plain_headers
        body = TestPartnerReceiveMessage.received_text_plain_content

        mock_receive_decode.side_effect = AS2DecryptException('decrypt error')
        mock_mdn_encode.side_effect = mock.Mock(return_value=({'x': 'x-decrypt-error'}, "mdn: decrypt error"))

        pm = PartnerManager(headers, body)

        mdn_header, mdn_content = pm.receive('A01')

        assert_not_equal(mdn_header, None)
        assert_not_equal(mdn_content, None)
        assert_equal(mdn_header, {'x': 'x-decrypt-error'})
        assert_equal(mdn_content, "mdn: decrypt error")

    @mock.patch('ngas2.protocol.mdn.MdnEncoder.encode')
    @mock.patch('ngas2.protocol.receive.ReceiveDecoder.decode')
    def test_receive_with_verify_error(self,
                                       mock_receive_decode,
                                       mock_mdn_encode
                                       ):
        headers = TestPartnerReceiveMessage.received_text_plain_headers
        body = TestPartnerReceiveMessage.received_text_plain_content

        mock_receive_decode.side_effect = AS2VerifySignatureException('verify signature error')
        mock_mdn_encode.side_effect = mock.Mock(
            return_value=({'x': 'x-verify-signature-error'}, "mdn: verify signature error"))

        pm = PartnerManager(headers, body)

        mdn_header, mdn_content = pm.receive('A01')

        assert_not_equal(mdn_header, None)
        assert_not_equal(mdn_content, None)
        assert_equal(mdn_header, {'x': 'x-verify-signature-error'})
        assert_equal(mdn_content, "mdn: verify signature error")

    @mock.patch('ngas2.protocol.mdn.MdnEncoder.encode')
    @mock.patch('ngas2.protocol.receive.ReceiveDecoder.decode')
    def test_receive_with_decompress_error(self,
                                           mock_receive_decode,
                                           mock_mdn_encode
                                           ):
        headers = TestPartnerReceiveMessage.received_text_plain_headers
        body = TestPartnerReceiveMessage.received_text_plain_content

        mock_mdn_encode.side_effect = mock.Mock(return_value=({'x': 'x-decompress-error'}, "mdn: decompress error"))
        mock_receive_decode.side_effect = AS2DeCompressException('decompress error')

        pm = PartnerManager(headers, body)

        mdn_header, mdn_content = pm.receive('A01')

        assert_not_equal(mdn_header, None)
        assert_not_equal(mdn_content, None)
        assert_equal(mdn_header, {'x': 'x-decompress-error'})
        assert_equal(mdn_content, "mdn: decompress error")

    @mock.patch('ngas2.protocol.mdn.MdnEncoder.encode')
    @mock.patch('ngas2.protocol.receive.ReceiveDecoder.decode')
    def test_receive_with_unexpected_error(self,
                                           mock_receive_decode,
                                           mock_mdn_encode,
                                           ):
        headers = TestPartnerReceiveMessage.received_text_plain_headers
        body = TestPartnerReceiveMessage.received_text_plain_content

        mock_mdn_encode.side_effect = mock.Mock(return_value=({'x': 'x-unexpected-error'},
                                                              "mdn: unexpected error"))
        mock_receive_decode.side_effect = Exception('unexpected error')

        pm = PartnerManager(headers, body)

        mdn_header, mdn_content = pm.receive('A01')

        assert_not_equal(mdn_header, None)
        assert_not_equal(mdn_content, None)
        assert_equal(mdn_header, {'x': 'x-unexpected-error'})
        assert_equal(mdn_content, "mdn: unexpected error")

    @raises(Exception)
    def test_receive_failed_when_agreement_id_not_found(self):
        headers = TestPartnerReceiveMessage.received_text_plain_headers
        body = TestPartnerReceiveMessage.received_text_plain_content
        pm = PartnerManager(headers, body)
        pm.receive(agreement_id='A-ID-Not-Found', is_test=True)

    @parameterized.expand([
        ({}, "Text Plain Content"),
        ({'as2-from': 'pyas2_01'}, "Text Plain Content"),
        ({'as2-from': 'pyas2_01', 'as2-to': 'pyas2_02'}, "Text Plain Content")
    ])
    def test_receive_failed_when_agreement_not_found(self, headers, body):
        pm = PartnerManager(headers, body)
        with assert_raises(Exception):
            pm.receive()

    def test_receive_text_plain_with_mdn_signed(self):
        headers = TestPartnerReceiveMessage.received_text_plain_headers
        body = TestPartnerReceiveMessage.received_text_plain_content
        pm = PartnerManager(headers, body)
        resp_headers, resp_content = pm.receive()
        assert_not_equal(None, resp_headers)
        assert_not_equal(None, resp_content)
