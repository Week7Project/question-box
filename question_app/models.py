from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Poster(models.Model):
    score = models.IntegerField(default=0)
    user = models.OneToOneField(User)


    def __str__(self):
        return self.user.username


class Tag(models.Model):
    name = models.CharField(max_length=25)


    def __str__(self):
        return self.name


class Question(models.Model):
    title = models.CharField(max_length=255)
    text = models.CharField(max_length=255)
    tags = models.ManyToManyField(Tag)
    poster = models.ForeignKey(User)
    question_created = models.DateTimeField(auto_now_add=True)
    question_modified = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.title


class Answer(models.Model):
    text = models.CharField(max_length=255)
    poster = models.ForeignKey(Poster)
    question = models.ForeignKey(Question, related_name='answer')
    score = models.IntegerField(default=0)
    answer_created = models.DateTimeField(auto_now_add=True)
    answer_modified = models.DateTimeField(auto_now=True)
