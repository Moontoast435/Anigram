from django.urls import path
from . import views

urlpatterns = [
    path('api/post', views.PostListCreate.as_view() ),
]
