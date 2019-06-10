from rest_framework.views import APIView
from views.retrieve_test_view import IS_TEST_PUBLIC, retrieve_test_data


class TestIsPublic(APIView):
    def get(self, request):
        return retrieve_test_data(request, IS_TEST_PUBLIC)


# http://localhost/api/is_test_public/?test_name=emibSampleTest
