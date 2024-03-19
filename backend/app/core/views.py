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
from django.db.models import Q, Max
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
                         "pa": "price",     # ascending by price
                         "pd": "-price",    # descending by price
                         "na": "name",      # ascending by name
                         "nd": "-name",     # descending by name
                         "ra": "rating",    # ascending by rating
                         "rd": "-rating"    # descending by rating
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
def search(request):
    try:
        PER_PAGE = 12 # Number of results per page "CONSTANT"
        
        query = request.query_params.get('query', '')  # Get the search query parameter
        page = int(request.query_params.get('page', 1))  #  Get the pagination number (default is 1)
        category_id = request.query_params.get('category', None) # Get the  Category id from URL Parameter (None if not provided)
        
        if page  < 1:
            return Response({"error":"Invalid page number. Page number must be 1 or greater"})
        
        # Get all of the parameters
        start = (page - 1) * PER_PAGE # The  item at which we should start our query
        end = page * PER_PAGE # The item at which we should stop our query
        min_price = float(request.query_params.get("min_price", 0))  # Min price for filtering
        max_price = float(request.query_params.get("max_price", 0))  # Max price for filtering
        sort = request.query_params.get('sort', "")  # Sorting method
        stores = request.query_params.get('stores', "")  # Stores to filter on

        items = None
        if category_id:
            # Searching the a category with its children
            category = models.Category.objects.get(category_id=category_id)
            items = models.Item.objects.filter(itembelongsto__category__in=category.get_descendants(include_self=True))
            
            # # For Debugging the category and its children
            # for item in items:
            #     # Get the category for the current item
            #     category_data = item.itembelongsto_set.first().category
            #     print(f'category data: {category_data}')
            #     # Create a category serializer with the category data
            #     category_serializer = serializers.CategorySerializer(category_data)
            #     # Set the category field in the item serializer
            #     print(f"Serialized category:{category_serializer.data}")
        if query:
            query = query.strip().split(" ")
            
            # New way of searching
            condition = reduce(operator.and_, [Q(name__icontains=s) for s in query])
            if items:
                items = items.filter(condition)
            else:
                items = models.Item.objects.filter(condition)
            
        # Correcting the max price if needed
        max_price= max_price_corrector(items=items, min_price=min_price, max_price=max_price)
        
        # Filtering by price range
        items= price_range_filtering(items=items, min_price=min_price, max_price=max_price)
        # Sort by
        items= sorting_filter(items=items, sort=sort)
        
        # Filtering by stores
        items= store_filtering(items=items, stores=stores)
        
        # Result
        return search_result(
            items=items,
            page=page,
            PER_PAGE= PER_PAGE,
            start=start,
            end=end,
            min_price=min_price,
            max_price=max_price,
            )
            
    except models.Category.DoesNotExist:
        return Response({'message': 'Invalid category ID'}, status=400)
    except:
        return Response({'message': "Something went wrong"}, status=400)
    # # For Debugging or Development
    # except Exception as e:
    #     return Response({'error_message': str(e)}, status=400)




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
    categories = models.Category.objects.all().order_by('category_id')
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

# API endpoint to get all stores
@api_view(['GET'])
def get_stores(request):
    stores = models.Store.objects.all().order_by("store_id")
    serialized_stores = serializers.StoreSerializer(stores, many=True)
    return Response(serialized_stores.data)



# Methods to be used by the api endpoints

# Sort Filtering Method
def sorting_filter(items, sort):
    ORDER_BY_CONST= {"pa": "price",
                    "pd": "-price", 
                    "na": "name",
                    "nd": "-name",
                    "ra": "rating",
                    "rd": "-rating"}
    if sort:
        # Sort by
        if sort in ORDER_BY_CONST.keys():
            items= items.order_by(ORDER_BY_CONST[sort])
            return items
        else:
            raise Exception("Invalid value for sort parameter.")
    
    return items.order_by("item_id")

# Store Filtering Method
def store_filtering(items, stores):
    if stores:
        stores = [int(store_id) for store_id in stores.split(',') if store_id.isdigit()]
        items = items.filter(itemshistory__store__in=stores)
        return items
    return items

# Correcting Max price
def max_price_corrector(items,min_price,max_price):
    if not max_price or max_price<= min_price:
        max_price = float(items.aggregate(Max("price"))["price__max"])
        return max_price
    return max_price

# Price range  Filtering Method
def price_range_filtering(items, min_price, max_price):
    # Filtering by price range
    items= items.filter(price__range=(min_price,max_price))
    
    return items

# Preparing the Search Result Method
def search_result(items, page, PER_PAGE, start, end, min_price, max_price):
    max_pages = math.ceil(items.count()/PER_PAGE) #  Calculate how many pages there can be
    
    # check if the page does not exceed the maximum allowed value
    if page <= max_pages and items.count() > 0:
        serializer = serializers.ItemSerializer(items[start:end], many=True)
        return Response({
            "results": serializer.data, 
            "max_pages": max_pages,
            "min_price": min_price,
            "max_price": max_price,
            })
    elif items.count() <= 0:
        return Response({'message': "There is no such items"}, status=400)
    else:
        return Response({'message': "The page number exceeds the max"}, status=400)