from django.contrib import admin
from .models import *
# Register your models here.

class CompanyBannerAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'pic_data', 'm_pic_data', 'link_to', 'is_active', 'index']
    list_per_page = 10
    list_filter = ['is_active']


admin.site.register(CompanyBanner, CompanyBannerAdmin)

class CompanyAdvertAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'pic_data', 'link_to', 'is_active', 'index']
    list_per_page = 10
    list_filter = ['is_active']


admin.site.register(CompanyAdvert, CompanyAdvertAdmin)


class CompanySiteAdmin(admin.ModelAdmin):
    list_display = ['site_name', 'site_url', 'site_address', 'site_theme']

class CompanyFunctionAdmin(admin.ModelAdmin):
    list_display = ['id','login_state', 'index_form_state', 'page_form_state']
    list_editable = ['login_state', 'index_form_state', 'page_form_state']


admin.site.register(CompanySite, CompanySiteAdmin)
admin.site.register(CompanyFunction, CompanyFunctionAdmin)