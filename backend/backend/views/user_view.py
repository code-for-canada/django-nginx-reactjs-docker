from rest_framework import viewsets
from rest_framework import generics
from backend.serializers.user_serializer import UserSerializer
from backend.models.user_model import MyUser

class UserViewSet(viewsets.ModelViewSet, generics.RetrieveAPIView):
    # GETS USER LIST
    queryset = MyUser.objects.all() # same as 'SELECT * FROM backend_myuser;'
    serializer_class = UserSerializer
    # allows only GET requests
    http_method_names = ['get']
