from django.shortcuts import render
from .models import CompanySite, CompanyFunction
from company.models import NewsCategory, News, NewsDetail, Goods, Strength
from itertools import chain
from django.db.models import Q
from pure_pagination import PageNotAnInteger, Paginator
from utils.device import get_device
# Create your views here.
def company_global_config(request):
    """
    注册全局变量
    :return:
    """
    site = CompanySite.objects.get(id=1)
    company_function = CompanyFunction.objects.get(id=1)
    news_categories = NewsCategory.objects.all()
    return {
        'site_name': site.site_name,
        'site_url': site.site_url,
        'site_logo': site.site_logo,
        'site_email': site.site_email,
        'site_telephone': site.site_telephone,
        'site_qq': site.site_qq,
        'site_phone': site.site_phone,
        'site_address': site.site_address,
        'site_fax': site.site_fax,
        'site_zip': site.site_zip,
        'site_weibo': site.site_weibo,
        'site_weixin': site.site_weixin,
        'site_copyright': site.site_copyright,
        'site_baidu_map_x_y': site.site_baidu_map_x_y,
        'site_keywords': site.site_keywords,
        'site_description': site.site_description,
        'site_theme': site.site_theme,
        'news_categories':news_categories,
        'company_function':company_function,
    }

def search(request):
    if request.method == 'GET':
        keywords = request.GET.get('keywords', '')  # 得到搜索关键词'django'
        news_list = News.objects.filter(Q(title__icontains=keywords) | Q(desc__icontains=keywords))
        goods_list = Goods.objects.filter(Q(name__icontains=keywords) | Q(desc__icontains=keywords))
        course_list = list(chain(news_list, goods_list))
        try:
            page = request.GET.get('page', 1)
        except PageNotAnInteger:
            page = 1

        p = Paginator(course_list, 8, request=request)
        course_list = p.page(page)
        if get_device(request) is 'mobile':
            return render(request, 'company/m/search.html', locals())
        else:
            return render(request, 'company/search.html', locals())



# 404
def page_not_found(request, exception):  # 注意点 ①
    return render(request, 'company/404.html')

# 500
def page_error(request):
    return render(request, 'company/404.html')