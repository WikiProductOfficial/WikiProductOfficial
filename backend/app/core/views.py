from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from . import models, serializers


def home(request):
    return render(request, 'home.html')

# API endpoint to get all items
@api_view(['GET'])
def get_items(request):
    items = models.Item.objects.all().order_by("item_id")[:50]
    serialized_items = serializers.ItemSerializer(items, many=True)
    return Response(serialized_items.data)


# API endpoint to get one item
@api_view(['GET'])
def get_item(request, item_id):
    try:
        item = models.Item.objects.get(pk=item_id)
    except models.Item.DoesNotExist:
        return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

    serialized_item = serializers.ItemSerializer(item)
    return Response(serialized_item.data)


# API endpoint to get all categories
@api_view(['GET'])
def get_categories(request):
    categories = models.Category.objects.all()
    serialized_categories = serializers.CategorySerializer(categories, many=True)
    return Response(serialized_categories.data)

# API endpoint to get popular
@api_view(['GET'])
def get_popular_items(request):
    categories = models.Category.objects.all()
    serialized_categories = serializers.CategorySerializer(categories, many=True)
    return Response(serialized_categories.data)