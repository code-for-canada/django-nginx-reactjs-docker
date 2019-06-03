from django.db import models
from .item import Item
MAX_CHAR_LEN = 100

# Test Model (addional data for an item of type test)
# Stores the test_name pk (a unique string to define the test), item id (parent item id),
# is_public (is a sample test anyone can try out or not), default_time (the default time limit in minutes),
# and type (string specifying the type of test)

# NOTE: Test uses a String pk because migrations/rollbacks can result in different ids for tests
# on a dev machine or a deployed environment. The string key will always be the same, no matter the environment


class Test(models.Model):
    test_name = models.CharField(primary_key=True, max_length=MAX_CHAR_LEN)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    is_public = models.BooleanField(default=False, blank=True)
    default_time = models.IntegerField(null=True, blank=True)
    test_type = models.CharField(max_length=MAX_CHAR_LEN)
