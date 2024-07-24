from django.db import models
from django.contrib.auth.models import User

class HistoryModel(models.Model):
    query = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'history'
