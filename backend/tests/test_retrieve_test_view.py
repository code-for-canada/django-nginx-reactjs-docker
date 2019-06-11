from django.utils import timezone
from django.test import TestCase
from views.retrieve_test_view import retrieve_json_from_name_date, TEST_META_DATA, TEST_INSTRUCTIONS, TEST_QUESTIONS


class RetrieveMetaTest(TestCase):
    def test_get_real_sample(self):
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", timezone.now(), TEST_META_DATA)
        expected_json = {
            "test_internal_name": "emibSampleTest",
            "test_en_name": "eMiB Sample Test",
            "test_fr_name": "FR eMiB Sample Test",
            "is_public": True,
            "default_time": None,
            "test_type": "emib"
        }
        self.assertEqual(real_json, expected_json)

    def test_get_nonexistant_test(self):
        real_json = retrieve_json_from_name_date(
            "IAmNotARealTest", timezone.now(), TEST_META_DATA)
        expected_json = {"error", "no test with the given test_name"}
        self.assertEqual(real_json, expected_json)

    def test_get_test_before(self):
        time = timezone.datetime.strptime('01/01/1500', "%d/%m/%Y").date()
        time = timezone.now() + timezone.timedelta(days=-1)
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", time, TEST_META_DATA)
        expected_json = {'error', 'no test item found'}
        self.assertEqual(real_json, expected_json)


class RetrievePreTest(TestCase):
    def test_get_real_sample(self):
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", timezone.now(), TEST_INSTRUCTIONS)
        expected_json = {
            "test_internal_name": "emibSampleTest",
            "instructions": []
        }
        self.assertEqual(real_json, expected_json)

    def test_get_nonexistant_test(self):
        real_json = retrieve_json_from_name_date(
            "IAmNotARealTest", timezone.now(), TEST_INSTRUCTIONS)
        expected_json = {"error", "no test with the given test_name"}
        self.assertEqual(real_json, expected_json)

    def test_get_test_before(self):
        time = timezone.datetime.strptime('01/01/1500', "%d/%m/%Y").date()
        time = timezone.now() + timezone.timedelta(days=-1)
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", time, TEST_INSTRUCTIONS)
        expected_json = {'error', 'no test item found'}
        self.assertEqual(real_json, expected_json)


class RetrieveInTest(TestCase):
    def test_get_real_sample(self):
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", timezone.now(), TEST_QUESTIONS)
        expected_json = {
            "test_internal_name": "emibSampleTest",
            "questions": []
        }
        self.assertEqual(real_json, expected_json)

    def test_get_nonexistant_test(self):
        real_json = retrieve_json_from_name_date(
            "IAmNotARealTest", timezone.now(), TEST_QUESTIONS)
        expected_json = {"error", "no test with the given test_name"}
        self.assertEqual(real_json, expected_json)

    def test_get_test_before(self):
        time = timezone.datetime.strptime('01/01/1500', "%d/%m/%Y").date()
        time = timezone.now() + timezone.timedelta(days=-1)
        real_json = retrieve_json_from_name_date(
            "emibSampleTest", time, TEST_QUESTIONS)
        expected_json = {'error', 'no test item found'}
        self.assertEqual(real_json, expected_json)
