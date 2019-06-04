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
        # get the querysets
        item_queryset = Item.objects.all()
        test_queryset = Test.objects.all()
        # get the test_name from the parameter
        filter_value = self.request.query_params.get('test_name', None)
        # if there is a value, look it up
        if filter_value is not None:
            test_queryset = test_queryset.filter(test_name=filter_value)

        # get the item id and look up the item (if possible)
        item_id = test_queryset.last().item_id_id
        if item_id is not None:
            item_queryset = item_queryset.filter(item_id=item_id)
        print(item_queryset.last())
        # return the result
        return test_queryset

# http://localhost/api/test-check/?item_id=<item_id>
# http://localhost/api/test-check/?test_name=emibSampleTest
