from django.shortcuts import render
from .serializers import PostSerializer
from rest_framework import generics
from .models import Post


class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer