# Testing

## All Tests

This script will run both backend and frontend tests

In gitbash:

```shell
./run-tests.sh
```

In powershell:

```shell
.\run-tests.sh
```

Note: will need to press [Ctrl]+[C] after npm tests finish

## Frontend tests

The frontend ReactJS application currently has a test of unit tests using Enzyme.

To run these tests, you'll need to enter the frontend Docker container.

In powershell:

```shell
docker exec -it project-thundercat_frontend_1 /bin/bash

npm run test
```

## Backend tests

The backend Django application has a set of tests for it's views and uses Postman to manage API tests.

To run the unit tests, you'll need to enter the backend Docker container.

In powershell:

```shell
docker exec -it project-thundercat_backend_1 /bin/bash

./manage.py test tests
```

TODO(fnormand01) - Outline how to run Postman tests.
