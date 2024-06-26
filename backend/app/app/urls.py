from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Wiki Products",
        default_version='v1',),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("api/admin/", admin.site.urls),
    path("api/", include("core.urls")),
    path("api/vector/", include("vectorDB.urls")),
    path('api/docs/', schema_view.with_ui('swagger', cache_timeout=0),name='schema-swagger-ui'),
    path("api/llm/", include("LLM.urls")),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )