from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from rest_framework import viewsets
from .models import Question, Answer, Tag
from .serializers import QuestionSerializer, AnswerSerializer, TagSerializer, UserSerializer
from .forms import UserForm, PosterForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from question_app import models



class QuestionViewSet(viewsets.ModelViewSet):

    queryset = Question.objects.all().order_by('title')
    serializer_class = QuestionSerializer


class AnswerViewSet(viewsets.ModelViewSet):
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()

    def get_queryset(self):
        queryset = Answer.objects.all()
        question = self.request.query_params.get('question', None)
        if question is not None:
            queryset = queryset.filter(question=question)
        return queryset

    queryset = Answer.objects.all().order_by('id')
    serializer_class = AnswerSerializer


class TagViewSet(viewsets.ModelViewSet):

    queryset = Tag.objects.all().order_by('name')
    serializer_class = TagSerializer


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all().order_by('name')
    serializer_class = UserSerializer


def index(request):
    return HttpResponse("Hello, world. You're at the QuestionApp index.")


def main(request):
    return render(request, 'main.html')


def register(request):
    if request.method == "GET":
        user_form = UserForm()
        poster_form = PosterForm()
    elif request.method == "POST":
        user_form = UserForm(request.POST)
        poster_form = PosterForm(request.POST)
        if user_form.is_valid():
            user = user_form.save()
            poster = poster_form.save(commit=False)
            poster.user = user
            poster.save()
            login(request, user)
            password = user.password
            user.set_password(password)
            user.save()
            user = authenticate(username=user.username, password=password)
            login(request, user)
            return HttpResponseRedirect('/question_app/profile')
    return render(request, 'register.html', {'user_form': user_form,
                                             'poster_form': poster_form})


def profile(request):
    return render(request, 'profile.html')


def question_detail(request, var):
    question = models.Question.objects.get(pk=var)
    return render(request, 'question.html', {'question': question})
