from django.db import models



# explicitly set upload path and filename
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

# Create your models here.
class Post(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    # auto_now updates on each post update
    created = models.DateTimeField(auto_now_add=True)
    # auto_now_add is updated only when a record is created
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)

    def __str__(self):
        return self.body[0:50]
