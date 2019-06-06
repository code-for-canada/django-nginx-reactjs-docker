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
        # TODO check that everything is active (current time between start/end times)
        # get the test_name from the parameter
        filter_value = self.request.query_params.get('test_name', None)
        # if there is a test_name, look it up
        if filter_value is None:
            return Response({"error", "no 'test_name' parameter"})
        test = Test.objects.get(test_name=filter_value)
        # get the associated item
        item_id = test.item_id_id
        if item_id is None:
            return [{"error", "no associated item"}]
        item = Item.objects.get(pk=item_id)
        print(item)
        # get item text (visible test names)
        # get en and fr ids
        en_id = Language.objects.get(ISO_Code_2="en-ca").language_id
        fr_id = Language.objects.get(ISO_Code_2="fr-ca").language_id
        print(en_id)
        print(fr_id)
        en_name = ItemText.objects.get(
            item_id=item_id, language=en_id)  # .text_detail
        fr_name = ItemText.objects.get(
            item_id=item_id, language=fr_id)  # .text_detail
        print(en_name)
        print(fr_name)

        # create the return value
        #meta_test = MetaTest(test, en_name, fr_name)
        #meta_test.test_internal_name = test.test_name
        #meta_test.test_en_name = en_name
        #meta_test.test_fr_name = fr_name
        #meta_test.is_public = test.is_public
        #meta_test.default_time = test.default_time
        #meta_test.test_type = Test.test_type
        print(test)
        # print(meta_test)
        # TODO put in central file
        # TODO stop at meta, and pre
        # TODO different return types accordingly

        ret = {'test_internal_name': test.test_name,
               'test_en_name': en_name.text_detail,
               'meta_test.test_fr_name': fr_name.text_detail,
               'meta_test.is_public': test.is_public,
               'meta_test.default_time': test.default_time,
               'meta_test.test_type': test.test_type}

        return Response(ret)


# http://localhost/api/meta-test/?test_name=emibSampleTest
