from django.db import models
from .item import Item
from .question_type import QuestionType


class Question(models.Model):
    question_id = models.AutoField(primary_key=True)
    question_type_id = models.ForeignKey(
        QuestionType, on_delete=models.CASCADE)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    date_created = models.DateTimeField()
    date_from = models.DateTimeField()
    date_to = models.DateTimeField(null=True, blank=True)
