'''
It tests the queryset that is used in the view (database_check_view.py),
but also the model itself (database_check_model.py)
'''

from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from backend.views.database_check_view import DatabaseCheckModel
from backend.serializers import database_check_serializer

class DatabaseCheckViewTests(APITestCase):
    client = APIClient()

    @staticmethod
    def create_database_entry(name=''):
        if (name) != '':
            DatabaseCheckModel.objects.create_database_entry(name=name)

    def setUp(self):
        self.create_database_entry(name='name1')

class GetAllDatabaseEntriesTest(DatabaseCheckViewTests):

    def test_get_all_users(self):
        response = self.client.get('http://localhost:80/database_check/')

        # SELECT * FROM backend_databasecheckmodel;
        expected = DatabaseCheckModel.objects.all()
        serialized = database_check_serializer.DatabaseCheckSerializer(expected, many=True)

        self.assertEqual(response.data, serialized.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class GetSpecificDataTest(DatabaseCheckViewTests):

    def test_get_specific_user(self):
        response = self.client.get('http://localhost:80/database_check/')

        # SELECT name FROM backend_databasecheckmodel WHERE name='name1';
        expected = DatabaseCheckModel.objects.values_list('name', flat=True).get(name='name1')

        self.assertEqual(expected, 'name1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
