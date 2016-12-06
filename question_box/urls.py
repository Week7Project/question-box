from django.conf.urls import url, include
from django.contrib import admin
from question_app import views
from rest_framework import routers
from question_app import views


router = routers.DefaultRouter()
router.register(r'question', views.QuestionViewSet)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index, name='index'),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
