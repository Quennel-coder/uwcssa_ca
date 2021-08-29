from django.contrib import admin
from news.models import Topic, Article, ArticleComment
# Register your models here.

admin.site.register(Topic)
admin.site.register(Article)
admin.site.register(ArticleComment)