from custom_models.item import Item
from serializers.item_serializer import ItemSerializer
from rest_framework import viewsets, permissions


class TestSet(viewsets.ModelViewSet):
    # same as 'SELECT * FROM backend_databasecheckmodel;'
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    # allows only GET requests
    permission_classes = [permissions.IsAdminUser]
