# -*- coding: utf-8 -*-

import unittest
from ngas2.models.agreement import Agreement
from ngas2.models.context import AS2Context
from nose.tools import (assert_equal, raises)

'''
AS2 Context Test
'''


class TestAS2Context(unittest.TestCase):
    @raises(ValueError)
    def test_Agreement_is_required(self):
        AS2Context(None, None)

    @raises(ValueError)
    def test_trace_info_is_required(self):
        agr = Agreement(id='A01')
        ctx = AS2Context(agr, None)

        ctx.trace(None)

    def test_trace_info(self):
        agr = Agreement(id='A01')
        ctx = AS2Context(agr, None)

        ctx.trace(u'test {0} {1}', '123', '456')

        assert_equal(1, len(ctx.trace_info_list))

    @raises(ValueError)
    def test_trace_error_info_is_required(self):
        agr = Agreement(id='A01')
        ctx = AS2Context(agr, None)

        ctx.trace_error(None)

    def test_trace_error_info_with_str(self):
        agr = Agreement(id='A01')
        ctx = AS2Context(agr, None)

        ctx.trace_error('test {0} {1}', '123', '456')

        assert_equal(1, len(ctx.trace_info_list))

    def test_trace_error_info_with_unicode(self):
        agr = Agreement(id='A01')
        ctx = AS2Context(agr, None)

        ctx.trace_error(u'test {0} {1}', '123', '456')

        assert_equal(1, len(ctx.trace_info_list))
