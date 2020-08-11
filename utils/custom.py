#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: 小羊驼
@contact: wouldmissyou@163.com
@time: 2020/8/11 上午10:57
@file: custom.py
@desc: 
"""
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

User = get_user_model()


class CustomBackend(ModelBackend):
    """
    自定义用户验证
    """

    def authenticate(self, request, username=None, password=None, **kwargs):
        """判断用户名(手机号码)和密码是否正确"""
        query_set = User.objects.filter(Q(username=username) | Q(telephone=username))
        try:
            if query_set.exists():
                user = query_set.get()
                if user.check_password(password):
                    return user
        except:
            return None
        return None
