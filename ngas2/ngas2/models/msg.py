# -*- coding: utf-8 -*-

from ngkitty.model import (Model, ModelField, ListField, StringField, BooleanField, DatetimeField)
from ngas2.models import NameValuePair

'''
Status Type
'''


class StatusType(object):
    all = ['successful', 'failed', 'waiting']
    successful = all[0]
    failed = all[1]
    waiting = all[2]


'''
Direction Type
'''


class DirectionType(object):
    all = ['inbound', 'outbound']
    inbound = all[0]
    outbound = all[1]


'''
AS2 Message MDN
'''


class AS2MessageMdn(Model):
    mdn_message_id = StringField('MdnMessageID')
    direction = StringField('Direction')
    original_message_id = StringField('OriginalMessageID')
    mdn_status = StringField('MdnStatus')
    mdn_mode = StringField('MdnMode')
    mdn_validate_status = StringField('MdnValidateStatus')
    mdn_disposition_mode = StringField('MdnDispositionMode')
    mdn_disposition_type = StringField('MdnDispositionType')
    mdn_disposition_modifier_code = StringField('MdnDispositionModifierCode')
    mdn_disposition_modifier_value = StringField('MdnDispositionModifierValue')
    mdn_disposition_description = StringField('MdnDispositionDescription')
    mdn_headers = ListField('MdnHeaderList'
                            , NameValuePair
                            , 'mdn_header'
                            , 'MdnHeader')
    mdn_data_dfs_path = StringField('MdnDataDFSPath')
    mdn_mic_digest = StringField('MdnMicDigest')
    mdn_mic_algorithm = StringField('MdnMicAlgorithm')
    memo = StringField('Memo')
    in_date = DatetimeField('InDate')
    edit_date = DatetimeField('EditDate')


'''
AS2 Message MDN
'''


class AS2MessageTrace(Model):
    time_stamp = DatetimeField('TraceTime')
    trace_status = StringField('TraceStatus')
    trace_memo = StringField('TraceMemo')


'''
AS2 Message
'''


class AS2Message(Model):
    __collection__ = "message"

    key = StringField('MessageKey')
    business_id = StringField('BusinessID')
    message_id = StringField('MessageID')
    direction = StringField('Direction')
    agreement_id = StringField('AgreementID')
    local_identity = StringField('LocalIdentity')
    trading_identity = StringField('TradingIdentity')
    version = StringField('Version')
    received_status_code = StringField('ReceivedStatusCode')
    received_headers = ListField('ReceivedHeaderList'
                                 , NameValuePair
                                 , 'received_header'
                                 , 'ReceivedHeader')
    received_data_dfs_path = StringField('ReceivedOriginalDataDFSPath')
    received_edi_data_dfs_path = StringField('ReceivedEdiDataDFSPath')
    received_edi_data_length = StringField('ReceivedEdiDataLength')
    received_edi_data_hash = StringField('ReceivedEdiDataHash')
    received_edi_data_type = StringField('ReceivedEdiDataType')
    received_edi_data_charset = StringField('ReceivedEdiDataCharset')
    sent_headers = ListField('SentHeaderList'
                             , NameValuePair
                             , 'sent_header'
                             , 'SentHeader')
    sent_data_dfs_path = StringField('SentOriginalDataDFSPath')
    sent_edi_data_dfs_path = StringField('SentEdiDataDFSPath')
    message_status = StringField('MessageStatus')
    message_mdn = ModelField('MessageMdn', AS2MessageMdn)
    message_mdn_status = StringField('MessageMdnStatus')
    message_is_mic = BooleanField('MessageIsMic')
    message_mic_digest = StringField('MessageMicDigest')
    message_mic_algorithm = StringField('MessageMicAlgorithm')
    message_trace_list = ListField('MessageTraceList'
                                   , AS2MessageTrace
                                   , 'message_trace'
                                   , 'MessageTrace')
    memo = StringField('Memo')
    in_date = DatetimeField('InDate')
    in_user = StringField('InUser')
    edit_date = DatetimeField('EditDate')
    edit_user = StringField('EditUser')


class MessageRetry(Model):
    message_queue_name = StringField('MessageQueueName')
    message_queue_password = StringField('MessageQueuePassword')
    message_queue_headers = ListField('MessageQueueHeaderList'
                                      , NameValuePair
                                      , 'message_queue_header'
                                      , 'MessageQueueHeader')
    match_tag = BooleanField('MatchTag')
    message = ModelField('Message', AS2Message)
