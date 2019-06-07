from django.utils import timezone
from django.test import TestCase
from views.retrieve_test_view import retrieve_json_from_name_date, META_TEST


class RetrieveTest(TestCase):
    def test_get_real_sample(self):
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", timezone.now(), META_TEST)
        expected_json = {
            "test_internal_name": "emibSampleTest",
            "test_en_name": "eMiB Sample Test",
            "meta_test.test_fr_name": "FR eMiB Sample Test",
            "meta_test.is_public": True,
            "meta_test.default_time": None,
            "meta_test.test_type": "emib"
        }
        self.assertEqual(real_json, expected_json)
