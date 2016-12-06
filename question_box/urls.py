from django.conf.urls import url, include
from django.contrib import admin
from question_app import views
from rest_framework import routers
from question_app import views
from django.views.generic import TemplateView


router = routers.DefaultRouter()
router.register(r'question', views.QuestionViewSet)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    #url(r'^$', views.index, name='index'),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^index/$', TemplateView.as_view(template_name='index.html'), name= 'index')
]
