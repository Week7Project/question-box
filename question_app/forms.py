from django import forms
from django.contrib.auth.models import User
from question_app.models import Poster


class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'password']


class PosterForm(forms.ModelForm):

   class Meta:
       model = Poster
       fields = ['score']
