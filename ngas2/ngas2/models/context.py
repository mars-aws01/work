# -*- coding: utf-8 -*-


from datetime import datetime

from ngas2.models.agreement import Agreement
from ngas2.models.msg import (AS2MessageTrace, StatusType)


class AS2Context(object):
    def __init__(self, agreement, message):
        if not isinstance(agreement, Agreement):
            raise ValueError("agreement invalid")

        self.agreement = agreement
        self.message = message
        self.trace_info_list = []

    def trace(self, info, *args, **kv):
        if info is None:
            raise ValueError("info invalid")

        if not isinstance(info, str):
            info = str(info)

        self.trace_info_list.append(
            AS2MessageTrace(
                time_stamp=datetime.utcnow(),
                trace_status=StatusType.successful,
                trace_memo=info.format(*args, **kv)))

    def trace_error(self, info, *args, **kv):
        if info is None:
            raise ValueError("info invalid")

        if not isinstance(info, str):
            info = str(info)

        self.trace_info_list.append(
            AS2MessageTrace(
                time_stamp=datetime.utcnow(),
                trace_status=StatusType.failed,
                trace_memo=info.format(*args, **kv)))
