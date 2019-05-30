from django.db import models
from .item import Item
from .language import Language
MAX_CHAR_LEN = 3000

# Item Text model. Stores the "display name" of an item, the item id, and the language.
# this can be the name of a test, a text identifier of a question set, the text of a question or answer
# etc


class ItemText(models.Model):
    item_text_id = models.AutoField(primary_key=True)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    text_detail = models.CharField(max_length=MAX_CHAR_LEN)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True, blank=True)
    date_from = models.DateTimeField(auto_now_add=True, blank=True)
    date_to = models.DateTimeField(null=True, blank=True)
