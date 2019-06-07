from rest_framework.views import APIView
from rest_framework import permissions
from views.retrieve_test_view import META_TEST, retrieve_test_data


class MetaTestSet(APIView):
    # Can only be accessed by Admin
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        return retrieve_test_data(request, META_TEST)

# http://localhost/api/meta-test/?test_name=emibSampleTest
