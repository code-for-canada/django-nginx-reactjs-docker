from rest_framework.views import APIView
from rest_framework import permissions
from views.retrieve_test_view import TEST_QUESTIONS, retrieve_test_data


class TestQuestionsSet(APIView):
    # Can only be accessed by Admin
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        return retrieve_test_data(request, TEST_QUESTIONS)

# http://localhost/api/test_questions/?test_name=emibSampleTest
