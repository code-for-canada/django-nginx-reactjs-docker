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

    def test_get_nonexistant_test(self):
        real_json = retrieve_json_from_name_date(
            "IAmNotARealTest", timezone.now(), META_TEST)
        expected_json = {"error", "no test with the given test_name"}
        self.assertEqual(real_json, expected_json)

    def test_get_test_before(self):
        time = timezone.datetime.strptime('01/01/1500', "%d/%m/%Y").date()
        time = timezone.now() + timezone.timedelta(days=-1)
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", time, META_TEST)
        expected_json = {'error', 'no test item found'}
        self.assertEqual(real_json, expected_json)
