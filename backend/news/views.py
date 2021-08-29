from news.models import Article, Topic, ArticleComment
from .serializers import TopicSerializer, ArticleSerializer, ArticleCommentSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView, ListAPIView, CreateAPIView

from rest_framework.pagination import PageNumberPagination
# Create your views here.


class TopicListView(ListAPIView):
    serializer_class = TopicSerializer
    queryset = Topic.objects.all()
    pagination_class = PageNumberPagination


class TopicCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = TopicSerializer
    queryset = Topic.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by_id=self.request.user)


class TopicDetailView(RetrieveAPIView):  # Topic 不能改
    permission_classes = (IsAuthenticatedOrReadOnly, )
    serializer_class = TopicSerializer
    queryset = Topic.objects.all()

    def perform_update(self, serializer):
        serializer.save(created_by_id=self.request.user)


class ArticleListView(ListAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    pagination_class = PageNumberPagination


class ArticleCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by_id=self.request.user,
                        updated_by_id=self.request.user)


class ArticleDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()

    def perform_update(self, serializer):
        serializer.save(created_by_id=self.request.user,
                        updated_by_id=self.request.user)


class ArticleCommentListView(ListAPIView):
    serializer_class = ArticleCommentSerializer
    queryset = ArticleComment.objects.all()
    pagination_class = PageNumberPagination


class ArticleCommentSingleListView(ListAPIView):
    serializer_class = ArticleCommentSerializer
    # queryset = ArticleComment.objects.all()
    pagination_class = PageNumberPagination

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        article_id = self.kwargs['article_id']
        return ArticleComment.objects.filter(article_id=article_id)


class ArticleCommentCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = ArticleCommentSerializer
    queryset = ArticleComment.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by_id=self.request.user,
                        updated_by_id=self.request.user)


class ArticleCommentDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    serializer_class = ArticleCommentSerializer
    queryset = ArticleComment.objects.all()

    def perform_update(self, serializer):
        serializer.save(created_by_id=self.request.user,
                        updated_by_id=self.request.user)


# Reference: https://github.com/veryacademy/YT-Django-DRF-Simple-Blog-Series-File-Uploading-Part-8/blob/master/django/blog_api/views.py
""" Concrete View Classes
# CreateAPIView
Used for create-only endpoints.
# ListAPIView
Used for read-only endpoints to represent a collection of model instances.
# RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
# DestroyAPIView
Used for delete-only endpoints for a single model instance.
# UpdateAPIView
Used for update-only endpoints for a single model instance.
# ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
# RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
# RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""
