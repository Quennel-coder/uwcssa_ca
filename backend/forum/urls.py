from django.urls import path
from forum.views import (DiscussionListView, DiscussionDetailView,
                         DiscussionCreateView, ForumListView, ForumDetailView,
                         ForumCreateView, DiscussionCommentListView,
                         DiscussionCommentCreateView,
                         DiscussionCommentDetailView,
                         DiscussionCommentSingleListView)

urlpatterns = [
    # Forum
    path('forum_list/', ForumListView.as_view()),
    path('forum_create/', ForumCreateView.as_view()),
    path('forum/<int:pk>/', ForumDetailView.as_view()),

    # Discussion
    path('discussion_list/', DiscussionListView.as_view()),
    path('discussion_create/', DiscussionCreateView.as_view()),
    path('discussion/<int:pk>/', DiscussionDetailView.as_view()),

    # Comments
    path('discussioncomment_list/', DiscussionCommentListView.as_view()),
    path('discussioncommentsingle_list/<int:Discussion_id>',
         DiscussionCommentSingleListView.as_view()),
    path('discussioncomment_create/', DiscussionCommentCreateView.as_view()),
    path('discussioncomment/<int:pk>/', DiscussionCommentDetailView.as_view()),
]
