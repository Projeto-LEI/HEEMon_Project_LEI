#!/usr/bin/env python
# -*- coding: utf-8 -*-

#from app import app
from app.controllers.base_controller import baseController
from app.core.libs.bottle import static_file


class staticFiles(baseController):
    ##############################################################################################
    # FUNCTION: JS FILES
    # METHOD: GET
    # DESCRIPTION:  This method returns JS files on demand
    ##############################################################################################        
    @staticmethod
    def send_js(filename):
        return static_file(filename, root='app/static/js')

    ##############################################################################################
    # FUNCTION: IMG
    # METHOD: GET
    # DESCRIPTION:  This method returns IMG files on demand
    ##############################################################################################
    @staticmethod
    def send_img(filename):
        return static_file(filename, root='app/static/img')

    ##############################################################################################
    # FUNCTION: tmp
    # METHOD: GET
    # DESCRIPTION:  This method returns tmp files on demand
    ##############################################################################################
    @staticmethod
    def send_tmp(filename):
        return static_file(filename, root='app/static/tmp')

    ##############################################################################################
    # FUNCTION: CSS
    # METHOD: GET
    # DESCRIPTION:  This method returns CSS files on demand
    ##############################################################################################
    @staticmethod
    def send_css(filename):
        return static_file(filename, root='app/static/css')