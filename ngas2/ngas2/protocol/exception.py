# -*- coding: utf-8 -*-


class AS2Exception(Exception):
    def __init__(self, msg, *args, **kv):
        if msg is not None:
            self.msg = msg.format(*args, **kv)
        else:
            self.msg = "Unknown Exception"

    def __str__(self):
        return self.msg


class AS2CompressException(AS2Exception):
    pass


class AS2DeCompressException(AS2Exception):
    pass


class AS2SignatureException(AS2Exception):
    pass


class AS2VerifySignatureException(AS2Exception):
    pass


class AS2EncryptException(AS2Exception):
    pass


class AS2DecryptException(AS2Exception):
    pass


class AS2MicCalculateException(AS2Exception):
    pass


class AS2MdnException(AS2Exception):
    pass
