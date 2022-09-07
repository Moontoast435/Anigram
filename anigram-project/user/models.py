from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, default='')
    last_name = models.CharField(max_length=255, default='')
    phone = models.CharField(max_length=20, default='')
    city = models.CharField(max_length=20, default='')
    status = models.CharField(max_length=50, default=''),
    adoptable = models.BooleanField(),
    credentials = models.CharField(max_length=500, default='')

    def __str__(self):
        return self.first_name
