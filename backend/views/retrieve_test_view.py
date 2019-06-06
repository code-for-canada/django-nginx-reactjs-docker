from rest_framework.response import Response
from custom_models.item import Item
from custom_models.item_text import ItemText
from custom_models.test import Test
from custom_models.language import Language

META_TEST = "meta_test"
PRE_TEST = "pre_test"
FULL_TEST = "full_test"


def retieve_test_data(request, request_type):
    # TODO check that everything is active (current time between start/end times)
    # TODO handle errors/test errors
    # get the test_name from the parameter
    filter_value = request.query_params.get('test_name', None)
    # if there is a test_name, look it up
    if filter_value is None:
        return Response({"error", "no 'test_name' parameter"})
    test = Test.objects.get(test_name=filter_value)
    # get the associated item
    item_id = test.item_id_id
    if item_id is None:
        return Response({"error", "no associated item"})
    item = Item.objects.get(pk=item_id)
    print(item)
    # get item text (visible test names)
    # get en and fr ids
    en_id = Language.objects.get(ISO_Code_2="en-ca").language_id
    fr_id = Language.objects.get(ISO_Code_2="fr-ca").language_id
    print(en_id)
    print(fr_id)
    en_name = ItemText.objects.get(
        item_id=item_id, language=en_id).text_detail
    fr_name = ItemText.objects.get(
        item_id=item_id, language=fr_id).text_detail
    print(test)
    if request_type == META_TEST:
        ret = {'test_internal_name': test.test_name,
               'test_en_name': en_name,
               'meta_test.test_fr_name': fr_name,
               'meta_test.is_public': test.is_public,
               'meta_test.default_time': test.default_time,
               'meta_test.test_type': test.test_type}

        return Response(ret)

    if request_type == PRE_TEST:
        # TODO write this logic
        return Response()

    return Response()
