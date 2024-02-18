from rest_framework import serializers
from . import models


class CategorySerializer(serializers.ModelSerializer):
    children = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = models.Category
        fields = "__all__"

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = "__all__"

class ItemSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = models.Item
        fields = "__all__"

class ItemsHistorySerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)
    store = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = models.ItemsHistory
        fields = "__all__"

class ItemBelongsToSerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = models.ItemBelongsTo
        fields = "__all__"

class LocationSerializer(serializers.ModelSerializer):
    store = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = models.Location
        fields = "__all__"

class ReviewSerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)

    class Meta:
        model = models.Review
        fields = "__all__"

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Store
        fields = "__all__"
