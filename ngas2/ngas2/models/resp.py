# -*- coding: utf-8 -*-

from ngkitty.model import (Model, StringField, BooleanField, ModelField)
from ngas2.models.msg import AS2Message


class GeneralResponse(Model):
    is_succeed = BooleanField('IsSucceed', default_value=True)
    error_message = StringField('ErrorMessage')


class MessageResponse(GeneralResponse):
    message = ModelField('Message', AS2Message)
