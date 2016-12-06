from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import Question
from .serializers import QuestionSerializer

#Create your views here.
class QuestionViewSet(viewsets.ModelViewSet):

    queryset = Question.objects.all().order_by('title')
    serializer_class = QuestionSerializer


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
