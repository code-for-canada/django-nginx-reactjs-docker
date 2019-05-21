from django.db import models


class Language(models.Model):
    language_id = models.AutoField(primary_key=True)
    ISO_Code_1 = models.CharField(max_length=2)
    ISO_Code_2 = models.CharField(max_length=3)
    date_created = models.DateTimeField()
    date_from = models.DateTimeField()
    date_to = models.DateTimeField()
