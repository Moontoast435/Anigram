# Generated by Django 4.1 on 2022-09-01 18:24

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image_url',
            field=models.ImageField(blank=True, null=True, upload_to=api.models.upload_to),
        ),
    ]
