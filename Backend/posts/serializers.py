from enum import unique
from rest_framework import serializers

from .models import Post


# class PostSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Post
#         fields = ['name', 'text', 'created']


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields =  ['id','name', 'text', 'created','img']
