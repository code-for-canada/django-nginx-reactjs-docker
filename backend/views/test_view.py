from custom_models.item import Item
from custom_models.test import Test
from serializers.test_serializer import TestSerializer
from rest_framework import viewsets, permissions
from rest_framework.response import Response


class TestSet(viewsets.ReadOnlyModelViewSet):
    # same as 'SELECT * FROM backend_databasecheckmodel;'
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    # Can only be accessed by Admin
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        queryset2 = Item.objects.all()
        queryset = Test.objects.all()
        filter_value = self.request.query_params.get('test_name', None)
        if filter_value is not None:
            queryset = queryset.filter(test_name=filter_value)

        print(queryset.last())
        return queryset

# http://localhost/api/test-check/?item_id=<item_id>
# http://localhost/api/test-check/?test_name=emibSampleTest
