# -*- coding: utf-8 -*-

import email
import unittest
import os

from ngas2.models.agreement import (MdnMode, Agreement, OutboundAgreement, InboundAgreement, AgreementStatus,
                                    MessageContentType,
                                    EncryptionAlgorithm, SignatureAlgorithm)
from ngas2.models.cert import (Certificate, CertificateType)
from ngas2.models.msg import (AS2Message)
from ngas2.models.context import AS2Context

'''
Protocol Test Base
'''


class ProtocolTestBase(unittest.TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def _get_mock_file(self, name):
        return os.path.abspath(os.path.join(os.path.dirname(__file__), name))

    def _get_public_cert_path(self, name):
        return os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'cert', 'public', name))

    def _get_private_cert_path(self, name):
        return os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'cert', 'private', name))

    '''
       get as2 context for common unit-test
       '''

    def get_as2_context(self):
        pb_cert = Certificate(id="1",
                              subject="AS2.SelfTesting.Newegg.com",
                              thumbprint="B7A5ED759898822397CCCE96BD493D3203CE83AC",
                              type=CertificateType.public,
                              description="Newegg Production Test Cert",
                              dfs_file_path="http://neg-app-img/EaaS/Certificate/B7A5ED759898822397CCCE96BD493D3203CE83AC.cer",
                              local_file_path=self._get_public_cert_path(
                                  "B7A5ED759898822397CCCE96BD493D3203CE83AC.pem"),
                              dfs_ca_file_path=None,
                              local_ca_file_path=None,
                              pass_phrase=None,
                              is_need_verify=True
                              )

        pr_cert = Certificate(id="2",
                              subject="Tp1 private",
                              thumbprint="CB17BDDF500C14A049C3A18D6A292174B27F198E",
                              type=CertificateType.private,
                              description="TP1 private Cert",
                              dfs_file_path="http://neg-app-img/EaaS/Certificate/CB17BDDF500C14A049C3A18D6A292174B27F198E.cer",
                              local_file_path=self._get_private_cert_path(
                                  "CB17BDDF500C14A049C3A18D6A292174B27F198E.pem"),
                              dfs_ca_file_path=None,
                              local_ca_file_path=None,
                              pass_phrase="123456",
                              is_need_verify=True
                              )

        out_agr = OutboundAgreement(is_signed=True,
                                    is_compressed=False,
                                    is_encrypted=True,
                                    target_url="http://10.16.86.29:9009/as2-test/receive",
                                    message_encryption_certificate=pb_cert,
                                    message_encryption_algorithm=EncryptionAlgorithm.des_3,
                                    message_signature_certificate=pr_cert,
                                    message_signature_algorithm=SignatureAlgorithm.sha_1,
                                    message_content_type=MessageContentType.edi_x12,
                                    is_request_mdn=True,
                                    mdn_mode=MdnMode.sync,
                                    is_mdn_signed=True,
                                    mdn_signature_algorithm=SignatureAlgorithm.sha_1,
                                    async_mdn_url=None,
                                    disposition_notification_to="test@newegg.com")

        in_agr = InboundAgreement(is_signed=True,
                                  is_compressed=False,
                                  is_encrypted=True,
                                  message_decrypt_certificate=pr_cert,
                                  message_verify_certificate=pb_cert,
                                  message_content_type=MessageContentType.edi_x12,
                                  mdn_confirmation_text='',
                                  is_request_mdn=True,
                                  mdn_mode=MdnMode.sync,
                                  is_mdn_signed=True,
                                  mdn_signature_algorithm=SignatureAlgorithm.sha_1,
                                  async_mdn_url=None)

        agr = Agreement(id="1",
                        name="Tr_Newegg_Agreement_1",
                        is_primary=True,
                        local_identity="pyas2_01",
                        trading_identity="Newegg",
                        local_partner_id="1",
                        trading_partner_id="1",
                        inbound_agreement=in_agr,
                        outbound_agreement=out_agr,
                        status=AgreementStatus.active)

        as2_message = AS2Message(
            key="1",
            business_id="",
            message_id=email.utils.make_msgid().strip('<>'),
            direction="outbound"
        )

        ctx = AS2Context(agr, as2_message)

        return ctx
