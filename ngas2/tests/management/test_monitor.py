# -*- coding: utf-8 -*-
import unittest
import mock
import ngas2
from logging import NullHandler
from ngas2.models.msg import AS2Message
from ngas2.management.monitor import Monitor


class TestMonitor(unittest.TestCase):
    is_init = False

    settings = {
        "app_root_dir": "/usr/local/ngas2"
    }

    @staticmethod
    def fake_log_init():
        ngas2.logger.addHandler(NullHandler())

    def setUp(self):
        self.patcher_cfg_settings = \
            mock.patch("ngkitty.configuration.ConfigurationHelper.get_settings")
        self.mock_cfg_setting = self.patcher_cfg_settings.start()
        self.mock_cfg_setting.return_value = TestMonitor.settings

        if not TestMonitor.is_init:
            TestMonitor.fake_log_init()
            TestMonitor.is_init = True

    def tearDown(self):
        self.patcher_cfg_settings.stop()

    @mock.patch('os.path.exists')
    def test_save_failed_message_folder_is_exists(self,
                                                  mock_file_exists):
        mock_file_exists.return_value = True
        with mock.patch("__builtin__.open", mock.mock_open(read_data="data")) as fp:
            Monitor.save_failed_message(
                "NgAS2_Inbound_Message",
                "4ediuse0nly",
                {"Environment": "GDEV"},
                AS2Message(key="1232456"),
                True
            )

    @mock.patch('os.makedirs')
    @mock.patch('os.path.exists')
    def test_save_failed_message_folder_is_not_exists(self,
                                                      mock_file_exists,
                                                      mock_makedir):
        mock_file_exists.return_value = False
        mock_makedir.return_value = True
        with mock.patch("__builtin__.open", mock.mock_open(read_data="data")) as fp:
            Monitor.save_failed_message(
                "NgAS2_Inbound_Message",
                "4ediuse0nly",
                {"Environment": "GDEV"},
                AS2Message(key="1232456"),
                True
            )

    @mock.patch('os.path.exists')
    def test_retry_failed_message_folder_is_not_exists(self,
                                                       mock_file_exists):
        mock_file_exists.return_value = False
        Monitor.retry_failed_message(10)

    @mock.patch('os.walk')
    @mock.patch('os.path.exists')
    def test_retry_failed_message_when_no_files(self,
                                                mock_file_exists,
                                                mock_walk):
        mock_file_exists.return_value = True
        mock_walk.return_value = [('message', (), [])]
        Monitor.retry_failed_message(10)

    @mock.patch('ngkitty.messaging.MessageQueueHelper.send_message_json')
    @mock.patch('os.remove')
    @mock.patch('os.walk')
    @mock.patch('os.path.exists')
    def test_retry_failed_message_with_header_ok(self,
                                                 mock_file_exists,
                                                 mock_walk,
                                                 mock_file_remove,
                                                 mock_message_queue):
        mock_file_exists.return_value = True
        mock_file_remove.return_value = True
        mock_walk.return_value = [('message', (), ['abc.msg'])]
        mock_queue_publish_info = mock.Mock()
        mock_queue_publish_info.succeeded = True
        mock_message_queue.return_value = mock_queue_publish_info
        retry_msg_json = """
{
    "MessageQueueName": "NgAS2_Inbound_Queue",
    "MessageQueuePassword": "4ediuse0nly",
    "MessageQueueHeaderList": [{
        "Name": "IsTest",
        "Value": "True"
    }],
    "MatchTag": true,
    "Message": {
        "MessageKey": "123"
    }
}
        """

        with mock.patch("__builtin__.open", mock.mock_open(read_data=retry_msg_json)) as fp:
            Monitor.retry_failed_message(10)

    @mock.patch('ngkitty.messaging.MessageQueueHelper.send_message_json')
    @mock.patch('os.remove')
    @mock.patch('os.walk')
    @mock.patch('os.path.exists')
    def test_retry_failed_message_without_header_ok(self,
                                                    mock_file_exists,
                                                    mock_walk,
                                                    mock_file_remove,
                                                    mock_message_queue):
        mock_file_exists.return_value = True
        mock_file_remove.return_value = True
        mock_walk.return_value = [('message', (), ['abc.msg'])]
        mock_queue_publish_info = mock.Mock()
        mock_queue_publish_info.succeeded = True
        mock_message_queue.return_value = mock_queue_publish_info
        retry_msg_json = """
{
    "MessageQueueName": "NgAS2_Inbound_Queue",
    "MessageQueuePassword": "4ediuse0nly",
    "MatchTag": false,
    "Message": {
        "MessageKey": "123"
    }
}
        """

        with mock.patch("__builtin__.open", mock.mock_open(read_data=retry_msg_json)) as fp:
            Monitor.retry_failed_message(10)

    @mock.patch('ngkitty.messaging.MessageQueueHelper.send_message_json')
    @mock.patch('os.walk')
    @mock.patch('os.path.exists')
    def test_retry_failed_message_failed(self,
                                         mock_file_exists,
                                         mock_walk,
                                         mock_message_queue):
        mock_file_exists.return_value = True
        mock_walk.return_value = [('message', (), ['abc.msg'])]
        mock_queue_publish_info = mock.Mock()
        mock_queue_publish_info.succeeded = False
        mock_message_queue.return_value = mock_queue_publish_info
        retry_msg_json = """
{
    "MessageQueueName": "NgAS2_Inbound_Queue",
    "MessageQueuePassword": "4ediuse0nly",
    "MessageQueueHeaderList": [{
        "Name": "IsTest",
        "Value": "True"
    }],
    "MatchTag": true,
    "Message": {
        "MessageKey": "123"
    }
}
        """

        with mock.patch("__builtin__.open", mock.mock_open(read_data=retry_msg_json)) as fp:
            Monitor.retry_failed_message(10)
