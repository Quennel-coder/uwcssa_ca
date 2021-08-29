from django.db import models
from users.models import CustomUser
from datetime import datetime
# Create your models here.

# null default = True
# unique default= False
# reference: https://blog.csdn.net/qq_39208536/article/details/103761445


class Forum(models.Model):
    topic = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by_id = models.ForeignKey(CustomUser,
                                      null=False,
                                      on_delete=models.CASCADE)

    def __str__(self):
        return self.topic

    class Meta:
        ordering = ['-id']

    @property
    def created_by(self):
        return self.created_by_id.username


class Discussion(models.Model):

    topic_id = models.ForeignKey(Forum, on_delete=models.CASCADE)
    subject = models.CharField(max_length=255)
    content = models.TextField(max_length=4000, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    created_by_id = models.ForeignKey(CustomUser,
                                      null=False,
                                      on_delete=models.CASCADE)
    updated_by_id = models.ForeignKey(CustomUser,
                                      null=True,
                                      on_delete=models.CASCADE,
                                      related_name='+')

    def __str__(self):
        return self.subject

    class Meta:
        ordering = ['-id']

    @property
    def created_by(self):
        return self.created_by_id.username

    def updated_by(self):
        return self.updated_by_id.username

    def topic(self):
        return self.topic_id.topic


class DiscussionComment(models.Model):
    discussion_id = models.ForeignKey(Discussion, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    created_by_id = models.ForeignKey(CustomUser,
                                      null=False,
                                      on_delete=models.CASCADE)
    updated_by_id = models.ForeignKey(CustomUser,
                                      null=True,
                                      on_delete=models.CASCADE,
                                      related_name='+')

    comment = models.TextField(max_length=4000, null=True)

    def __str__(self):
        return self.subject

    class Meta:
        ordering = ['-id']

    @property
    def created_by(self):
        return self.created_by_id.username

    def updated_by(self):
        return self.updated_by_id.username
