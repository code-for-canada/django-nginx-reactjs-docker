from django.db import models
MAX_CHAR_LEN = 100

# Question Type model; identifies the type of question, which will impact how it is scored
# For the eMiB there are only "email" questions, which are scored manually
# However, later tests may include "multiple choice" (to be scored automatically)
# or "input" (to be scored manually). this is used to display the question properly and to score the answer
# (for example, an email question will have children of item types to, from, subject, body, date, etc;
# a multiple-choice will just children of item-type answer; an input may not have any children)


class QuestionType(models.Model):
    question_type_id = models.AutoField(primary_key=True)
    question_type_desc = models.CharField(max_length=MAX_CHAR_LEN)
    date_created = models.DateTimeField()
    date_from = models.DateTimeField()
    date_to = models.DateTimeField(null=True, blank=True)
