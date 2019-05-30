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
    # create languages; do not use bulk_create since we need these objects later on
    l_english = language(ISO_Code_1="en", ISO_Code_2="en-ca")
    l_english.save()
    l_french = language(ISO_Code_1="fr", ISO_Code_2="fr-ca")
    l_french.save()

    # create item_types; do not use bulk_create since we need these objects later on
    it_test = item_type(type_desc="test")
    it_test.save()
    it_question = item_type(type_desc="question")
    it_question.save()
    it_subject = item_type(type_desc="subject")
    it_subject.save()
    it_from = item_type(type_desc="from")
    it_from.save()
    it_to = item_type(type_desc="to")
    it_to.save()
    it_date = item_type(type_desc="date")
    it_date.save()
    it_body = item_type(type_desc="body")
    it_body.save()

    # create quesion_types; do not use bulk_create since we need these objects later on
    qt_email = question_type(question_type_desc="email")
    qt_email.save()

    # create items; do not use bulk_create since we need these objects later on
    # test
    i_emib = item(item_type_id=it_test, order=1)
    i_emib.save()

    # question 1 items
    i_q1 = item(parent_id=i_emib,
                item_type_id=it_question, order=1)
    i_q1.save()

    i_q1_subject = item(parent_id=i_q1,
                        item_type_id=it_subject, order=1)
    i_q1_subject.save()

    i_q1_from = item(parent_id=i_q1,
                     item_type_id=it_from, order=2)
    i_q1_from.save()

    i_q1_to = item(parent_id=i_q1,
                   item_type_id=it_to, order=3)
    i_q1_to.save()

    i_q1_date = item(parent_id=i_q1,
                     item_type_id=it_date, order=4)
    i_q1_date.save()

    i_q1_body = item(parent_id=i_q1,
                     item_type_id=it_body, order=5)
    i_q1_body.save()

    # question 2 items
    i_q2 = item(parent_id=i_emib,
                item_type_id=it_question, order=2)
    i_q2.save()

    i_q2_subject = item(parent_id=i_q2,
                        item_type_id=it_subject, order=1)
    i_q2_subject.save()

    i_q2_from = item(parent_id=i_q2,
                     item_type_id=it_from, order=2)
    i_q2_from.save()

    i_q2_to = item(parent_id=i_q2,
                   item_type_id=it_to, order=3)
    i_q2_to.save()

    i_q2_date = item(parent_id=i_q2,
                     item_type_id=it_date, order=4)
    i_q2_date.save()

    i_q2_body = item(parent_id=i_q2,
                     item_type_id=it_body, order=5)
    i_q2_body.save()

    # question 3 items
    i_q3 = item(parent_id=i_emib,
                item_type_id=it_question, order=3)
    i_q3.save()

    i_q3_subject = item(parent_id=i_q3,
                        item_type_id=it_subject, order=1)
    i_q3_subject.save()

    i_q3_from = item(parent_id=i_q3,
                     item_type_id=it_from, order=2)
    i_q3_from.save()

    i_q3_to = item(parent_id=i_q3,
                   item_type_id=it_to, order=3)
    i_q3_to.save()

    i_q3_date = item(parent_id=i_q3,
                     item_type_id=it_date, order=4)
    i_q3_date.save()

    i_q3_body = item(parent_id=i_q3,
                     item_type_id=it_body, order=5)
    i_q3_body.save()

    # bulk create questions
    question.objects.using(db_alias).bulk_create([
        question(question_type_id=qt_email, item_id=i_q1),
        question(question_type_id=qt_email, item_id=i_q2),
        question(question_type_id=qt_email, item_id=i_q3)
    ])


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
    l_english = language.objects.using(db_alias).filter(
        ISO_Code_1="en", ISO_Code_2="en-ca").last()
    l_french = language.objects.using(db_alias).filter(
        ISO_Code_1="fr", ISO_Code_2="fr-ca").last()
    # get item_type objects
    it_test = item_type.objects.using(db_alias).filter(type_desc="test").last()
    it_question = item_type.objects.using(
        db_alias).filter(type_desc="question").last()
    it_subject = item_type.objects.using(
        db_alias).filter(type_desc="subject").last()
    it_from = item_type.objects.using(db_alias).filter(type_desc="from").last()
    it_to = item_type.objects.using(db_alias).filter(type_desc="to").last()
    it_date = item_type.objects.using(db_alias).filter(type_desc="date").last()
    it_body = item_type.objects.using(db_alias).filter(type_desc="body").last()
    # get question_type objects
    qt_email = question_type.objects.using(
        db_alias).filter(question_type_desc="email").last()
    # get item objects
    i_emib = item.objects.using(db_alias).filter(
        item_type_id=it_test, order=1).last()
    i_q1 = item.objects.using(db_alias).filter(
        parent_id=i_emib, item_type_id=it_question, order=1).last()
    i_q1_subject = item.objects.using(db_alias).filter(
        parent_id=i_q1, item_type_id=it_subject, order=1).last()
    i_q1_from = item.objects.using(db_alias).filter(
        parent_id=i_q1, item_type_id=it_from, order=2).last()
    i_q1_to = item.objects.using(db_alias).filter(
        parent_id=i_q1, item_type_id=it_to, order=3).last()
    i_q1_date = item.objects.using(db_alias).filter(
        parent_id=i_q1, item_type_id=it_date, order=4).last()
    i_q1_body = item.objects.using(db_alias).filter(
        parent_id=i_q1, item_type_id=it_body, order=5).last()
    i_q2 = item.objects.using(db_alias).filter(
        parent_id=i_emib, item_type_id=it_question, order=2).last()
    i_q2_subject = item.objects.using(db_alias).filter(
        parent_id=i_q2, item_type_id=it_subject, order=1).last()
    i_q2_from = item.objects.using(db_alias).filter(
        parent_id=i_q2, item_type_id=it_from, order=2).last()
    i_q2_to = item.objects.using(db_alias).filter(
        parent_id=i_q2, item_type_id=it_to, order=3).last()
    i_q2_date = item.objects.using(db_alias).filter(
        parent_id=i_q2, item_type_id=it_date, order=4).last()
    i_q2_body = item.objects.using(db_alias).filter(
        parent_id=i_q2, item_type_id=it_body, order=5).last()
    i_q3 = item.objects.using(db_alias).filter(
        parent_id=i_emib, item_type_id=it_question, order=3).last()
    i_q3_subject = item.objects.using(db_alias).filter(
        parent_id=i_q3, item_type_id=it_subject, order=1).last()
    i_q3_from = item.objects.using(db_alias).filter(
        parent_id=i_q3, item_type_id=it_from, order=2).last()
    i_q3_to = item.objects.using(db_alias).filter(
        parent_id=i_q3,   item_type_id=it_to, order=3).last()
    i_q3_date = item.objects.using(db_alias).filter(
        parent_id=i_q3, item_type_id=it_date, order=4).last()
    i_q3_body = item.objects.using(db_alias).filter(
        parent_id=i_q3, item_type_id=it_body, order=5).last()

    # destroy questions
    question.objects.using(db_alias).filter(
        question_type_id=qt_email, item_id=i_q1).delete()
    question.objects.using(db_alias).filter(
        question_type_id=qt_email, item_id=i_q2).delete()
    question.objects.using(db_alias).filter(
        question_type_id=qt_email, item_id=i_q3).delete()

    # TODO roll back

    # destroy items; inverted order as children must be deleted first
    i_q3_body.delete()
    i_q3_date.delete()
    i_q3_to.delete()
    i_q3_from.delete()
    i_q3_subject.delete()
    i_q3.delete()
    i_q2_body.delete()
    i_q2_date.delete()
    i_q2_to.delete()
    i_q2_from.delete()
    i_q2_subject.delete()
    i_q2.delete()
    i_q1_body.delete()
    i_q1_date.delete()
    i_q1_to.delete()
    i_q1_from.delete()
    i_q1_subject.delete()
    i_q1.delete()
    i_emib.delete()

    # destroy question_types
    qt_email.delete()

    # destroy item_types
    it_test.delete()
    it_question.delete()
    it_subject.delete()
    it_from.delete()
    it_to.delete()
    it_date.delete()
    it_body.delete()

    # destroy languages
    l_english.delete()
    l_french.delete()


class Migration(migrations.Migration):

    dependencies = [
        ('custom_models', '0004_auto_20190529_0846'),
    ]

    operations = [
        migrations.RunPython(upload_emib_sample, destroy_emi_sample),
    ]
