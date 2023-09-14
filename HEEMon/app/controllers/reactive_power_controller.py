#!/usr/bin/env python
# -*- coding: utf-8 -*-

from app.controllers.base_controller import baseController
from app.core.libs.bottle import template

class reactivePowerController(baseController):
    @staticmethod
    def reactive_energy():
        return template('reactive_energy')