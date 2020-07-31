#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: 小羊驼
@contact: wouldmissyou@163.com
@time: 2020/7/20 下午3:51
@file: forms.py
@desc: 
"""
from django import forms
from .models import CompanyPageFormModel, CompanyIndexFormModel
from django.core.cache import cache

class FormMixin(object):
    '''
    get_errors: 获取错误信息并返回成json
    '''

    def get_errors(self):
        if hasattr(self, 'errors'):
            errors = self.errors.get_json_data()
            print(errors)
            new_errors = {}
            for key, message_dicts in errors.items():
                messages = []
                for message in message_dicts:
                    messages.append(message['message'])
                new_errors[key] = messages
            return new_errors
        else:
            return {}



class IndexApplyForm(forms.Form, FormMixin):

    name = forms.CharField(max_length=4, error_messages={
        'required':'请填写姓名',
        'max_length':'姓名格式错误',
    })
    email = forms.EmailField(error_messages={
        'required':'请填写邮箱'
    })
    telephone = forms.CharField(max_length=11, min_length=11,
                                error_messages={"max_length": "手机号格式错误", "min_length": "手机号格式错误", "required": "请填写手机号"})
    message = forms.CharField(max_length=200,error_messages={
        'required':'请填写留言',
        'max_length':'请保持留言在200字以内'
    })

    def clean(self):
        cleaned_data = super(IndexApplyForm, self).clean()

        telephone = cleaned_data.get('telephone')
        email = cleaned_data.get('email')

        exists_telephone = CompanyIndexFormModel.objects.filter(telephone=telephone, is_verified=False).exists()
        if exists_telephone:
            raise forms.ValidationError('您已经提交过了，请等待审核。')

        exists_email = CompanyIndexFormModel.objects.filter(email=email, is_verified=False).exists()
        if exists_email:
            raise forms.ValidationError('您已经提交过了，请等待审核。')

        return cleaned_data


class PageApplyForm(forms.Form, FormMixin):
    name = forms.CharField(max_length=4, error_messages={
        'required': '请填写姓名',
        'max_length': '姓名格式错误',
    })
    telephone = forms.CharField(max_length=11, min_length=11,
                                error_messages={"max_length": "手机号格式错误", "min_length": "手机号格式错误", "required": "请填写手机号"})
    gift = forms.CharField()
    baby_age = forms.CharField()
    message = forms.CharField(max_length=200, error_messages={
        'required': '请填写留言',
        'max_length': '请保持留言在200字以内'
    })
    img_captcha = forms.CharField(min_length=4, max_length=4,
                                  error_messages={"required": "请输入图形验证码", "max_length": "图形码格式错误",
                                                  "min_length": "图形验证码格式错误"})



    def clean(self):
        cleaned_data = super(PageApplyForm, self).clean()

        telephone = cleaned_data.get('telephone')

        exists_telephone = CompanyPageFormModel.objects.filter(telephone=telephone, is_verified=False).exists()
        if exists_telephone:
            raise forms.ValidationError('您已经提交过了，请等待审核。')

        img_captcha = cleaned_data.get('img_captcha')
        cached_img_captcha = cache.get(img_captcha)
        if not cached_img_captcha or cached_img_captcha.lower() != img_captcha.lower():
            raise forms.ValidationError("图形验证码错误！")

        return cleaned_data

