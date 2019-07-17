# Swagger

Swagger is an open source tool whose purpose is to visualize and interact with the API’s resources without having any of the implementation logic in place. It’s automatically generated from your OpenAPI (formerly known as Swagger) Specification, with the visual documentation making it easy for back end implementation and client side consumption.

Click [here](https://swagger.io/tools/swagger-ui/) for more details about Swagger UI tool.

## How Swagger UI has been setup in this project

### Requirements

The _django-rest-swagger_ package has been added in the [requirements.txt](../backend/requirements.txt) file. We are currently using [version 2.2.0](https://pypi.org/project/django-rest-swagger/).

### Python Configurations

The _rest_framework_swagger_ package has been added to the INSTALLED_APPS in [base.py](../backend/config/settings/base.py) file. The following Swagger settings have also been added within this file.

```
# Swagger settings for documentation
SWAGGER_SETTINGS = {
    "LOGIN_URL": "rest_framework:login",
    "LOGOUT_URL": "rest_framework:logout",
}
```

### URL Configurations

The following import has been added in [urls.py](../backend/config/urls.py) file:

```
from rest_framework_swagger.views import get_swagger_view
```

Then the schema view has been set up with the following code:

```
schema_view = get_swagger_view(title="ThunderCAT APIs")
```

## How to use Swagger UI

### Accessing the interface

In order to access Swagger UI tool and use all its functionalities, make sure that all your containers are running and working well. Once done, you'll be able to access it with the following link:

http://localhost:8000/

### Unprotected APIs

By default, you will not be connected, so you will only be able to see and manipulate the unprotected APIs.

![swagger screenshot](/docs/images/swagger-view-unprotected-apis.png)

### Protected APIs

However, if you login using your super user credentials, you'll be able to see and manipulate all the APIs.

![swagger screenshot](/docs/images/swagger-view-protected-apis.png)

![swagger screenshot](/docs/images/swagger-view-protected-apis2.png)

![swagger screenshot](/docs/images/swagger-view-protected-apis3.png)

Also, if you login using basic user credentials, you'll only be able to see and manipulate the APIs that you have permission.

### How to manipulate the APIs

The manipulation of the APIs with Swagger UI is very simple and straight forward. Here is how to do so:

1. Choose the API that you want to use and click on "Try it out":

   ![swagger screenshot](/docs/images/swagger-manipulate-apis.png)

2. Fill in the required information (if needed) and click on "Execute":

   ![swagger screenshot](/docs/images/swagger-manipulate-apis2.png)

3. You have now your response:

   ![swagger screenshot](/docs/images/swagger-manipulate-apis3.png)

**For more information about this tool, visit https://swagger.io/.**
