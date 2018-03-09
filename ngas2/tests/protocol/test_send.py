# -*- coding: utf-8 -*-

import unittest

from ngas2.protocol.send import SendEncoder

from tests.protocol import ProtocolTestBase

from nose.tools import (assert_equal, assert_not_equal)

'''
Send Encoder Test Case
'''


class TestSendEncoder(ProtocolTestBase):
    '''
    signed & encrypted message
    '''

    def test_encoding_signed_encrypted_without_compress(self):
        ctx = super(TestSendEncoder, self).get_as2_context()

        ctx.agreement.outbound_agreement.is_signed = True
        ctx.agreement.outbound_agreement.is_compressed = False
        ctx.agreement.outbound_agreement.is_encrypted = True

        encoder = SendEncoder(ctx.message.message_id,
                              "123.dat",
                              "this is test message from tp_1",
                              ctx)

        headers, body = encoder.encode()

        assert_not_equal(None, headers)
        assert_equal(12, len(headers))
        assert_equal("pyas2_01", headers["AS2-From"])
        assert_equal("Newegg", headers["AS2-To"])
        assert_equal(ctx.message.message_id, headers["Message-ID"])

        assert_not_equal(None, body)

    '''
    signed message only
    '''

    def test_encoding_signed_without_encrypted_compress(self):
        ctx = super(TestSendEncoder, self).get_as2_context()

        ctx.agreement.outbound_agreement.is_signed = True
        ctx.agreement.outbound_agreement.is_compressed = False
        ctx.agreement.outbound_agreement.is_encrypted = False

        encoder = SendEncoder(ctx.message.message_id,
                              "123.dat",
                              "this is test message from tp_1",
                              ctx)

        headers, body = encoder.encode()

        assert_not_equal(None, headers)
        assert_equal(11, len(headers))
        assert_equal("pyas2_01", headers["AS2-From"])
        assert_equal("Newegg", headers["AS2-To"])
        assert_equal(ctx.message.message_id, headers["Message-ID"])
        assert_equal(True, 'multipart/signed' in headers["Content-Type"])

        assert_not_equal(None, body)

    '''
    encrypted message only
    '''

    def test_encoding_encrypted_without_signed_compress(self):
        ctx = super(TestSendEncoder, self).get_as2_context()

        ctx.agreement.outbound_agreement.is_signed = False
        ctx.agreement.outbound_agreement.is_compressed = False
        ctx.agreement.outbound_agreement.is_encrypted = True

        encoder = SendEncoder(ctx.message.message_id,
                              "123.dat",
                              "this is test message from tp_1",
                              ctx)

        headers, body = encoder.encode()

        assert_not_equal(None, headers)
        assert_equal(12, len(headers))
        assert_equal("pyas2_01", headers["AS2-From"])
        assert_equal("Newegg", headers["AS2-To"])
        assert_equal(ctx.message.message_id, headers["Message-ID"])
        assert_equal('application/pkcs7-mime; smime-type="enveloped-data"; name="smime.p7m"', headers["Content-Type"])
        assert_equal('attachment; filename="smime.p7m"', headers["Content-Disposition"])

        assert_not_equal(None, body)
