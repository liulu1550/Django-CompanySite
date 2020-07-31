from django.db import models
from django.utils.html import format_html
# Create your models here.
class CompanyBanner(models.Model):
    title = models.CharField(verbose_name='标题', max_length=128, null=True, blank=True, help_text='选填')
    pic = models.ImageField(verbose_name='PC端幻灯片', upload_to='banner/', help_text='尺寸1920*500')
    m_pic = models.ImageField(verbose_name='手机端幻灯片', upload_to='banner/', help_text='尺寸1200*800')
    link_to = models.URLField(verbose_name='链接到:', max_length=512, null=True, blank=True, help_text='选填，为空时不跳转')
    index = models.IntegerField(verbose_name='排序', default=1,help_text='数字越大越靠前')
    is_active = models.BooleanField(verbose_name='是否激活', default=True)

    def pic_data(self):
        if self.pic:
            return format_html(
                '<img src="{}" width="80px" height="auto"/>',
                self.pic.url,
            )

    def m_pic_data(self):
        if self.m_pic:
            return format_html(
                '<img src="{}" width="80px" height="auto"/>',
                self.m_pic.url,
            )

    class Meta:
        verbose_name = '幻灯片管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return '幻灯片管理'

    pic_data.short_description = 'PC端幻灯片'
    m_pic_data.short_description = '手机端幻灯片'



class CompanyAdvert(models.Model):
    title = models.CharField(verbose_name='标题', max_length=128, null=True,blank=True)
    pic = models.ImageField(verbose_name='广告图片', upload_to='advert')
    link_to = models.URLField(verbose_name='链接到:', max_length=512, null=True, blank=True, help_text='选填，为空时不跳转')
    is_active = models.BooleanField(verbose_name='是否激活', default=True)
    index = models.IntegerField(verbose_name='排序', default=1,help_text='数字越大越靠前')

    def pic_data(self):
        if self.pic:
            return format_html(
                '<img src="{}" width="80px" height="auto"/>',
                self.pic.url,
            )

    class Meta:
        verbose_name = '广告管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return '广告管理'

    pic_data.short_description = '广告图片'


class CompanySite(models.Model):
    site_name = models.CharField(verbose_name='站点名称',max_length=128,default='XXX有限公司')
    site_url = models.URLField(verbose_name='站点根链接', default='https://www.baidu.com')
    site_logo = models.ImageField(verbose_name='站点logo', upload_to='site/')
    site_email = models.EmailField(verbose_name='站点邮箱')
    site_telephone = models.CharField(verbose_name='电话', max_length=11,default='18888888888')
    site_qq = models.CharField(verbose_name='QQ', max_length=10, default='0000000000')
    site_phone = models.CharField(verbose_name='座机',max_length=20, default='010-2345-231')
    site_address = models.CharField(verbose_name='公司地址', max_length=128, default='安徽省合肥市蜀山区要素大市场')
    site_fax = models.CharField(verbose_name='传真', max_length=50, default='000666888')
    site_zip = models.CharField(verbose_name='邮编', max_length=10, default='230000')
    site_weibo = models.CharField(verbose_name='微博地址', max_length=128, default='http://weibo.com')
    site_weixin = models.ImageField(verbose_name='微信二维码', upload_to='site/')
    site_copyright = models.CharField(verbose_name='备案号', max_length=128, default='COPYRIGHT (©) 皖icp-000000001号')
    site_baidu_map_x_y = models.CharField(verbose_name='百度地图经纬度', max_length=128, default='00000,00000')
    site_keywords = models.CharField(verbose_name='站点关键字', max_length=128, default='关键字1,关键字2,关键字3')
    site_description = models.CharField(verbose_name='站点描述', max_length=128, default='站点描述描述描述站点描述描述描述站点描述描述描述')
    site_theme = models.CharField(verbose_name='站点风格颜色', max_length=128, default='#000000', help_text='请填写16进制颜色值')

    class Meta:
        verbose_name = '站点设置'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.site_name


class CompanyFunction(models.Model):
    """
    站点功能状态
    """
    STATE_CHOICES = (
        ('ON', u'开启'),
        ('OFF', u'关闭'),
    )
    login_state = models.CharField(verbose_name='站点登录功能', max_length=50, choices=STATE_CHOICES, default='OFF')
    index_form_state = models.CharField(verbose_name='首页表单状态',max_length=50, choices=STATE_CHOICES, default='OFF')
    page_form_state = models.CharField(verbose_name='单页表单状态',max_length=50, choices=STATE_CHOICES, default='OFF')

    class Meta:
        verbose_name = '功能状态'
        verbose_name_plural = verbose_name

    def __str__(self):
        return '功能状态'
