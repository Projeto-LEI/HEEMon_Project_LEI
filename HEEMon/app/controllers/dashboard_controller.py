#!/usr/bin/env python
# -*- coding: utf-8 -*-

from app.controllers.base_controller import baseController
from app.core.libs.bottle import template


class dashboardController(baseController):
    
    @staticmethod
    def dashboard():
        return template('dashboard')
    
   
