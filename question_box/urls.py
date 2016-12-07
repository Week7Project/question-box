from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from question_app import views
import question_app


router = routers.DefaultRouter()
router.register(r'question', views.QuestionViewSet)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index, name='index'),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^question_app/', include('question_app.urls')),
]
