# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2016-12-11 22:36
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('question_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='poster',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='question_app.Poster'),
        ),
    ]
