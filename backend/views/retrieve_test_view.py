from datetime import datetime
from rest_framework.response import Response
from custom_models.item import Item
from custom_models.item_text import ItemText
from custom_models.test import Test
from custom_models.language import Language

META_TEST = "meta_test"
PRE_TEST = "pre_test"
FULL_TEST = "full_test"


def retrieve_test_data(request, request_type):
    query_date_time = datetime.now()
    return retrieve_response_from_name_date(request, query_date_time, request_type)

# Wrap the json in a Response; this makes testing easier


def retrieve_response_from_name_date(request, query_date_time, request_type):
    # get the test_name from the parameter
    test_name = request.query_params.get('test_name', None)
    return Response(retrieve_json_from_name_date(test_name, query_date_time, request_type))


def retrieve_json_from_name_date(test_name, query_date_time, request_type):
    # TODO check that everything is active (current time between start/end times)
    # TODO handle errors/test errors
    # if there is a test_name, look it up
    if test_name is None:
        return {"error", "no 'test_name' parameter"}
    print(query_date_time)
    # TODO filter using query_date_time
    # gametimedate__gte=
    test = Test.objects.get(test_name=test_name)
    # get the associated item
    item_id = test.item_id_id
    if item_id is None:
        return {"error", "no associated item"}
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

        return ret

    if request_type == PRE_TEST:
        # TODO write the logic for pre-test
        return {}

    # TODO write the logic for in-test
    return {}
