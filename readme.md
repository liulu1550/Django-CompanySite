# 介绍
> 本项目使用django==2.1.7+pyhton==3.7开发，满足日常企业需求，
- 手机端和PC端共用后台
- 自定义官网主题
- 表单开关可自定义
- 表单中加入验证码和审核功能，防止恶意提交
- 有表单提交时通过邮件方式提醒管理员

# 安装

1. 克隆本项目至本地
2. 使用虚拟环境安装依赖包
    ```python
    pip install -r requirements.txt
    ```
3. 数据迁移
    ```python
    python manage.py makemigrations
   python manage.py migrate
   
   # 创建超级管理员
   python manage.py createsuperuser
    ```
   
4. 进行虚拟数据导入(必做，防止出错)
    - 方法一
        - 在编辑器中打开项目，找到utils/db_tools/import_system_data.py和utils/db_tools/import_function_data.py两个文件
        - 在编辑器中分别运行两个文件
    
    - 方法二
        - 在数据迁移之后，打开数据库文件，找到数据表System_companysite和System_companyfunction
        - 为两个数据表添加一条数据，每一个主键ID都为1

5. 配置settings.py文件，将邮箱配置修改成你自己的
         
6. 运行项目
> python manage.py runserver