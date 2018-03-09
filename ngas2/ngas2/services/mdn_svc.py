# -*- coding: utf-8 -*-

import sys
from bottle import (post, request)
from ngas2 import logger
from ngas2.models.msg import AS2Message
from ngas2.models.resp import (GeneralResponse, MessageResponse)
from ngas2.management.partner import PartnerManager
from ngas2.services import (get_request_body,
                            get_request_entity,
                            build_response)


@post('/<domain>/mdn/send')
def post_mdn_message_send(domain):
    logger.debug('received mdn sent request from domain:{0} , uri:{1} ,query_string:{2}'
                 .format(domain,
                         request.url,
                         request.query_string))
    try:
        headers = dict(request.headers)
        original_message = get_request_entity(AS2Message)

        mgr = PartnerManager(headers, None)

        message = mgr.send_async_mdn(original_message)

        return build_response(200, resp_entity=MessageResponse(
            is_succeed=True,
            message=message))
    except:
        logger.exception('mdn send failed')
        return build_response(500, resp_entity=GeneralResponse(is_succeed=False,
                                                               error_message=str(sys.exc_info()[1])))


@post('/<domain>/mdn/receive')
def post_async_mdn_receive(domain):
    logger.debug('received mdn from domain:{0} , uri:{1} ,query_string:{2}'
                 .format(domain,
                         request.url,
                         request.query_string))
    try:
        headers = dict(request.headers)
        body = get_request_body()

        mgr = PartnerManager(headers, body)

        mgr.receive_async_mdn()

        return build_response(200, None, 'mdn received ok')
    except:
        logger.exception('mdn receive failed')
        return build_response(500, None, str(sys.exc_info()[1]))


@post('/<domain>/mdn/receive/<id>')
def post_async_mdn_receive_by_id(domain, id):
    logger.debug('received mdn from domain:{0} , uri:{1} ,query_string:{2}'
                 .format(domain,
                         request.url,
                         request.query_string))
    try:
        headers = dict(request.headers)
        body = get_request_body()

        mgr = PartnerManager(headers, body)

        mgr.receive_async_mdn(id)

        return build_response(200, None, 'mdn received ok')
    except:
        logger.exception('mdn receive via agreement-id failed')
        return build_response(500, None, str(sys.exc_info()[1]))
