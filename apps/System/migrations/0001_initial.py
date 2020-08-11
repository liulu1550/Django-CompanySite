# Generated by Django 3.0.8 on 2020-08-11 10:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CompanyAdvert',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=128, null=True, verbose_name='标题')),
                ('pic', models.ImageField(upload_to='advert', verbose_name='广告图片')),
                ('link_to', models.URLField(blank=True, help_text='选填，为空时不跳转', max_length=512, null=True, verbose_name='链接到:')),
                ('is_active', models.BooleanField(default=True, verbose_name='是否激活')),
                ('index', models.IntegerField(default=1, help_text='数字越大越靠前', verbose_name='排序')),
            ],
            options={
                'verbose_name': '广告管理',
                'verbose_name_plural': '广告管理',
            },
        ),
        migrations.CreateModel(
            name='CompanyBanner',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, help_text='选填', max_length=128, null=True, verbose_name='标题')),
                ('pic', models.ImageField(help_text='尺寸1920*500', upload_to='banner/', verbose_name='PC端幻灯片')),
                ('m_pic', models.ImageField(help_text='尺寸1200*800', upload_to='banner/', verbose_name='手机端幻灯片')),
                ('link_to', models.URLField(blank=True, help_text='选填，为空时不跳转', max_length=512, null=True, verbose_name='链接到:')),
                ('index', models.IntegerField(default=1, help_text='数字越大越靠前', verbose_name='排序')),
                ('is_active', models.BooleanField(default=True, verbose_name='是否激活')),
            ],
            options={
                'verbose_name': '幻灯片管理',
                'verbose_name_plural': '幻灯片管理',
            },
        ),
        migrations.CreateModel(
            name='CompanyFunction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('login_state', models.CharField(choices=[('ON', '开启'), ('OFF', '关闭')], default='OFF', max_length=50, verbose_name='站点登录功能')),
                ('index_form_state', models.CharField(choices=[('ON', '开启'), ('OFF', '关闭')], default='OFF', max_length=50, verbose_name='首页表单状态')),
                ('page_form_state', models.CharField(choices=[('ON', '开启'), ('OFF', '关闭')], default='OFF', max_length=50, verbose_name='单页表单状态')),
            ],
            options={
                'verbose_name': '功能状态',
                'verbose_name_plural': '功能状态',
            },
        ),
        migrations.CreateModel(
            name='CompanySite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('site_name', models.CharField(default='XXX有限公司', max_length=128, verbose_name='站点名称')),
                ('site_url', models.URLField(default='https://www.baidu.com', verbose_name='站点根链接')),
                ('site_logo', models.ImageField(upload_to='site/', verbose_name='站点logo')),
                ('site_email', models.EmailField(max_length=254, verbose_name='站点邮箱')),
                ('site_telephone', models.CharField(default='18888888888', max_length=11, verbose_name='电话')),
                ('site_qq', models.CharField(default='0000000000', max_length=10, verbose_name='QQ')),
                ('site_phone', models.CharField(default='010-2345-231', max_length=20, verbose_name='座机')),
                ('site_address', models.CharField(default='安徽省合肥市蜀山区要素大市场', max_length=128, verbose_name='公司地址')),
                ('site_fax', models.CharField(default='000666888', max_length=50, verbose_name='传真')),
                ('site_zip', models.CharField(default='230000', max_length=10, verbose_name='邮编')),
                ('site_weibo', models.CharField(default='http://weibo.com', max_length=128, verbose_name='微博地址')),
                ('site_weixin', models.ImageField(upload_to='site/', verbose_name='微信二维码')),
                ('site_copyright', models.CharField(default='COPYRIGHT (©) 皖icp-000000001号', max_length=128, verbose_name='备案号')),
                ('site_baidu_map_x_y', models.CharField(default='00000,00000', max_length=128, verbose_name='百度地图经纬度')),
                ('site_keywords', models.CharField(default='关键字1,关键字2,关键字3', max_length=128, verbose_name='站点关键字')),
                ('site_description', models.CharField(default='站点描述描述描述站点描述描述描述站点描述描述描述', max_length=128, verbose_name='站点描述')),
                ('site_theme', models.CharField(default='#000000', help_text='请填写16进制颜色值', max_length=128, verbose_name='站点风格颜色')),
            ],
            options={
                'verbose_name': '站点设置',
                'verbose_name_plural': '站点设置',
            },
        ),
    ]