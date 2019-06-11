from rest_framework.views import APIView
from rest_framework import permissions
from views.retrieve_test_view import TEST_INSTRUCTIONS, retrieve_test_data, is_test_public


class TestInstructionsSet(APIView):
    def get(self, request):
        return retrieve_test_data(request, TEST_INSTRUCTIONS)

    # assign the permissions depending on if the test is public or not
    def get_permissions(self):
        # is_public = true
        if is_test_public(self.request.query_params.get("test_name", None)):
            return [permissions.IsAuthenticatedOrReadOnly()]
        # is_public = false
        else:
            return [permissions.IsAdminUser()]

# http://localhost/api/test-instructions/?test_name=emibSampleTest
