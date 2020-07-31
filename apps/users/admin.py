from django.contrib import admin
from .models import User


# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'telephone', 'email', 'name', 'web_url', 'is_superuser', 'is_staff', 'is_active', 'data_joined')
    list_editable = ['is_active', 'is_staff']


admin.site.register(User, UserAdmin)
