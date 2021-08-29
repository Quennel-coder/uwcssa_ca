from rest_framework import serializers
from forum.models import Forum, Discussion, DiscussionComment

# reference: https://www.jianshu.com/p/de30adb8245e


class ForumSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField()

    class Meta:
        model = Forum
        fields = '__all__'
        read_only_fields = (
            'created_at_id',
            'created_by_id',
        )


class DiscussionSerializer(serializers.ModelSerializer):
    # reference: https://stackoverflow.com/questions/17280007/retrieving-a-foreign-key-value-with-django-rest-framework-serializers
    created_by = serializers.ReadOnlyField()
    updated_by = serializers.ReadOnlyField()
    topic = serializers.ReadOnlyField()

    class Meta:
        model = Discussion
        fields = '__all__'


class DiscussionCommentSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField()
    updated_by = serializers.ReadOnlyField()

    class Meta:
        model = DiscussionComment
        fields = '__all__'