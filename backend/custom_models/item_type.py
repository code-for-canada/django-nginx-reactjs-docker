from django.db import models
MAX_CHAR_LEN = 100

# Item Type model, containing the various item types (test, question set, question, answer, etc)
# Used to help the application know how to use/display/etc the various items within the context of a test


class ItemType(models.Model):
    item_type_id = models.AutoField(primary_key=True)
    type_desc = models.CharField(max_length=MAX_CHAR_LEN)
    date_created = models.DateTimeField()
    date_from = models.DateTimeField()
    date_to = models.DateTimeField(null=True, blank=True)
