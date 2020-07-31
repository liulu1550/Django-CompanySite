from django.contrib import admin
from .models import *
# Register your models here.

class GiftAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'is_active']
    list_display_links = ['id', 'name']

class CompanyPageFormModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'telephone', 'gift', 'baby_age', 'message','create_time', 'is_verified']
    list_display_links = ['id', 'name']
    list_editable = ['is_verified']


class CompanyIndexFormModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'telephone', 'email', 'message','create_time', 'is_verified']
    list_display_links = ['id', 'name']
    list_editable = ['is_verified']

admin.site.register(Gift, GiftAdmin)
admin.site.register(CompanyPageFormModel, CompanyPageFormModelAdmin)
admin.site.register(CompanyIndexFormModel, CompanyIndexFormModelAdmin)