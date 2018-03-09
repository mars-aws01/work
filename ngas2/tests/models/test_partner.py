# -*- coding: utf-8 -*-

import unittest
from datetime import datetime
from ngas2.models.partner import Partner, PartnerType
from nose.tools import (assert_equal, assert_not_equal)


class TestPartner(unittest.TestCase):
    def test_str(self):
        partner = Partner(id="P_01",
                          name="Newegg",
                          type=PartnerType.local,
                          description="Newegg Local",
                          in_date=datetime.utcnow(),
                          in_user="EDI",
                          edit_date=datetime.utcnow(),
                          edit_user="TR29")

        assert_not_equal(None, partner)
        assert_equal(isinstance(partner, Partner), True)
        assert_equal('id=P_01' in str(partner), True)
