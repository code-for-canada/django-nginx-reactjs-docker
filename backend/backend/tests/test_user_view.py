from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from backend.views.user_view import MyUser
from backend.serializers import user_serializer

class UserViewTest(APITestCase):
    client = APIClient()

    @staticmethod
    def create_user(username='', password='', given_name='', family_name='', email=''):
        if (username, password, given_name, family_name, email) != '':
            MyUser.objects.create_user(
                username=username,
                password=password,
                given_name=given_name,
                family_name=family_name,
                email=email)

    def setUp(self):
        self.create_user(
            username='username1',
            password='password1',
            given_name='givenname1',
            family_name='familyname1',
            email='username1@email.ca')
        self.create_user(
            username='username2',
            password='password2',
            given_name='givenname2',
            family_name='familyname2',
            email='username2@email.ca')

class GetAllUsersTests(UserViewTest):

    def test_get_all_users(self):
        response = self.client.get('http://localhost:80/view_users/')

        # SELECT * FROM backend_myuser;
        expected = MyUser.objects.all()
        serialized = user_serializer.UserSerializer(expected, many=True)

        self.assertEqual(response.data, serialized.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class GetSpecificDataTest(UserViewTest):

    def test_get_specific_user(self):
        response = self.client.get('http://localhost:80/view_users/')

        # SELECT username FROM backend_myuser WHERE username='username1';
        expected1 = MyUser.objects.values_list('username', flat=True).get(username='username1')

        # SELECT email FROM backend_myuser WHERE username='username2';
        expected2 = MyUser.objects.values_list('email', flat=True).get(username='username2')

        self.assertEqual(expected1, 'username1')
        self.assertEqual(expected2, 'username2@email.ca')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
