from . import views
from django.urls import path

urlpatterns = [
    path("", views.home, name="home"),
    path("items/", views.get_items, name="get_items"),
    path("items/<int:item_id>/", views.get_item, name="get_item"),
    path("categories/", views.get_categories, name="get_categories"),
    path("populer_items/", views.gepopulaer_items, name= "give_popular_items"),
]