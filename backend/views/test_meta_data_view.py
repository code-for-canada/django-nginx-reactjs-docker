from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework import permissions
from views.retrieve_test_view import TEST_META_DATA, retrieve_test_data, is_test_public


class TestMetaDataSet(APIView):
    def get(self, request):
        return retrieve_test_data(request, TEST_META_DATA)

    # assign the permissions depending on if the test is public or not
    def get_permissions(self):
        try:
            # is_public = true
            if is_test_public(self.request.query_params.get("test_name", None)):
                return [permissions.IsAuthenticatedOrReadOnly()]
            # is_public = false
            else:
                return [permissions.IsAuthenticated()]
        # is_test_public does not exist
        except ObjectDoesNotExist:
            return [permissions.IsAdminUser()]


# Tests List:
# eMIB Sample Test: http://localhost/api/test-meta-data/?test_name=emibSampleTest
# eMIB Pizza Test: http://http://localhost/api/test-meta-data/?test_name=emibPizzaTest
