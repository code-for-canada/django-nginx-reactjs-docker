# Back-end

This back-end API is a Django application that connects to the PostgreSQL DB and exposes an API to the front-end.

This project was bootstrapped with `django-admin startproject mysite`. Details for startproject available in [this tutorial](https://docs.djangoproject.com/en/2.1/intro/tutorial01/).

## Available Scripts

In the project directory, you can run the following commands.

To get to the project directory, login to the docker conatainer with the following command: `docker exec -it container_id /bin/bash` where `container_id` is the id of the docker backend container. This id can be found by running `docker ps`.

## Tests

### `./manage.py test`

Launches the test runner in the interactive watch mode.<br>
See the section about [Running tests](https://docs.djangoproject.com/en/2.1/topics/testing/overview/) for more information.

## Migrations

Django manages the PostgreSQL database through migrations. Whenever a model is changed, a migration is automatically created to update the database tables so that the application and database are always in sync and changes are tracked through version history.

We've also used migrations to seed the database with any public sample data, like the test content for the eMIB sample test.

See [Django Migrations](https://docs.djangoproject.com/en/2.1/topics/migrations/) for more information.

### Scripts

You'll have to login to the backend container to run these scripts: `docker exec -it project-thundercat_backend_1 /bin/bash`

Create new migrations based on the changes you've made to your models:
`python manage.py makemigrations custom_models`

Apply migrations that haven't been migrated yet:
`python manage.py migrate` or `python manage.py migrate custom_models` (for only our custom models).

List project's migrations and their status:
`python manage.py showmigrations` or `python manage.py showmigrations custom_models` (for only our custom models).

Migrate to a previous specified version:
`python manage.py migrate custom_models <migration_name>`

To rollback all migrations under custom_models and re-run them:
`python manage.py migrate custom_models zero` and then `python manage.py migrate custom_models`
