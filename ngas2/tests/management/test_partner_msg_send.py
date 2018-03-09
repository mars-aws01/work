# -*- coding: utf-8 -*-

import mock
from nose.tools import (assert_equal, assert_not_equal)
from parameterized import (parameterized)
from .test_partner_base import TestPartnerBase
from ngas2.management.partner import PartnerManager


class TestPartnerSendMessage(TestPartnerBase):
    @staticmethod
    def fake_os_path_exists(path):
        if path.endswith('.pem'):
            return False
        return True

    def setUp(self):
        super(TestPartnerSendMessage, self).setUp()

    def tearDown(self):
        super(TestPartnerSendMessage, self).tearDown()

    @staticmethod
    def fake_http_post_mdn_content_is_empty(url, data=None, json=None, ssl_version=None, timeout=None, **kwargs):
        mk_resp = mock.Mock()

        mk_resp.status_code = 200
        mk_resp.headers = TestPartnerBase.mdn_headers
        mk_resp.content = ""

        return mk_resp

    @staticmethod
    def fake_http_post_failed(url, data=None, json=None, ssl_version=None, timeout=None, **kwargs):
        mk_resp = mock.Mock()

        mk_resp.status_code = 503
        mk_resp.headers = TestPartnerBase.mdn_headers
        mk_resp.content = "503 busy"
        mk_resp.raise_for_status.side_effect = Exception('503 service busy')

        return mk_resp

    def test_send_with_service_not_available(self):
        self.mock_http_post.side_effect = TestPartnerSendMessage.fake_http_post_failed

        pm = PartnerManager(
            {
                'ngas2-business-id': "123-456-789-9527",
                'ngas2-agreement-id': "A01",
                'ngas2-data-dfs-path': ""
            },
            "this is test message from tp_yyyy"
        )

        msg = pm.send()

        assert_not_equal(None, msg)
        assert_equal('failed', msg.message_status)
        assert_equal('waiting', msg.message_mdn_status)
        assert_equal(None, msg.message_mdn.mdn_validate_status)

    def test_send_ok_but_sync_mdn_failed(self):
        self.mock_http_post.side_effect = TestPartnerSendMessage.fake_http_post_mdn_content_is_empty

        pm = PartnerManager(
            {
                'ngas2-business-id': "123-456-789",
                'ngas2-agreement-id': "A01",
                'ngas2-data-dfs-path': ""
            },
            "this is test message from tp_xxxxx"
        )

        msg = pm.send()

        assert_not_equal(None, msg)
        assert_equal('failed', msg.message_status)
        assert_equal('failed', msg.message_mdn_status)
        assert_equal(None, msg.message_mdn.mdn_validate_status)

    def test_send_https_proxy_digest_auth(self):
        pm = PartnerManager(
            {
                'ngas2-business-id': "1_proxy_digest_auth",
                'ngas2-agreement-id': "A03",
                'ngas2-data-dfs-path': ""
            },
            "this is test message from tp_1"
        )

        msg = pm.send()

        assert_not_equal(None, msg)
        assert_equal('successful', msg.message_status)
        assert_equal('successful', msg.message_mdn_status)
        assert_equal('successful', msg.message_mdn.mdn_validate_status)

    @mock.patch('ngas2.management.monitor.Monitor.save_failed_message')
    def test_send_ok_but_send_mq_failed(self, save_failed_message):
        mock_queue_publish_info = mock.Mock()
        mock_queue_publish_info.succeeded = False
        self.mock_message_queue_send.return_value = mock_queue_publish_info
        save_failed_message.return_value = None

        pm = PartnerManager(
            {
                'ngas2-business-id': "1_proxy_basic_auth",
                'ngas2-agreement-id': "A02",
                'ngas2-data-dfs-path': ""
            },
            "this is test message from tp_1"
        )

        msg = pm.send()

        assert_not_equal(None, msg)
        assert_equal('successful', msg.message_status)
        assert_equal('successful', msg.message_mdn_status)
        assert_equal('successful', msg.message_mdn.mdn_validate_status)

    def test_send_https_proxy_basic_auth(self):
        pm = PartnerManager(
            {
                'ngas2-business-id': "1_proxy_basic_auth",
                'ngas2-agreement-id': "A02",
                'ngas2-data-dfs-path': ""
            },
            "this is test message from tp_1"
        )

        msg = pm.send()

        assert_not_equal(None, msg)
        assert_equal('successful', msg.message_status)
        assert_equal('successful', msg.message_mdn_status)
        assert_equal('successful', msg.message_mdn.mdn_validate_status)

    def test_send_ok_without_download_cert(self):
        pm = PartnerManager(
            {
                'ngas2-business-id': "1",
                'ngas2-agreement-id': "A01",
                'ngas2-data-dfs-path': ""
            },
            "this is test message from tp_1"
        )

        msg = pm.send()

        assert_not_equal(None, msg)
        assert_equal('successful', msg.message_status)
        assert_equal('successful', msg.message_mdn_status)
        assert_equal('successful', msg.message_mdn.mdn_validate_status)

    @mock.patch('ngkitty.dfs.DFSHelper.download2file')
    @mock.patch('os.path.exists')
    def test_send_ok_with_download_cert(self,
                                        mock_os_path_exists,
                                        mock_dfs_download_to_file):
        mock_os_path_exists.side_effect = TestPartnerSendMessage.fake_os_path_exists
        mock_dfs_download_to_file.return_value = True

        pm = PartnerManager(
            {
                'ngas2-business-id': "1",
                'ngas2-agreement-id': "A01",
                'ngas2-data-dfs-path': ""
            },
            "this is test message from tp_1"
        )

        msg = pm.send()

        assert_not_equal(None, msg)
        assert_equal('successful', msg.message_status)
        assert_equal('successful', msg.message_mdn_status)
        assert_equal('successful', msg.message_mdn.mdn_validate_status)

    @parameterized.expand([
        ('case_1', ''),
        ('case_2', None),
        ('case_3', ' ')
    ])
    def test_agreement_id_is_None(self, case_name, agreement_id):
        pm = PartnerManager(
            {
                'ngas2-business-id': "1",
                'ngas2-agreement-id': agreement_id,
                'ngas2-data-dfs-path': ""
            },
            "this is test message from tp_1"
        )
        msg = pm.send()

        assert_not_equal(case_name, None)
        assert_not_equal(None, msg)
        assert_equal('failed', msg.message_status)
        assert_equal('waiting', msg.message_mdn_status)
        assert_equal(None, msg.message_mdn.mdn_validate_status)

    @parameterized.expand([
        (None, None),
        (None, ''),
        ('', None),
        ('', ''),
        (' ', ''),
        (' ', '  ')
    ])
    def test_data_dfs_path_or_data_is_required(self, dfs_path, content):
        pm = PartnerManager(
            {
                'ngas2-business-id': "1",
                'ngas2-agreement-id': "A01",
                'ngas2-data-dfs-path': dfs_path
            },
            content
        )
        msg = pm.send()

        assert_not_equal(None, msg)
        assert_equal('failed', msg.message_status)
        assert_equal('waiting', msg.message_mdn_status)
        assert_equal(None, msg.message_mdn.mdn_validate_status)
