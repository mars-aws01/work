# -*- coding: utf-8 -*-
import unittest
import mock
import os
import copy
import ngas2
from ngas2.models.msg import AS2Message
from ngas2.models.agreement import Agreement
from ngas2.models.cert import Certificate
from ngkitty.configuration import MessageQueueSetting
from ngkitty.serialization import jsonserializer
from ngkitty.cloudstore import CloudStoreQueryResult


class TestPartnerBase(unittest.TestCase):
    is_init = False

    setting = {
        "environment_header": "GDEV",
        "app_secure_key": "NTQ3MDliYmQtMWU0OC00NzA4LTk4OTMtODRlODI0MGE1ZTRh",
        "app_root_dir": "/usr/local/ngas2",
        "app_monitor_interval": 300,
        "app_monitor_per_count": 3,
        "message_publish_url": "http://10.16.75.24:3000/framework/v1/enterprise-messaging/message",
        "cloud_data_base_url": "http://10.16.75.24:3000/datastore/v1",
        "cloud_data_store_name": "ngas2",
        "cloud_data_store_pwd": "4ediuse0nly",
        "dfs_upload_base_url": "http://10.1.24.133",
        "dfs_download_base_url": "http://10.1.24.133",
        "dfs_group": "EaaS",
        "dfs_type": "Message",
        "log_handler": "CONSOLE|NLOG",
        "log_formatter": "[%(levelname)s] %(asctime)s %(name)s  %(funcName)s [%(lineno)d] %(message)s",
        "log_level": "INFO",
        "nlog_url": "http://10.16.75.24:3000/framework/v1/log-entry",
        "inbound_message_queue": {
            "queue_name": "NgAS2_Inbound_Message",
            "password": "4ediuse0nly",
            "serialization_match_tag": True
        },
        "inbound_async_mdn_queue": {
            "queue_name": "NgAS2_Inbound_Async_MDN",
            "password": "4ediuse0nly",
            "serialization_match_tag": True
        },
        "outbound_message_queue": {
            "queue_name": "NgAS2_Outbound_Message",
            "password": "4ediuse0nly",
            "serialization_match_tag": True
        }
    }

    agreement_json = """
    {"AgreementID": "A01",
    "AgreementName": "Tr_Newegg_Agreement_A01",
    "IsPrimary": true,
    "LocalIdentity": "as2_01",
    "TradingIdentity": "Newegg",
    "LocalPartnerID": "LP01",
    "TradingPartnerID": "TP01",
    "OutboundAgreement": {
        "IsSigned": true,
        "IsCompressed": true,
        "IsEncrypted": true,
        "TargetUrl": "http://10.16.86.29/as2/receive",
        "EncryptionCertificateID": "PB01",
        "EncryptionAlgorithm": "des_ede3_cbc",
        "SignatureCertificateID": "PR01",
        "SignatureAlgorithm": "sha1",
        "ContentType": "application/edi-x12",
        "IsRequestMdn": true,
        "MdnMode": "sync",
        "IsMdnSigned": true,
        "MdnSignatureAlgorithm": "sha1",
        "AsyncMdnUrl": null,
        "DispositionNotificationTo": "test@ngas2.com",
        "IsAuth": true,
        "AuthenticationScheme": "basic",
        "UserName": "tr29",
        "UserPassword": "123",
        "IsProxy": true,
        "ProxyScheme": "http",
        "ProxySetting": "http://10.16.78.22:9527",
        "SslVersion": "tls_v1_2",
        "CustomerHttpHeaderList": [{
            "Name": "x-by",
            "Value": "edi"
        }]
    },
    "InboundAgreement": {
        "IsSigned": true,
        "IsCompressed": true,
        "IsEncrypted": true,
        "DecryptCertificateID": "PR01",
        "VerifyCertificateID": "PB01",
        "ContentType": "application/edi-x12",
        "IsRequestMdn": true,
        "MdnConfirmationText": "receive from newegg eaas OK",
        "MdnMode": "sync",
        "IsMdnSigned": true,
        "MdnSignatureAlgorithm": "sha1",
        "AsyncMdnUrl": "http://10.16.86.29/as2/mdn/receive"
    },
    "InUser": "TR29",
    "AgreementStatus": "active",
    "Description": "Biztalk-2010 AS2 Agreement",
    "ProfilerEnabled": true
}
    """

    certificate_json_pb_01 = """
    {
            "CertificateID": "PB01",
            "Subject": "AS2.SelfTesting.Newegg.com",
            "Thumbprint": "B7A5ED759898822397CCCE96BD493D3203CE83AC",
            "CertificateType": "public",
            "Description": "Newegg Production Test Cert",
            "DFSFilePath": "http://10.1.24.133/EaaS/Message/B7A5ED759898822397CCCE96BD493D3203CE83AC.pem",
            "LocalFilePath": null,
            "DFSCAFilePath": null,
            "LocalCAFilePath": null,
            "PassPhrase": null,
            "IsNeedVerify": true
        }
    """

    certificate_json_pr_01 = """
    {
            "CertificateID": "PR01",
            "Subject": "Tp1 Private Certificate",
            "Thumbprint": "CB17BDDF500C14A049C3A18D6A292174B27F198E",
            "CertificateType": "private",
            "Description": "TP1 Private Cert",
            "DFSFilePath": "http://10.1.24.133/EaaS/Message/CB17BDDF500C14A049C3A18D6A292174B27F198E.pem",
            "LocalFilePath": null,
            "DFSCAFilePath": null,
            "LocalCAFilePath": null,
            "PassPhrase": "FxsL87Lfb8Y92vQfhlksew==",
            "IsNeedVerify": true
    }
    """

    mdn_headers = {
        'Content-Length': '2682',
        'AS2-To': 'as2_01',
        'X-Powered-By': 'ASP.NET',
        'AS2-From': 'Newegg',
        'Server': 'Microsoft-IIS/10.0',
        'AS2-Version': '1.2',
        'EDIINT-Features': 'multiple-attachments',
        'Date': 'Wed, 31 May 2017 06:38:53 GMT',
        'Message-ID': '<WCMIS241_EB6DC466-3A39-49B8-9CEC-29848595BF3E>',
        'Content-Type': 'multipart/signed; protocol="application/pkcs7-signature"; micalg="sha1"; boundary="_1E87B6A4-F403-46D8-AD40-C4C5076E369E_"',
        'Mime-Version': '1.0'
    }

    mdn_content = '''--_1E87B6A4-F403-46D8-AD40-C4C5076E369E_
Content-Type: multipart/report; report-type=disposition-notification;
    boundary="_91288AB6-7740-4DAB-8809-DE4C537E8FE4_"

--_91288AB6-7740-4DAB-8809-DE4C537E8FE4_
Content-Type: text/plain
Content-Transfer-Encoding: binary
Content-ID: {81C9484D-CF3F-4BC3-AAE5-21FE89CFC6D9}
Content-Description: plain

receive from newegg (wcmis241) ok
--_91288AB6-7740-4DAB-8809-DE4C537E8FE4_
Content-Type: message/disposition-notification
Content-Transfer-Encoding: 7bit
Content-ID: {86532A1E-6FAD-460E-8C24-9838617BFDD8}
Content-Description: body

Final-Recipient: rfc822; Newegg
Original-Message-ID: <20170531063847.18639.75900@tr29-Ubuntu>
Disposition: automatic-action/MDN-sent-automatically; processed
Received-Content-MIC: NdgjOaPr7r6N/aRqjKBJ2k/HeEc=, sha1

--_91288AB6-7740-4DAB-8809-DE4C537E8FE4_--

--_1E87B6A4-F403-46D8-AD40-C4C5076E369E_
Content-type: application/pkcs7-signature; name="smime.p7s"
Content-Transfer-Encoding: base64

MIAGCSqGSIb3DQEHAqCAMIACAQExCzAJBgUrDgMCGgUAMIAGCSqGSIb3DQEHAQAAoIIDGDCCAxQw
ggJ9oAMCAQICCQDUimz/JtYY8jANBgkqhkiG9w0BAQUFADCBojELMAkGA1UEBhMCVVMxCzAJBgNV
BAgMAkNBMREwDwYDVQQHDAhXaGl0dGllcjEXMBUGA1UECgwOTmV3ZWdnLmNvbSBJbmMxDDAKBgNV
BAsMA0VESTEjMCEGA1UEAwwaQVMyLlNlbGZUZXN0aW5nLk5ld2VnZy5jb20xJzAlBgkqhkiG9w0B
CQEWGHN1cHBvcnRtaXNlZGlAbmV3ZWdnLmNvbTAeFw0xNTA4MjIwMjQwNThaFw0yMDA4MjAwMjQw
NThaMIGiMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExETAPBgNVBAcMCFdoaXR0aWVyMRcwFQYD
VQQKDA5OZXdlZ2cuY29tIEluYzEMMAoGA1UECwwDRURJMSMwIQYDVQQDDBpBUzIuU2VsZlRlc3Rp
bmcuTmV3ZWdnLmNvbTEnMCUGCSqGSIb3DQEJARYYc3VwcG9ydG1pc2VkaUBuZXdlZ2cuY29tMIGf
MA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+82LebAq/ccKwQaQBYmsPjT2W/W45Duu9mHTnn1DQ
zyxaEyihpx/BqFDDCV/BhvWSM0eaCP5HlnoaluAAlEg6J6mUedaGmVw3LxX4JDCLk9KMz4S57jdx
8rH0HY7N2jH7QNM0Jx5Dum9VDa5qB3k/foUFYW0H5NT2tFLGj6052QIDAQABo1AwTjAdBgNVHQ4E
FgQUZnICFolCDgCDHjv5TyXlZafEUYQwHwYDVR0jBBgwFoAUZnICFolCDgCDHjv5TyXlZafEUYQw
DAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOBgQCPsJqIh6tJDiDxE7CkK2Y4qXYLB8tj5jfW
Of0pq9YRB/fyXWVNRNOIs/ict1tvuW3nhnWfAp1Yin+L6uxG4uZKazOYmxE3spkEIoLLXhLqQ++k
V9GUphk2uSes4aZbrcMchv5/mz3+NvIwuMjv5OQM55AM52ahAoIDpe5IblW4RjGCAVcwggFTAgEB
MIGwMIGiMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExETAPBgNVBAcMCFdoaXR0aWVyMRcwFQYD
VQQKDA5OZXdlZ2cuY29tIEluYzEMMAoGA1UECwwDRURJMSMwIQYDVQQDDBpBUzIuU2VsZlRlc3Rp
bmcuTmV3ZWdnLmNvbTEnMCUGCSqGSIb3DQEJARYYc3VwcG9ydG1pc2VkaUBuZXdlZ2cuY29tAgkA
1Ips/ybWGPIwCQYFKw4DAhoFADANBgkqhkiG9w0BAQEFAASBgAUtPr7eIlNximZBbgMAVBqjVxS4
S/8Y3gMABRYG0jkFDBBQyY98teLEJPPHjJRnMCFYtb9xaaSXaHCalg6lJ7S3XXc02BLHtOM13WkY
7utkiOfuPOc3tO7m+a6SjzMBHJY8IxZ0XLVBjCCnf9RcpTs0EcfY8+e5rvRCubGTF3kbAAAAAAAA

--_1E87B6A4-F403-46D8-AD40-C4C5076E369E_--
    '''

    @staticmethod
    def fake_find_agreement(condition, doc_type, match_tag=True):
        agreement = None
        if condition['LocalIdentity'] == 'as2_01' \
                and condition['TradingIdentity'] == 'Newegg' \
                and condition['IsPrimary']:
            content = TestPartnerBase.agreement_json
            agr_01 = jsonserializer.deserialize(content,
                                                doc_type,
                                                match_tag)

            agreement = copy.deepcopy(agr_01)
            agreement.id = "A01"
            agreement.inbound_agreement.is_signed = False
            agreement.inbound_agreement.is_compressed = False
            agreement.inbound_agreement.is_encrypted = False

        if agreement is not None:
            result = CloudStoreQueryResult()
            result.page_size = 1
            result.page_index = 1
            result.total_count = 1
            result.succeeded = True
            result.records = [agreement]
            return result

        return agreement

    @staticmethod
    def fake_find_as2_message(condition, doc_type, match_tag=True):
        msg = AS2Message(key='123456789')
        result = CloudStoreQueryResult()
        result.page_size = 1
        result.page_index = 1
        result.total_count = 1
        result.succeeded = True
        result.records = [msg]
        return result

    @staticmethod
    def fake_find_documents(condition, doc_type, collection=None, match_tag=True):
        if doc_type is Agreement and collection is None:
            return TestPartnerBase.fake_find_agreement(condition, doc_type, match_tag)

        if doc_type is AS2Message and collection is None:
            return TestPartnerBase.fake_find_as2_message(condition, doc_type, match_tag)

        return None

    @staticmethod
    def fake_get_mq_setting(setting_name):
        val = TestPartnerBase.setting.get(setting_name)
        return MessageQueueSetting(**val)

    @staticmethod
    def fake_get_agreement(key, doc_type, match_tag=True):
        content = TestPartnerBase.agreement_json
        agreement = jsonserializer.deserialize(content,
                                               doc_type,
                                               match_tag)
        if key == "A01":
            agr_01 = copy.deepcopy(agreement)
            agr_01.id = "A01"
            agr_01.outbound_agreement.is_auth = False
            agr_01.outbound_agreement.is_proxy = False
            agr_01.profiler_enabled = False
            agr_01.outbound_agreement.customer_http_headers = None
            return agr_01
        if key == "A02":
            agr_02 = copy.deepcopy(agreement)
            agr_02.id = "A02"
            agr_02.outbound_agreement.authentication_scheme = "basic"
            return agr_02
        if key == "A03":
            agr_03 = copy.deepcopy(agreement)
            agr_03.id = "A03"
            agr_03.outbound_agreement.authentication_scheme = "digest"
            return agr_03

        return None

    @staticmethod
    def fake_get_certificate(key, doc_type, match_tag=True):
        content = None
        if key == "PB01":
            content = TestPartnerBase.certificate_json_pb_01
        if key == "PR01":
            content = TestPartnerBase.certificate_json_pr_01

        return jsonserializer.deserialize(content,
                                          doc_type,
                                          match_tag)

    @staticmethod
    def fake_get_cloud_document(key, doc_type, collection=None, match_tag=True):
        if doc_type is Agreement and collection is None:
            return TestPartnerBase.fake_get_agreement(key, doc_type, match_tag)
        if doc_type is Certificate and collection is None:
            return TestPartnerBase.fake_get_certificate(key, doc_type, match_tag)

        return None

    @staticmethod
    def fake_http_post(url, data=None, json=None, ssl_version=None, timeout=None, **kwargs):
        if 'http://10.16.86.29/as2/receive' in url:
            mk_resp = mock.Mock()

            mk_resp.status_code = 200
            mk_resp.headers = TestPartnerBase.mdn_headers
            mk_resp.content = TestPartnerBase.mdn_content

            return mk_resp

        mk_resp = mock.Mock()

        mk_resp.status_code = 200
        mk_resp.headers = {'Content-Type': "text/plain"}
        mk_resp.content = "OK"

        return mk_resp

    @staticmethod
    def fake_app_init():
        ngas2.app_init()

    def setUp(self):
        conf = TestPartnerBase.setting
        conf['app_root_dir'] = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

        self.patcher_cfg_settings = \
            mock.patch("ngkitty.configuration.ConfigurationHelper.get_settings")
        self.mock_cfg_setting = self.patcher_cfg_settings.start()
        self.mock_cfg_setting.return_value = TestPartnerBase.setting

        if not TestPartnerBase.is_init:
            TestPartnerBase.fake_app_init()
            TestPartnerBase.is_init = True

        self.patcher_cfg_mq_settings = \
            mock.patch("ngkitty.configuration.ConfigurationHelper.get_mq_setting")
        self.mock_cfg_mq_settings = self.patcher_cfg_mq_settings.start()
        self.mock_cfg_mq_settings.side_effect = TestPartnerBase.fake_get_mq_setting

        self.patcher_cloud_data_save = \
            mock.patch('ngkitty.cloudstore.CloudStoreHelper.save_document')
        self.mock_cloud_data_save = self.patcher_cloud_data_save.start()
        self.mock_cloud_data_save.return_value = None

        self.patcher_cloud_data_get = \
            mock.patch('ngkitty.cloudstore.CloudStoreHelper.get_document')
        self.mock_cloud_data_get = self.patcher_cloud_data_get.start()
        self.mock_cloud_data_get.side_effect = TestPartnerBase.fake_get_cloud_document

        self.patcher_cloud_data_find = \
            mock.patch('ngkitty.cloudstore.CloudStoreHelper.find_documents')
        self.mock_cloud_data_find = self.patcher_cloud_data_find.start()
        self.mock_cloud_data_find.side_effect = TestPartnerBase.fake_find_documents

        self.patcher_message_queue_send = \
            mock.patch('ngkitty.messaging.MessageQueueHelper.send_message_json')
        self.mock_message_queue_send = self.patcher_message_queue_send.start()
        mock_queue_publish_info = mock.Mock()
        mock_queue_publish_info.succeeded = True
        self.mock_message_queue_send.return_value = mock_queue_publish_info

        self.patcher_http_post = \
            mock.patch('ngkitty.http.HttpHelper.post')
        self.mock_http_post = self.patcher_http_post.start()
        self.mock_http_post.side_effect = TestPartnerBase.fake_http_post

        self.patcher_dfs_upload = \
            mock.patch('ngkitty.dfs.DFSHelper.upload')
        self.mock_dfs_upload = self.patcher_dfs_upload.start()
        self.mock_dfs_upload.return_value = True

    def tearDown(self):
        self.patcher_cfg_settings.stop()
        self.patcher_cfg_mq_settings.stop()
        self.patcher_cloud_data_save.stop()
        self.patcher_cloud_data_get.stop()
        self.patcher_cloud_data_find.stop()
        self.patcher_message_queue_send.stop()
        self.patcher_http_post.stop()
        self.patcher_dfs_upload.stop()
