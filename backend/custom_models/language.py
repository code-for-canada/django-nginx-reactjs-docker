from django.db import models
from datetime import datetime

# Language model, containing language id and ISO Codes (fr, en; fr-ca, en-ca)
# This is used to identify items in text tables so that the proper language is displayed


class Language(models.Model):
    language_id = models.AutoField(primary_key=True)
    ISO_Code_1 = models.CharField(max_length=2)
    ISO_Code_2 = models.CharField(max_length=5)
    date_created = models.DateTimeField(auto_now_add=True, blank=True)
    date_from = models.DateTimeField(auto_now_add=True, blank=True)
    date_to = models.DateTimeField(null=True, blank=True)
