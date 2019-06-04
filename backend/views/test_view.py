from custom_models.item import Item
from serializers.item_serializer import ItemSerializer
from rest_framework import viewsets, permissions
from rest_framework.response import Response


class TestSet(viewsets.ReadOnlyModelViewSet):
    # same as 'SELECT * FROM backend_databasecheckmodel;'
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    # allows only GET requests
    permission_classes = [permissions.IsAdminUser]
    print("DIRE LORD 2")

    def get_queryset(self):
        queryset = Item.objects.all()
        filter_value = self.request.query_params.get('item_id', None)
        if filter_value is not None:
            queryset = queryset.filter(item_id=filter_value)
        return queryset

# http://localhost/api/test-check/?item_id=<item_id>
