from rest_framework import viewsets
from backend.serializers.user_serializer import UserSerializer
from backend.models.user_model import MyUser

class UserViewSet(viewsets.ModelViewSet):
    # GETS USER LIST
    queryset = MyUser.objects.all() # same as 'SELECT * FROM backend_myuser;'
    serializer_class = UserSerializer
    # allows only GET requests
    http_method_names = ['get'] # TODO: (fnormand01) disable GET request as soon as we deploy
