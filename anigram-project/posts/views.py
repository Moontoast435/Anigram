import json
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import PostSerializer
from rest_framework import generics, permissions
from rest_framework.permissions import AllowAny
from .models import Post
from rest_framework.filters import SearchFilter

class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [SearchFilter]
    search_fields = ['username']
 
   



@api_view(['GET'])
def getPost(request, pk):
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createPost(request):
    data = request.data
    description = request.data['description']
    image_url = request.data['image_url']
    username = request.data['username']
    post = Post.objects.create(description=description, image_url=image_url, username=username)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updatePost(request, pk):
    data = request.data
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(instance=post, data=data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
    return Response(serializer.data)
    
@api_view(['DELETE'])
def deletePost(request,pk):
    note = Post.objects.get(id=pk)
    note.delete()
    return Response('Post was deleted!')
