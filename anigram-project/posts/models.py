from django.db import models
from django.contrib.auth.models import User

# class Post(models.Model):
#     title = models.CharField(max_length=100)
#     body = models.CharField(max_length=500)


def upload_to(instance, filename):
    # return 'media/{filename}'.format(filename=filename)
    return '/'.join(['covers', str(instance.description), filename])


# Create your models here.
class Post(models.Model):
    description = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    # auto_now updates on each post update
    # created = models.DateTimeField(auto_now_add=True)
    # auto_now_add is updated only when a record is created
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)
    

    def __str__(self):
        return self.description
