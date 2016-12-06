from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Poster(models.Model):

    score = models.IntegerField(default=0)
    user = models.OneToOneField(User)


class Tag(models.Model):

    name = models.CharField(max_length=25)


class Question(models.Model):

    title = models.CharField(max_length=255)
    text = models.CharField(max_length=255)
    tags = models.ManyToManyField(Tag)
    poster = models.ForeignKey(Poster)


class Answer(models.Model):

    text = models.CharField(max_length=255)
    poster = models.ForeignKey(Poster)
    question = models.ForeignKey(Question)
    score = models.IntegerField(default=0)
