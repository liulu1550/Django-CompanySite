from django.contrib import admin
from .models import *


# Register your models here.

class GoodsCategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'get_is_active_goods_num', 'is_index']
    list_display_links = ['name', 'id']


class GoodsAdmin(admin.ModelAdmin):
    list_display = ['name', 'thumbnail_data', 'category', 'buy_link', 'is_index', 'is_active', 'click_nums',
                    'create_time']
    list_filter = ['is_active', 'is_index', 'category']
    list_per_page = 10
    search_fields = ['name', 'desc']

    class GoodsDetailInline(admin.TabularInline):
        """
        商品详情
        """
        model = GoodsDetail
        extra = 1
        style = 'tab'

    class GoodsTagsInline(admin.TabularInline):
        """
        商品标签
        """
        model = GoodsTag
        extra = 1
        style = 'tab'

    class GoodsBannersInline(admin.TabularInline):
        """
        商品幻灯片
        """
        model = GoodsBanner
        extra = 1
        style = 'tab'

    inlines = [GoodsDetailInline, GoodsTagsInline, GoodsBannersInline]


admin.site.register(GoodsCategory, GoodsCategoryAdmin)
admin.site.register(Goods, GoodsAdmin)


class NewsCategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'get_is_active_news_num']


class NewsAdmin(admin.ModelAdmin):
    list_display = ['title', 'thumbnail_data', 'category', 'click_nums', 'is_active', 'is_index', 'create_time']
    list_filter = ['is_active', 'is_index', 'category', 'create_time']
    list_per_page = 10
    search_fields = ['title', 'desc']

    class NewsDetailInline(admin.TabularInline):
        """
        文章详情
        """
        model = NewsDetail
        extra = 1
        style = 'tab'

    class NewsSEOInline(admin.TabularInline):
        """
        文章SEO
        """
        model = NewsSEO
        extra = 1
        style = 'tab'

    inlines = [NewsDetailInline, NewsSEOInline]


admin.site.register(NewsCategory, NewsCategoryAdmin)
admin.site.register(News, NewsAdmin)


class VideoAdmin(admin.ModelAdmin):
    list_display = ['title', 'desc', 'thumbnail_data', 'click_nums', 'is_active', 'is_index']
    list_filter = ['is_active', 'is_index']
    search_fields = ['title', 'desc']
    list_per_page = 10


admin.site.register(Video, VideoAdmin)


class StrengthAdmin(admin.ModelAdmin):
    list_display = ['title', 'thumbnail_data', 'is_active', 'is_index', 'create_time']
    list_filter = ['is_active', 'is_index']
    search_fields = ['title', 'desc']
    list_per_page = 10

admin.site.register(Strength, StrengthAdmin)


class CompanyAboutAdmin(admin.ModelAdmin):
    list_display = ['title']

class CompanyContactAdmin(admin.ModelAdmin):
    list_display = ['title']

class CompanyLinksAdmin(admin.ModelAdmin):
    list_display = ['name', 'index', 'pic_data','url', 'is_active']

admin.site.register(CompanyContact, CompanyContactAdmin)
admin.site.register(CompanyAbout, CompanyAboutAdmin)
admin.site.register(CompanyLinks, CompanyLinksAdmin)