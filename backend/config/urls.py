from django.conf.urls import url
from django.conf import settings
from django.urls import path, include
from django.contrib import admin
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view
from views import views, database_check_view, test_view
from rest_framework_jwt.views import (
    obtain_jwt_token,
    refresh_jwt_token,
    verify_jwt_token,
)


schema_view = get_swagger_view(title="ThunderCAT APIs")

router = routers.DefaultRouter()
router.register(r"api/database-check", database_check_view.DatabaseViewSet)
router.register(r"api/test-check", test_view.TestSet)

urlpatterns = [
    url(r"^$", schema_view),
    url(r"^admin/", admin.site.urls),
    url(r"^api/auth/", include("djoser.urls")),
    url(r"^api/auth/", include("djoser.urls.authtoken")),
    path(r"api/backend-status", views.index, name="index"),
    path("", include(router.urls)),
    url(r"^api/auth/", include("rest_framework.urls", namespace="rest_framework")),
    url(r"^api/auth/jwt/create_token/", obtain_jwt_token),
    url(r"^api/auth/jwt/refresh_token/", refresh_jwt_token),
    url(r"^api/auth/jwt/verify_token/", verify_jwt_token),
    url('^api/test-check/(?P<item_id>.+)/$', test_view.TestSet),
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [url(r"^__debug__/", include(debug_toolbar.urls))]
