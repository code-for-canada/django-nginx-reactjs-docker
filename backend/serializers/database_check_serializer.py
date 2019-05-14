from rest_framework import serializers
from custom_models.database_models import DatabaseCheckModel

# Serializers define the API representation
class DatabaseCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatabaseCheckModel
        fields = "__all__"
