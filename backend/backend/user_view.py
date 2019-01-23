from rest_framework import viewsets
from ticketapi.serializers import UserSerializer
from models import MyUser

# Create your views here.

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = MyUser.objects.create_user(username='testing', password='password',
                                          given_name='Test', family_name='Endpoint',
                                          email='test@email.ca')
    serializer_class = UserSerializer
