from datetime import datetime
from rest_framework.response import Response
from custom_models.item import Item
from custom_models.item_text import ItemText
from custom_models.test import Test
from custom_models.language import Language
from custom_models.question import Question
from custom_models.question_type import QuestionType
from custom_models.item_type import ItemType

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

    # get the associated item
    item_id = test.item_id_id

    if item_id is None:
        return {"error", "no item id in test"}

    # Ensure that the item with the same pk,
    # is active (where the current date is between the from and to date)
    item = get_item_by_id(item_id, query_date_time)
    if item is None:
        return {"error", "no test item found"}

    # get item text (visible test names)
    en_id, fr_id = get_language_ids(query_date_time)

    # start the return dict with all common values
    return_dict = {"test_internal_name": test.test_name}

    # if only requesting meta data, then recover the data unique to this return
    if request_type == TEST_META_DATA:

        # populate the return dict with meta_data specific values
        return_dict["test_en_name"] = get_text_detail(
            item_id, en_id, query_date_time)
        return_dict["test_fr_name"] = get_text_detail(
            item_id, fr_id, query_date_time)

        return_dict["is_public"] = test.is_public
        return_dict["default_time"] = test.default_time
        return_dict["test_type"] = test.test_type
        return return_dict

    if request_type == TEST_INSTRUCTIONS:
        # TODO jcherry Add logic to get data for instructions pages
        # After instructions are actually stored in the DB
        return_dict["instructions"] = []
        return return_dict

    if request_type == TEST_QUESTIONS:
        item_type_map = gen_item_map()
        question_type_map = gen_question_map()
        print(item_type_map)
        print(question_type_map)
        question_map = get_items(
            item, item_type_map, question_type_map, query_date_time)
        # TODO jcherry write the logic to get question data
        # After merging the API PRs
        return_dict["questions"] = []
        return return_dict

    # if it is not one of the above, then return nothing
    return {}


# for this type, look for these children; this will be added to later
SEARCH_CHILDREN_LIST = {
    "test": ["question"],
    "email": ["subject", "from", "to", "date", "body"]
}


def get_items(parent_item, item_type_map, question_type_map, query_date_time):
    question_map = {}
    # get the parent id
    # get the string type to determine how to handle it
    parent_id = parent_item.item_id
    parent_type_id = parent_item.item_type_id.item_type_id
    print(parent_type_id)
    parent_type = item_type_map[parent_type_id]
    if parent_type == "question":
        # TODO add time filter
        question_type = Question.objects.get(
            item_id=parent_id).question_type_id.question_type_id
        parent_type = question_type_map[question_type]
    children_list = SEARCH_CHILDREN_LIST[parent_type]
    children_items = get_items_by_parent_id(parent_id, query_date_time)
    print(children_list)
    for child in children_items:
        child_type_id = child.item_type_id.item_type_id
        child_type = item_type_map[child_type_id]
        print(child_type)
        if child_type in children_list:
            # todo, handle based on type?
            print("yes")
            print(child)
            question_map[child.order] = child
            #get_items(child, item_type_map, question_type_map, query_date_time)
            # TODO do stuff?
    #   TODO get text
    #   TODO add to map by type
    #   TODO recursively call this to check for children?
    print(question_map)
    return question_map


def gen_item_map():
    item_type_map = {}
    # TODO add filtering for active types
    item_types = ItemType.objects.all()
    for i_type in item_types:
        item_type_map[i_type.item_type_id] = i_type.type_desc
    return item_type_map


def gen_question_map():
    question_type_map = {}
    # TODO add filtering for active types
    question_types = QuestionType.objects.all()
    for q_type in question_types:
        # TODO only get one if possible
        question_type_map[q_type.question_type_id] = q_type.question_type_desc
        #question_type_map[q_type.question_type_desc] = q_type.question_type_id
    return question_type_map


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


def get_items_by_parent_id(parent_id, query_date_time):
    items = Item.objects.filter(
        parent_id=parent_id, date_from__lte=query_date_time, date_to__gt=query_date_time
    )
    if not items:
        items = Item.objects.filter(
            parent_id=parent_id, date_from__lte=query_date_time, date_to__isnull=True
        )
    return items
