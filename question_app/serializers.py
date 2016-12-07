from rest_framework import serializers
from .models import Question, Tag, Answer, Poster
from django.contrib.auth.models import User


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('__all__')


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ('url', 'title', 'text', 'tags', 'poster')


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = ('url', 'text', 'poster', 'question', 'score')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')


class PosterSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Poster
        fields = ('user', 'score')
