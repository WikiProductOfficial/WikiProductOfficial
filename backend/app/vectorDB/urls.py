from . import views
from django.urls import path

urlpatterns = [
    path("heartbeat/", views.heartbeat, name="heartbeat"),
    path("peek/", views.peek, name="peek"),
    path("collections/", views.list_collections, name="list_collections"),
    path("similar_by_id/", views.similar_by_id, name="similar_by_id"),
    path("similar_by_text/", views.similar_by_text, name="similar_by_text"),
]