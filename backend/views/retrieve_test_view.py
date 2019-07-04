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
EN = "en"
FR = "fr"

# when gathering meta data, look for these items under each type
META_CHILDREN_MAP = {"test": ["overview"]}

# when gathering insructions, look for these items under each type
INSTRUCTION_CHILDREN_MAP = {}

# when gathering questions, look for these items under each type
QUESTION_CHILDREN_MAP = {
    "test": ["email"],
    "email": ["subject", "from", "to", "date", "body"],
}

BACKGROUND_MAP = {
    "test": ["background"],
    "background": ["markdown", "tree_view"],
    "tree_view": ["organizational_structure_tree_child", "team_information_tree_child"],
    "organizational_structure_tree_child": ["organizational_structure_tree_child"],
    "team_information_tree_child": ["team_information_tree_child"],
}

# List of item types that should only return one item rather than a list
SINGLE_RETURN = ["subject", "from", "to", "date", "body"]

# list of items that are leaves in the item tree, but will have multiple siblings
MULTI_CHILD_LEAF_LIST = [
    "markdown",
    "organizational_structure_tree_child",
    "team_information_tree_child",
    "team_information_tree_child",
]

ALWAYS_SHOW_TEXT = [
    "organizational_structure_tree_child",
    "team_information_tree_child",
]


def is_test_public(test_name):
    # function that returns true if the test is public and false on the other hand
    return Test.objects.get(test_name=test_name).is_public


def retrieve_test_data(request, request_type):
    query_date_time = datetime.now()
    return retrieve_response_from_name_date(request, query_date_time, request_type)


def retrieve_response_from_name_date(request, query_date_time, request_type):
    # function to Wrap the json in a Response; this makes testing easier
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

    item_type_map = gen_item_map(query_date_time)
    question_type_map = gen_question_map(query_date_time)

    # if only requesting meta data, then recover the data unique to this return
    if request_type == TEST_META_DATA:

        # populate the return dict with meta_data specific values
        return_dict["test_en_name"] = get_text_detail(item_id, en_id, query_date_time)
        return_dict["test_fr_name"] = get_text_detail(item_id, fr_id, query_date_time)

        return_dict["is_public"] = test.is_public
        return_dict["default_time"] = test.default_time
        return_dict["test_type"] = test.test_type
        # get the overview
        meta_map = get_items_map(
            item,
            item_type_map,
            question_type_map,
            query_date_time,
            en_id,
            fr_id,
            META_CHILDREN_MAP,
        )
        return_dict["meta_text"] = meta_map
        return return_dict

    if request_type == TEST_INSTRUCTIONS:
        # TODO jcherry Add logic to get data for instructions pages
        # After instructions are actually stored in the DB
        return_dict["instructions"] = []
        return return_dict

    if request_type == TEST_QUESTIONS:
        question_map = get_items_map(
            item,
            item_type_map,
            question_type_map,
            query_date_time,
            en_id,
            fr_id,
            QUESTION_CHILDREN_MAP,
        )
        return_dict["questions"] = question_map
        background_map = get_items_map(
            item,
            item_type_map,
            question_type_map,
            query_date_time,
            en_id,
            fr_id,
            BACKGROUND_MAP,
        )
        return_dict["background"] = background_map
        return return_dict

    # if it is not one of the above, then return nothing
    return {}


def add_to_map(child_type, child_language_map, language_map):
    if child_type in SINGLE_RETURN:
        language_map[child_type] = child_language_map
    elif child_type in language_map.keys():
        language_map[child_type].append(child_language_map)
    else:
        language_map[child_type] = [child_language_map]
    return language_map


def get_items_map(
    parent_item,
    item_type_map,
    question_type_map,
    query_date_time,
    en_id,
    fr_id,
    children_map,
):
    en_map, fr_map = get_items(
        parent_item,
        item_type_map,
        question_type_map,
        query_date_time,
        en_id,
        fr_id,
        children_map,
    )
    return {EN: en_map, FR: fr_map}


def get_items(
    parent_item,
    item_type_map,
    question_type_map,
    query_date_time,
    en_id,
    fr_id,
    children_map,
):
    # get the parent id, get the type to determine how to handle it
    parent_id, parent_type = get_item_type(
        parent_item, item_type_map, question_type_map, query_date_time
    )
    try:
        children_types = children_map[parent_type]
    except KeyError:
        # if there the parent type does not have any children type to look up
        # simply return the text_detail
        return (
            get_text_detail(parent_id, en_id, query_date_time),
            get_text_detail(parent_id, fr_id, query_date_time),
        )
    # otherwise, initialize return maps
    en_map = {}
    fr_map = {}
    # lookup the text for these items
    if parent_type in ALWAYS_SHOW_TEXT:
        en_map["text"] = get_text_detail(parent_id, en_id, query_date_time)
        fr_map["text"] = get_text_detail(parent_id, fr_id, query_date_time)
    # a map to track the current id for a given child_type
    # this also ensures that the id/order is sequential
    order_map = {}
    # get all items with parent_id
    children_items = get_items_by_parent_id(parent_id, query_date_time)
    # for each child
    for child in children_items:
        _, child_type = get_item_type(
            child, item_type_map, question_type_map, query_date_time
        )
        # if the type is in the list of children to return
        if child_type in children_types:
            # get the maps of their children
            child_en, child_fr = get_items(
                child,
                item_type_map,
                question_type_map,
                query_date_time,
                en_id,
                fr_id,
                children_map,
            )
            # check if it is in this list; if so, add it to a dict
            if child_type in MULTI_CHILD_LEAF_LIST and not isinstance(child_en, dict):
                child_en = {"text": child_en}
                child_fr = {"text": child_fr}
            # if they are dicts, add the id as a key/value pair
            if isinstance(child_en, dict):
                if child_type in order_map.keys():
                    order_map[child_type] += 1
                else:
                    order_map[child_type] = 0
                child_id = order_map[child_type]
                child_en["id"] = child_id
                child_fr["id"] = child_id
            # add to the return map
            en_map = add_to_map(child_type, child_en, en_map)
            fr_map = add_to_map(child_type, child_fr, fr_map)
    # if no children, just return the text
    if not children_items:
        return (
            get_text_detail(parent_id, en_id, query_date_time),
            get_text_detail(parent_id, fr_id, query_date_time),
        )
    return en_map, fr_map


def get_item_type(item, item_type_map, question_type_map, query_date_time):
    # function to get the item id and item_type; or, if the item_type is question, get the question_type
    # get the id and the type
    item_id = item.item_id
    item_type = item_type_map[item.item_type_id.item_type_id]
    # if the item type is a question, then get the type of question
    if item_type == "question":
        # get all active questions with this item_id (there should really be only one)
        question = Question.objects.filter(item_id=item_id)
        question = exclude_inactive_objects(question, query_date_time)
        if not question:
            item_type = None
        else:
            # get the last one
            question = question.last()
            question_type = question.question_type_id.question_type_id
            # get the string version of the type
            item_type = question_type_map[question_type]
    # if we have other items with seperate types, handle them here with elif's
    return item_id, item_type


def gen_item_map(query_date_time):
    # create a map of item_type_id to type_desc
    item_type_map = {}
    item_types = ItemType.objects.all()
    item_types = exclude_inactive_objects(item_types, query_date_time)
    for i_type in item_types:
        item_type_map[i_type.item_type_id] = i_type.type_desc
    return item_type_map


def gen_question_map(query_date_time):
    # create a map of question_type_id to question_type_desc
    question_type_map = {}
    question_types = QuestionType.objects.all()
    question_types = exclude_inactive_objects(question_types, query_date_time)
    for q_type in question_types:
        question_type_map[q_type.question_type_id] = q_type.question_type_desc
    return question_type_map


def get_language_ids(query_date_time):
    # get the active ids for en and fr
    if query_date_time is None:
        query_date_time = datetime.now()
    en_id = get_language("en-ca", query_date_time)
    fr_id = get_language("fr-ca", query_date_time)
    return en_id, fr_id


def get_language(iso_code_2, query_date_time):
    # get the active language id for the given iso_code_2
    lang_id = Language.objects.filter(ISO_Code_2=iso_code_2)
    lang_id = exclude_inactive_objects(lang_id, query_date_time)
    if not lang_id:
        return None
    return lang_id.last()


def get_text_detail(item_id, language_id, query_date_time):
    # get the itemtext object and text_detail for the given item_id and language
    item_text = ItemText.objects.filter(item_id=item_id, language=language_id)
    item_text = exclude_inactive_objects(item_text, query_date_time)
    if not item_text:
        # if empty
        return None
    return item_text.last().text_detail


def get_item_by_id(item_id, query_date_time):
    # get the item by id
    item = Item.objects.filter(pk=item_id)
    item = exclude_inactive_objects(item, query_date_time)
    if not item:
        # if empty
        return None
    return item.last()


def get_items_by_parent_id(parent_id, query_date_time):
    # get all items with the given parent_id
    items = Item.objects.filter(parent_id=parent_id)
    items = exclude_inactive_objects(items, query_date_time).order_by("order")
    print(items)
    return items


def exclude_inactive_objects(objects, query_date_time):
    # exclude all with later date_from or earlier date_to
    # however, exactly equal are acceptible
    return objects.exclude(date_from__gt=query_date_time).exclude(
        date_to__lt=query_date_time
    )

