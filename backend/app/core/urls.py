from . import views
from django.urls import path

urlpatterns = [
    path("items/", views.get_items, name="get_items"),
    path("items/<int:item_id>/", views.get_item, name="get_item"),
    path("categories/", views.get_categories, name="get_categories"),
    path("category/", views.get_category, name="get_category"),
    path("stores/", views.get_stores, name="get_stores"),
    path("populer_items/", views.get_popular_items, name= "get_popular_items"),
    path("search/", views.search_items, name="search"),
    path("wishlist/", views.get_wishlist, name="get_wishlist"),
]