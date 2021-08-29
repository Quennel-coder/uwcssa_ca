from django.urls import path
from news.views import (ArticleListView, ArticleDetailView, ArticleCreateView,
                        TopicListView, TopicDetailView, TopicCreateView,
                        ArticleCommentListView, ArticleCommentCreateView,
                        ArticleCommentDetailView, ArticleCommentSingleListView)

urlpatterns = [
    # Topic
    path('topic_list/', TopicListView.as_view()),
    path('topic_create/', TopicCreateView.as_view()),
    path('topic/<int:pk>/', TopicDetailView.as_view()),

    # Article
    path('article_list/', ArticleListView.as_view()),
    path('article_create/', ArticleCreateView.as_view()),
    path('article/<int:pk>/', ArticleDetailView.as_view()),

    # Comments
    path('articlecomment_list/', ArticleCommentListView.as_view()),
    path('articlecommentsingle_list/<int:article_id>',
         ArticleCommentSingleListView.as_view()),
    path('articlecomment_create/', ArticleCommentCreateView.as_view()),
    path('articlecomment/<int:pk>/', ArticleCommentDetailView.as_view()),
]
