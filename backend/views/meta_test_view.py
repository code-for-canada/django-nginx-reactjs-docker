from custom_models.item import Item
from custom_models.item_text import ItemText
from custom_models.test import Test
from custom_models.language import Language
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from django.core.serializers import serialize
from django.http import HttpResponse
from rest_framework.views import APIView


class MetaTestSet(APIView):
    #permission_classes = [permissions.IsAdminUser]
    # Can only be accessed by Admin
    #renderer_classes = (JSONRenderer, )
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        ret = {'test_internal_name': 'abc',
               'test_en_name': 'en',
               'meta_test.test_fr_name': 'fr',
               'meta_test.is_public': True,
               'meta_test.default_time': 123,
               'meta_test.test_type': 'this one'}

        return Response(ret)


# http://localhost/api/meta-test/?test_name=emibSampleTest
