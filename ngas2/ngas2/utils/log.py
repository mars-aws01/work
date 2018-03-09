# -*- coding: utf-8 -*-

import logging
import socket

from ngkitty.configuration import ConfigurationHelper
from ngkitty.http import HttpHelper

'''
Newegg Framework Log
'''


class FrameWorkLogHandler(logging.Handler):
    def __init__(self):
        self.server = socket.gethostname()
        self.ip = socket.gethostbyname(self.server)
        self.conf = ConfigurationHelper.get_settings()

        super(FrameWorkLogHandler, self).__init__()

    def format_level(self, level):
        if level == 'INFO':
            return 'I'
        if level == 'WARNING':
            return 'T'
        if level == 'ERROR':
            return 'E'
        return 'D'

    def emit(self, record):
        try:
            request_body = {
                'GlobalName': "EDI",
                'LocalName': "NgAS2",
                'LogUserName': "EDI",
                'LogServerName': self.server,
                'LogServerIP': self.ip,
                'Content': self.format(record),
                'LogType': self.format_level(record.levelname),
                'CategoryName': record.module
            }

            HttpHelper.post(self.conf['nlog_url'],
                            headers={'Content-Type': 'application/json'},
                            json=request_body)

            return True
        except:
            return False


'''
Logging Helper
'''


class LoggingHelper(object):
    @staticmethod
    def get_level():
        conf = ConfigurationHelper.get_settings()
        return conf['log_level'].upper()

    @staticmethod
    def get_handlers():
        conf = ConfigurationHelper.get_settings()
        handler = conf['log_handler'].upper()
        handlers = []

        for hd in handler.split('|'):
            if hd == "CONSOLE":
                instance = logging.StreamHandler()
            elif hd == "NLOG":
                instance = FrameWorkLogHandler()
            else:
                continue

            if instance is not None and conf['log_formatter'] is not None:
                instance.setFormatter(logging.Formatter(conf['log_formatter']))

            handlers.append(instance)

        return handlers
