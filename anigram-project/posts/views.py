from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import PostSerializer
from rest_framework import generics
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
    post = Post.objects.create(description=description, image_url=image_url)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updatePost(request, pk):
    data = request.data
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(instance=post, data=data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
    
@api_view(['DELETE'])
def deletePost(request,pk):
    note = Post.objects.get(id=pk)
    note.delete()
    return Response('Post was deleted!')
