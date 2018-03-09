# -*- coding: utf-8 -*-

import bottle
import ngas2
from ngas2 import app_init
from ngas2.services import (SimpleWaitressServer)
from ngas2.management.monitor import MonitorJob

# !!! DO NOT REMOVE FOLLOWING IMPORT !!!

from ngas2.services import basic_svc
from ngas2.services import as2_svc
from ngas2.services import mdn_svc

# !!!   DO NOT REMOVE ABOVE IMPORT   !!!


if __name__ == '__main__':
    job = MonitorJob()
    job.start()

    server = ngas2.__description__
    bottle.server_names['waitress'] = SimpleWaitressServer

    app_init()

    app = bottle.default_app()
    app.run(host='0.0.0.0',
            port=8000,
            server='waitress',
            ident=server,
            threads=10,
            connection_limit=1000,
            channel_timeout=180,
            max_request_body_size=104857600)
