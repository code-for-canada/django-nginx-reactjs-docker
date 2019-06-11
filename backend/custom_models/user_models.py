from django.contrib.auth.models import UserManager, AbstractUser
from django.db import models
from django.db.models import Q

##################################################################################
# USER MODELS
##################################################################################

# customize user manager by allowing the user to log in by email or username
class CustomUserManager(UserManager):
    def get_by_natural_key(self, username):
        return self.get(
            Q(**{self.model.USERNAME_FIELD: username})
            | Q(**{self.model.EMAIL_FIELD: username})
        )


class User(AbstractUser):
    objects = CustomUserManager()
    first_name = models.CharField(max_length=30, null=False, blank=False)
    last_name = models.CharField(max_length=150, null=False, blank=False)
    birth_date = models.CharField(max_length=10, null=False, blank=False)
    pri_or_military_nbr = models.CharField(max_length=9, null=True, blank=True)
    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
        "birth_date",
        "email",
        "pri_or_military_nbr",
        "password",
    ]
