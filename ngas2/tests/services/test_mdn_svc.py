# -*- coding: utf-8 -*-
from io import BytesIO

import mock
from bottle import request
from nose.tools import assert_not_equal, assert_equal
from ngas2.services import mdn_svc
from ngas2.models.msg import AS2Message
from .test_svc_base import TestSvcBase


class TestMdnSvc(TestSvcBase):
    def setUp(self):
        super(TestMdnSvc, self).setUp()

        request.environ['HTTP_TRANSFER_ENCODING'] = 'chunked'

        in_data = BytesIO()
        in_data.writelines('{}')
        in_data.flush()
        in_data.seek(0)
        request.environ['wsgi.input'] = in_data

    def tearDown(self):
        super(TestMdnSvc, self).tearDown()

    @mock.patch('ngas2.management.partner.PartnerManager.send_async_mdn')
    def test_mdn_message_send_ok(self, mock_msg_send):
        mock_msg_send.return_value = AS2Message(key='123')
        resp = mdn_svc.post_mdn_message_send('ngas2')
        assert_not_equal(None, resp)
        assert_equal(200, resp.status_code)
        mock_msg_send.assert_called_with({})

    @mock.patch('ngas2.management.partner.PartnerManager.send_async_mdn')
    def test_mdn_message_send_with_exception(self, mock_msg_send):
        mock_msg_send.side_effect = Exception('unknown exception')
        resp = mdn_svc.post_mdn_message_send('ngas2')
        assert_not_equal(None, resp)
        assert_equal(500, resp.status_code)
        mock_msg_send.assert_called_with({})

    @mock.patch('ngas2.management.partner.PartnerManager.receive_async_mdn')
    def test_async_mdn_receive_ok(self, mock_mdn_msg_receive):
        mock_mdn_msg_receive.return_value = None
        resp = mdn_svc.post_async_mdn_receive('ngas2')
        assert_not_equal(None, resp)
        assert_equal(200, resp.status_code)
        mock_mdn_msg_receive.assert_called_with()

    @mock.patch('ngas2.management.partner.PartnerManager.receive_async_mdn')
    def test_async_mdn_receive_with_exception(self, mock_mdn_msg_receive):
        mock_mdn_msg_receive.side_effect = Exception('Unknown exception')
        resp = mdn_svc.post_async_mdn_receive('ngas2')
        assert_not_equal(None, resp)
        assert_equal(500, resp.status_code)
        mock_mdn_msg_receive.assert_called_with()

    @mock.patch('ngas2.management.partner.PartnerManager.receive_async_mdn')
    def test_async_mdn_receive_ok_by_id(self, mock_mdn_msg_receive):
        mock_mdn_msg_receive.return_value = None
        resp = mdn_svc.post_async_mdn_receive_by_id('ngas2', 'A01')
        assert_not_equal(None, resp)
        assert_equal(200, resp.status_code)
        mock_mdn_msg_receive.assert_called_with('A01')

    @mock.patch('ngas2.management.partner.PartnerManager.receive_async_mdn')
    def test_async_mdn_receive_with_exception_by_id(self, mock_mdn_msg_receive):
        mock_mdn_msg_receive.side_effect = Exception('Unknown exception')
        resp = mdn_svc.post_async_mdn_receive_by_id('ngas2', 'A01')
        assert_not_equal(None, resp)
        assert_equal(500, resp.status_code)
        mock_mdn_msg_receive.assert_called_with('A01')
