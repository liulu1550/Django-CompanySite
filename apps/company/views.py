from django.shortcuts import render, get_object_or_404, get_list_or_404, Http404, HttpResponse
from django.views.generic.base import View
from System.models import CompanyBanner, CompanyAdvert, CompanyFunction, CompanySite
from .models import Goods, GoodsCategory, GoodsBanner, GoodsDetail, Video, Strength, News, NewsCategory, NewsSEO, \
    NewsDetail, CompanyAbout, CompanyContact, CompanyLinks
from pure_pagination import PageNotAnInteger, Paginator
from operation.forms import IndexApplyForm, PageApplyForm
from operation.models import CompanyPageFormModel, Gift, CompanyIndexFormModel
from utils import restful
from utils.captcha.captcha import Captcha
from django.core.cache import cache
from io import BytesIO
from django.core.mail import send_mail, EmailMultiAlternatives
from utils.device import get_device
from django.conf import settings


# Create your views here.


class IndexView(View):
    def get(self, request):
        banners = CompanyBanner.objects.filter(is_active=True).order_by('-index')[:4]
        adverts = CompanyAdvert.objects.filter(is_active=True).order_by('-index')[:3]
        goods = Goods.objects.filter(is_active=True, is_index=True).order_by('-create_time')[:4]
        goods_categories = GoodsCategory.objects.filter(is_index=True)
        videos = Video.objects.filter(is_active=True, is_index=True).order_by('-id')[:4]
        strength = Strength.objects.filter(is_index=True, is_active=True).order_by('-id')[:6]
        news = News.objects.filter(is_active=True, is_index=True).order_by('-create_time')[:3]
        links = CompanyLinks.objects.filter(is_active=True).order_by('-index')[:10]

        if get_device(request) is 'mobile':
            return render(request, 'company/m/index.html', locals())
        else:
            return render(request, 'company/index.html', locals())

    def post(self, request):
        form = IndexApplyForm(request.POST)
        page_form_state = get_object_or_404(CompanyFunction, id=1)
        site_url = get_object_or_404(CompanySite, id=1)
        if page_form_state.index_form_state == 'ON':
            if form.is_valid():
                name = form.cleaned_data.get('name')
                telephone = form.cleaned_data.get('telephone')
                email = form.cleaned_data.get('email')
                message = form.cleaned_data.get('message')

                add_CompanyIndexFormModel = CompanyIndexFormModel(name=name, email=email, telephone=telephone,
                                                                  message=message)
                add_CompanyIndexFormModel.save()

                subject = '来自xxx的问候'
                text_content = '这是一封重要的邮件.'
                html_content = '<p><strong>xxxx有限公司</strong>官网提示：</p><br/><p>首页<a href="%s">%s</a>有人提交新信息啦</p><br/>' \
                               '提交人:%s <br/>邮箱:%s<br/>手机号:%s<br/>留言内容:%s<br/>赶紧去后台看看吧！<br/>后台链接:<a href="%s/admin">%s/admin</a>' % (
                                   site_url.site_url, site_url.site_url, name, email, telephone, message,
                                   site_url.site_url, site_url.site_url)
                from_email = settings.EMAIL_HOST_USER
                to_email = [CompanySite.objects.get(id=1).site_email]
                msg = EmailMultiAlternatives(subject, text_content, from_email, to_email)
                msg.attach_alternative(html_content, "text/html")
                msg.send()

                return restful.ok()
            else:
                return restful.params_error(form.get_errors())
        else:
            return restful.server_error(message='活动已经结束')


class GoodsListAllView(View):
    """
    商品分类：全部
    url:/goods/category/
    """

    def get(self, request):
        goods = Goods.objects.filter(is_active=True).order_by('-create_time')
        categories = GoodsCategory.objects.all()

        try:
            page = request.GET.get('page', 1)
        except PageNotAnInteger:
            page = 1

        p = Paginator(goods, 8, request=request)
        goods = p.page(page)
        if get_device(request) is 'mobile':
            return render(request, 'company/m/goods-list.html', locals())
        else:
            return render(request, 'company/goods-list.html', locals())


class GoodsListView(View):
    """
    商品分类：<str:分类名称>
    url:/goods/category/<str:分类名称>
    """

    def get(self, request, category_name):
        goods = Goods.objects.filter(is_active=True, category__name=category_name).order_by('-create_time')
        categories = GoodsCategory.objects.all()

        try:
            page = request.GET.get('page', 1)
        except PageNotAnInteger:
            page = 1

        p = Paginator(goods, 8, request=request)
        goods = p.page(page)

        if get_device(request) is 'mobile':
            return render(request, 'company/m/goods-list.html', locals())
        else:
            return render(request, 'company/goods-list.html', locals())


class GoodsDetailView(View):
    """
    商品详情:<int:uid>
    url:/goods/<str:uid>
    """

    def get(self, request, uid):
        goods = get_object_or_404(Goods, is_active=True, uid=uid)
        goods.viewed()  # 记录点击数
        goods_banners = GoodsBanner.objects.filter(goods_id=goods.id)
        goods_body = get_object_or_404(GoodsDetail, goods__uid=uid)
        re_goods = Goods.objects.filter(category__name=goods.category.name, is_active=True).order_by('?')[:4]

        # 上一篇下一篇
        has_prev = False
        has_next = False
        id_prev = id_next = goods.id
        goods_id_max = Goods.objects.filter(is_active=True).order_by('-create_time').first()
        id_max = goods_id_max.id
        while not has_prev and id_prev >= 1:
            goods_prev = Goods.objects.filter(id=id_prev - 1, is_active=True).first()
            if not goods_prev:
                id_prev -= 1
            else:
                has_prev = True

        while not has_next and id_next <= id_max:
            goods_next = Goods.objects.filter(id=id_next + 1, is_active=True).first()
            if not goods_next:
                id_next += 1
            else:
                has_next = True
        if get_device(request) is 'mobile':
            return render(request, 'company/m/goods-detail.html', locals())
        else:
            return render(request, 'company/goods-detail.html', locals())


class VideoListView(View):
    """
    视频中心
    url:/video/
    """

    def get(self, request):
        videos = Video.objects.filter(is_active=True).order_by('-id')
        try:
            page = request.GET.get('page', 1)
        except PageNotAnInteger:
            page = 1

        p = Paginator(videos, 5, request=request)
        videos = p.page(page)
        if get_device(request) is 'mobile':
            return render(request, 'company/m/video-list.html', locals())
        else:
            return render(request, 'company/video-list.html', locals())


class StrengthListView(View):
    """
    实力保证
    url:/strength/
    """

    def get(self, request):
        strengths = Strength.objects.filter(is_active=True).order_by('-create_time')

        try:
            page = request.GET.get('page', 1)
        except PageNotAnInteger:
            page = 1

        p = Paginator(strengths, 6, request=request)
        strengths = p.page(page)
        if get_device(request) is 'mobile':
            return render(request, 'company/m/strength-list.html', locals())
        else:
            return render(request, 'company/strength-list.html', locals())


class StrengthDetailView(View):
    """
    实力保证详情
    url:/strength/<int:strength_id>
    """

    def get(self, request, strength_id):
        strength = get_object_or_404(Strength, id=strength_id)

        # 上一篇下一篇
        has_prev = False
        has_next = False
        id_prev = id_next = strength.id
        strength_id_max = Strength.objects.filter(is_active=True).order_by('-create_time').first()
        id_max = strength_id_max.id
        while not has_prev and id_prev >= 1:
            strength_prev = Strength.objects.filter(id=id_prev - 1, is_active=True).first()
            if not strength_prev:
                id_prev -= 1
            else:
                has_prev = True

        while not has_next and id_next <= id_max:
            strength_next = Strength.objects.filter(id=id_next + 1, is_active=True).first()
            if not strength_next:
                id_next += 1
            else:
                has_next = True
        if get_device(request) is 'mobile':
            return render(request, 'company/m/strength-detail.html', locals())
        else:
            return render(request, 'company/strength-detail.html', locals())


class NewsListAllView(View):
    """
    全部新闻
    url:/news/category/
    """

    def get(self, request):
        news = News.objects.filter(is_active=True).order_by('-create_time')
        categories = NewsCategory.objects.all()

        try:
            page = request.GET.get('page', 1)
        except PageNotAnInteger:
            page = 1

        p = Paginator(news, 6, request=request)
        news = p.page(page)

        if get_device(request) is 'mobile':
            return render(request, 'company/m/news-list.html', locals())
        else:
            return render(request, 'company/news-list.html', locals())


class NewsListView(View):
    """
    分类下新闻
    url:/news/category/<str:category_name>
    """

    def get(self, request, category_name):
        news = News.objects.filter(is_active=True, category__name=category_name).order_by('-create_time')
        categories = NewsCategory.objects.all()

        try:
            page = request.GET.get('page', 1)
        except PageNotAnInteger:
            page = 1

        p = Paginator(news, 6, request=request)
        news = p.page(page)
        if get_device(request) is 'mobile':
            return render(request, 'company/m/news-list.html', locals())
        else:
            return render(request, 'company/news-list.html', locals())


class NewsDetailView(View):
    def get(self, request, uid):
        news = get_object_or_404(News, is_active=True, uid=uid)
        news.viewed()
        news_body = get_object_or_404(NewsDetail, news__uid=uid)
        re_news = News.objects.filter(category__name=news.category.name, is_active=True).order_by('?')[:5]
        news_seo = NewsSEO.objects.filter(news_id=news.id).first()

        # 上一篇下一篇
        has_prev = False
        has_next = False
        id_prev = id_next = news.id
        news_id_max = News.objects.filter(is_active=True).order_by('-create_time').first()
        id_max = news_id_max.id
        while not has_prev and id_prev >= 1:
            news_prev = News.objects.filter(id=id_prev - 1, is_active=True).first()
            if not news_prev:
                id_prev -= 1
            else:
                has_prev = True

        while not has_next and id_next <= id_max:
            news_next = News.objects.filter(id=id_next + 1, is_active=True).first()
            if not news_next:
                id_next += 1
            else:
                has_next = True
        if get_device(request) is 'mobile':
            return render(request, 'company/m/news-detail.html', locals())
        else:
            return render(request, 'company/news-detail.html', locals())


def img_captcha(request):
    text, image = Captcha.gene_code()
    # BytesIO：相当于一个管道，用来存储图片的流数据
    out = BytesIO()
    # 调用image的save方法，将这个image对象保存到BytesIO中
    image.save(out, 'png')
    # 将BytesIO的文件指针移动到最开始的位置
    out.seek(0)

    response = HttpResponse(content_type='image/png')
    # 从BytesIO的管道中，读取出图片数据，保存到response对象上
    response.write(out.read())
    response['Content-length'] = out.tell()

    # 12Df：12Df.lower()
    cache.set(text.lower(), text.lower(), 5 * 60)
    # print('生成的验证号是：'+ text.lower())
    # print('缓存中的验证号码:'+ cache.get(text.lower()))

    return response


class CompanyPageForm(View):
    def get(self, request):
        gifts = Gift.objects.filter(is_active=True)
        if get_device(request) is 'mobile':
            return render(request, 'company/m/free.html', locals())
        else:
            return render(request, 'company/free.html', locals())

    def post(self, request):
        form = PageApplyForm(request.POST)
        page_form_state = get_object_or_404(CompanyFunction, id=1)
        site_url = get_object_or_404(CompanySite, id=1)
        if page_form_state.page_form_state == 'ON':
            if form.is_valid():
                name = form.cleaned_data.get('name')
                telephone = form.cleaned_data.get('telephone')
                gift = form.cleaned_data.get('gift')
                baby_age = form.cleaned_data.get('baby_age')
                message = form.cleaned_data.get('message')

                add_CompanyPageFormModel = CompanyPageFormModel(name=name, telephone=telephone, gift=gift,
                                                                baby_age=baby_age, message=message)
                add_CompanyPageFormModel.save()

                subject = '来自xxx的问候'
                text_content = '这是一封重要的邮件.'
                html_content = '<p><strong>xxxx有限公司</strong>官网提示：</p><br/><p>免费领取页面<a href="%s/apply">%s/apply/</a>有人提交新信息啦</p><br/>' \
                               '提交人:%s <br/>联系方式:%s<br/>感兴趣的产品:%s<br/>宝宝年龄:%s<br/>留言内容:%s<br/>赶紧去后台看看吧！<br/>后台链接:<a href="%s/admin">%s/admin</a>' % (
                               site_url.site_url, site_url.site_url, name, telephone, gift, baby_age, message,
                               site_url.site_url, site_url.site_url)
                from_email = settings.EMAIL_HOST_USER
                to_email = [CompanySite.objects.get(id=1).site_email]
                msg = EmailMultiAlternatives(subject, text_content, from_email, to_email)
                msg.attach_alternative(html_content, "text/html")
                msg.send()
                return restful.ok()

            else:
                return restful.params_error(message=form.get_errors())

        else:
            return restful.server_error(message='活动已经结束')


class AboutView(View):
    def get(self, request):
        about = get_object_or_404(CompanyAbout, id=1)
        if get_device(request) is 'mobile':
            return render(request, 'company/m/about.html', locals())
        else:
            return render(request, 'company/about.html', locals())


class ContactView(View):
    def get(self, request):
        contact = get_object_or_404(CompanyContact, id=1)

        if get_device(request) is 'mobile':
            return render(request, 'company/m/contact.html', locals())
        else:
            return render(request, 'company/contact.html', locals())
