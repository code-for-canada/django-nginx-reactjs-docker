from rest_framework import viewsets
from backend.serializers.user_serializers import UserSerializer
from backend.models.user_models import MyUser

class UserViewSet(viewsets.ModelViewSet):
    # GETS USER LIST
    queryset = MyUser.objects.all() # same as 'SELECT * FROM backend_myuser;'
    serializer_class = UserSerializer
