#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: 小羊驼
@contact: wouldmissyou@163.com
@time: 2020/7/22 上午10:21
@file: device.py
@desc: 
"""
def get_device(request):
    ''' 获取用户系统类型.'''
    agent = request.META['HTTP_USER_AGENT'].lower()
    mobile = ['iphone','android','symbianos','windows phone', 'ipad']

    if any([agent.find(name) + 1 for name in mobile]):
        return 'mobile'
    else:
        return 'pc'
