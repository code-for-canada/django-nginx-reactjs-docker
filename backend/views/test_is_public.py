from rest_framework.views import APIView
from views.retrieve_test_view import TEST_IS_PUBLIC, retrieve_test_data


class TestIsPublic(APIView):

    def get(self, request):
        return retrieve_test_data(request, TEST_IS_PUBLIC)

# http://localhost/api/test-is-public/?test_name=emibSampleTest
