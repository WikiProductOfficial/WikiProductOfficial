# Django imports
from django.shortcuts import render, redirect

# Django REST Framework imports
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# from rest_framework.parsers import JSONParser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Chromadb imports
from vectorDB.chroma_db import ChromaDB

# import item model & serializer
from core import models
from core import serializers

# instantiating ChromaDB
chromadb = ChromaDB()

# CONSTANTS
CHROMA_CLIENT= chromadb.get_client()
ITEM_COLLECTION = chromadb.get_items_collection()

@api_view(['GET'])
def heartbeat(request):
    return Response({
        "result": CHROMA_CLIENT.heartbeat(),
    })

@swagger_auto_schema(
    method='get',  # Ensure this matches the HTTP method in @api_view
    manual_parameters=[
        openapi.Parameter(
            name='limit',
            in_=openapi.IN_QUERY,
            description="""Insert the limit for how many records to peek on. (Default is 10)
                            It's recommended not to go over 20""",
            type=openapi.TYPE_INTEGER,
            required=False,
        ),
    ]
)
@api_view(['GET'])
def peek(request):
    try:
        limit = int(request.query_params.get('limit', 10))  # Get the limit query parameter
        return Response({
            "result": ITEM_COLLECTION.peek(limit= limit),
        })
    except:
        return Response({
            "message": "limit is not a number",
        }, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method='get',  # Ensure this matches the HTTP method in @api_view
    manual_parameters=[
        openapi.Parameter(
            name='id',
            in_=openapi.IN_QUERY,
            description='Insert the item\'s id.',
            type=openapi.TYPE_INTEGER,
            required=True,
        ),
        openapi.Parameter(
            name='n',
            in_=openapi.IN_QUERY,
            description='Insert the number of similar items. (default is 10)',
            type=openapi.TYPE_INTEGER,
            required=False,
        ),
    ]
)
@api_view(['GET'])
def similar_by_id(request):
    try:
        id = request.query_params.get('id', '')  # Get the id query parameter
        n = int(request.query_params.get('n', 10)) + 1  # Get the n query parameter
        if id:
            result= get_similar(id=id, n=n)
            return Response({
                "result": result,
            })
            
        else:
            return Response({"result": "There is no id"}, status= status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"result": str(e)}, status= status.HTTP_500_INTERNAL_SERVER_ERROR)

@swagger_auto_schema(
    method='get',  # Ensure this matches the HTTP method in @api_view
    manual_parameters=[
        openapi.Parameter(
            name='query',
            in_=openapi.IN_QUERY,
            description='Insert the text to search the similarity with.',
            type=openapi.TYPE_STRING,
            required=True,
        ),
        openapi.Parameter(
            name='n',
            in_=openapi.IN_QUERY,
            description='Insert the number of similar items. (default is 10)',
            type=openapi.TYPE_INTEGER,
            required=False,
        ),
    ]
)
@api_view(["GET"])
def similar_by_text(request):
    try:
        query = request.query_params.get('query', '')  # Get the "query" query parameter
        n = int(request.query_params.get('n', 10))  # Get the n query parameter
        if query:
            result= get_similar(text=query, n=n)
            return Response({
                "result": result,
            })
            
        else:
            return Response({"result": "There is no text"}, status= status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"result": str(e)}, status= status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["GET"])
def list_collections(request):
    return Response({
        "result": CHROMA_CLIENT.list_collections(),
    })


# Functions for the API
def get_item(id):
    item= ITEM_COLLECTION.get(
        ids=[id],
        include=["embeddings"]
    )
    return item

# Getting items in bulk using ids list
def get_items(ids):
    if ids:
        return serializers.ItemSerializer(
            list(models.Item.objects.in_bulk(ids).values()),
            many= True
            ).data

def get_similar(id=0, text="", n=10):
    if id and text:
        result= Response({
            "message": "choose one method"
        }, status= status.HTTP_400_BAD_REQUEST)
    elif id:
        result= ITEM_COLLECTION.query(
            query_embeddings= get_item(id)["embeddings"],
            n_results= n,
            include= [], # to return just the item IDs
        )
        ids = [int(i) for i in result["ids"][0]]
        result = get_items(ids[1:]) # Getting the items
    elif text:
        result= ITEM_COLLECTION.query(
            query_texts= text,
            n_results= n,
            include=[], # to return just the item IDs
        )
        ids = [int(i) for i in result["ids"][0]]
        result = get_items(ids) # Getting the items
    else:
        result= Response({
            "message": "choose one method"
        }, status= status.HTTP_400_BAD_REQUEST)
    
    return result