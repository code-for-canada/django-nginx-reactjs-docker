from custom_models.item import Item
from custom_models.item_text import ItemText
from custom_models.test import Test
from custom_models.language import Language
from custom_models.meta_test_return import MetaTest
from serializers.meta_test_serializer import MetaTestSerializer
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.core.serializers import serialize
from django.http import HttpResponse


class MetaTestSet(viewsets.ReadOnlyModelViewSet):
    # same as 'SELECT * FROM backend_databasecheckmodel;'
    queryset = MetaTest.objects.all()
    serializer_class = MetaTestSerializer
    # Can only be accessed by Admin
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        # TODO check that everything is active (current time between start/end times)
        meta_test = MetaTest()
        # get the querysets
        item_queryset = Item.objects.all()
        item_text = ItemText.objects.all()
        test_queryset = Test.objects.all()
        language_queryset = Language.objects.all()
        # get the test_name from the parameter
        filter_value = self.request.query_params.get('test_name', None)
        # if there is a test_name, look it up
        if filter_value is None:
            return [{"error", "no 'test_name' parameter"}]
        test = test_queryset.filter(test_name=filter_value)
        # get the associated item
        item_id = test.last().item_id_id
        if item_id is None:
            return [{"error", "no associated item"}]
        item = item_queryset.filter(item_id=item_id)
        print(item.last)

        # get item text (visible test names)
        # get en and fr ids
        en = language_queryset.filter(ISO_Code_2="en-ca").last().language_id
        fr = language_queryset.filter(ISO_Code_2="fr-ca").last().language_id
        print(en)
        print(fr)
        en_name = item_text.filter(
            item_id=item_id, language=en).last().text_detail
        fr_name = item_text.filter(
            item_id=item_id, language=fr).last().text_detail
        print(en_name)
        print(fr_name)

        # create the return value

        return

# http://localhost/api/meta-test/?test_name=emibSampleTest
