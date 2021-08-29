from django.contrib import admin
from forum.models import Forum, Discussion, DiscussionComment
# Register your models here.

admin.site.register(Forum)
admin.site.register(Discussion)
admin.site.register(DiscussionComment)