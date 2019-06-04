from rest_framework import serializers
from custom_models.item import Item

# Serializers define the API representation


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"
