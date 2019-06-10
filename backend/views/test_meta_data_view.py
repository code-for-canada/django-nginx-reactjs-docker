from rest_framework.views import APIView
from rest_framework import permissions
from views.retrieve_test_view import TEST_META_DATA, retrieve_test_data


class TestMetaDataSet(APIView):
    # Can only be accessed by Admin
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        return retrieve_test_data(request, TEST_META_DATA)

# http://localhost/api/test-meta-data/?test_name=emibSampleTest
