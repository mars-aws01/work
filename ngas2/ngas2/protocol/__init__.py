# -*- coding: utf-8 -*-

# ==================================
# *author*:  Terry
# *function description*:
# ==================================

__author__ = "Terry.Y.Ren"

import re
import email
import platform
import uuid

'''
as2 identity encoding
'''


def encode_as2_identity(name):
    if name is None:
        raise ValueError('name is required')

    if re.search(r'[\\" ]', name, re.M):
        return '"' + email.utils.quote(name) + '"'
    else:
        return name


'''
as2 identity decoding
'''


def decode_as2_identity(name):
    if name is None:
        raise ValueError('name is required')

    return email.utils.unquote(name)


'''
generate as2 message id
'''


def generate_as2_message_id():
    identity = str(uuid.uuid4()).upper()
    host = platform.node()
    return '<{identity}@{host}>'.format(identity=identity,
                                        host=host)
