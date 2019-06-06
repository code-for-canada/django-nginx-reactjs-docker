from custom_models.item import Item
from custom_models.test import Test
from serializers.test_serializer import TestSerializer
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.core.serializers import serialize
from django.http import HttpResponse


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
        obj_array.extend(self.get_children(item_id))
        json_return = serialize('json', obj_array)
        print(item_test_returnset)
        print(item_test_returnset.last())
        print(json_return)
        # return the result
        print("-----------")
        for item in obj_array:
            print(item)
        print("-----------")
        return HttpResponse(json_return, content_type='application/json')
        # return test_returnset

    def get_children(self, item_id):
        child_arr = []
        # get the querysets
        item_queryset = Item.objects.all()
        # get all children of item_id
        item_child_returnset = item_queryset.filter(parent_id=item_id)
        # if there are no children, return the empty list
        if item_child_returnset is None:
            return []
        # otherwise, add children to the child_array
        child_arr.extend(item_child_returnset)
        # for each child, recursively call this function
        for child in item_child_returnset:
            child_arr.extend(self.get_children(child.item_id))
        # return the array
        return child_arr


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


# for each time, get the item_type and item_text.....
