# Generated by Django 4.1 on 2022-09-04 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_chats_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clients',
            name='userid',
        ),
        migrations.AddField(
            model_name='clients',
            name='username',
            field=models.CharField(default='testuser', max_length=50),
        ),
    ]