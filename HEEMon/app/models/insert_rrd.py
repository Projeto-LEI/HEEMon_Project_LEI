#!/usr/bin/env python
# -*- coding: utf-8 -*-

# update_rrd.py
import subprocess
import os
import time
import sys
import logging
sys.path.insert(0, '/usr/lib/python2.7/bridge/')
from bridgeclient import BridgeClient

#class for insert values received from bridge client and insert them into rrd database 
class insertRRD():
    # Path to the RRD database file
    rrd_file = "./app/models/data_base/heemonDB.rrd"
    #Path to write the first timestamp when DB is created
    start_timestamp_file = "./app/models/data_base/start_timestamp.txt"
    #Path for insert log errors file
    log_error_file = "./app/static/logs/insert_rrd_error_log.txt"

    @classmethod
    def update_rrd(cls, sensor_data):
        try:
            # Split the delimited string into individual sensor readings
            tensao, corrente, potenciaAtiva, potenciaAparente, fatorPotencia = sensor_data.split(";")
            # Prepare the RRD update command
            update_cmd = "N:{0}:{1}:{2}:{3}:{4}".format(tensao, corrente, potenciaAtiva, potenciaAparente, fatorPotencia)
            rrdupdate_cmd = ["rrdupdate", cls.rrd_file, update_cmd]
            # Update the RRD database using subprocess
            subprocess.check_call(rrdupdate_cmd)
        except subprocess.CalledProcessError as e:
            log_message = "An error occurred in update_rrd method: {}".format(e)
            logging.basicConfig(filename=cls.log_error_file, level=logging.ERROR, format='%(asctime)s - %(message)s')
            logging.error(log_message)
            sys.exit()
    
    @classmethod
    def insert_rrd(cls):
        try:
            # Set up a socket to listen for sensor data from Arduino
            client = BridgeClient()
            if(not os.path.exists(cls.rrd_file)):
                #Use of subprocess to execute an external command
                subprocess.check_call(["rrdtool", "create", cls.rrd_file,
                            "--step", "10",
                            "DS:tensao:GAUGE:20:0:250",
                            "DS:corrente:GAUGE:20:0:100",
                            "DS:potenciaAtiva:GAUGE:20:0:25000",
                            "DS:potenciaAparente:GAUGE:20:0:25000",
                            "DS:fatorPotencia:GAUGE:20:0:1",
                            "RRA:AVERAGE:0.5:1:8640",
                            "RRA:AVERAGE:0.5:360:8760"])
                #Keep the first timestamp value in backup for further consult
                start_timestamp = subprocess.check_output(["rrdtool","first",cls.rrd_file])
                with open(cls.start_timestamp_file, "wb") as f:
                        f.write(start_timestamp)
        except subprocess.CalledProcessError as e:
            log_message = "An error occurred in Subprocess in insert_rrd method: {}".format(e)
            logging.basicConfig(filename=cls.log_error_file, level=logging.ERROR, format='%(asctime)s - %(message)s')
            logging.error(log_message)
            sys.exit()
            
        while True:
            try:
                # Get data from ATMEGA side using bridge client
                sensor_data = client.get('data')
            except Exception as e:
                log_message = "An error occurred getting sensor data in insert_rrd method: {}".format(e)
                logging.basicConfig(filename=cls.log_error_file, level=logging.ERROR, format='%(asctime)s - %(message)s')
                logging.error(log_message)
                sys.exit()
            #Decode received data as a string and update the RRD database
            if sensor_data:
                cls.update_rrd(sensor_data)
            sys.stdout.flush()
            time.sleep(10)
