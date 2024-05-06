from . import views
from django.urls import path

urlpatterns = [
    path("query/", views.query, name="query"),
    path("stream/", views.stream, name="stream")
]