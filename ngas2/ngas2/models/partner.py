# -*- coding: utf-8 -*-

from ngkitty.model import (Model, StringField, DatetimeField)

'''
Partner Type
'''


class PartnerType(object):
    all = ["local", "trading"]
    local = all[0]
    trading = all[1]


'''
Partner
'''


class Partner(Model):
    __collection__ = "partner"

    id = StringField('PartnerID')
    name = StringField('PartnerName')
    type = StringField("PartnerType")
    description = StringField('Description')
    in_date = DatetimeField('InDate')
    in_user = StringField('InUser')
    edit_date = DatetimeField('EditDate')
    edit_user = StringField('EditUser')

    def __str__(self):
        return "Partner(id={id}, name={name}, type={type})".format(id=self.id, name=self.name, type=self.type)
