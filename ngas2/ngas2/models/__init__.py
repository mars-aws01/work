# -*- coding: utf-8 -*-

from ngkitty.model import (Model, StringField)

'''
    Name Value Pair
'''


class NameValuePair(Model):
    name = StringField('Name')
    value = StringField('Value')
