# Django REST Framework imports
from rest_framework.response import Response
from rest_framework import status

# Local application imports
from . import serializers

# Imports for querying
from django.db.models import Max, Case, When
from vectorDB.chroma_db import ChromaDB

#Library imports
import math

# instantiating ChromaDB
chromadb = ChromaDB()

# Methods to be used in the search function

# Sort Filtering Method
def sorting_filter(items, sort, preserve=None):
    ORDER_BY_CONST= {"pa": "price",
                    "pd": "-price", 
                    "na": "name",
                    "nd": "-name",
                    "ra": "rating",
                    "rd": "-rating"}
    if sort:
        # Sort based on the constants
        if sort in ORDER_BY_CONST.keys():
            items= items.order_by(ORDER_BY_CONST[sort])
            return items
        else:
            raise Exception("Invalid value for sort parameter.")
    elif preserve:
        # Preserving the initial chromadb order
        preserved = Case(*[When(pk=pk, then=pos) for pos, pk in enumerate(preserve)])
        items = items.order_by(preserved)
        return items
    
    # if neither, default is by descending item ids 
    return items.order_by("-item_id")

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
def search_result(items, page, per_page, start, end, min_price, max_price) -> Response:
    max_pages = math.ceil(items.count()/per_page) #  Calculate how many pages there can be
    
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
        return Response({
            "results": [],
            'message': "There is no such items"
            }, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({
            "results": [],
            'message': "The page number exceeds the max"
            }, status=status.HTTP_400_BAD_REQUEST)

# Search Method using chromadb for semantic search 
def search(query, per_page, n=None) -> list:
    # Max per request
    n = per_page * 20
    
    # Get items collection
    items_collection = chromadb.get_items_collection()
    
    # Searching chromadb
    result= items_collection.query(
        query_texts= query,
        n_results= n,
        include=[], # to return just the item IDs
    )
    
    return [int(x) for x in result["ids"][0]]
