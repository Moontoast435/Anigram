# Generated by Django 4.1 on 2022-09-04 12:34

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_chats'),
    ]

    operations = [
        migrations.AddField(
            model_name='chats',
            name='date',
            field=models.DateTimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
