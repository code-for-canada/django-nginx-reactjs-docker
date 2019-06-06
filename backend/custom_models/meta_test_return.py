from django.db import models
from .test import Test
from .item_text import ItemText
# return type for test meta data request


class MetaTest(models.Model):
    test_internal_name = Test.test_name
    test_en_name = ItemText.text_detail
    test_fr_name = ItemText.text_detail
    is_public = Test.is_public
    default_time = Test.default_time
    test_type = Test.test_type

    class Meta:
        # this model does not correspond to a physical table
        managed = False

    def __init__(self, test, item_text_en, item_text_fr):
        print("ARRRGG A BLARRG")
        self.test_internal_name = test.test_name
        print("ARRRGG A BLARRG 1")
        self.test_en_name = item_text_en.text_detail
        print("ARRRGG A BLARRG 2")
        self.test_fr_name = item_text_fr.text_detail
        print("ARRRGG A BLARRG 3")
        self.is_public = test.is_public
        print("ARRRGG A BLARRG 4")
        self.default_time = test.default_time
        print("ARRRGG A BLARRG 5")
        self.test_type = test.test_type
        print("ARRRGG A BLARRG 6")
