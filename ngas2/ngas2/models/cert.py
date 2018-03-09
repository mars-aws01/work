# -*- coding: utf-8 -*-

from ngkitty.model import (Model, StringField, BooleanField)

'''
Certificate Type
'''


class CertificateType(object):
    all = ["public", "private"]
    public = all[0]
    private = all[1]


'''
Certificate
'''


class Certificate(Model):
    __collection__ = "certificate"

    id = StringField('CertificateID')
    subject = StringField('Subject')
    thumbprint = StringField('Thumbprint')
    type = StringField('CertificateType')
    description = StringField('Description')
    dfs_file_path = StringField('DFSFilePath')
    local_file_path = StringField('LocalFilePath')
    dfs_ca_file_path = StringField('DFSCAFilePath')
    local_ca_file_path = StringField('LocalCAFilePath')
    pass_phrase = StringField('PassPhrase')
    is_need_verify = BooleanField('IsNeedVerify')
