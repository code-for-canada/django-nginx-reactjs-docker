from django.db import models

##################################################################################
# DATABASE MODELS
##################################################################################

# Creates a simple model that allow us to test the connection between the app and the DB
class DatabaseCheckManager(models.Manager):
    def create_database_entry(self, name):
        database_entry = self.create(name=name)
        database_entry.save(using=self._db)
        return database_entry


class DatabaseCheckModel(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)
    objects = DatabaseCheckManager()
    REQUIRED_FIELDS = ["name"]
