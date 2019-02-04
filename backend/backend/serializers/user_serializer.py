from rest_framework import serializers
from backend.models.user_model import MyUser

# Serializers define the API representation
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MyUser
        fields = ('username', 'password', 'given_name', 'family_name', 'email')
