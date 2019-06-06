from rest_framework import serializers
from custom_models.meta_test_return import MetaTest

# Serializers define the API representation


class MetaTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaTest
        fields = "__all__"
