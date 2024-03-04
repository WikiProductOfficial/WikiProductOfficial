# Django imports
from django.shortcuts import render, redirect
# from django.http import JsonResponse

# Django REST Framework imports
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# from rest_framework.parsers import JSONParser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Local application imports
from . import models, serializers

# Imports for querying
from django.db.models import Q
from functools import reduce
import operator

#Library imports
import math

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
    PER_PAGE = 12 # Number of results per page "CONSTANT"
    
    query = request.query_params.get('query', '')  # Get the search query parameter
    page = int(request.query_params.get('page', 1))  #  Get the pagination number (default is 1)
    if page  < 1:
        return Response({"error":"Invalid page number. Page number must be 1 or greater"})
    
    
    if query:
        start = (page - 1) * PER_PAGE # The  item at which we should start our query
        end = page * PER_PAGE # The item at which we should stop our query
        
        query = query.strip().split(" ")
        # Filter items based on the query. Adjust field names as needed.
        # OLD way
        # items = models.Item.objects.raw(
        #     """SELECT *
        #        FROM items
        #        WHERE UPPER(name::text) LIKE UPPER(%s)""",
        #     ["%" + query.replace(" ", "%") + "%"])  # Example field 'name'
        
        # New way of searching
        condition = reduce(operator.and_, [Q(name__icontains=s) for s in query])
        items = models.Item.objects.filter(condition)
        
        max_pages = math.ceil(len(items)/PER_PAGE) #  Calculate how many pages there can be
        
        # check if the page does not exceed the maximum allowed value
        if page <= max_pages and items.count() > 0:
            serializer = serializers.ItemSerializer(items[start:end], many=True)
            return Response({
                "results": serializer.data, 
                "max_pages": max_pages,
                })
        elif items.count() <= 0:
            return Response({'message': "There is no such items"}, status=400)
        else:
            return Response({'message': "The page number exceeds the max"}, status=400)
        
    else:
        return Response({'message': 'No query provided'}, status=400)



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


# API endpoint to get wishlist items
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'wishlist': openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Schema(type=openapi.TYPE_INTEGER)
            )
        },
        required=['wishlist']
    )
)

@api_view(['POST'])
def get_wishlist(request):
    wishlist_ids = request.data.get('wishlist', [])
    if wishlist_ids:
        try:
            wishlist_items = models.Item.objects.filter(item_id__in=wishlist_ids).order_by('item_id')
            serialized_wishlist_items = serializers.ItemSerializer(wishlist_items, many=True)
            return Response(serialized_wishlist_items.data)
        except:
            return Response({"Error": "Wrong format of the wishlist parameter"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': 'No wishlist array is provided'}, status=status.HTTP_400_BAD_REQUEST)
