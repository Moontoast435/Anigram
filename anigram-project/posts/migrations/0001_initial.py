<<<<<<< HEAD
# Generated by Django 4.1.1 on 2022-09-07 09:18
=======
# Generated by Django 4.1.1 on 2022-09-07 09:17
>>>>>>> 157da0d85a9b2c648565c0ff94fe716cb3a37b52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=1000)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('image_url', models.ImageField(upload_to='')),
                ('username', models.CharField(max_length=100)),
            ],
        ),
    ]
