# -*- coding: utf-8 -*-

import unittest
import platform
from parameterized import parameterized

from ngas2.protocol import (decode_as2_identity, encode_as2_identity, generate_as2_message_id)
from nose.tools import (assert_equal, assert_not_equal, raises)

'''
Protocol Common Function Test
'''


class TestProtocolCommon(unittest.TestCase):
    @parameterized.expand([
        ('123456', '123456'),
        ('"123456"', '123456'),
        ('"123 456"', '123 456'),
        ('\"123 456\"', '123 456'),
        ('"\"123 456\""', '"123 456"'),
        ('\\123456', r'\123456'),
        ('"\"123 \\ 456\""', r'"123 \ 456"'),
    ])
    def test_decode_as2_identity(self, input, expected):
        actual = decode_as2_identity(input)
        assert_equal(actual, expected)

    @raises(ValueError)
    def test_decode_as2_identity_is_required(self):
        decode_as2_identity(None)

    @raises(ValueError)
    def test_encode_as2_identity_is_required(self):
        encode_as2_identity(None)

    @parameterized.expand([
        ('123456', '123456'),
        ('123 456', '"123 456"'),
        ('"123456"', r'"\"123456\""'),
        ('"\\123456"', r'"\"\\123456\""'),
    ])
    def test_encode_as2_identity(self, input, expected):
        actual = encode_as2_identity(input)
        assert_equal(actual, expected)

    def test_generate_as2_message_id(self):
        id = generate_as2_message_id()
        host = platform.node()

        assert_not_equal(id, None)
        assert_equal(id.startswith('<'), True)
        assert_equal(host in id, True)
        assert_equal('@' in id, True)
        assert_equal(id.endswith('>'), True)

    def test_generate_as2_message_id_diff(self):
        id_1 = generate_as2_message_id()
        id_2 = generate_as2_message_id()

        assert_not_equal(id_1, None)
        assert_not_equal(id_2, None)
        assert_not_equal(id_1, id_2)