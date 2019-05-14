#!bin/bash

# all our models should be under custom_models
# checking if there are any new migrations in custom_models
python manage.py makemigrations custom_models
# all initial and new migrations will be migrated
python manage.py migrate
# starting web server
python manage.py runserver 0.0.0.0:8000
