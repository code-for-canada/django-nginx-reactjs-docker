from rest_framework import viewsets
from rest_framework import permissions
from serializers.database_check_serializer import DatabaseCheckSerializer
from custom_models.database_models import DatabaseCheckModel


class DatabaseViewSet(viewsets.ModelViewSet):
    # same as 'SELECT * FROM backend_databasecheckmodel;'
    queryset = DatabaseCheckModel.objects.all()
    serializer_class = DatabaseCheckSerializer
    # allow admin users only to view this API
    permission_classes = (permissions.IsAdminUser,)
    # allows only GET requests
    http_method_names = ["get"]
