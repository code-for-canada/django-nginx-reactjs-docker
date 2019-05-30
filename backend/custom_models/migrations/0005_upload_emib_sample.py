# Generated by Django 2.1.7 on 2019-05-30 14:07
# Edited by J. Michael Cherry to populate the emib sample

from django.db import migrations


def upload_emib_sample(apps, schema_editor):
    # get models
    language = apps.get_model("custom_models", "Language")
    item_type = apps.get_model("custom_models", "ItemType")
    question_type = apps.get_model("custom_models", "QuestionType")
    item = apps.get_model("custom_models", "Item")
    item_text = apps.get_model("custom_models", "ItemText")
    question = apps.get_model("custom_models", "Question")
    # get db alias
    db_alias = schema_editor.connection.alias
    # create languages
    language.objects.using(db_alias).bulk_create([
        language(ISO_Code_1="en", ISO_Code_2="en-ca"),
        language(ISO_Code_1="fr", ISO_Code_2="fr-ca"),
    ])
    # get language objects
    l_english = get_language(language, db_alias, "en", "en-ca")
    l_french = get_language(language, db_alias, "fr", "fr-ca")
    # TODO create


def destroy_emi_sample(apps, schema_editor):
    # get models
    language = apps.get_model("custom_models", "Language")
    item_type = apps.get_model("custom_models", "ItemType")
    question_type = apps.get_model("custom_models", "QuestionType")
    item = apps.get_model("custom_models", "Item")
    item_text = apps.get_model("custom_models", "ItemText")
    question = apps.get_model("custom_models", "Question")
    # get db alias
    db_alias = schema_editor.connection.alias
    # get language objects
    l_english = get_language(language, db_alias, "en", "en-ca")
    l_french = get_language(language, db_alias, "fr", "fr-ca")
    # TODO roll back

    # destroy languages
    l_english.delete()
    l_french.delete()


def get_language(language, db_alias, iso_1, iso_2):
    return language.objects.using(db_alias).filter(ISO_Code_1=iso_1, ISO_Code_2=iso_2).last()


class Migration(migrations.Migration):

    dependencies = [
        ('custom_models', '0004_auto_20190529_0846'),
    ]

    operations = [
        migrations.RunPython(upload_emib_sample, destroy_emi_sample),
    ]
