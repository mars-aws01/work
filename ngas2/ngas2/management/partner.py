# -*- coding: utf-8 -*-

import logging
import os
import sys
import uuid
from datetime import datetime

import requests
from furl import furl
from ngkitty.cache import InMemoryCache
from ngkitty.cloudstore import CloudStoreHelper
from ngkitty.configuration import ConfigurationHelper
from ngkitty.dfs import DFSHelper
from ngkitty.extensions.str_ext import is_none_or_whitespace
from ngkitty.http import HttpHelper
from ngkitty.messaging import MessageQueueHelper
from requests.auth import (HTTPBasicAuth, HTTPDigestAuth)

import ngas2
from ngas2.management.monitor import Monitor
from ngas2.models import NameValuePair
from ngas2.models.agreement import (Agreement, AgreementStatus, MdnMode, AuthenticationScheme, ProxyScheme)
from ngas2.models.cert import (Certificate, CertificateType)
from ngas2.models.context import AS2Context
from ngas2.models.msg import (AS2Message, AS2MessageMdn, DirectionType, StatusType)
from ngas2.models.req import AsyncMdnReceive
from ngas2.protocol import (decode_as2_identity, generate_as2_message_id)
from ngas2.protocol.exception import (
    AS2Exception, AS2DeCompressException, AS2VerifySignatureException, AS2DecryptException
)
from ngas2.protocol.mdn import (MdnDecoder, MdnEncoder)
from ngas2.protocol.receive import ReceiveDecoder
from ngas2.protocol.send import SendEncoder
from ngas2.utils.smime import SMIMEHelper

logger = logging.getLogger(__name__)

'''
Partner Manager
'''


class PartnerManager(object):
    ngas2_business_id = "ngas2-business-id"
    ngas2_agreement_id = "ngas2-agreement-id"
    ngas2_data_dfs_path = "ngas2-data-dfs-path"

    ngas2_headers = [
        ngas2_business_id,
        ngas2_agreement_id,
        ngas2_data_dfs_path
    ]

    def __init__(self, headers, body):
        self.headers = headers
        self.body = body
        self.conf = ConfigurationHelper.get_settings()

    def _get_send_request(self):
        headers = {k.lower().replace('_', '-'): v for k, v in self.headers.items()}
        business_id = headers.get(self.ngas2_business_id)
        agreement_id = headers.get(self.ngas2_agreement_id)
        data_dfs_path = headers.get(self.ngas2_data_dfs_path)

        if is_none_or_whitespace(agreement_id):
            raise Exception("as2 agreement id is required")

        if is_none_or_whitespace(data_dfs_path) and is_none_or_whitespace(self.body):
            raise Exception("as2 data is required")

        return business_id, agreement_id, data_dfs_path

    def _get_primary_agreement(self, local_identity, trading_identity):
        if is_none_or_whitespace(trading_identity):
            raise Exception("as2-from is required")
        if is_none_or_whitespace(local_identity):
            raise Exception("as2-to is required")

        cache = InMemoryCache('PartnerManager', 'Agreement')
        cache_key = local_identity + '_' + trading_identity
        cache_value = cache[cache_key]
        if cache_value is not None:
            return cache_value

        try:
            condition = {
                'LocalIdentity': local_identity,
                'TradingIdentity': trading_identity,
                'IsPrimary': True
            }

            docs = CloudStoreHelper().find_documents(condition, Agreement)

            if docs is None or docs.records is None or len(docs.records) != 1:
                raise Exception("agreement is null or length invalid")

            agreement = docs.records[0]

            if agreement.status != AgreementStatus.active:
                raise Exception("agreement status invalid")
        except:
            raise Exception("get as2 agreement failed; due to {msg}".format(msg=sys.exc_info()[1]))

        self._build_outbound_agreement_certificate(agreement.outbound_agreement)

        self._build_inbound_agreement_certificate(agreement.inbound_agreement)

        cache[cache_key] = agreement

        return agreement

    def _get_agreement(self, agreement_id):
        cache = InMemoryCache('PartnerManager', 'Agreement')
        cache_key = agreement_id
        cache_value = cache[cache_key]
        if cache_value is not None:
            return cache_value

        try:
            agreement = CloudStoreHelper().get_document(agreement_id, Agreement)

            if agreement is None:
                raise Exception("agreement is null")

            if agreement.status != AgreementStatus.active:
                raise Exception("agreement status invalid")
        except:
            raise Exception("get as2 agreement failed; due to {msg}".format(msg=sys.exc_info()[1]))

        self._build_outbound_agreement_certificate(agreement.outbound_agreement)

        self._build_inbound_agreement_certificate(agreement.inbound_agreement)

        cache[cache_key] = agreement

        return agreement

    def _build_certificate(self, cert_id):
        if cert_id is None:
            return None

        try:
            certificate = CloudStoreHelper().get_document(cert_id, Certificate)

            if certificate is None:
                raise Exception("as2 certificate is null")

            if certificate.type == CertificateType.public:
                certificate.local_file_path = os.path.join(self.conf['app_root_dir'], "cert", "public",
                                                           certificate.thumbprint + ".pem")
            else:
                certificate.local_file_path = os.path.join(self.conf['app_root_dir'], "cert", "private",
                                                           certificate.thumbprint + ".pem")

            if not is_none_or_whitespace(certificate.pass_phrase):
                certificate.pass_phrase = SMIMEHelper.aes_decrypt(certificate.pass_phrase,
                                                                  self.conf['app_secure_key'])

            if os.path.exists(certificate.local_file_path):
                return certificate

            local_path = os.path.dirname(certificate.local_file_path)

            if not os.path.exists(local_path):
                os.makedirs(local_path)

            if not DFSHelper.download2file(certificate.dfs_file_path, certificate.local_file_path):
                raise Exception("download certificate file from dfs failed")

            return certificate
        except:
            raise Exception("get as2 certificate failed; certificate-id: {id}, due to {msg}".format(
                id=cert_id,
                msg=sys.exc_info()[1]))

    def _build_outbound_agreement_certificate(self, out_agreement):
        if out_agreement is None:
            raise Exception("agreement outbound setting is null")

        if out_agreement.message_encryption_certificate is None:
            out_agreement.message_encryption_certificate = self._build_certificate(
                out_agreement.message_encryption_certificate_id)

        if out_agreement.message_signature_certificate is None:
            out_agreement.message_signature_certificate = self._build_certificate(
                out_agreement.message_signature_certificate_id)

    def _build_inbound_agreement_certificate(self, in_agreement):
        if in_agreement is None:
            raise Exception("agreement inbound setting is null")

        if in_agreement.message_decrypt_certificate is None:
            in_agreement.message_decrypt_certificate = self._build_certificate(
                in_agreement.message_decrypt_certificate_id)

        if in_agreement.message_verify_certificate is None:
            in_agreement.message_verify_certificate = self._build_certificate(
                in_agreement.message_verify_certificate_id)

    '''
    create send message
    '''

    @staticmethod
    def _create_send_message():
        message_id = generate_as2_message_id()

        message = AS2Message(
            key=str(uuid.uuid4()).upper(),
            business_id=None,
            message_id=message_id,
            direction=DirectionType.outbound,
            agreement_id=None,
            local_identity=None,
            trading_identity=None,
            version=ngas2.__version__,
            received_headers=None,
            received_data_dfs_path=None,
            sent_headers=None,
            sent_data_dfs_path=None,
            message_status=None,
            message_mdn_status=StatusType.waiting,
            message_mdn=AS2MessageMdn(
                mdn_message_id=None,
                direction=DirectionType.inbound,
                original_message_id=message_id,
                mdn_status=StatusType.waiting,
                mdn_mode=None,
                mdn_validate_status=None,
                mdn_disposition_mode=None,
                mdn_disposition_type=None,
                mdn_disposition_modifier_code=None,
                mdn_disposition_modifier_value=None,
                mdn_disposition_description=None,
                mdn_headers=None,
                mdn_data_dfs_path=None,
                mdn_mic_digest=None,
                mdn_mic_algorithm=None,
                in_date=datetime.utcnow(),
                edit_date=datetime.utcnow()
            ),
            message_is_mic=False,
            message_mic_digest=None,
            message_mic_algorithm=None,
            message_trace_list=None,
            memo=None,
            in_date=datetime.utcnow(),
            edit_date=datetime.utcnow(),
            in_user=ngas2.__title__
        )

        return message

    '''
    build send message with agreement
    '''

    @staticmethod
    def _build_send_message(message, business_id, data_dfs_path, agreement):
        message.business_id = business_id
        message.agreement_id = agreement.id
        message.local_identity = agreement.local_identity
        message.trading_identity = agreement.trading_identity
        message.sent_edi_data_dfs_path = data_dfs_path
        message.message_mdn.mdn_mode = agreement.outbound_agreement.mdn_mode

    def _get_send_data(self, data_dfs_path):
        data = self.body
        if not is_none_or_whitespace(data_dfs_path):
            data = DFSHelper.download(data_dfs_path)
            if data is None:
                raise Exception("get send data from dfs failed")

        return data

    '''
        build auth
    '''

    @staticmethod
    def _build_auth(agreement):
        is_auth = agreement.outbound_agreement.is_auth
        authentication_scheme = agreement.outbound_agreement.authentication_scheme
        user_name = agreement.outbound_agreement.user_name
        user_password = agreement.outbound_agreement.user_password

        if is_auth:
            if authentication_scheme == AuthenticationScheme.basic:
                return HTTPBasicAuth(user_name, user_password)
            elif authentication_scheme == AuthenticationScheme.digest:
                return HTTPDigestAuth(user_name, user_password)

        return None

    '''
        build proxy
    '''

    @staticmethod
    def _build_proxy(agreement):
        is_proxy = agreement.outbound_agreement.is_proxy
        proxy_scheme = agreement.outbound_agreement.proxy_scheme
        proxy_setting = agreement.outbound_agreement.proxy_setting

        if is_proxy and proxy_scheme in ProxyScheme.all:
            return {proxy_scheme: proxy_setting}

        return None

    def _send_data(self, data, context):
        try:
            sender = SendEncoder(context.message.message_id,
                                 context.message.business_id,
                                 data,
                                 context)

            sent_headers, sent_body = sender.encode()

            target_url = context.agreement.outbound_agreement.target_url
            ssl_version = context.agreement.outbound_agreement.ssl_version

            auth = PartnerManager._build_auth(context.agreement)
            proxies = PartnerManager._build_proxy(context.agreement)

            customer_http_headers = context.agreement.outbound_agreement.customer_http_headers
            if customer_http_headers is not None:
                extend_headers = {item.name: item.value for item in customer_http_headers if item.name is None}
                sent_headers.update(extend_headers)

            context.message.sent_headers = [NameValuePair(name=k, value=v) for k, v in sent_headers.items()]

            if context.agreement.profiler_enabled:
                status, url = self._upload_data_to_dfs("{key}.out".format(key=context.message.key), sent_body)
                context.message.sent_data_dfs_path = url

            context.message.message_is_mic = sender.is_mic
            context.message.message_mic_digest = sender.mic_digest
            context.message.message_mic_algorithm = sender.mic_algorithm

            resp = HttpHelper.post(url=target_url,
                                   data=sent_body,
                                   headers=sent_headers,
                                   proxies=proxies,
                                   auth=auth,
                                   verify=False
                                   )

            status_code, received_headers, received_body = resp.status_code, dict(resp.headers), resp.content

            context.message.received_status_code = status_code
            context.message.received_headers = [NameValuePair(name=k, value=v) for k, v in received_headers.items()]

            if context.agreement.profiler_enabled and not is_none_or_whitespace(received_body):
                status, url = self._upload_data_to_dfs("{key}.in".format(key=context.message.key), received_body)
                context.message.received_data_dfs_path = url

            if status_code != requests.codes.ok:
                resp.raise_for_status()

            context.message.message_status = StatusType.successful

            return received_headers, received_body
        except AS2Exception:
            raise
        except:
            logger.exception(
                "send data failed; business-id: {business_id}, message-id: {message_id}".format(
                    business_id=context.message.business_id,
                    message_id=context.message.message_id))
            raise Exception("send data failed; due to: {message}".format(
                message=str(sys.exc_info()[1]))
            )

    def _upload_data_to_dfs(self, name, data):
        upload_url = furl(self.conf['dfs_upload_base_url'])
        upload_url.path.segments = [self.conf['dfs_group'], self.conf['dfs_type'], name]

        upload_status = DFSHelper.upload(upload_url.url, data)

        download_url = furl(self.conf['dfs_download_base_url'])
        download_url.path.segments = [self.conf['dfs_group'], self.conf['dfs_type'], name]

        return upload_status, download_url.url

    def _receive_sync_mdn(self, headers, body, context):
        context.message.message_mdn.mdn_headers = [NameValuePair(name=k, value=v) for k, v in headers.items()]

        status, url = self._upload_data_to_dfs("{key}.mdn".format(key=context.message.key), body)
        context.message.message_mdn.mdn_data_dfs_path = url

        try:
            mdn_decoder = MdnDecoder(headers, body, MdnMode.sync, context)

            mdn_validate_result = mdn_decoder.decode()

            context.message.message_mdn_status = StatusType.successful
            context.message.message_mdn.mdn_status = StatusType.successful

            context.message.message_mdn.mdn_validate_status = mdn_validate_result
            context.message.message_status = mdn_validate_result

            context.message.message_mdn.mdn_message_id = mdn_decoder.mdn_message_id
            context.message.message_mdn.mdn_disposition_mode = mdn_decoder.disposition_mode
            context.message.message_mdn.mdn_disposition_type = mdn_decoder.disposition_type
            context.message.message_mdn.mdn_disposition_modifier_code = mdn_decoder.disposition_modifier_code
            context.message.message_mdn.mdn_disposition_modifier_value = mdn_decoder.disposition_modifier_value
            context.message.message_mdn.mdn_disposition_description = mdn_decoder.disposition_description

            context.message.message_mdn.mdn_mic_digest = mdn_decoder.mic_digest
            context.message.message_mdn.mdn_mic_algorithm = mdn_decoder.mic_algorithm
        except AS2Exception:
            context.message.message_mdn_status = StatusType.failed
            context.message.message_mdn.mdn_status = StatusType.failed
            raise
        except:
            context.message.message_mdn_status = StatusType.failed
            context.message.message_mdn.mdn_status = StatusType.failed
            logger.exception(
                "mdn decode failed; business-id: {business_id}, message-id: {message_id}".format(
                    business_id=context.message.business_id,
                    message_id=context.message.message_id))
            raise Exception('mdn decode failed')

    def _receive_async_mdn(self, headers, body, context):
        mdn_dfs_name = "{key}.mdn".format(key=str(uuid.uuid4()).upper())
        status, url = self._upload_data_to_dfs(mdn_dfs_name, body)
        mdn_data_dfs_path = url

        message_mdn = AS2MessageMdn(
            mdn_headers=[NameValuePair(name=k, value=v) for k, v in headers.items()],
            mdn_data_dfs_path=mdn_data_dfs_path,
            mdn_status=StatusType.successful,
            direction=DirectionType.inbound,
            mdn_mode=MdnMode.async,
            in_date=datetime.utcnow(),
            edit_date=datetime.utcnow()
        )

        mdn_decoder = MdnDecoder(headers, body, MdnMode.async, context)
        try:
            mdn_validate_result = mdn_decoder.decode()

            message_mdn.mdn_validate_status = mdn_validate_result
            message_mdn.mdn_message_id = mdn_decoder.mdn_message_id
            message_mdn.original_message_id = mdn_decoder.original_message_id
            message_mdn.mdn_disposition_mode = mdn_decoder.disposition_mode
            message_mdn.mdn_disposition_type = mdn_decoder.disposition_type
            message_mdn.mdn_disposition_modifier_code = mdn_decoder.disposition_modifier_code
            message_mdn.mdn_disposition_modifier_value = mdn_decoder.disposition_modifier_value
            message_mdn.mdn_disposition_description = mdn_decoder.disposition_description
            message_mdn.mdn_mic_digest = mdn_decoder.mic_digest
            message_mdn.mdn_mic_algorithm = mdn_decoder.mic_algorithm
        except:
            message_mdn.mdn_message_id = mdn_decoder.mdn_message_id
            message_mdn.memo = str(sys.exc_info()[1])
            message_mdn.mdn_status = StatusType.failed
            message_mdn.mdn_validate_status = StatusType.failed

        message_trace_list = context.trace_info_list

        message = AsyncMdnReceive(message_mdn=message_mdn, message_trace_list=message_trace_list)

        mq_setting = ConfigurationHelper.get_mq_setting('inbound_async_mdn_queue')

        PartnerManager.send_to_message_queue(
            mq_setting.queue_name,
            mq_setting.password,
            message,
            match_tag=mq_setting.serialization_match_tag
        )

    @staticmethod
    def send_to_message_queue(message_name, password, message, headers=None, match_tag=True):
        rst = MessageQueueHelper().send_message_json(
            message,
            message_name,
            password,
            additional_headers=headers,
            serialization_match_tag=match_tag)

        if rst.succeeded:
            return

        logger.error('send message [{0}] to queue failed'.format(message.message_id))
        try:
            Monitor.save_failed_message(message_name, password, headers, message, match_tag)
        except:
            logger.exception('save message of queue to disk failed')

    @staticmethod
    def save_event_message(message):
        CloudStoreHelper().save_document(message)

    '''
        save & mapping inbound async mdn message
    '''

    @staticmethod
    def save_mdn_event_message(async_mdn):
        message_mdn = async_mdn.message_mdn
        message_trace_list = async_mdn.message_trace_list
        original_message_id = message_mdn.original_message_id
        if original_message_id is None:
            original_message_id = ''

        condition = {
            'MessageID': original_message_id
        }

        docs = CloudStoreHelper().find_documents(condition,
                                                 AS2Message
                                                 )

        if docs is None or docs.records is None or len(docs.records) != 1:
            raise Exception("failed to find original-message")

        message = docs.records[0]

        message.message_mdn = message_mdn
        message.message_status = message_mdn.mdn_validate_status
        message.message_mdn_status = message_mdn.mdn_status

        if message.message_trace_list is None:
            message.message_trace_list = []
        if message_trace_list is not None:
            message.message_trace_list.extend(message_trace_list)

        message.edit_date = datetime.utcnow()

        CloudStoreHelper().save_document(message)

        return message

    def send_async_mdn(self, message):
        agreement = self._get_agreement(message.agreement_id)

        context = AS2Context(agreement, message)

        mdn_headers, mdn_body = self._mdn_encode(context)

        if message.message_trace_list is None:
            message.message_trace_list = []
        if context.trace_info_list is not None:
            message.message_trace_list.extend(context.trace_info_list)

        message.message_mdn.edit_date = datetime.utcnow()
        message.edit_date = datetime.utcnow()

        CloudStoreHelper().save_document(message)

        resp = HttpHelper.post(agreement.inbound_agreement.async_mdn_url
                               , data=mdn_body
                               , headers=mdn_headers
                               , verify=False)

        status_code, received_headers, received_body = resp.status_code, dict(resp.headers), resp.content

        if status_code != requests.codes.ok:
            resp.raise_for_status()

        return message

    def receive_async_mdn(self, agreement_id=None):
        if is_none_or_whitespace(agreement_id):
            headers = {k.lower().replace('_', '-'): v for k, v in self.headers.items()}
            trading_identity = decode_as2_identity(headers.get('as2-from', ''))
            local_identity = decode_as2_identity(headers.get('as2-to', ''))
            agreement = self._get_primary_agreement(local_identity, trading_identity)
        else:
            agreement = self._get_agreement(agreement_id)

        context = AS2Context(agreement, None)

        self._receive_async_mdn(self.headers,
                                self.body,
                                context)

    def send(self):
        message = PartnerManager._create_send_message()
        context = None

        try:
            business_id, agreement_id, data_dfs_path = self._get_send_request()

            agreement = self._get_agreement(agreement_id)

            PartnerManager._build_send_message(message, business_id, data_dfs_path, agreement)

            context = AS2Context(agreement, message)

            data = self._get_send_data(data_dfs_path)

            received_headers, received_body = self._send_data(data, context)

            if agreement.outbound_agreement.mdn_mode == MdnMode.sync:
                self._receive_sync_mdn(received_headers, received_body, context)
        except:
            message.message_status = StatusType.failed
            message.memo = str(sys.exc_info()[1])
        finally:
            if context is not None:
                message.message_trace_list = context.trace_info_list
            mq_setting = ConfigurationHelper.get_mq_setting('outbound_message_queue')
            headers = {
                'EventMessageKey': 'N/A' if message.key is None else message.key,
                'LocalIdentity': 'N/A' if message.local_identity is None else message.local_identity,
                'TradingIdentity': 'N/A' if message.trading_identity is None else message.trading_identity,
                'Version': 'N/A' if message.version is None else message.version
            }
            self.send_to_message_queue(mq_setting.queue_name,
                                       mq_setting.password,
                                       message,
                                       headers=headers,
                                       match_tag=mq_setting.serialization_match_tag)

        return message

    '''
    create received message
    '''

    def _create_received_message(self):
        mdn_message_id = generate_as2_message_id()

        message = AS2Message(
            key=str(uuid.uuid4()).upper(),
            business_id=None,
            message_id=None,
            direction=DirectionType.inbound,
            agreement_id=None,
            local_identity=None,
            trading_identity=None,
            version=ngas2.__version__,
            received_headers=[NameValuePair(name=k, value=v) for k, v in self.headers.items()],
            received_data_dfs_path=None,
            sent_headers=None,
            sent_data_dfs_path=None,
            message_status=None,
            message_mdn=AS2MessageMdn(
                mdn_message_id=mdn_message_id,
                direction=DirectionType.outbound,
                original_message_id=None,
                mdn_status=StatusType.waiting,
                mdn_mode=None,
                mdn_validate_status=None,
                mdn_disposition_mode=None,
                mdn_disposition_type=None,
                mdn_disposition_modifier_code=None,
                mdn_disposition_modifier_value=None,
                mdn_disposition_description=None,
                mdn_headers=None,
                mdn_data_dfs_path=None,
                mdn_mic_digest=None,
                mdn_mic_algorithm=None,
                in_date=datetime.utcnow(),
                edit_date=datetime.utcnow()
            ),
            message_mdn_status=StatusType.waiting,
            message_is_mic=False,
            message_mic_digest=None,
            message_mic_algorithm=None,
            message_trace_list=None,
            memo=None,
            in_date=datetime.utcnow(),
            edit_date=datetime.utcnow(),
            in_user=ngas2.__title__
        )

        return message

    def _build_received_as2_context(self, id, message):
        if is_none_or_whitespace(id):
            headers = {k.lower().replace('_', '-'): v for k, v in self.headers.items()}
            trading_identity = decode_as2_identity(headers.get('as2-from', ''))
            local_identity = decode_as2_identity(headers.get('as2-to', ''))
            agreement = self._get_primary_agreement(local_identity, trading_identity)
        else:
            agreement = self._get_agreement(id)

        message.local_identity = agreement.local_identity
        message.trading_identity = agreement.trading_identity
        message.agreement_id = agreement.id

        return AS2Context(agreement, message)

    def _decode_received_content(self, context):
        decoder = ReceiveDecoder(self.headers, self.body, context)

        try:
            decoder.decode()
        except AS2Exception:
            raise
        except:
            logger.exception("received content decode failed, headers={headers}",
                             headers=str(self.headers))
            raise Exception('received content decode failed')
        finally:
            context.message.message_id = decoder.message_id
            context.message.business_id = decoder.message_id
            context.message.message_is_mic = decoder.is_mic
            context.message.message_mic_digest = decoder.mic_digest
            context.message.message_mic_algorithm = decoder.mic_algorithm

            context.message.message_mdn.original_message_id = decoder.message_id
            context.message.message_mdn.mdn_mic_digest = decoder.mic_digest
            context.message.message_mdn.mdn_mic_algorithm = decoder.mic_algorithm

        dat_dfs_name = "{key}.edi".format(key=context.message.key)
        status, url = self._upload_data_to_dfs(dat_dfs_name, decoder.content)
        if not status:
            raise Exception('received content upload to dfs failed')

        context.message.received_edi_data_type = decoder.content_type
        context.message.received_edi_data_charset = decoder.content_charset
        context.message.received_edi_data_length = decoder.content_length
        context.message.received_edi_data_hash = decoder.content_hash
        context.message.received_edi_data_dfs_path = url

    def _mdn_encode(self, context):
        mdn_encoder = MdnEncoder(context)

        headers, body = mdn_encoder.encode()

        context.message.message_mdn_status = StatusType.successful
        context.message.message_mdn.mdn_status = StatusType.successful

        context.message.message_status = mdn_encoder.validate_status
        context.message.message_mdn.mdn_validate_status = mdn_encoder.validate_status

        context.message.message_mdn.mdn_headers = [NameValuePair(name=k, value=v) for k, v in headers.items()]

        status, url = self._upload_data_to_dfs("{key}.mdn".format(key=context.message.key), body)
        context.message.message_mdn.mdn_data_dfs_path = url

        return headers, body

    def receive(self, agreement_id=None):
        message = self._create_received_message()
        context = None
        is_request_mdn = None
        mdn_mode = None

        try:
            context = self._build_received_as2_context(agreement_id, message)

            if context.agreement.profiler_enabled:
                status, url = self._upload_data_to_dfs("{key}.in".format(key=message.key), self.body)
                message.received_data_dfs_path = url

            is_request_mdn = context.agreement.inbound_agreement.is_request_mdn
            mdn_mode = context.agreement.inbound_agreement.mdn_mode

            message.message_mdn.mdn_mode = mdn_mode
            message.message_mdn.mdn_disposition_mode = 'automatic-action/MDN-sent-automatically'
            message.message_mdn.mdn_disposition_type = 'processed'

            try:
                self._decode_received_content(context)

                message.message_status = StatusType.successful
            except AS2DecryptException as ex:
                message.message_status = StatusType.failed
                message.message_mdn.mdn_disposition_modifier_code = 'error'
                message.message_mdn.mdn_disposition_modifier_value = 'decryption-failed'
                message.memo = ex.msg
            except AS2VerifySignatureException as ex:
                message.message_status = StatusType.failed
                message.message_mdn.mdn_disposition_modifier_code = 'error'
                message.message_mdn.mdn_disposition_modifier_value = 'integrity-check-failed'
                message.memo = ex.msg
            except AS2DeCompressException as ex:
                message.message_status = StatusType.failed
                message.message_mdn.mdn_disposition_modifier_code = 'error'
                message.message_mdn.mdn_disposition_modifier_value = 'decompression-failed'
                message.memo = ex.msg
            except:
                message.message_status = StatusType.failed
                message.message_mdn.mdn_disposition_modifier_code = 'error'
                message.message_mdn.mdn_disposition_modifier_value = 'unexpected-processing-error'
                message.memo = str(sys.exc_info()[1])

            if is_request_mdn and mdn_mode == MdnMode.sync:
                mdn_headers, mdn_body = self._mdn_encode(context)
                message.sent_headers = context.message.message_mdn.mdn_headers
                message.sent_data_dfs_path = context.message.message_mdn.mdn_data_dfs_path

                return mdn_headers, mdn_body

            return None, 'as2 message has been received'
        except:
            logger.exception('as2 message receive failed')
            message.message_status = StatusType.failed
            message.memo = str(sys.exc_info()[1])
            raise Exception('unexpected processing error')
        finally:
            if context is not None:
                message.message_trace_list = context.trace_info_list

            headers = {
                'EventMessageKey': 'N/A' if message.key is None else message.key,
                'IsRequestMdn': 'N/A' if is_request_mdn is None else is_request_mdn,
                'MdnMode': 'N/A' if mdn_mode is None else mdn_mode,
                'LocalIdentity': 'N/A' if message.local_identity is None else message.local_identity,
                'TradingIdentity': 'N/A' if message.trading_identity is None else message.trading_identity,
                'Version': 'N/A' if message.version is None else message.version
            }

            mq_setting = ConfigurationHelper.get_mq_setting('inbound_message_queue')

            PartnerManager.send_to_message_queue(mq_setting.queue_name,
                                                 mq_setting.password,
                                                 message,
                                                 headers,
                                                 match_tag=mq_setting.serialization_match_tag
                                                 )
