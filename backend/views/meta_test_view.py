from rest_framework.views import APIView
from rest_framework import permissions
from .retrieve_test_view import META_TEST, retieve_test_data


class MetaTestSet(APIView):
    # Can only be accessed by Admin
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        return retieve_test_data(self.request, META_TEST)

# http://localhost/api/meta-test/?test_name=emibSampleTest
