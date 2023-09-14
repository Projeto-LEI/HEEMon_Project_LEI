#!/usr/bin/env python
# -*- coding: utf-8 -*-

from app.core.libs.bottle import *
from app.controllers import *
import threading
import logging
import sys

def main():
    #Set an instance of bottle class to access properties and methods
    app = Bottle()
    #Routes for static files
    app.route('/static/js/<filename>','GET', static_controller.staticFiles.send_js)
    app.route('/static/img/<filename>', 'GET', static_controller.staticFiles.send_img)
    app.route('/static/tmp/<filename>', 'GET', static_controller.staticFiles.send_tmp)
    app.route('/static/css/<filename>', 'GET', static_controller.staticFiles.send_css)
    
    #Routes for pages
    app.route('/','GET', dashboard_controller.dashboardController.dashboard)
    app.route('/dashboard','GET', dashboard_controller.dashboardController.dashboard)
    app.route('/voltage','GET', voltage_controller.voltageController.voltage)
    app.route('/current','GET', current_controller.correnteController.current)
    app.route('/apparent_energy','GET', apparent_power_controller.apparentPowerController.apparent_energy)
    app.route('/real_energy','GET', real_power_controller.realPowerController.real_energy)
    app.route('/reactive_energy','GET', reactive_power_controller.reactivePowerController.reactive_energy)
    app.route('/power_factor','GET', power_factor_controller.powerFactorController.power_factor)
    
    app.run(reloader=True, debug=True, host='0.0.0.0', port=8080)

#Method for start threads for insert and read values on rrd database
def start_threads():
    try:
        #create thread for start inserting on rrd database and to read and export data to xml file
        start_insert_thread = threading.Thread(target=rrd_write_read_controller.rrdWriteReadController.write_rrd)
        all_thread = threading.Thread(target=rrd_write_read_controller.rrdWriteReadController.read_rrd, args=("all",))
        minute_thread = threading.Thread(target=rrd_write_read_controller.rrdWriteReadController.read_rrd, args=("minute",))
        #Main program keep executing and if it is, close automatically finish execution 
        start_insert_thread.daemon = True
        all_thread.daemon = True
        minute_thread.daemon = True
        #Start the threads to run independently
        start_insert_thread.start()
        all_thread.start()
        minute_thread.start()
    except Exception as e:
        log_message = "An error occurred in start_threads method: {}".format(e)
        logging.basicConfig(filename="./app/static/logs/threads_log.txt", level=logging.ERROR, format='%(asctime)s - %(message)s')
        logging.error(log_message)
        sys.exit()
        
if __name__ == '__main__':
    start_threads()
    main()
