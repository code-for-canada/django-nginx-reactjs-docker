from custom_models.item import Item
from custom_models.test import Test
from serializers.test_serializer import TestSerializer
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.core.serializers import serialize


class TestSet(viewsets.ReadOnlyModelViewSet):
    # same as 'SELECT * FROM backend_databasecheckmodel;'
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    # Can only be accessed by Admin
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        obj_array = []
        print("12344444")
        # get the querysets
        item_queryset = Item.objects.all()
        test_queryset = Test.objects.all()
        # get the test_name from the parameter
        filter_value = self.request.query_params.get('test_name', None)
        # if there is a test_name, look it up
        if filter_value is None:
            return [{"error", "no 'test_name' parameter"}]

        test_returnset = test_queryset.filter(test_name=filter_value)

        # get the item id and look up the item (if possible)
        obj_array.extend(test_returnset)
        item_id = test_returnset.last().item_id_id
        if item_id is None:
            return [{"error", "no associated item"}]
        item_test_returnset = item_queryset.filter(item_id=item_id)
        obj_array.extend(item_test_returnset)
        self.get_children(item_id)
        print(item_test_returnset)
        print(item_test_returnset.last())
        # return the result
        print("-----------")
        print(serialize('json', obj_array))
        print("-----------")
        return test_returnset

    def get_children(self, item_id):
        child_arr = []
        print("Looking for", item_id)
        # get the querysets
        item_queryset = Item.objects.all()
        item_child_returnset = item_queryset.filter(parent_id=item_id)
        print(item_child_returnset)


def extend_array(array1, array2):
    if array2 is None:
        return array1
    array1.extend(array2)
    return array1


# http://localhost/api/test-check/?item_id=<item_id>
# http://localhost/api/test-check/?test_name=emibSampleTest

# TODO loop for all children of the item
# more functions?
# other API calls?
# other views all point here, adding props?
