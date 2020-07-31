#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: 小羊驼
@contact: wouldmissyou@163.com
@time: 2020/7/17 下午2:51
@file: urls.py
@desc: 
"""
from django.urls import path, re_path
from . import views
app_name = 'company'

urlpatterns = [
    path('',views.IndexView.as_view(), name='index'),
    path('goods/category/',views.GoodsListAllView.as_view(), name='goods_list_all'),
    path('goods/category/<str:category_name>',views.GoodsListView.as_view(), name='goods_list'),
    path('goods/<str:uid>', views.GoodsDetailView.as_view(), name='goods_detail'),
    path('video/', views.VideoListView.as_view(), name='video_list'),
    path('strength/', views.StrengthListView.as_view(), name='strength_list'),
    path('strength/<int:strength_id>', views.StrengthDetailView.as_view(), name='strength_detail'),
    path('news/category/', views.NewsListAllView.as_view(), name='news_list_all'),
    path('news/category/<str:category_name>', views.NewsListView.as_view(), name='news_list'),
    path('news/<str:uid>', views.NewsDetailView.as_view(), name='news_detail'),
    path('img_captcha/',views.img_captcha,name='img_captcha'),
    path('apply/',views.CompanyPageForm.as_view(), name='apply'),
    path('about/',views.AboutView.as_view(), name='about'),
    path('contact/',views.ContactView.as_view(), name='contact'),

]