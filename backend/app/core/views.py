# Django imports
from django.shortcuts import render, redirect

# Django REST Framework imports
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# from rest_framework.parsers import JSONParser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Local application imports
from . import models, serializers, search

# Imports for querying
from django.db.models import Q
from django.contrib.postgres.search import SearchQuery, SearchVector, SearchRank
from functools import reduce
import operator

#Library imports
from datetime import datetime
import random

# TODO: Embedding images

# GET Search
@swagger_auto_schema(
    method='get',  # Ensure this matches the HTTP method in @api_view
    manual_parameters=[
        openapi.Parameter(
            name='query',
            in_=openapi.IN_QUERY,
            description='Search query for items, looking for partial matches.',
            type=openapi.TYPE_STRING,
            default="hyun s 2 02"
        ),
        openapi.Parameter(
            name='page',
            in_=openapi.IN_QUERY,
            description='Insert the page number for pagination.',
            type=openapi.TYPE_INTEGER,
            required=False,
            default= 1,
            
        ),
        openapi.Parameter(
            name='min_price',
            in_=openapi.IN_QUERY,
            description='Min price for the price range.',
            type=openapi.TYPE_NUMBER,
            format=openapi.FORMAT_FLOAT,
            required=False
        ),
        openapi.Parameter(
            name='max_price',
            in_=openapi.IN_QUERY,
            description='Max price for the price range.',
            type=openapi.TYPE_NUMBER,
            format=openapi.FORMAT_FLOAT,
            required=False
        ),
        openapi.Parameter(
            name='sort',
            in_=openapi.IN_QUERY,
            description="""Sort By:
                         "pa": ascending by price
                         "pd": descending by price
                         "na": ascending by name
                         "nd": descending by name
                         "ra": ascending by rating
                         "rd": descending by rating
                         """,
            type=openapi.TYPE_STRING,
            required=False,
        ),
        openapi.Parameter(
            name='stores',
            in_=openapi.IN_QUERY,
            description="""Use Store Ids separated with commas""",
            type=openapi.TYPE_STRING,
            required=False,
            default="1,2,3"
        ),
        openapi.Parameter(
            name='category',
            in_=openapi.IN_QUERY,
            description='Category ID to filter items by. For example, 88. However, if a Category\'s is used, then the query parameter will be rendered useless.',
            type=openapi.TYPE_INTEGER,
            required=False,
        ),
    ]
)
@api_view(['GET'])
def search_items(request):
    try:
        PER_PAGE = 12 # Number of results per page "CONSTANT"
        
        query = request.query_params.get('query', '')  # Get the search query parameter
        page = int(request.query_params.get('page', 1))  #  Get the pagination number (default is 1)
        category_id = request.query_params.get('category', None) # Get the  Category id from URL Parameter (None if not provided)
        
        if page  < 1:
            return Response({
                "results": [],
                "message": "Invalid page number. Page number must be 1 or greater"
                }, status=status.HTTP_400_BAD_REQUEST)
        
        # Get all of the parameters
        start = (page - 1) * PER_PAGE # The  item at which we should start our query
        end = page * PER_PAGE # The item at which we should stop our query
        min_price = float(request.query_params.get("min_price", 0))  # Min price for filtering
        max_price = float(request.query_params.get("max_price", 0))  # Max price for filtering
        sort = request.query_params.get('sort', "")  # Sorting method
        stores = request.query_params.get('stores', "")  # Stores to filter on
        
        # initializing local variables
        items = None
        ids_list = None
        
        if category_id:
            # Searching the a category with its children
            category = models.Category.objects.get(pk=category_id)
            items = models.Item.objects.filter(itembelongsto__category__in=category.get_descendants(include_self=True))
            
        if query:
            # Getting the ids of the items that match the query from chromadb
            ids_list= search.search(query=query, per_page=PER_PAGE)
            
            # Filtering based on the ids list depending if the items exist
            if items:
                items = items.filter(item_id__in=ids_list)
            else:
                items = models.Item.objects.filter(item_id__in=ids_list)
        
        # if empty move to results
        if items:
            # Correcting the max price if needed
            max_price= search.max_price_corrector(items=items, min_price=min_price, max_price=max_price)
        
            # Filtering by price range
            items= search.price_range_filtering(items=items, min_price=min_price, max_price=max_price)
            
            # Sorting
            items= search.sorting_filter(items=items, sort=sort, preserve=ids_list)
            
            # Filtering by stores
            items= search.store_filtering(items=items, stores=stores)
        
        # Result
        return search.search_result(
            items=items,
            page=page,
            per_page= PER_PAGE,
            start=start,
            end=end,
            min_price=min_price,
            max_price=max_price,
            )
    
    except models.Category.DoesNotExist:
        return Response({
            "results": [],
            'message': 'Invalid category ID'
            }, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({
            "results": [],
            'message': "Something went wrong"
            }, status=status.HTTP_400_BAD_REQUEST)

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
        return Response({'message': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

    serialized_item = serializers.ItemSerializer(item)
    return Response(serialized_item.data)

# API endpoint to get popular
@api_view(['GET'])
def get_popular_items(request):
    items = models.Item.objects.order_by("-review_count").filter(rating__gte=3)[:100]
    seed = int(format(datetime.today(), '%j'))
    
    random.seed(seed)
    popular_items = random.sample(list(items), 12)
    
    serialized = serializers.ItemSerializer(popular_items, many=True)
    return Response(serialized.data)

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
            return Response({"message": "Wrong format of the wishlist parameter"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': 'No wishlist array is provided'}, status=status.HTTP_400_BAD_REQUEST)

# API endpoint to get all categories
@api_view(['GET'])
def get_categories(request):
    categories = models.Category.objects.all().order_by('category_id')
    serialized_categories = serializers.CategorySerializer(categories, many=True)
    return Response(serialized_categories.data)

# API endpoint to get a category
@swagger_auto_schema(
    method='get',  # Ensure this matches the HTTP method in @api_view
    manual_parameters=[
        openapi.Parameter(
            name='category',
            in_=openapi.IN_QUERY,
            description='Category ID to get',
            type=openapi.TYPE_INTEGER,
            required=False,
        ),
    ]
)
@api_view(['GET'])
def get_category(request):
    try:
        category_id = request.query_params.get('category', None) # Get the  Category id from URL Parameter (None if not provided)
        if category_id:
            category = models.Category.objects.get(pk=category_id)
            serialized_category = serializers.CategorySerializer(category)
            return Response(serialized_category.data)
        
        return Response({
                "message": "category id is not included"
            }, status= status.HTTP_400_BAD_REQUEST)
    except:
        return Response({
            "message": "There is no such category"
        }, status= status.HTTP_404_NOT_FOUND)

# API endpoint to get all stores
@api_view(['GET'])
def get_stores(request):
    stores = models.Store.objects.all().order_by("store_id")
    serialized_stores = serializers.StoreSerializer(stores, many=True)
    return Response(serialized_stores.data)

