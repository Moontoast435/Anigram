from django.db import models

# Create your models here.
class Clients(models.Model):
    #userid = models.ForeignKey(Users, on_delete=models.SET_NULL, null=True)
    username = models.CharField(max_length=50, default="testuser")
    channel_name = models.CharField(max_length=200)

    def __str__(self):
        return str(self.username)[0:50]

class Chats(models.Model):
    #TODO add foreign keys for the user fields
    sender = models.CharField(max_length=100)
    recipient = models.CharField(max_length=100)
    message = models.CharField(max_length=1000)
    date = models.DateTimeField()

