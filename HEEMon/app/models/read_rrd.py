#!/usr/bin/env python
# -*- coding: utf-8 -*-

# read_rdd.py
import subprocess
import time
import logging
import sys

#Class for treat the methods and attributes of reading data from rrd database
class readRRD ():
    # Path to the RRD database file
    rrd_file = "./app/models/data_base/heemonDB.rrd"
    #Path to read the first timestamp when DB was created
    start_timestamp_file = "./app/models/data_base/start_timestamp.txt"
    #Path for insert log errors file
    log_error_file = "./app/static/logs/read_rrd_error_log.txt"
    #class method, is a way to call this method directly from the class instead of intance
    @classmethod
    def remove_first_6_lines(cls, output):
        # Split the output by newline character '\n'
        lines = output.split('\n')

        # Join the lines starting from the 7th line
        modified_output = '\n'.join(lines[6:])

        return modified_output
    
    @classmethod
    def read_rdd_and_export(cls, time_interval):
        #Open and read the start timestamp file of the first element inserted in DB
        with open(cls.start_timestamp_file, "rb") as f:
                start_time_db = f.readline()
        start_time_db = int(start_time_db)
        
        while True:
            # Calculate the start and end timestamps
            end_time = int(time.time())
            if time_interval == "all":
                start_time = start_time_db
            elif time_interval == "minute":
                start_time = end_time - 60

            # Path to the output XML file
            if time_interval == "all":
                output_xml_file = "./app/static/tmp/heemonDB_all.xml"
                step = "3600"
            elif time_interval == "minute":
                output_xml_file = "./app/static/tmp/heemonDB_minute.xml"
                step = "10"

            try:
                # Prepare the rrdtool xport command 1 hour
                xport_cmd = ["rrdtool", "xport", "--start", str(start_time), "--end", str(end_time), "--step", step, "-m", "8760", "DEF:tensao={}:tensao:AVERAGE".format(cls.rrd_file), 
                             "DEF:corrente={}:corrente:AVERAGE".format(cls.rrd_file), "DEF:potenciaAtiva={}:potenciaAtiva:AVERAGE".format(cls.rrd_file), 
                             "DEF:potenciaAparente={}:potenciaAparente:AVERAGE".format(cls.rrd_file), "DEF:fatorPotencia={}:fatorPotencia:AVERAGE".format(cls.rrd_file), 
                             "XPORT:tensao:tensao", "XPORT:corrente:corrente", "XPORT:potenciaAtiva:potenciaAtiva", "XPORT:potenciaAparente:potenciaAparente",
                             "XPORT:fatorPotencia:fatorPotencia"]
                xport_output = subprocess.check_output(xport_cmd)
                xport_output = cls.remove_first_6_lines(xport_output)
                with open(output_xml_file, "wb") as f:
                    f.write(xport_output)
            except subprocess.CalledProcessError as e:
                log_message = "An error occurred in read_rrd_and_export method: {}".format(e)
                logging.basicConfig(filename=cls.log_error_file, level=logging.ERROR, format='%(asctime)s - %(message)s')
                logging.error(log_message)
                sys.exit()

            # Wait for a specific interval before fetching data again
            time.sleep(10)       
