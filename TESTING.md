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

To run Postman tests, you'll need to launch Postman desktop app and setup your environment.

1. Import ThunderCAT local environment:

   ![postman screenshot](/docs/images/import-postman-env.png)

   ![postman screenshot](/docs/images/import-postman-env2.png)

   ![postman screenshot](/docs/images/import-postman-env3.png)

   Then select the following file:
   _\project-thundercat\backend\tests\postman\environments\local\ThunderCAT.local.postman_environment.json_.

   You can then put the name of your choice for this new imported environment (e.g. _"ThunderCAT - Local"_).

2. Make sure that you new environment is selected:

   ![postman screenshot](/docs/images/postman-selected-env.png)

3. Import ThunderCAT collection:

   ![postman screenshot](/docs/images/import-postman-collection.png)

   ![postman screenshot](/docs/images/import-postman-collection2.png)

   Then select the following file: _\project-thundercat\backend\tests\postman\ThunderCAT.postman_collection.json_.

   You have now your new ThunderCAT collection:

   ![postman screenshot](/docs/images/import-postman-collection3.png)

4. You can either run individual tests or run the whole collection:

   Individual test:

   ![postman screenshot](/docs/images/postman-run-individual-test.png)

   Whole collection:

   ![postman screenshot](/docs/images/postman-run-whole-collection.png)

   ![postman screenshot](/docs/images/postman-run-whole-collection2.png)

   **Note that if you run the whole collection, you may need to delete some data, since the tests are creating new accounts and you also may need to add authorization for protected APIs.**

   ![postman screenshot](/docs/images/postman-authorization-for-protected-apis.png)
