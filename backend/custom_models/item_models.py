from django.db import models
from language_models import Language

MAX = 100


class ItemType(models.Model):
    item_type_id = models.AutoField(primary_key=True)
    type_desc = models.CharField(max_length=MAX)
    date_created = models.DateTimeField()
    date_from = models.DateTimeField()
    date_to = models.DateTimeField()


class Item(models.Model):
    item_id = models.AutoField(primary_key=True)
    parent_id = models.ForeignKey("self", on_delete=models.CASCADE)
    item_type_id = models.ForeignKey(ItemType, on_delete=models.CASCADE)
    order = models.PositiveIntegerField()
    date_created = models.DateTimeField()
    date_from = models.DateTimeField()
    date_to = models.DateTimeField()


class ItemText(models.Model):
    item_text_id = models.AutoField(primary_key=True)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    text_detail = models.CharField(max_length=MAX)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    date_created = models.DateTimeField()
    date_from = models.DateTimeField()
    date_to = models.DateTimeField()
