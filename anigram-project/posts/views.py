import json
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import PostSerializer
from rest_framework import generics, permissions
from .models import Post

class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
  

# @api_view(['GET'])
# def getPosts(request):
#     posts = Post.objects.all()
#     serializer = PostSerializer(posts, many=True)
#     return Response(serializer.data)

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
    breakpoint()
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
