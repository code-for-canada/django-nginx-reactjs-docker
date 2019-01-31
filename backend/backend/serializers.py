from rest_framework import serializers
from .models import MyUser

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MyUser
        fields = ('username', 'password', 'given_name', 'family_name', 'email')
