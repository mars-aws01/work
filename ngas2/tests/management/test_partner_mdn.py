# -*- coding: utf-8 -*-

from nose.tools import (assert_equal, assert_not_equal, raises)
from ngkitty.serialization import jsonserializer
from .test_partner_base import TestPartnerBase
from ngas2.models.msg import AS2Message
from ngas2.models.req import AsyncMdnReceive
from ngas2.management.partner import PartnerManager


class TestPartnerMdnMessage(TestPartnerBase):
    message_json = """{
	"ReceivedHeaderList": [{
		"Name": "Disposition-Notification-To",
		"Value": "eaas@as.com"
	},
	{
		"Name": "Disposition-Notification-Options",
		"Value": "signed-receipt-protocol=required,pkcs7-signature; signed-receipt-micalg=required,sha1"
	},
	{
		"Name": "Content-Length",
		"Value": "1938"
	},
	{
		"Name": "Host",
		"Value": "10.16.78.93:8923"
	},
	{
		"Name": "As2-To",
		"Value": "as2_01"
	},
	{
		"Name": "Content-Transfer-Encoding",
		"Value": "binary"
	},
	{
		"Name": "As2-From",
		"Value": "Newegg"
	},
	{
		"Name": "Receipt-Delivery-Option",
		"Value": "http://10.16.86.29/as2-test/receive/async-mdn"
	},
	{
		"Name": "User-Agent",
		"Value": "Microsoft (R) BizTalk (R) Server 2010"
	},
	{
		"Name": "X-Source-Host",
		"Value": "10.16.75.24:3000"
	},
	{
		"Name": "Connection",
		"Value": "Close"
	},
	{
		"Name": "X-Gateway-Server",
		"Value": "10.16.75.24"
	},
	{
		"Name": "Expect",
		"Value": "100-continue"
	},
	{
		"Name": "Ediint-Features",
		"Value": "multiple-attachments"
	},
	{
		"Name": "As2-Version",
		"Value": "1.2"
	},
	{
		"Name": "X-Gateway-Profileid",
		"Value": "WH7|96aabd72-155a-4eb4-85d5-7522ff2c8de4|405f6038-dd98-1c47-ef96-0ed3bd06d092"
	},
	{
		"Name": "Message-Id",
		"Value": "<WCMIS241_ECAF03FC-ECCE-4AD1-86F0-BC88D8F30122>"
	},
	{
		"Name": "Content-Type",
		"Value": "application/pkcs7-mime; smime-type=enveloped-data; name=smime.p7m"
    },
    {
      "Name": "Authorization",
      "Value": "gateway&OTZhYWJkNzItMTU1YS00ZWI0LTg1ZDUtNzUyMmZmMmM4ZGU0XiZedW5rbm93bl4mXnVua25vd25eJl51bmtub3du"
    },
    {
      "Name": "Mime-Version",
      "Value": "1.0"
    }
  ],
  "MessageKey": "52C170CD-6B5A-4A68-B1A4-505A0129FBBE",
  "IsTest": false,
  "EditDate": "2017-11-10T17:03:28.699166+08:00",
  "InUser": "ngas2",
  "Version": "1.0.0",
  "ReceivedEdiDataType": "application/edi-x12",
  "Direction": "inbound",
  "MessageMdnStatus": "waiting",
  "LocalIdentity": "as2_01",
  "MessageIsMic": true,
  "MessageStatus": "successful",
  "MessageID": "<WCMIS241_ECAF03FC-ECCE-4AD1-86F0-BC88D8F30122>",
  "ReceivedEdiDataDFSPath": "http://10.1.24.133/EaaS/Message/52C170CD-6B5A-4A68-B1A4-505A0129FBBE.edi",
  "ReceivedEdiDataHash": "0d0cbc4cdd398a394b71b86ab6b726f0",
  "BusinessID": "<WCMIS241_ECAF03FC-ECCE-4AD1-86F0-BC88D8F30122>",
  "InDate": "2017-11-10T17:03:28.699165+08:00",
  "MessageMicDigest": "EhNg1jysAt300MbAmkwH/iez98U=",
  "AgreementID": "A01",
  "TradingIdentity": "Newegg",
  "ReceivedEdiDataLength": "47",
  "MessageTraceList": [
    {
      "TraceTime": "2017-11-10T17:03:28.699809+08:00",
      "TraceStatus": "successful",
      "TraceMemo": "init mime message finished"
    },
    {
      "TraceTime": "2017-11-10T17:03:28.700061+08:00",
      "TraceStatus": "successful",
      "TraceMemo": "content transfer encoding to base64"
    },
    {
      "TraceTime": "2017-11-10T17:03:28.707627+08:00",
      "TraceStatus": "successful",
      "TraceMemo": "decrypt finished;thumbprint: CB17BDDF500C14A049C3A18D6A292174B27F198E"
    },
    {
      "TraceTime": "2017-11-10T17:03:28.709279+08:00",
      "TraceStatus": "successful",
      "TraceMemo": "decompress finished"
    },
    {
      "TraceTime": "2017-11-10T17:03:28.710184+08:00",
      "TraceStatus": "successful",
      "TraceMemo": "verify signature finished;thumbprint: B7A5ED759898822397CCCE96BD493D3203CE83AC, verifycertificate: True"
    },
    {
      "TraceTime": "2017-11-10T17:03:28.710248+08:00",
      "TraceStatus": "successful",
      "TraceMemo": "mic calculate finished;micdescription: EhNg1jysAt300MbAmkwH/iez98U=,sha1"
    },
    {
      "TraceTime": "2017-11-10T17:03:28.710284+08:00",
      "TraceStatus": "successful",
      "TraceMemo": "fetch content finished"
    }
  ],
  "MessageMicAlgorithm": "sha1",
  "MessageMdn": {
    "OriginalMessageID": "<WCMIS241_ECAF03FC-ECCE-4AD1-86F0-BC88D8F30122>",
    "MdnMicAlgorithm": "sha1",
    "Direction": "outbound",
    "MdnDispositionType": "processed",
    "EditDate": "2017-11-10T17:03:28.699126+08:00",
    "MdnStatus": "waiting",
    "InDate": "2017-11-10T17:03:28.699121+08:00",
    "MdnMode": "async",
    "MdnMicDigest": "EhNg1jysAt300MbAmkwH/iez98U=",
    "MdnDispositionMode": "automatic-action/MDN-sent-automatically",
    "MdnMessageID": "<6862980B-2B70-40A5-AF57-9DEA3D455045@ngas2-app-server>"
  }
}"""

    async_mdn_message_json = """{
"MessageTraceList": [
{
  "TraceTime": "2017-11-10T17:03:28.699809+08:00",
  "TraceStatus": "successful",
  "TraceMemo": "init mime message finished"
},
{
  "TraceTime": "2017-11-10T17:03:28.700061+08:00",
  "TraceStatus": "successful",
  "TraceMemo": "content transfer encoding to base64"
},
{
  "TraceTime": "2017-11-10T17:03:28.707627+08:00",
  "TraceStatus": "successful",
  "TraceMemo": "decrypt finished;thumbprint: CB17BDDF500C14A049C3A18D6A292174B27F198E"
},
{
  "TraceTime": "2017-11-10T17:03:28.709279+08:00",
  "TraceStatus": "successful",
  "TraceMemo": "decompress finished"
},
{
  "TraceTime": "2017-11-10T17:03:28.710184+08:00",
  "TraceStatus": "successful",
  "TraceMemo": "verify signature finished;thumbprint: B7A5ED759898822397CCCE96BD493D3203CE83AC, verifycertificate: True"
},
{
  "TraceTime": "2017-11-10T17:03:28.710248+08:00",
  "TraceStatus": "successful",
  "TraceMemo": "mic calculate finished;micdescription: EhNg1jysAt300MbAmkwH/iez98U=,sha1"
},
{
  "TraceTime": "2017-11-10T17:03:28.710284+08:00",
  "TraceStatus": "successful",
  "TraceMemo": "fetch content finished"
}
],
"MessageMdn": {
"OriginalMessageID": "<WCMIS241_ECAF03FC-ECCE-4AD1-86F0-BC88D8F30122>",
"MdnMicAlgorithm": "sha1",
"Direction": "outbound",
"MdnDispositionType": "processed",
"EditDate": "2017-11-10T17:03:28.699126+08:00",
"MdnStatus": "waiting",
"InDate": "2017-11-10T17:03:28.699121+08:00",
"MdnMode": "async",
"MdnMicDigest": "EhNg1jysAt300MbAmkwH/iez98U=",
"MdnDispositionMode": "automatic-action/MDN-sent-automatically",
"MdnMessageID": "<6862980B-2B70-40A5-AF57-9DEA3D455045@ngas2-app-server>"
}
}"""

    def setUp(self):
        super(TestPartnerMdnMessage, self).setUp()

    def tearDown(self):
        super(TestPartnerMdnMessage, self).tearDown()

    def test_async_mdn_receive_ok_with_fixed_agreement(self):
        headers = TestPartnerBase.mdn_headers
        body = TestPartnerBase.mdn_content
        pm = PartnerManager(headers, body)
        pm.receive_async_mdn('A01')

    def test_async_mdn_receive_ok(self):
        headers = TestPartnerBase.mdn_headers
        body = TestPartnerBase.mdn_content
        pm = PartnerManager(headers, body)
        pm.receive_async_mdn(None)

    def test_send_async_mdn_ok(self):
        headers = TestPartnerBase.mdn_headers
        body = TestPartnerBase.mdn_content
        pm = PartnerManager(headers, body)
        message = jsonserializer.deserialize(TestPartnerMdnMessage.message_json,
                                             AS2Message)
        pm.send_async_mdn(message)

    @raises(Exception)
    def test_save_async_mdn_exception_when_msg_not_found(self):
        self.mock_cloud_data_find.side_effect = Exception('msg not found')
        headers = {'Content-Type': 'application/json', }
        body = None
        pm = PartnerManager(headers, body)
        message = jsonserializer.deserialize(TestPartnerMdnMessage.async_mdn_message_json,
                                             AsyncMdnReceive)
        pm.save_mdn_event_message(message)

    def test_save_async_mdn_ok(self):
        headers = {'Content-Type': 'application/json', }
        body = None
        pm = PartnerManager(headers, body)
        message = jsonserializer.deserialize(TestPartnerMdnMessage.async_mdn_message_json,
                                             AsyncMdnReceive)
        msg = pm.save_mdn_event_message(message)
        assert_not_equal(None, msg)
        assert_not_equal(None, msg.message_mdn)

