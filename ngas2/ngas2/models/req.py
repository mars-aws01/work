# -*- coding: utf-8 -*-

from ngkitty.model import (Model, ListField, ModelField)
from ngas2.models.msg import AS2MessageMdn, AS2MessageTrace


class AsyncMdnReceive(Model):
    message_mdn = ModelField('MessageMdn', AS2MessageMdn)
    message_trace_list = ListField('MessageTraceList'
                                   , AS2MessageTrace
                                   , 'message_trace'
                                   , 'MessageTrace')