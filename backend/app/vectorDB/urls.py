from . import views
from django.urls import path

urlpatterns = [
    path("vectorDB/", views.vector_search, name="vector_search"),
]