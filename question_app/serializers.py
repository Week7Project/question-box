from rest_framework import serializers
from .models import Question, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name')


class QuestionSerializer(serializers.ModelSerializer):
    tag = TagSerializer(read_only=True, many=True)

    class Meta:
        model = Question
        fields = ('url', 'title', 'text', 'tag', 'poster')
