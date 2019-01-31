from rest_framework import viewsets
from .serializers import UserSerializer
from .models import MyUser

class UserViewSet(viewsets.ModelViewSet):
    # GETS USER LIST
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

    # IF YOU DO A GET, IT EXECUTES THE FOLLOWING QUERY AND ADD THIS USER IN THE DB
    # queryset = MyUser.objects.create_user(username='testing', password='password', given_name='Test', family_name='Endpoint', email='test@email.ca')
    # serializer_class = UserSerializer
