from rest_framework import serializers
from custom_models.test import Test

# Serializers define the API representation


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = "__all__"
