# Generated by Django 2.1.7 on 2019-06-03 15:27
# Edited by J. Michael Cherry to correct the pizza test time limit

from django.db import migrations


def reoder_emib_test(apps, schema_editor):
    # get models
    language = apps.get_model("custom_models", "Language")
    item_type = apps.get_model("custom_models", "ItemType")
    item = apps.get_model("custom_models", "Item")
    item_text = apps.get_model("custom_models", "ItemText")
    question_type = apps.get_model("custom_models", "QuestionType")
    question = apps.get_model("custom_models", "Question")
    test = apps.get_model("custom_models", "Test")
    # get db alias
    db_alias = schema_editor.connection.alias

    # get language id and test
    l_english = (
        language.objects.using(db_alias)
        .filter(ISO_Code_1="en", ISO_Code_2="en-ca")
        .last()
    )
    l_french = (
        language.objects.using(db_alias)
        .filter(ISO_Code_1="fr", ISO_Code_2="fr-ca")
        .last()
    )
    emib_sample_item_id = (
        test.objects.using(db_alias).filter(test_name="emibSampleTest").last().item_id
    )

    # get item_types
    it_sections = item_type.objects.using(db_alias).filter(type_desc="sections").last()
    it_section = item_type.objects.using(db_alias).filter(type_desc="section").last()
    it_background = (
        item_type.objects.using(db_alias).filter(type_desc="background").last()
    )
    it_markdown = item_type.objects.using(db_alias).filter(type_desc="markdown").last()
    it_tree_view = (
        item_type.objects.using(db_alias).filter(type_desc="tree_view").last()
    )

    # get the background child
    background = (
        item.objects.using(db_alias)
        .filter(parent_id=emib_sample_item_id, item_type_id=it_background, order=0)
        .last()
    )

    # get all markdown children
    markdown_1 = (
        item.objects.using(db_alias)
        .filter(parent_id=background, item_type_id=it_markdown, order=1)
        .last()
    )
    markdown_2 = (
        item.objects.using(db_alias)
        .filter(parent_id=background, item_type_id=it_markdown, order=2)
        .last()
    )
    markdown_3 = (
        item.objects.using(db_alias)
        .filter(parent_id=background, item_type_id=it_markdown, order=3)
        .last()
    )
    markdown_4 = (
        item.objects.using(db_alias)
        .filter(parent_id=background, item_type_id=it_markdown, order=4)
        .last()
    )
    markdown_5 = (
        item.objects.using(db_alias)
        .filter(parent_id=background, item_type_id=it_markdown, order=5)
        .last()
    )
    markdown_6 = (
        item.objects.using(db_alias)
        .filter(parent_id=background, item_type_id=it_markdown, order=6)
        .last()
    )
    markdown_7 = (
        item.objects.using(db_alias)
        .filter(parent_id=background, item_type_id=it_markdown, order=7)
        .last()
    )
    markdown_8 = (
        item.objects.using(db_alias)
        .filter(parent_id=background, item_type_id=it_markdown, order=8)
        .last()
    )
    markdown_9 = (
        item.objects.using(db_alias)
        .filter(parent_id=background, item_type_id=it_markdown, order=9)
        .last()
    )

    # get all tree_view children
    tree_view_1 = (
        item.objects.using(db_alias)
        .filter(parent_id=background, item_type_id=it_tree_view, order=1)
        .last()
    )
    tree_view_2 = (
        item.objects.using(db_alias)
        .filter(parent_id=background, item_type_id=it_tree_view, order=2)
        .last()
    )

    # correct the pizza test time limit
    # get the background object
    children2 = item.objects.using(db_alias).filter(parent_id=background)
    for child in children2:
        print("child")
        print(child.item_id)
        print(child.item_type_id.type_desc)
        print(child.order)
    # type background
    #

    # create sections
    sections = item(parent_id=emib_sample_item_id, item_type_id=it_sections, order=1)
    # sections.save()

    # section_1 = item(parent_id=emib_sample_item_id, item_type_id=it_section, order=1)
    # section_1.save()
    # section_2 = item(parent_id=emib_sample_item_id, item_type_id=it_section, order=2)
    # section_2.save()
    # section_3 = item(parent_id=emib_sample_item_id, item_type_id=it_section, order=3)
    # section_3.save()
    # section_4 = item(parent_id=emib_sample_item_id, item_type_id=it_section, order=4)
    # section_4.save()

    # section_1
    # "Overview"
    # "Contexte"

    # section_2
    # "Your organization"
    # "FR Your organization"

    # section_3
    # "Organizational Structure"
    # "Structure organisationnelle"

    # section_4
    # "Your team"
    # "FR Your team"

    # tree_view_1
    # "The Organizational Chart of the ODC"
    # "Organigramme (CDO)

    # # tree_view_2
    # "The Organizational Chart of the QA Team"
    # "Organigramme Équipe de l'assurance de la qualité (AQ)"

    # item_text for each section
    # move markdowns to be its children
    # move tree_view to be its children


def rollback_emib_test(apps, schema_editor):
    # get models
    item_type = apps.get_model("custom_models", "ItemType")
    # get db alias
    db_alias = schema_editor.connection.alias

    # ...


class Migration(migrations.Migration):

    dependencies = [("custom_models", "0020_new_item_types")]

    operations = [migrations.RunPython(reoder_emib_test, rollback_emib_test)]
