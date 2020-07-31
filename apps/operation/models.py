from django.db import models

# Create your models here.
class Gift(models.Model):
    name = models.CharField(verbose_name='赠品名称', max_length=128)
    is_active = models.BooleanField(verbose_name='是否激活', default=True)

    class Meta:
        verbose_name = '赠品管理'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

class CompanyPageFormModel(models.Model):
    name = models.CharField(verbose_name='姓名', max_length=50)
    telephone = models.CharField(verbose_name='联系方式', max_length=11)
    gift = models.CharField(verbose_name='赠品', max_length=128)
    baby_age = models.CharField(verbose_name='婴儿年龄', max_length=128)
    message = models.TextField(verbose_name='留言')
    is_verified = models.BooleanField(verbose_name='是否已审核', default=False)
    create_time = models.DateTimeField(verbose_name='提交时间', auto_now_add=True)

    class Meta:
        verbose_name = '免费领取'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class CompanyIndexFormModel(models.Model):
    name = models.CharField(verbose_name='姓名', max_length=50)
    telephone = models.CharField(verbose_name='联系方式', max_length=11)
    email = models.CharField(verbose_name='邮箱', max_length=128)
    message = models.TextField(verbose_name='留言')
    is_verified = models.BooleanField(verbose_name='是否已审核', default=False)
    create_time = models.DateTimeField(verbose_name='提交时间', auto_now_add=True)


    class Meta:
        verbose_name = '首页提交'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name