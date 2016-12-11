from rest_framework import serializers
from .models import Question, Tag, Answer, Poster
from django.contrib.auth.models import User


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('__all__')


<<<<<<< HEAD

class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = ('url', 'text', 'poster', 'question', 'score', 'answer_created', 'answer_modified', 'id')

class QuestionSerializer(serializers.ModelSerializer):
    answer = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ('url', 'title', 'text', 'tags', 'poster', 'question_created', 'answer', 'question_modified', 'id')



=======
>>>>>>> c6ee862916545b4d5b8c21f75d71aaff0bb6b553

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
    poster = UserSerializer(read_only=True)

    class Meta:
        model = Question
        fields = ('url', 'title', 'text', 'tags', 'poster', 'question_created', 'question_modified', 'id')
