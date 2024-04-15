# Django imports
from django.shortcuts import render, redirect
import os

# Django REST Framework imports
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# from rest_framework.parsers import JSONParser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

import chromadb
from chromadb.config import Settings

CHROMA_SETTINGS = Settings(
    allow_reset=True,
    anonymized_telemetry=False,
)

CHROMA_CLIENT = chromadb.HttpClient(
    host=os.environ.get('CHROMA_HOST_NAME'),  # Replace with 'localhost' for development
    port=os.environ.get('CHROMA_HOST_PORT'),
    settings=CHROMA_SETTINGS
    )

@api_view(['GET'])
def vector_search(request):
    # Access ChromaDB client
    client = CHROMA_CLIENT

    # Create or get a collection
    collection = client.get_or_create_collection(name="my_collection")

    collection.add(
        documents=["This is a document", "This is another document"],
        metadatas=[{"source": "my_source"}, {"source": "my_source"}],
        ids=["id1", "id2"]
    )
    
    # Perform vector operations...
    results = collection.query(
        query_texts=["This is a query document"],
        n_results=1
    )
    
    return Response({
        "result": results
    })

