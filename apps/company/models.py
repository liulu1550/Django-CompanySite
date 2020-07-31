from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
from shortuuidfield import ShortUUIDField
from django.utils import timezone
from django.utils.html import format_html


# Create your models here.
# =========================================== 商品模型===============================================
class GoodsCategory(models.Model):
    name = models.CharField(verbose_name='分类名称', max_length=50)
    is_index = models.BooleanField(verbose_name='是否首页显示', default=False)

    def get_is_active_goods_num(self):
        return self.category_goods.filter(is_active=True).count()

    class Meta:
        verbose_name = '商品分类'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

    get_is_active_goods_num.short_description = '已激活商品数量'


class Goods(models.Model):
    uid = ShortUUIDField(verbose_name='序列号', editable=False)
    name = models.CharField(verbose_name='商品名称', max_length=128)
    desc = models.CharField(verbose_name='描述', max_length=128)
    thumbnail = models.ImageField(verbose_name='缩略图', upload_to='goods_thumbnail/', help_text='尺寸320*240')
    category = models.ForeignKey(GoodsCategory, verbose_name='所属分类', on_delete=models.CASCADE,
                                 related_name='category_goods')
    buy_link = models.URLField(verbose_name='购买链接', null=True, blank=True, help_text='选填')
    is_index = models.BooleanField(verbose_name='是否首页显示', default=False)
    is_active = models.BooleanField(verbose_name='是否激活', default=True)
    create_time = models.DateTimeField(verbose_name='添加时间', default=timezone.now)
    update_time = models.DateTimeField(verbose_name='修改时间', auto_now=True)
    click_nums = models.IntegerField(verbose_name='点击量', default=0)

    def viewed(self):
        """
        增加阅读数
        """
        self.click_nums += 1
        self.save(update_fields=['click_nums'])

    def thumbnail_data(self):
        if self.thumbnail:
            return format_html(
                '<img src="{}" width="80px" height="auto"/>',
                self.thumbnail.url,
            )

    class Meta:
        verbose_name = '商品管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

    thumbnail_data.short_description = '缩略图'
    viewed.short_description = '点击量'


class GoodsTag(models.Model):
    name = models.CharField(verbose_name='标签名称', max_length=50)
    goods = models.ForeignKey(Goods, verbose_name='商品', related_name='goods_tags_goods', on_delete=models.CASCADE)

    class Meta:
        verbose_name = '商品标签'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class GoodsBanner(models.Model):
    pic = models.ImageField(verbose_name='轮播图片', upload_to='goods_banner/', help_text='尺寸480*300')
    goods = models.ForeignKey(Goods, verbose_name='商品', on_delete=models.CASCADE, related_name='goodsbanners_goods')

    class Meta:
        verbose_name = '商品轮播图'
        verbose_name_plural = verbose_name

    def __str__(self):
        return '商品轮播图'


class GoodsDetail(models.Model):
    body = RichTextUploadingField('内容')
    goods = models.OneToOneField(Goods, verbose_name='商品', on_delete=models.CASCADE, related_name='goodsdetail_goods')


# =========================================== 文章模型===============================================
class NewsCategory(models.Model):
    name = models.CharField(verbose_name='名称', max_length=50)

    def get_is_active_news_num(self):
        return self.category_news.filter(is_active=True).count()

    class Meta:
        verbose_name = '文章分类'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

    get_is_active_news_num.short_description = '已激活文章数量'


class News(models.Model):
    uid = ShortUUIDField(verbose_name='序列号', editable=False)
    title = models.CharField(verbose_name='文章标题', max_length=128)
    desc = models.CharField(verbose_name='文章简介', max_length=128)
    thumbnail = models.ImageField(verbose_name='文章缩略图', upload_to='news_thumbnail/', help_text='尺寸420*200')
    category = models.ForeignKey(NewsCategory, verbose_name='文章分类', on_delete=models.CASCADE,
                                 related_name='category_news')
    click_nums = models.IntegerField(verbose_name='点击量', default=0)
    is_active = models.BooleanField(verbose_name='是否激活', default=True)
    is_index = models.BooleanField(verbose_name='是否首页显示', default=True)
    create_time = models.DateTimeField(verbose_name='创建时间', default=timezone.now)
    update_time = models.DateTimeField(verbose_name='修改时间', auto_now=True)

    def thumbnail_data(self):
        if self.thumbnail:
            return format_html(
                '<img src="{}" width="80px" height="auto"/>',
                self.thumbnail.url,
            )

    def viewed(self):
        """
        增加阅读数
        """
        self.click_nums += 1
        self.save(update_fields=['click_nums'])


    class Meta:
        verbose_name = '文章管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title

    viewed.short_description = '点击量'
    thumbnail_data.short_description = '缩略图'


class NewsDetail(models.Model):
    body = RichTextUploadingField('内容')
    news = models.OneToOneField(News, verbose_name='文章', on_delete=models.CASCADE, related_name='newsdetail_news')


class NewsSEO(models.Model):
    keywords = models.CharField(verbose_name='文章关键词', max_length=128, help_text='请以英文符号","分开', default='')
    description = models.CharField(verbose_name='文章描述', max_length=200, help_text='文章的描述', default='')
    news = models.OneToOneField(News, verbose_name='文章', on_delete=models.CASCADE, related_name='newsnewsseo_news')

# =========================================== 视频模型===============================================

class Video(models.Model):
    SOURCE_CHOICES = (
        ('web', u'网络'),
        ('company', u'安姐'),
    )
    title = models.CharField(verbose_name='标题', max_length=128)
    desc = models.CharField(verbose_name='描述', max_length=128)
    thumbnail = models.ImageField(verbose_name='视频封面', upload_to='video/', help_text='尺寸：480*300')
    video = models.FileField(verbose_name='上传视频', upload_to='video_file/')
    click_nums = models.IntegerField(verbose_name='点击量', default=0)
    is_active = models.BooleanField(verbose_name='是否激活', default=True)
    is_index = models.BooleanField(verbose_name='是否首页显示', default=True)
    source = models.CharField("视频来源", max_length=50, choices=SOURCE_CHOICES, default='company')

    def thumbnail_data(self):
        if self.thumbnail:
            return format_html(
                '<img src="{}" width="80px" height="auto"/>',
                self.thumbnail.url,
            )

    def viewed(self):
        """
        增加阅读数
        """
        self.click_nums += 1
        self.save(update_fields=['click_nums'])

    class Meta:
        verbose_name = '视频管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title

    viewed.short_description = '点击量'
    thumbnail_data.short_description = '缩略图'


# ===========================================实力保证模型===============================================

class Strength(models.Model):
    title = models.CharField(verbose_name='标题', max_length=128)
    desc = models.CharField(verbose_name='简介', max_length=128)
    thumbnail = models.ImageField(verbose_name='封面', upload_to='strength/')
    is_active = models.BooleanField(verbose_name='是否激活', default=True)
    is_index = models.BooleanField(verbose_name='是否首页显示', default=True)
    body = RichTextUploadingField(verbose_name='内容')
    create_time = models.DateTimeField(verbose_name='创建时间', default=timezone.now)
    update_time = models.DateTimeField(verbose_name='修改时间', auto_now=True)

    def thumbnail_data(self):
        if self.thumbnail:
            return format_html(
                '<img src="{}" width="80px" height="auto"/>',
                self.thumbnail.url,
            )

    class Meta:
        verbose_name = '实力保证'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title

    thumbnail_data.short_description = '缩略图'


class CompanyAbout(models.Model):
    title = models.CharField(verbose_name='公司名称', max_length=128)
    body = RichTextUploadingField('内容')

    class Meta:
        verbose_name = '关于我们'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title


class CompanyContact(models.Model):
    title = models.CharField(verbose_name='公司名称', max_length=128)
    body = RichTextUploadingField('内容')

    class Meta:
        verbose_name = '联系我们'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title

class CompanyLinks(models.Model):
    name = models.CharField(verbose_name='链接名称', max_length=128)
    pic = models.ImageField(verbose_name='图片', upload_to='links/')
    url = models.URLField(verbose_name='链接', default='https://www.baidu.com')
    index = models.IntegerField(verbose_name='排序', default=1, help_text='数字越大越靠前')
    is_active = models.BooleanField(verbose_name='是否激活', default=True)

    def pic_data(self):
        if self.pic:
            return format_html(
                '<img src="{}" width="80px" height="auto"/>',
                self.pic.url,
            )

    class Meta:
        verbose_name = '扩展链接'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

    pic_data.short_description = '图片'