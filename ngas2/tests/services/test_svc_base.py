# -*- coding: utf-8 -*-
import unittest
import mock
import ngas2
from logging import NullHandler


class TestSvcBase(unittest.TestCase):
    is_init = False

    settings = {
        "log_handler": "CONSOLE|NLOG",
        "log_formatter": "[%(levelname)s] %(asctime)s %(name)s  %(funcName)s [%(lineno)d] %(message)s",
        "log_level": "INFO",
        "nlog_url": "http://10.16.75.24:3000/framework/v1/log-entry"
    }

    @staticmethod
    def fake_log_init():
        ngas2.logger.addHandler(NullHandler())

    def setUp(self):
        self.patcher_cfg_settings = \
            mock.patch("ngkitty.configuration.ConfigurationHelper.get_settings")
        self.mock_cfg_setting = self.patcher_cfg_settings.start()
        self.mock_cfg_setting.return_value = TestSvcBase.settings

        if not TestSvcBase.is_init:
            TestSvcBase.fake_log_init()
            TestSvcBase.is_init = True

    def tearDown(self):
        self.patcher_cfg_settings.stop()
