from rest_framework import serializers
from . import models


class CategorySerializer(serializers.ModelSerializer):
    children = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = models.Category
        fields = ['category_id', 'category', 'parent', 'children']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = ['image_id', 'image_name', 'image_url']

class ItemSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = models.Item
        fields = ['item_id', 'name', 'description', 'price', 'summarized_reviews', 'images']

class ItemsHistorySerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)
    store = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = models.ItemsHistory
        fields = ['created_on', 'item', 'store', 'price']

class ItemBelongsToSerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = models.ItemBelongsTo
        fields = ['item', 'category']

class LocationSerializer(serializers.ModelSerializer):
    store = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = models.Location
        fields = ['map_url', 'store']

class ReviewSerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)

    class Meta:
        model = models.Review
        fields = ['review_id', 'item', 'stars', 'content']

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Store
        fields = ['store_id', 'name', 'url']
