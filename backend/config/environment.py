ENVIRONMENT = "local"
# ENVIRONMENT = "development"

SETTINGS_MODULE = "config.settings.local"

if ENVIRONMENT == "local":
    SETTINGS_MODULE = "config.settings.local"
if ENVIRONMENT == "development":
    SETTINGS_MODULE = "config.settings.development"
