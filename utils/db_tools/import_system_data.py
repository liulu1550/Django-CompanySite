#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: 小羊驼
@contact: wouldmissyou@163.com
@time: 2020/7/31 下午3:54
@file: import_system_data.py
@desc: 
"""
import sys
import os


pwd = os.path.dirname(os.path.realpath(__file__))

sys.path.append(pwd+"../")

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'company_web.settings')

import django
django.setup()

from System.models import CompanySite
from utils.db_tools.sys_data import row_data

for company_site in row_data:
    site = CompanySite()
    site.site_name = company_site['site_name']
    site.site_url = company_site['site_url']
    site.site_logo = company_site['site_logo']
    site.site_email = company_site['site_email']
    site.site_telephone = company_site['site_telephone']
    site.site_qq = company_site['site_qq']
    site.site_phone = company_site['site_phone']
    site.site_address = company_site['site_address']
    site.site_fax = company_site['site_fax']
    site.site_zip = company_site['site_zip']
    site.site_weibo = company_site['site_weibo']
    site.site_weixin = company_site['site_weixin']
    site.site_copyright = company_site['site_copyright']
    site.site_baidu_map_x_y = company_site['site_baidu_map_x_y']
    site.site_keywords = company_site['site_keywords']
    site.site_description = company_site['site_description']
    site.site_theme = company_site['site_theme']

    site.save()


