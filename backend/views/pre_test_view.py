from rest_framework.views import APIView
from rest_framework import permissions
from views.retrieve_test_view import PRE_TEST, retrieve_test_data


class PreTestSet(APIView):
    # Can only be accessed by Admin
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        return retrieve_test_data(request, PRE_TEST)

# http://localhost/api/pre-test/?test_name=emibSampleTest
