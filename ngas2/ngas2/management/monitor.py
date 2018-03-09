# -*- coding: utf-8 -*-

import logging
import os
import time
import uuid
import threading

from ngkitty.configuration import ConfigurationHelper
from ngkitty.messaging import MessageQueueHelper
from ngkitty.serialization import jsonserializer

from ngas2.models import NameValuePair
from ngas2.models.msg import MessageRetry

logger = logging.getLogger(__name__)


class Monitor(object):
    @staticmethod
    def save_failed_message(message_name, password, headers, message, match_tag):
        conf = ConfigurationHelper.get_settings()
        msg = MessageRetry(message_queue_name=message_name,
                           message_queue_password=password,
                           message_queue_headers=None if headers is None else [NameValuePair(name=k, value=v) for k, v
                                                                               in headers.items()],
                           match_tag=match_tag,
                           message=message)

        msg_backup_file_path = os.path.join(conf['app_root_dir'],
                                            'message',
                                            str(uuid.uuid4()) + '.msg')

        msg_backup_path = os.path.dirname(msg_backup_file_path)

        if not os.path.exists(msg_backup_path):
            os.makedirs(msg_backup_path)

        with open(msg_backup_file_path, 'w') as fp:
            fp.write(jsonserializer.serialize(msg))

    @staticmethod
    def retry(file_full_name):
        with open(file_full_name, 'r') as fp:
            content = fp.read()
            retry = jsonserializer.deserialize(content, MessageRetry)

        headers = None
        if retry.message_queue_headers is not None:
            headers = {}
            for item in retry.message_queue_headers:
                headers[item['name']] = item['value']

        rst = MessageQueueHelper().send_message_json(
            retry.message,
            retry.message_queue_name,
            retry.message_queue_password,
            additional_headers=headers,
            serialization_match_tag=retry.match_tag)

        if rst.succeeded:
            os.remove(file_full_name)
        else:
            logger.error('failed retry {0} , due to {1}'.format(
                file_full_name,
                rst.message))

    @staticmethod
    def retry_failed_message(top):
        count = 0
        conf = ConfigurationHelper.get_settings()
        msg_backup_path = os.path.join(conf['app_root_dir'], 'message')

        if not os.path.exists(msg_backup_path):
            return

        try:
            for path, dirs, files in os.walk(msg_backup_path):
                for file_name in files:
                    count = count + 1
                    if count > top:
                        return

                    file_full_name = os.path.join(path, file_name)
                    logger.info('retry {0}'.format(file_full_name))

                    Monitor.retry(file_full_name)
        except:
            logger.exception('retry failed message with exception')


class MonitorJob(threading.Thread):
    def __init__(self):
        super(MonitorJob, self).__init__()
        conf = ConfigurationHelper.get_settings()
        self.interval = conf['app_monitor_interval']
        self.per_count = conf['app_monitor_per_count']
        self.daemon = True

    def run(self):
        while True:
            logger.info('start to retry failed message')
            Monitor.retry_failed_message(self.per_count)
            logger.info('end retry failed message, sleeping...')
            time.sleep(self.interval)
