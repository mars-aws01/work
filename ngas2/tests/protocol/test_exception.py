# -*- coding: utf-8 -*-

import unittest

from ngas2.protocol.exception import (AS2Exception)
from nose.tools import (assert_equal)

'''
Test AS2 Exception
'''


class TestAS2Exception(unittest.TestCase):
    def test_as2_exception_msg(self):
        ex = AS2Exception(None)
        assert_equal(str(ex), 'Unknown Exception')
