from . import views
from django.urls import path

urlpatterns = [
    path("", views.home, name="home"),
    path("items/", views.get_items, name="get_items"),
    path("items/<int:item_id>/", views.get_item, name="get_item")

]