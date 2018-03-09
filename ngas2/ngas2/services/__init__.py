# -*- coding: utf-8 -*-

import bottle
from bottle import (request, response, abort)
from ngkitty.serialization import (jsonserializer, xmlserializer)
from ngas2.models.resp import GeneralResponse
from distutils.util import strtobool


class SimpleWaitressServer(bottle.ServerAdapter):
    def run(self, handler):
        from waitress import serve
        serve(handler, host=self.host, port=self.port, **self.options)


def get_request_body():
    if request.chunked:
        return request.environ['wsgi.input'].read()
    else:
        return request.body.read()


def get_request_entity(req_type):
    body = get_request_body()
    content_type = request.content_type
    match_tag = strtobool(request.query.get('match_tag', 'true'))

    try:
        if 'application/xml' == content_type:
            return xmlserializer.deserialize(body, entity_type=req_type, match_tag=match_tag)

        return jsonserializer.deserialize(body, entity_type=req_type, match_tag=match_tag)
    except:
        abort(400)


'''
    build response
'''


def build_response(status, headers=None, body=None, resp_entity=None):
    response.status = status

    if headers is not None:
        response.content_type = headers.get('Content-Type', 'text/plain')
        response.headers.update({k: headers[k] for k in headers})
    else:
        response.content_type = 'text/plain'

    if body is not None:
        response.body = body
    elif resp_entity is not None and isinstance(resp_entity, GeneralResponse):
        content_type = request.get_header('accept')
        match_tag = strtobool(request.query.get('match_tag', 'true'))
        if 'application/xml' == content_type:
            response.content_type = 'application/xml'
            response.body = xmlserializer.serialize(resp_entity, match_tag)
        else:
            response.content_type = 'application/json'
            response.body = jsonserializer.serialize(resp_entity, match_tag)

    if response.body is not None:
        response.content_length = len(response.body)

    return response
