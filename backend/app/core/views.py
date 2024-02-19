# Django imports
from django.shortcuts import render, redirect
from django.http import JsonResponse

# Django REST Framework imports
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Local application imports
from . import models, serializers


# @api_view(['POST'])
# def search(request):
#     ### Inital build  of the search function to test it - feel free to changed
#     data = JSONParser().parse(request)
#     query = data.get('query', '')
#     if query:
#         items = models.Item.objects.filter(name__icontains=query)[:50] 
#         serializer = serializers.ItemSerializer(items, many=True)
#         return Response(serializer.data)
#     else:
#         return Response({'message': 'No query provided'}, status=400)



# GET Search
@swagger_auto_schema(
    method='get',  # Ensure this matches the HTTP method in @api_view
    manual_parameters=[
        openapi.Parameter(
            name='query',
            in_=openapi.IN_QUERY,
            description='Search query for items, looking for partial matches.',
            type=openapi.TYPE_STRING
        )
    ]
)
@api_view(['GET'])
def search(request):
    query = request.GET.get('query', '')  # Get the search query parameter
    if query:
        # Filter items based on the query. Adjust field names as needed.
        items = models.Item.objects.raw(
            """SELECT *
               FROM items
               WHERE UPPER(name::text) LIKE UPPER(%s)""",
            ["%" + query.replace(" ", "%") + "%"])[:50]  # Example field 'name'
        serializer = serializers.ItemSerializer(items, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({'message': 'No query provided'}, status=400)



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

