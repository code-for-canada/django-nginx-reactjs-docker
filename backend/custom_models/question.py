from django.db import models
from .item import Item
from .question_type import QuestionType

# Question model; adds a question type to an item in the Item table


class Question(models.Model):
    question_id = models.AutoField(primary_key=True)
    question_type_id = models.ForeignKey(
        QuestionType, on_delete=models.CASCADE)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True, blank=True)
    date_from = models.DateTimeField(auto_now_add=True, blank=True)
    date_to = models.DateTimeField(null=True, blank=True)
