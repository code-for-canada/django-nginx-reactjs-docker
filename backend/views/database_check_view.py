from rest_framework import viewsets
from serializers.database_check_serializer import DatabaseCheckSerializer
from custom_models.database_models import DatabaseCheckModel


class DatabaseViewSet(viewsets.ModelViewSet):
    # same as 'SELECT * FROM backend_databasecheckmodel;'
    queryset = DatabaseCheckModel.objects.all()
    serializer_class = DatabaseCheckSerializer
    # allows only GET requests
    http_method_names = ["get"]
