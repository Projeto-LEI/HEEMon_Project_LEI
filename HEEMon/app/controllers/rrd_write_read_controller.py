#!/usr/bin/env python
# -*- coding: utf-8 -*-

from app.controllers.base_controller import baseController
from app.models.read_rrd import readRRD
from app.models.insert_rrd import insertRRD
import logging
import sys

#class controller to start read and write operation
class rrdWriteReadController(baseController):
    @staticmethod
    def read_rrd(value):
        try:
            if value == "all":
                readRRD.read_rdd_and_export("all")
            elif value == "minute":
                readRRD.read_rdd_and_export("minute")
        except Exception as e:
            log_message = "An error occurred in read_rrd method: {}".format(e)
            logging.basicConfig(filename="./app/static/logs/read_rrd_controller_error_log.txt", level=logging.ERROR, format='%(asctime)s - %(message)s')        
            logging.error(log_message)
            sys.exit()
    
    @staticmethod     
    def write_rrd():
        try:
            insertRRD.insert_rrd()
        except Exception as e:
            log_message = "An error occurred in write_rrd method: {}".format(e)
            logging.basicConfig(filename="./app/static/logs/insert_rrd_controller_error_log.txt", level=logging.ERROR, format='%(asctime)s - %(message)s')
            logging.error(log_message)
            sys.exit()