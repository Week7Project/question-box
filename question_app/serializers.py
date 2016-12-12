from rest_framework import serializers
from .models import Question, Tag, Answer, Poster
from django.contrib.auth.models import User


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('__all__')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')


class PosterSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Poster
        fields = ('user', 'score')


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = ('url', 'text', 'poster', 'question', 'score', 'answer_created', 'answer_modified', 'id')


class QuestionSerializer(serializers.ModelSerializer):
    tags = TagSerializer(read_only=True, many=True)
    answer = AnswerSerializer(many=True, read_only=True)
    # user = UserSerializer(read_only=True)

    class Meta:
        model = Question
        fields = ('url', 'title', 'text', 'tags', 'poster', 'answer', 'question_created', 'question_modified', 'id')
    #
    # def create(self, validated_data):
    #     return Question(**validated_data)
