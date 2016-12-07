from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from rest_framework import viewsets
from .models import Question
from .serializers import QuestionSerializer
from .forms import UserForm, PosterForm
from django.contrib.auth import authenticate, login

#Create your views here.


class QuestionViewSet(viewsets.ModelViewSet):

    queryset = Question.objects.all().order_by('title')
    serializer_class = QuestionSerializer


def index(request):
    return HttpResponse("Hello, world. You're at the QuestionApp index.")


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
           return HttpResponseRedirect('/main')
   return render(request, 'register.html', {'user_form': user_form, 'poster_form': poster_form})
