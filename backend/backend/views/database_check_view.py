from rest_framework import viewsets
from backend.serializers.database_check_serializer import DatabaseCheckSerializer
from backend.models.database_check_model import DatabaseCheckModel

class DatabaseViewSet(viewsets.ModelViewSet):
    # same as 'SELECT * FROM backend_databasecheckmodel;'
    queryset = DatabaseCheckModel.objects.all()
    serializer_class = DatabaseCheckSerializer
    # allows only GET requests
    http_method_names = ['get']
