from django.db import models

class Guide(models.Model):
    name = models.CharField(max_length=100)
# Create your models here.
