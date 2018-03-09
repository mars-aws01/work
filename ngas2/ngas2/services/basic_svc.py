# -*- coding: utf-8 -*-

import sys
from bottle import (get, post, request, response, hook, error)

import ngas2
from ngas2 import logger
from ngas2.management.partner import PartnerManager
from ngas2.models.msg import AS2Message
from ngas2.models.req import AsyncMdnReceive
from ngas2.models.resp import (GeneralResponse, MessageResponse)
from ngas2.services import (get_request_entity, build_response)


# hook header for all response
@hook('after_request')
def enable_ext_response_header():
    response.headers['x-powered-by'] = r"{title}/{version}".format(title=ngas2.__title__,
                                                                   version=ngas2.__version__)


@get('/')
def home():
    return "{desc} ({version}) work...".format(desc=ngas2.__description__, version=ngas2.__version__)


@error(400)
def error_handle_400(error):
    return "Bad Request (400)"


@error(404)
def error_handle_404(error):
    return "Not Found (404)"


@error(405)
def error_handle_405(error):
    return "Method Not Allowed (405)"


@error(500)
def error_handle_500(error):
    return "Internal Server Error (500)"


@post('/<domain>/event-message')
def post_message_save(domain):
    logger.debug('received internal event-message from domain:{0} , uri:{1} ,query_string:{2}'
                 .format(domain,
                         request.url,
                         request.query_string))
    try:
        message = get_request_entity(AS2Message)

        PartnerManager.save_event_message(message)

        return build_response(200, resp_entity=GeneralResponse(is_succeed=True))
    except:
        logger.exception('event-message store failed')
        return build_response(500, resp_entity=GeneralResponse(is_succeed=False,
                                                               error_message=str(sys.exc_info()[1])))


@post('/<domain>/mdn-event-message')
def post_mdn_message_save(domain):
    logger.debug('received internal mdn-event-message from domain:{0} , uri:{1} ,query_string:{2}'
                 .format(domain,
                         request.url,
                         request.query_string))
    try:
        async_mdn = get_request_entity(AsyncMdnReceive)

        message = PartnerManager.save_mdn_event_message(async_mdn)

        return build_response(200, resp_entity=MessageResponse(is_succeed=True, message=message))
    except:
        logger.exception('mdn-event-message store failed')
        return build_response(500, resp_entity=GeneralResponse(is_succeed=False,
                                                               error_message=str(sys.exc_info()[1])))
