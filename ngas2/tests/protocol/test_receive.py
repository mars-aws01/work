# -*- coding: utf-8 -*-

import os
from ngas2.models.cert import (Certificate, CertificateType)
from ngas2.protocol.receive import ReceiveDecoder
from tests.protocol import ProtocolTestBase
from nose.tools import (assert_equal)


class TestReceiveDecoder(ProtocolTestBase):
    received_encrypt_compress_signed_header = {
        'Disposition-Notification-To': 'eaas@as.com',
        'Disposition-Notification-Options': 'signed-receipt-protocol=required,pkcs7-signature; signed-receipt-micalg=required,sha1',
        'Content-Length': '1938',
        'Host': '10.16.78.93:8923',
        'As2-To': 'as2_02',
        'Content-Transfer-Encoding': 'binary',
        'As2-From': 'Newegg',
        'Receipt-Delivery-Option': 'http://10.16.86.29/as2-test/receive/async-mdn',
        'User-Agent': 'Microsoft (R) BizTalk (R) Server 2010',
        'X-Source-Host': '10.16.75.24:3000',
        'Connection': 'Close',
        'X-Gateway-Server': '10.16.75.24',
        'Ediint-Features': 'multiple-attachments',
        'As2-Version': '1.2',
        'Message-Id': '<WCMIS241_92C6D228-6B32-4E7A-BF83-B1E030FA9F57>',
        'Content-Type': 'application/pkcs7-mime; smime-type=enveloped-data; name="smime.p7m"',
        'Mime-Version': '1.0'
    }

    received_encrypt_signed_header = {
        'Disposition-Notification-To': 'eaas@as.com',
        'Disposition-Notification-Options': 'signed-receipt-protocol=required,pkcs7-signature;signed-receipt-micalg=required,sha1',
        'Ediint-Features': 'multiple-attachments',
        'Content-Transfer-Encoding': 'base64',
        'Content-Length': '2634',
        'As2-From': 'Newegg',
        'Connection': 'Close',
        'Host': '10.16.86.29: 9900',
        'User-Agent': 'Microsoft(R)BizTalk(R)Server2010',
        'As2-Version': '1.2',
        'As2-To': 'pyas2_01',
        'Message-Id': '<WCMIS241_375787DD-7FC1-4438-8649-CCCF0913EA32>',
        'Content-Type': 'application/pkcs7-mime;smime-type=enveloped-data;name="smime.p7m"',
        'Mime-Version': '1.0'
    }

    received_encrypt_signed_body = '''MIIKXgYJKoZIhvcNAQcDoIIKTzCCCksCAQAxggGrMIIBpwIBADCBjjCBgDELMAkG
A1UEBhMCQ04xCzAJBgNVBAgMAlNDMQswCQYDVQQHDAJDRDEPMA0GA1UECgwGTmV3
ZWdnMQwwCgYDVQQLDANFREkxGDAWBgNVBAMMD0FTMiBDZXJ0aWZpY2F0ZTEeMBwG
CSqGSIb3DQEJARYPdHIyOUBuZXdlZ2cuY29tAgkAtl4VWyGqGb4wDQYJKoZIhvcN
AQEBBQAEggEAknlFQby/xUt9qbZ9FKd41zInBpXEaGPEhxu9PBLGYnVjBu/KHYl2
sKh0TFndcpndUT8eTqFOZY+pTuhnbnbZoH2l3ays+hoKMA+d9cdIAW69v4Ucthoo
+Gh71xBKG9/I8IE0IYe8bCt7UHmeARKd2U6wMG/N3yXjmk3EDQ0VnZVBkw84i84T
psrleU48GF9TJf1TpbKIfNNBbkqj7YAaSw3YUlDhpyfMFbwvyIDTwUW7Dh9o13ir
splaXJVJV/5Flsq4+/R9SAvRUdAk+6B2RPeITUEQezIQNVii8v+5FJXjcEmp3Lnu
6sKaru6odQo1VqlNefCT0MNzE//fQUFAHDCCCJUGCSqGSIb3DQEHATAUBggqhkiG
9w0DBwQIQnNtyroalbCAgghwxXFnAHBL9gB3qQUEy35P2DbQRg+t4B8bADJGZ3qd
I9CED5I3H1+IbqcP70ADNvACUTQFqlCDQxjop232JmvJD4BkFRy5b2eDAJSZzy4o
fiEovq1yfgmLxwd/BFlf0ylXGKAQN8200qJDXRQ6fnkpbzVMnjHseCHbBaegOXWr
KxFVOWCYnNg9VlHyT9r/kbDzSrBFenkEf+y64b+k8ghGZipaE5w3pFJfox223+XH
rh1kbb4fMcdth/dSybrYLRy8/w1mgWjVucX+kZn9P9AtZSFRiflnffFvbmN4eftg
lbSNFL56khc1vDUwgrZeEIxPuSvMyavoi3d+IeGiHCW4gkJtyiMClAAxu3mN3ldJ
3yzoVyGeg0KxLS92vGebMNwoD0YZdS1EMZxzJJizelnJFVSRKnD9rylaK8AJBpIp
KrQRMBLYktfDo/NpASQbScIpwezjOgOYiIGO8r9uCCvNSp3zFZkA2gwQ8vBCEYQq
pNgWGv3cDKDzsb517mFODn0lAWw2s9pofBqu0i2ij57KyEdOF3WwBlgI/TqBi9De
D7mF+YqJ2RrRdjtazcPle3Ar1oniUKkGETe3V4D+sXrb9ds6IFETGw6PNPo7XlKK
EoPQxNzMeujXgdgMkqihBfYmH5Np2WeMMOMmR7VtL5Gg7P5Edu6XhWLU8CM97UMC
oq0eM7Yd12IEqNyEH3tFKQFI4+Z2YPry0aN1UlM1IYvzuEVspLhwTds9oukdw1eX
pc/jL8mM9Sp399X5qwrEY3f5NLhc/g6AJz28uliBFJdkam6KglXnzFliwoCjTF/Q
YH/ZfiSEyCDh+iIxY+MycZI4N1hFXQ+1Fe6ncsUizluQjwfkzFwS9Gat7Pee8MQF
4/vaotAJhITmpFQSLXpWWMAaPbBjN+s+6eoHQX+ogQEDr7R6BWXiqguA1ISx/dxZ
fC9K5ORMq+eAEcG5r2/sKtOLPnp5SSkG3D4dcYSJMooOq6JAc/vRKUYkT56v7hyx
QrVwfSPoI0Q82ClRwmpp527VLl7agPnyk1xBbvmy2GYOyA8IqFTTeaTRVt9pHUan
lMGJiuxnvaJ34IAeb4TybU/JJ+R/gPvPyiG+ywICsfnHNlE7H2UyDEfAH8FCcO4h
I2fxt2lXpY6B3R4z4vHTk68yX4zayMEO/j5jXFKKfLp+bXSMXxaQ+cjYBocesa7x
NNJteUblW+Vftosk7mYnAYYFDpKLVuwk9PS3jM3Aeu4AUBtqxfEw9S2pJ+iSCXNV
gqHrCkOR60K6TuTL7AmYvPjM3MeigLvhsmO0hJ6PnIQsLkU5CrjVCiSEWa9/JIUp
t3gZcrc/yc7UNZLK6ctIfzIi6koNXKjsfR6ZyJLaaKeUwlM7igLqJe4c9YNUp/1L
2Oto3EXsb9oFSSiFYnM/+SLXQ3FnhW72i69Zo8O0i2js2LI+RJ5Ib3JWsadSnjMA
YPvrADV4LuMvUdlU5cV3FQz8vhcqhFxrysliuQsd7d/w0MtdORSrASCRmBl91z6K
dQRMNx7Bxz7kNUtqERlElkJ0ljUT1IlsJOdew56UVSMZCKm2IylO+k+JMUKEatvC
M0JTGyBEc7yrtwvcEY9YR5SJM3y3mFJ4kM2k23zMSIJbNb+YHxXy6gWvAz1oGWH/
gU3N7pm1YztOM7x0FpIecP0Zpbl7ZHDjZx7TkMzZhip9kAO6PT8q+XNHUXYTCJnu
EwDh3/1GjZueFuQA6s6N4DWyegvxhxTgHA85ZHd99UF74DMv0OwJwGGJPBKJRbBm
cQTdXRCK7TAtvdsmlJg4dQGpWoOvfEp7NRTwK3lbecKLtUaWIIdN6O2V8d9mhS00
q2oW66jPYuPwVCBO3CScVL2wHzFhJ7lvYLAsgEUQWGc9/uPHoZNirtpOHE7Ht137
CSEYmjp0L5X8TpkSU+1blZE8/+F2rrEE/JMCz0g1AVHdXRTqDD8LHk4GzGM2/k76
46CS8LP4b7rfjNf/yN85P65ZAygxVAG15cn5lUGGcF4unpe/FEz7NCGfhxxVFxY/
lwhMd08T1qJatJiGMq27OMItqoTIZeHa8kp0jYN0x8KQ6o8i3wiVnG6DxM9IwH6e
nQ2KAS2hUfNf0O8m2zRC6VUz7gU3jGnFj2UVtTGtbcukGKXlfXfaQLnETJxVWSBa
0xNnOCSBxl9DEIDdZFXOClI2Gmc2CYYPdY4AYnXNWYfyHfWmEXxyN1Ut6AuCE9Cj
a2Asx0S/8ayWm4NTa6cFTmGJcGth3C+awF3JpSUNdd1SfgdqHgpU/VA20kvjybl7
BvfFXyFA5XcQSJSTbDXjIuKkTCuar5l4d8/3JXRJGy1XuU8jg5QQQRlpCLH1kYXe
U42pxTn1lb9n35yCSL5z4i5qmTqsRL6G3eLw7hO/2tC4GtqOiyeZcEt5ovDTk14H
5E7GzQ6GTqH9fBZWAH7zdh7XWUc77iRoccb/e2ebJe2gRHLBBH65wAmEKW66ysfX
cifrhGWAYsay956MMaio20ZWOA82mAXeistDlR2Mr4gBUpUN6oD6STwAsIOUFn6Y
+nH4nNZmpJ4dKMs3ONeszxxXuNYYte2C6NewHFWFJ2m2LDRdGX5YG4WeoIRqKVJa
IKQkNsleiz2L8RsW6sz3Cd6mWyhxeSWceBxk/zwT9y8ZtCJPODcSetNCVrc05A80
1O0Rx8C1XJUMkmbUwsaJpCDjmlDmNi2lw1+E5UjGDSXgy5dLyp0ixwaCuzCJsmZQ
mpc6t2VgPb0sMwykPpQwnfgFomOXrKFIpLOjV9q/s+ItquZQS5tVZZ9gBfBlWGwU
zGlnZ0qnHsvs0MmHQxglFEvgj7hMwp021sGX+LPG1OMY/ymKiVX0txcthTGS/GZx
ppmbQ3GpPd6YpGM2CTXWAo9B'''

    def test_decode_encrypt_signed_data(self):
        ctx = super(TestReceiveDecoder, self).get_as2_context()

        headers = dict((k.lower().replace('_', '-'), TestReceiveDecoder.received_encrypt_signed_header[k]) for k in
                       TestReceiveDecoder.received_encrypt_signed_header)

        rec_decoder = ReceiveDecoder(headers,
                                     TestReceiveDecoder.received_encrypt_signed_body,
                                     ctx)

        rec_decoder.decode()

        assert_equal('sha1', rec_decoder.mic_algorithm)

        assert_equal('This is test message from wcmis241 biztalk2010.', rec_decoder.content)


    def test_decode_encrypt_signed_synnex_ca_data(self):
        pb_cert = Certificate(id="1",
                              subject="Synnex AS2 Cert",
                              thumbprint="C4C47138364344572E32B3A40E95869AEE406B5A",
                              type=CertificateType.public,
                              description="Synnex Cert",
                              dfs_file_path="",
                              local_file_path=self._get_public_cert_path(
                                  "C4C47138364344572E32B3A40E95869AEE406B5A.cer"),
                              dfs_ca_file_path=None,
                              local_ca_file_path=None,
                              pass_phrase=None,
                              is_need_verify=False
                              )

        pr_cert = Certificate(id="2",
                              subject="Newegg SHA-256 private",
                              thumbprint="AD9415D353AEE0ED6B4C1F289390B7BFFA8B9D9C",
                              type=CertificateType.private,
                              description="Newegg SHA-256 private Cert",
                              dfs_file_path="",
                              local_file_path=self._get_private_cert_path(
                                  "AD9415D353AEE0ED6B4C1F289390B7BFFA8B9D9C.pem"),
                              dfs_ca_file_path=None,
                              local_ca_file_path=None,
                              pass_phrase="4ediuse0nly",
                              is_need_verify=True
                              )

        synnex_ca_header = {
            'as2-from': '5106683500US',
            'as2-to': 'Newegg',
            'as2-version': '1.2',
            'content-disposition': 'attachment; filename=smime.p7m',
            'content-transfer-encoding': 'binary',
            'content-type': 'application/pkcs7-mime; smime-type=enveloped-data; name=smime.p7m',
            'date': 'Fri, 02 Mar 2018 01:14:14 GMT',
            'disposition-notification-options': 'signed-receipt-protocol=optional, pkcs7-signature; signed-receipt-micalg=optional, sha1',
            'disposition-notification-to': 'AndrewYu@synnex.com',
            'ediint-features': 'CEM, multiple-attachments, AS2-Reliability',
            'from': 'AndrewYu@synnex.com',
            'host': '172.16.70.42:8645',
            'message-id': '<1519953254702.5658716@nUUB1JpoNjzYPsMK8Cjm8Q==>',
            'mime-version': '1.0',
            'subject': 'ZZNeweggCA;ZZSYNNEGGCN',
            'user-agent': 'haboob/5.12.0.0.3 build-48355',
            'x-cyclone-true-receiver': 'ZZNeweggCA',
            'x-cyclone-true-sender': 'ZZSYNNEGGCN',
            'x-gateway-external': 'True',
            'x-gateway-profileid': 'E11|cdc56c93-29df-4feb-8bd4-320871c06bc6|e198dc98-dbea-2a13-dfad-06dda37078ce',
            'x-gateway-server': '172.16.144.49',
            'x-source-host': 'as2.newegg.com:80',
            'x-source-ip': '206.169.138.246'
        }

        datafeed_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'datafeed', 'Synnex.CA.prd.997.in'))
        with open(datafeed_path) as fp:
            received_encrypt_signed_body = fp.read()

        ctx = super(TestReceiveDecoder, self).get_as2_context()

        ctx.agreement.inbound_agreement.message_decrypt_certificate = pr_cert
        ctx.agreement.inbound_agreement.message_verify_certificate = pb_cert

        headers = dict((k.lower().replace('_', '-'), synnex_ca_header[k]) for k in synnex_ca_header)

        rec_decoder = ReceiveDecoder(headers,
                                     received_encrypt_signed_body,
                                     ctx)

        rec_decoder.decode()

        assert_equal('sha1', rec_decoder.mic_algorithm)

        assert_equal('ISA~00~          ~00~          ~ZZ~SYNNEGGCN      ~ZZ~NeweggCA       ~180301~1710~U~00401~910895506~0~P~^\nGS~FA~SYNNEGGCN~NeweggCA~20180301~1710~58667~X~004010\nST~997~0001\nAK1~PO~300100002\nAK9~R~1~1~0\nSE~4~0001\nGE~1~58667\nIEA~1~910895506\n'
                     , rec_decoder.content)


    def test_decode_encrypt_compress_signed_data(self):
        ctx = super(TestReceiveDecoder, self).get_as2_context()
        ctx.agreement.inbound_agreement.is_compressed = True

        headers = dict((k.lower().replace('_', '-'), TestReceiveDecoder.received_encrypt_compress_signed_header[k])
                       for k in TestReceiveDecoder.received_encrypt_signed_header)

        with open(self._get_mock_file('in_encrypt_compress_signed.dat'), 'rb') as fp:
            rec_decoder = ReceiveDecoder(headers,
                                         fp.read(),
                                         ctx)
            rec_decoder.decode()
            assert_equal('sha1', rec_decoder.mic_algorithm)
            assert_equal('This is test message from wcmis241 biztalk2010.', rec_decoder.content)
