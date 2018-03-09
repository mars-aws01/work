# -*- coding: utf-8 -*-

from ngkitty.model import (Model, ModelField, StringField, DatetimeField, BooleanField, ListField)
from ngas2.models import NameValuePair
from ngas2.models.cert import Certificate

'''
Agreement Status
'''


class AgreementStatus(object):
    all = ["active", "inactive"]
    active = all[0]
    inactive = all[1]


'''
Message Content Type
'''


class MessageContentType(object):
    all = ["application/edi-x12", "text/plain", "application/xml", "application/edifact", "application/edi-consent"]
    edi_x12 = all[0]
    text_plain = all[1]
    xml = all[2]
    edi_fact = all[3]
    edi_consent = all[4]


'''
MDN Mode
'''


class MdnMode(object):
    all = ["sync", "async"]
    sync = all[0]
    async = all[1]


'''
    Encryption Algorithm
'''


class EncryptionAlgorithm(object):
    all = ["rc2_cbc", "rc2_40_cbc", "rc2_64_cbc", "des_ede3_cbc", "aes_128_cbc", "aes_192_cbc", "aes_256_cbc"]
    rc2 = all[0]
    rc2_40 = all[1]
    rc2_64 = all[2]
    des_3 = all[3]
    aes_128 = all[4]
    aes_192 = all[5]
    aes_256 = all[6]


'''
    Authentication Scheme
'''


class AuthenticationScheme(object):
    all = ["basic", "digest"]
    basic = all[0]
    digest = all[1]


'''
    Proxy Scheme
'''


class ProxyScheme(object):
    all = ["http", "https"]
    http = all[0]
    https = all[1]


'''
    Signature Algorithm
'''


class SignatureAlgorithm(object):
    all = ["md5", "sha1", "sha224", "sha256", "sha384", "sha512"]
    md5 = all[0]
    sha_1 = all[1]
    sha_224 = all[2]
    sha_256 = all[3]
    sha_384 = all[4]
    sha_512 = all[5]


'''
inbound Agreement
'''


class InboundAgreement(Model):
    is_signed = BooleanField('IsSigned')
    is_compressed = BooleanField('IsCompressed')
    is_encrypted = BooleanField('IsEncrypted')

    message_decrypt_certificate_id = StringField('DecryptCertificateID')
    message_decrypt_certificate = ModelField('DecryptCertificate', Certificate)

    message_verify_certificate_id = StringField('VerifyCertificateID')
    message_verify_certificate = ModelField('VerifyCertificate', Certificate)

    message_content_type = StringField('ContentType')
    is_request_mdn = BooleanField('IsRequestMdn')

    mdn_confirmation_text = StringField('MdnConfirmationText')

    mdn_mode = StringField('MdnMode')
    is_mdn_signed = BooleanField('IsMdnSigned')
    mdn_signature_algorithm = StringField('MdnSignatureAlgorithm')
    async_mdn_url = StringField('AsyncMdnUrl')


'''
outbound Agreement
'''


class OutboundAgreement(Model):
    is_signed = BooleanField('IsSigned')
    is_compressed = BooleanField('IsCompressed')
    is_encrypted = BooleanField('IsEncrypted')

    target_url = StringField('TargetUrl')

    message_encryption_certificate_id = StringField('EncryptionCertificateID')
    message_encryption_algorithm = StringField('EncryptionAlgorithm')
    message_encryption_certificate = ModelField('EncryptionCertificate', Certificate)

    message_signature_certificate_id = StringField('SignatureCertificateID')
    message_signature_algorithm = StringField('SignatureAlgorithm')
    message_signature_certificate = ModelField('SignatureCertificate', Certificate)

    message_content_type = StringField('ContentType')
    is_request_mdn = BooleanField('IsRequestMdn')

    mdn_mode = StringField('MdnMode')
    is_mdn_signed = BooleanField('IsMdnSigned')
    mdn_signature_algorithm = StringField('MdnSignatureAlgorithm')
    async_mdn_url = StringField('AsyncMdnUrl')
    disposition_notification_to = StringField('DispositionNotificationTo')

    is_auth = BooleanField('IsAuth')
    authentication_scheme = StringField('AuthenticationScheme')
    user_name = StringField('UserName')
    user_password = StringField('UserPassword')

    is_proxy = BooleanField('IsProxy')
    proxy_scheme = StringField('ProxyScheme')
    proxy_setting = StringField('ProxySetting')

    ssl_version = StringField('SslVersion')

    customer_http_headers = ListField('CustomerHttpHeaderList'
                                      , NameValuePair
                                      , 'customer_http_header'
                                      , 'CustomerHttpHeader')


'''
AS2 Agreement
'''


class Agreement(Model):
    __collection__ = "agreement"

    id = StringField('AgreementID')
    name = StringField('AgreementName')
    description = StringField('Description')
    is_primary = BooleanField('IsPrimary')
    local_identity = StringField('LocalIdentity')
    trading_identity = StringField('TradingIdentity')
    local_partner_id = StringField('LocalPartnerID')
    trading_partner_id = StringField('TradingPartnerID')
    profiler_enabled = BooleanField('ProfilerEnabled', default_value=False)
    inbound_agreement = ModelField('InboundAgreement', InboundAgreement)
    outbound_agreement = ModelField('OutboundAgreement', OutboundAgreement)
    status = StringField('AgreementStatus')
    in_date = DatetimeField('InDate')
    in_user = StringField('InUser')
    edit_date = DatetimeField('EditDate')
    edit_user = StringField('EditUser')
