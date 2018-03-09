# -*- coding: utf-8 -*-
import logging
from logging import NullHandler
from ngas2.utils.log import LoggingHelper

__title__ = "ngas2"
__description__ = "Newegg AS2 Server"
__version__ = "1.0.0"

logger = logging.getLogger(__name__)

# root logger already set default stream handler
logger.propagate = False


def app_init():
    # init handler
    handlers = LoggingHelper.get_handlers()
    if handlers is not None and len(handlers) > 0:
        for handler in handlers:
            logger.addHandler(handler)
    else:
        logger.addHandler(NullHandler())

    # init level

    level = LoggingHelper.get_level()
    if level is not None:
        logger.setLevel(level)
    else:
        logger.setLevel(logging.DEBUG)
