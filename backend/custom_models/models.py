from django.db import models

MAX = 100

# Language Models


class Language(models.Model):
    language_id = models.AutoField(primary_key=True)
    ISO_Code_1 = models.CharField(max_length=2)
    ISO_Code_2 = models.CharField(max_length=3)
    date_created = models.DateTimeField()
    date_from = models.DateTimeField()
    date_to = models.DateTimeField(null=True, blank=True)


# Item Models
class ItemType(models.Model):
    item_type_id = models.AutoField(primary_key=True)
    type_desc = models.CharField(max_length=MAX)
    date_created = models.DateTimeField()
    date_from = models.DateTimeField()
    date_to = models.DateTimeField(null=True, blank=True)


class Item(models.Model):
    item_id = models.AutoField(primary_key=True)
    parent_id = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True)
    item_type_id = models.ForeignKey(ItemType, on_delete=models.CASCADE)
    order = models.PositiveIntegerField()
    date_created = models.DateTimeField()
    date_from = models.DateTimeField()
    date_to = models.DateTimeField(null=True, blank=True)


class ItemText(models.Model):
    item_text_id = models.AutoField(primary_key=True)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    text_detail = models.CharField(max_length=MAX)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    date_created = models.DateTimeField()
    date_from = models.DateTimeField()
    date_to = models.DateTimeField(null=True, blank=True)

# Question Models


class QuestionType(models.Model):
    question_type_id = models.AutoField(primary_key=True)
    question_type_desc = models.CharField(max_length=MAX)
    date_created = models.DateTimeField()
    date_from = models.DateTimeField()
    date_to = models.DateTimeField(null=True, blank=True)


class Question(models.Model):
    question_id = models.AutoField(primary_key=True)
    question_type_id = models.ForeignKey(
        QuestionType, on_delete=models.CASCADE)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    date_created = models.DateTimeField()
    date_from = models.DateTimeField()
    date_to = models.DateTimeField(null=True, blank=True)
