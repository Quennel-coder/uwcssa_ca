from rest_framework import serializers
from news.models import Topic, Article

# reference: https://www.jianshu.com/p/de30adb8245e


class TopicSerializer(serializers.ModelSerializer):
    created_by_username = serializers.ReadOnlyField()

    class Meta:
        model = Topic
        fields = '__all__'
        read_only_fields = (
            'created_at',
            'created_by',
        )


class ArticleSerializer(serializers.ModelSerializer):
    # reference: https://stackoverflow.com/questions/17280007/retrieving-a-foreign-key-value-with-django-rest-framework-serializers
    created_by_username = serializers.ReadOnlyField()
    updated_by_by_username = serializers.ReadOnlyField()
    topic_name = serializers.ReadOnlyField()

    class Meta:
        model = Article
        fields = '__all__'


# class StudentSerializer(serializers.ModelSerializer):
#     # 自定义序列化和反序列化字段校验条件，默认使用建表约束校验；也可以使用extra_kwargs
#     # SlugRelatedField指定关联对象的指定字段，关联字段默认为关联对象id
#     c = serializers.SlugRelatedField(slug_field='name', many=True, queryset=Course.objects.all())
#     g = serializers.SlugRelatedField(slug_field='name', queryset=Grade.objects.all())

#     class Meta:
#         model = Student
#         # 自定义校验
#         extra_kwargs = {'age': {'max_value': 30, 'min_value': 0}}
#         fields = '__all__'

#     # 返回数据预处理
#     def to_representation(self, instance):
#         data = super().to_representation(instance)
#         if data['gender'] == 0:
#             data['gender'] = '女'
#         else:
#             data['gender'] = '男'
#         return data
