from .base import *


DEBUG = True

# TODO: Setup the real dev DB here
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "postgres",
        "USER": "postgres",
        "HOST": "db",  # set in docker-compose.yml
        "PORT": 5432,  # default postgres port
    }
}

INSTALLED_APPS.append("debug_toolbar")

MIDDLEWARE.append("debug_toolbar.middleware.DebugToolbarMiddleware")

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static/")

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media/")
