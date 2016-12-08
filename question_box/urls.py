from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from question_app import views
from django.views.generic import TemplateView


router = routers.DefaultRouter()
router.register(r'api/question', views.QuestionViewSet)
router.register(r'api/answer', views.AnswerViewSet)
router.register(r'api/tag', views.TagViewSet)
router.register(r'api/user', views.UserViewSet)


urlpatterns = [
   url(r'^admin/', admin.site.urls),
   url(r'^', include(router.urls)),
   url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
   url(r'^index/$', TemplateView.as_view(template_name='index.html'), name= 'index'),
   url(r'^question_app/', include('question_app.urls')),
   url(r'^question/([0-9]+)', TemplateView.as_view(template_name='question.html'), name= 'question'),
]
