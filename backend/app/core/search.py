# Django REST Framework imports
from rest_framework.response import Response
from rest_framework import status

# Local application imports
from . import serializers

# Imports for querying
from django.db.models import Max

#Library imports
import math

# Methods to be used in the search function

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
        return Response({'message': "There is no such items"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': "The page number exceeds the max"}, status=status.HTTP_400_BAD_REQUEST)