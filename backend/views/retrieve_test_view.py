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

# when gathering insructions, look for these items under each type
INSTRUCTION_CHILDREN_MAP = {
}

# when gathering questions, look for these items under each type
QUESTION_CHILDREN_MAP = {
    "test": ["email"],
    "email": ["subject", "from", "to", "date", "body"]
}


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
        item_type_map = gen_item_map(query_date_time)
        question_type_map = gen_question_map(query_date_time)
        question_map = get_items(
            item, item_type_map, question_type_map, query_date_time, en_id, fr_id, QUESTION_CHILDREN_MAP)
        return_dict["questions"] = question_map
        return return_dict

    # if it is not one of the above, then return nothing
    return {}


def get_items(parent_item, item_type_map, question_type_map, query_date_time,
              en_id, fr_id, children_map):
    print("get_items")
    return_map = {}
    # get the parent id, get the type to determine how to handle it
    parent_id, parent_type = get_item_type(
        parent_item, item_type_map, question_type_map, query_date_time)
    try:
        children_types = children_map[parent_type]
    except KeyError:
        children_types = []
    children_items = get_items_by_parent_id(parent_id, query_date_time)
    print(children_types)
    for child in children_items:
        _, child_type = get_item_type(
            child, item_type_map, question_type_map, query_date_time)
        print(child_type)
        if child_type in children_types:
            print("yes")
            print(child)
            return_map[child.order] = {"type": child_type}
            return_map[child.order].update(get_items(
                child, item_type_map, question_type_map, query_date_time,
                en_id, fr_id, children_map))
    if children_types == []:
        return_map["en"] = get_text_detail(parent_id, en_id, query_date_time)
        return_map["fr"] = get_text_detail(parent_id, fr_id, query_date_time)
    print(return_map)
    return return_map

# get the item id and item_type; or, if the item_type is question, get the question_type


def get_item_type(item, item_type_map, question_type_map, query_date_time):
    item_id = item.item_id
    item_type = item_type_map[item.item_type_id.item_type_id]
    if item_type == "question":
        question = Question.objects.filter(
            item_id=item_id)
        question = exclude_inactive_objects(question, query_date_time)
        if not question:
            item_type = None
        else:
            question = question.last()
            question_type = question.question_type_id.question_type_id
            item_type = question_type_map[question_type]
    return item_id, item_type


def gen_item_map(query_date_time):
    item_type_map = {}
    item_types = ItemType.objects.all()
    item_types = exclude_inactive_objects(item_types, query_date_time)
    for i_type in item_types:
        item_type_map[i_type.item_type_id] = i_type.type_desc
    return item_type_map


def gen_question_map(query_date_time):
    question_type_map = {}
    question_types = QuestionType.objects.all()
    question_types = exclude_inactive_objects(question_types, query_date_time)
    for q_type in question_types:
        question_type_map[q_type.question_type_id] = q_type.question_type_desc
    return question_type_map


def get_language_ids(query_date_time):
    if query_date_time is None:
        query_date_time = datetime.now()
    en_id = get_language("en-ca", query_date_time)
    fr_id = get_language("fr-ca", query_date_time)
    return en_id, fr_id


def get_language(iso_code_2, query_date_time):
    lang_id = Language.objects.filter(ISO_Code_2=iso_code_2)
    lang_id = exclude_inactive_objects(lang_id, query_date_time)
    if not lang_id:
        return None
    return lang_id.last()


def get_text_detail(item_id, language_id, query_date_time):
    item_text = ItemText.objects.filter(
        item_id=item_id,
        language=language_id
    )
    item_text = exclude_inactive_objects(item_text, query_date_time)
    if not item_text:
        # if empty
        return None
    return item_text.last().text_detail


def get_item_by_id(item_id, query_date_time):
    item = Item.objects.filter(pk=item_id)
    item = exclude_inactive_objects(item, query_date_time)
    if not item:
        # if empty
        return None
    return item.last()


def get_items_by_parent_id(parent_id, query_date_time):
    items = Item.objects.filter(parent_id=parent_id)
    items = exclude_inactive_objects(items, query_date_time)
    return items


def exclude_inactive_objects(objects, query_date_time):
    # exclude all with later date_from or earlier date_to
    # however, exactly equal are acceptible
    return objects.exclude(date_from__gt=query_date_time).exclude(date_to__lt=query_date_time)
