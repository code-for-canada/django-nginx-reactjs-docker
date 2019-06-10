from datetime import datetime
from rest_framework.response import Response
from custom_models.item import Item
from custom_models.item_text import ItemText
from custom_models.test import Test
from custom_models.language import Language

IS_TEST_PUBLIC = "is_test_public"
TEST_META_DATA = "test_meta_data"
TEST_INSTRUCTIONS = "test_instructions"
TEST_QUESTIONS = "test_questions"


# returns true if the test is public and false on the other hand
def is_test_public(test_name):
    return Test.objects.get(test_name=test_name).is_public


def retrieve_test_data(request, request_type):
    query_date_time = datetime.now()
    return retrieve_response_from_name_date(request, query_date_time, request_type)


# Wrap the json in a Response; this makes testing easier


def retrieve_response_from_name_date(request, query_date_time, request_type):
    # get the test_name from the parameter
    test_name = request.query_params.get("test_name", None)
    return Response(
        retrieve_json_from_name_date(test_name, query_date_time, request_type)
    )


def retrieve_json_from_name_date(test_name, query_date_time, request_type):
    # if there is no test_name prop, then return an error
    if test_name is None:
        return {"error", "no 'test_name' parameter"}
    # if there is a test_name, look it up
    try:
        test = Test.objects.get(test_name=test_name)
    except Test.DoesNotExist:
        return {"error", "no test with the given test_name"}

    if request_type == IS_TEST_PUBLIC:
        return {"is_public": test.is_public}
    # get the associated item
    item_id = test.item_id_id

    if item_id is None:
        return {"error", "no item id in test"}

    # Ensure that the item with the same pk,
    # is active (where the current date is between the from and to date)
    if get_item_by_id(item_id, query_date_time) is None:
        return {"error", "no test item found"}

    # get item text (visible test names)
    en_id, fr_id = get_language_ids(query_date_time)

    # start the return dict with all common values
    return_dict = {"test_internal_name": test.test_name}

    # if only requesting meta data, then recover the data unique to this return
    if request_type == TEST_META_DATA:

        # populate the return dict with meta_data specific values
        return_dict["test_en_name"] = get_text_detail(item_id, en_id, query_date_time)
        return_dict["test_fr_name"] = get_text_detail(item_id, fr_id, query_date_time)

        return_dict["is_public"] = test.is_public
        return_dict["default_time"] = test.default_time
        return_dict["test_type"] = test.test_type
        return return_dict

    # TODO Add logic to get data for instructions pages when
    if request_type == TEST_INSTRUCTIONS:
        return return_dict

    # TODO write the logic for in-test
    if request_type == TEST_QUESTIONS:
        return return_dict

    # if it is not one of the above, then return nothing
    return {}


def get_language_ids(query_date_time):
    if query_date_time is None:
        query_date_time = datetime.now()
    # get en and fr ids
    try:
        en_id = Language.objects.get(
            ISO_Code_2="en-ca",
            date_from__lte=query_date_time,
            date_to__gt=query_date_time,
        ).language_id
    except Language.DoesNotExist:
        # if the above fails, try to get an item with the same id,
        # after the from date, where the to date is null
        try:
            en_id = Language.objects.get(
                ISO_Code_2="en-ca", date_from__lte=query_date_time, date_to__isnull=True
            ).language_id
        except Language.DoesNotExist:
            en_id = None
    try:
        fr_id = Language.objects.get(
            ISO_Code_2="fr-ca",
            date_from__lte=query_date_time,
            date_to__gt=query_date_time,
        ).language_id
    except Language.DoesNotExist:
        # if the above fails, try to get an item with the same id,
        # after the from date, where the to date is null
        try:
            fr_id = Language.objects.get(
                ISO_Code_2="fr-ca", date_from__lte=query_date_time, date_to__isnull=True
            ).language_id
        except Language.DoesNotExist:
            fr_id = None
    return en_id, fr_id


def get_text_detail(item_id, language_id, query_date_time):
    try:
        text_detail = ItemText.objects.get(
            item_id=item_id,
            language=language_id,
            date_from__lte=query_date_time,
            date_to__gt=query_date_time,
        ).text_detail
    except ItemText.DoesNotExist:
        try:
            text_detail = ItemText.objects.get(
                item_id=item_id,
                language=language_id,
                date_from__lte=query_date_time,
                date_to__isnull=True,
            ).text_detail
        except ItemText.DoesNotExist:
            text_detail = None
    return text_detail


def get_item_by_id(item_id, query_date_time):
    try:
        item = Item.objects.get(
            pk=item_id, date_from__lte=query_date_time, date_to__gt=query_date_time
        )
    except Item.DoesNotExist:
        # if the above fails, try to get an item with the same id, after the from date
        # and where the to date is null
        try:
            item = Item.objects.get(
                pk=item_id, date_from__lte=query_date_time, date_to__isnull=True
            )
        except Item.DoesNotExist:
            item = None
    return item
