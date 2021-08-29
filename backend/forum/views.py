from forum.models import Forum, Discussion, DiscussionComment
from .serializers import ForumSerializer, DiscussionSerializer, DiscussionCommentSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView, ListAPIView, CreateAPIView

from rest_framework.pagination import PageNumberPagination
# Create your views here.


class ForumListView(ListAPIView):
    serializer_class = ForumSerializer
    queryset = Forum.objects.all()
    pagination_class = PageNumberPagination


class ForumCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = ForumSerializer
    queryset = Forum.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by_id=self.request.user)


class ForumDetailView(RetrieveAPIView):  # Forum 不能改
    permission_classes = (IsAuthenticatedOrReadOnly, )
    serializer_class = ForumSerializer
    queryset = Forum.objects.all()

    def perform_update(self, serializer):
        serializer.save(created_by_id=self.request.user)


class DiscussionListView(ListAPIView):
    serializer_class = DiscussionSerializer
    queryset = Discussion.objects.all()
    pagination_class = PageNumberPagination


class DiscussionCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = DiscussionSerializer
    queryset = Discussion.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by_id=self.request.user,
                        updated_by_id=self.request.user)


class DiscussionDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    serializer_class = DiscussionSerializer
    queryset = Discussion.objects.all()

    def perform_update(self, serializer):
        serializer.save(created_by_id=self.request.user,
                        updated_by_id=self.request.user)


class DiscussionCommentListView(ListAPIView):
    serializer_class = DiscussionCommentSerializer
    queryset = DiscussionComment.objects.all()
    pagination_class = PageNumberPagination


class DiscussionCommentSingleListView(ListAPIView):
    serializer_class = DiscussionCommentSerializer
    # queryset = DiscussionComment.objects.all()
    pagination_class = PageNumberPagination

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        Discussion_id = self.kwargs['Discussion_id']
        return DiscussionComment.objects.filter(Discussion_id=Discussion_id)


class DiscussionCommentCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = DiscussionCommentSerializer
    queryset = DiscussionComment.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by_id=self.request.user,
                        updated_by_id=self.request.user)


class DiscussionCommentDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    serializer_class = DiscussionCommentSerializer
    queryset = DiscussionComment.objects.all()

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
