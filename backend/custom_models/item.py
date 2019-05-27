from django.db import models
from .item_type import ItemType

# Item model. Contains the information necessary to identify an item
# by its type (test, question set, question, answer, etc)  and what items it relates to (the patent)
# NOTE: tests do not have a parent, but every other item should have a parent that is either a test
# or the descendent of some item within a test


class Item(models.Model):
    item_id = models.AutoField(primary_key=True)
    parent_id = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True)
    item_type_id = models.ForeignKey(ItemType, on_delete=models.CASCADE)
    order = models.PositiveIntegerField()
    date_created = models.DateTimeField()
    date_from = models.DateTimeField()
    date_to = models.DateTimeField(null=True, blank=True)
