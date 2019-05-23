from django.db import models
MAX_CHAR_LEN = 100


class QuestionType(models.Model):
    question_type_id = models.AutoField(primary_key=True)
    question_type_desc = models.CharField(max_length=MAX_CHAR_LEN)
    date_created = models.DateTimeField()
    date_from = models.DateTimeField()
    date_to = models.DateTimeField(null=True, blank=True)
