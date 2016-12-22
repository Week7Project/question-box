from django.conf.urls import include, url
import question_app
from django.contrib.auth import views as auth_views

urlpatterns = [
    url(r'^logout/$', auth_views.logout, {'next_page': '/question_app/login/'}, name='logout'),
    url('^', include('django.contrib.auth.urls')),
    url(r'^register/$', question_app.views.register, name='register'),
    url(r'^profile/$', question_app.views.profile, name='profile'),
    url(r'^main/$', question_app.views.main, name='main'),
]
