# -*- coding: utf-8 -*-

import sys
from bottle import (post, request)
from ngas2 import logger
from ngas2.management.partner import PartnerManager
from ngas2.models.resp import (GeneralResponse, MessageResponse)
from ngas2.services import (get_request_body,
                            build_response)


@post('/<domain>/send')
def post_message_send(domain):
    logger.debug('received as2 sent request from domain:{0} , uri:{1} ,query_string:{2}'
                 .format(domain,
                         request.url,
                         request.query_string))
    try:
        headers = dict(request.headers)
        body = get_request_body()

        mgr = PartnerManager(headers, body)

        message = mgr.send()

        return build_response(200, resp_entity=MessageResponse(
            is_succeed=True,
            message=message))
    except:
        logger.exception('message send failed')
        return build_response(500, resp_entity=GeneralResponse(is_succeed=False,
                                                               error_message=str(sys.exc_info()[1])))


@post('/<domain>/receive')
def post_message_receive(domain):
    logger.debug('received as2 message from domain:{0} , uri:{1} ,query_string:{2}'
                 .format(domain,
                         request.url,
                         request.query_string))
    try:
        headers = dict(request.headers)
        body = get_request_body()

        mgr = PartnerManager(headers, body)

        headers, body = mgr.receive()

        return build_response(200, headers, body)
    except:
        logger.exception('message receive failed')
        return build_response(500, None, str(sys.exc_info()[1]))


@post('/<domain>/receive/<id>')
def post_message_receive_by_id(domain, id):
    logger.debug('received as2 message from domain:{0} , uri:{1} ,query_string:{2}'
                 .format(domain,
                         request.url,
                         request.query_string))
    try:
        headers = dict(request.headers)
        body = get_request_body()

        mgr = PartnerManager(headers, body)

        headers, body = mgr.receive(id)

        return build_response(200, headers, body)
    except:
        logger.exception('message receive via agreement-id failed')
        return build_response(500, None, str(sys.exc_info()[1]))
