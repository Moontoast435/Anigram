from rest_framework import serializers
# from rest_framework.serializers import ModelSerializer

from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        # fields = ('title', 'body')
        fields = '__all__'
