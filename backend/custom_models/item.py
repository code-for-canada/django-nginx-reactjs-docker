from django.db import models
from .item_type import ItemType


class Item(models.Model):
    item_id = models.AutoField(primary_key=True)
    parent_id = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True)
    item_type_id = models.ForeignKey(ItemType, on_delete=models.CASCADE)
    order = models.PositiveIntegerField()
    date_created = models.DateTimeField()
    date_from = models.DateTimeField()
    date_to = models.DateTimeField(null=True, blank=True)
