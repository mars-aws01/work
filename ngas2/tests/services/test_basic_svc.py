# -*- coding: utf-8 -*-
from io import BytesIO

import mock
from bottle import request
from nose.tools import assert_not_equal, assert_equal
from ngas2.services import basic_svc
from .test_svc_base import TestSvcBase


class TestBasicSvc(TestSvcBase):
    def setUp(self):
        super(TestBasicSvc, self).setUp()

        request.environ['HTTP_TRANSFER_ENCODING'] = 'chunked'

        in_data = BytesIO()
        in_data.writelines('{}')
        in_data.flush()
        in_data.seek(0)
        request.environ['wsgi.input'] = in_data

    def tearDown(self):
        super(TestBasicSvc, self).tearDown()

    @mock.patch('ngas2.management.partner.PartnerManager.save_event_message')
    def test_as2_message_save_ok(self, mock_msg_save):
        mock_msg_save.return_value = None
        resp = basic_svc.post_message_save('ngas2')
        assert_not_equal(None, resp)
        assert_equal(200, resp.status_code)
        mock_msg_save.assert_called_with({})

    @mock.patch('ngas2.management.partner.PartnerManager.save_event_message')
    def test_as2_message_save_with_exception(self, mock_msg_save):
        mock_msg_save.side_effect = Exception('Unknown exception')
        resp = basic_svc.post_message_save('ngas2')
        assert_not_equal(None, resp)
        assert_equal(500, resp.status_code)
        mock_msg_save.assert_called_with({})

    @mock.patch('ngas2.management.partner.PartnerManager.save_mdn_event_message')
    def test_as2_mdn_message_save_ok(self, mock_msg_save):
        mock_msg_save.return_value = None
        resp = basic_svc.post_mdn_message_save('ngas2')
        assert_not_equal(None, resp)
        assert_equal(200, resp.status_code)
        mock_msg_save.assert_called_with({})

    @mock.patch('ngas2.management.partner.PartnerManager.save_mdn_event_message')
    def test_as2_mdn_message_save_with_exception(self, mock_msg_save):
        mock_msg_save.side_effect = Exception('Unknown exception')
        resp = basic_svc.post_mdn_message_save('ngas2')
        assert_not_equal(None, resp)
        assert_equal(500, resp.status_code)
        mock_msg_save.assert_called_with({})
