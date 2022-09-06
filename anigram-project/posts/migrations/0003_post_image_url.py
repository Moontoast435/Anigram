# Generated by Django 4.1.1 on 2022-09-05 15:09

from django.db import migrations, models
import posts.models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_remove_post_image_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image_url',
            field=models.ImageField(blank=True, null=True, upload_to=posts.models.upload_to),
        ),
    ]