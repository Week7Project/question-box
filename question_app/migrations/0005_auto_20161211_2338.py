# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2016-12-11 23:38
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('question_app', '0004_auto_20161211_2315'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answer', to='question_app.Question'),
        ),
    ]