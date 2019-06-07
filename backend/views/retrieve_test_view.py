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
    # if there is no test_name prop, then return an error
    if test_name is None:
        return {"error", "no 'test_name' parameter"}
    # if there is a test_name, look it up
    try:
        test = Test.objects.get(test_name=test_name)
    except Test.DoesNotExist:
        return {"error", "no test with the given test_name"}
    # get the associated item
    item_id = test.item_id_id
    if item_id is None:
        return {"error", "no item id in test"}

    # Ensure that the item with the same pk,
    # is active (where the current date is between the from and to date)
    try:
        Item.objects.get(
            pk=item_id, date_from__lte=query_date_time, date_to__gt=query_date_time)
    except Item.DoesNotExist:
        # if the above fails, try to get an item with the same id, after the from date
        # and where the to date is null
        try:
            Item.objects.get(
                pk=item_id, date_from__lte=query_date_time, date_to__isnull=True)
        except Item.DoesNotExist:
            return {"error", "no test item found"}

    # get item text (visible test names)
    en_id, fr_id = get_language_ids(query_date_time)

    # get the user visible names, if they exist
    try:
        en_name = ItemText.objects.get(
            item_id=item_id, language=en_id,
            date_from__lte=query_date_time,
            date_to__gt=query_date_time).text_detail
    except ItemText.DoesNotExist:
        try:
            en_name = ItemText.objects.get(
                item_id=item_id, language=en_id,
                date_from__lte=query_date_time,
                date_to__isnull=True).text_detail
        except ItemText.DoesNotExist:
            en_name = None

    try:
        fr_name = ItemText.objects.get(
            item_id=item_id, language=fr_id,
            date_from__lte=query_date_time,
            date_to__gt=query_date_time).text_detail
    except ItemText.DoesNotExist:
        try:
            fr_name = ItemText.objects.get(
                item_id=item_id, language=fr_id,
                date_from__lte=query_date_time,
                date_to__isnull=True).text_detail
        except ItemText.DoesNotExist:
            fr_name = None

    # if only looking for the meta data, then return
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


def get_language_ids(query_date_time):
    if query_date_time is None:
        query_date_time = datetime.now()
    # get en and fr ids
    try:
        en_id = Language.objects.get(
            ISO_Code_2="en-ca", date_from__lte=query_date_time,
            date_to__gt=query_date_time).language_id
    except Language.DoesNotExist:
        # if the above fails, try to get an item with the same id, after the from date, where the to date is null
        try:
            en_id = Language.objects.get(
                ISO_Code_2="en-ca", date_from__lte=query_date_time,
                date_to__isnull=True).language_id
        except Language.DoesNotExist:
            en_id = None
    try:
        fr_id = Language.objects.get(
            ISO_Code_2="fr-ca", date_from__lte=query_date_time,
            date_to__gt=query_date_time).language_id
    except Language.DoesNotExist:
        # if the above fails, try to get an item with the same id, after the from date, where the to date is null
        try:
            fr_id = Language.objects.get(
                ISO_Code_2="fr-ca", date_from__lte=query_date_time,
                date_to__isnull=True).language_id
        except Language.DoesNotExist:
            fr_id = None
    return en_id, fr_id
