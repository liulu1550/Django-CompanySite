from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from shortuuidfield import ShortUUIDField


# Create your models here.


class UserManager(BaseUserManager):
    '''
    _create_user:私有方法，用来创建用户
    create_user：创建普通用户
    create_superuser：创建超级管理员
    '''

    def _create_user(self, telephone, username, password, **kwargs):
        if not telephone:
            raise ValueError('请输入手机号码')
        if not username:
            raise ValueError('请输入用户名')
        if not password:
            raise ValueError('请输入密码')

        user = self.model(telephone=telephone, username=username, password=password, **kwargs)
        user.set_password(password)
        user.save()
        return user

    def create_user(self, telephone, username, password, **kwargs):
        kwargs['is_superuser'] = False
        return self._create_user(telephone=telephone, username=username, password=password, **kwargs)

    def create_superuser(self, telephone, username, password, **kwargs):
        kwargs['is_superuser'] = True
        kwargs['is_staff'] = True
        return self._create_user(telephone, username, password, **kwargs)


class User(AbstractBaseUser, PermissionsMixin):
    GENDER_CHOICES = (
        ("male", u"男"),
        ("female", u"女")
    )

    # 不使用默认自增长的主键

    uid = ShortUUIDField(primary_key=True)
    telephone = models.CharField('手机号码', max_length=11, unique=True)
    email = models.EmailField(verbose_name='邮箱',unique=True, null=True)
    username = models.CharField(max_length=100, verbose_name='用户名')
    name = models.CharField(max_length=100,null=True, blank=True, verbose_name='真实姓名')
    web_url = models.CharField(max_length=128,null=True, blank=True, verbose_name='个人网站地址')
    qq = models.CharField(max_length=56, null=True, blank=True, verbose_name='QQ')
    birthday = models.DateField("出生年月", null=True, blank=True)
    gender = models.CharField("性别", max_length=6, choices=GENDER_CHOICES, default="female")
    avatar = models.ImageField('用户头像', upload_to='users/', null=True, blank=True)
    introduce = models.CharField(max_length=256,null=True, blank=True, verbose_name='个人介绍')
    address = models.CharField(max_length=256, null=True, blank=True, verbose_name='所在地')
    jobs = models.CharField(max_length=56, null=True, blank=True, verbose_name='工作')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    first_name = models.CharField(max_length=128, default='', null=True, blank=True)
    last_name = models.CharField(max_length=128, default='', null=True, blank=True)
    data_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'telephone'  # 使用手机号码登录
    REQUIRED_FIELDS = ['username']
    EMAIL_FIELD = 'email'

    objects = UserManager()

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username

    class Meta:
        verbose_name = '用户'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username