from django.conf.urls import include, url
from question_app import views
from django.contrib import admin
import question_app
from django.contrib.auth import views as auth_views

urlpatterns = [
    url(r'^logout/$', auth_views.logout, {'next_page': '/question_app/login/'}, name='logout'),
    url('^', include('django.contrib.auth.urls')),
    url(r'^create_user/$', question_app.views.create_user, name='create_user'),
]
