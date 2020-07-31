#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: 小羊驼
@contact: wouldmissyou@163.com
@time: 2020/7/31 下午4:24
@file: import_function_data.py
@desc: 
"""
import sys
import os


pwd = os.path.dirname(os.path.realpath(__file__))

sys.path.append(pwd+"../")

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'company_web.settings')

import django
django.setup()

from System.models import CompanyFunction
from utils.db_tools.sys_data import function_row_data

for function_data in function_row_data:
    function = CompanyFunction()
    function.login_state = function_data['login_state']
    function.index_form_state = function_data['index_form_state']
    function.page_form_state = function_data['page_form_state']

    function.save()

