from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.http import HttpResponse, StreamingHttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from langchain.tools import tool

import os
import time
import requests
import markdown
import json
import uuid

from .agent import Agent


base_url = "http://localhost:8000" if os.environ.get('DEBUG') == "1" else os.environ.get('DEPLOY_URL')
global shopping_cart
shopping_cart = []

@tool
def test_connection() -> str:
    """Use this tool to test the connectivity. Mention the status code"""
    res = requests.get("https://google.com/")
    print("DEBUGGING IS:" + str(os.environ.get('DEBUG')))
    return f"Status code: {res.status_code}, the base url is: {base_url}"

@tool
def get_item_by_id(item_id: int) -> str:
    """Use this tool to look up items using the id."""
    
    # Reset the shopping cart
    global shopping_cart
    
    res = requests.get(f"{base_url}/api/items/{item_id}/")
    
    shopping_cart.append(res.json()['item_id'])
    return res.json()

@tool
def get_similar_by_id(item_id: int) -> list:
    """Use this tool to get the top 10 similar items to the item_id you input. You should have an analogy so \
        when a user wants similar products to a certain product, you grab its id and use this to get some similar."""

    res = requests.get(f"{base_url}/api/vector/similar_by_id/?id={item_id}")
    
    global shopping_cart
    shopping_cart = [item['item_id'] for item in res.json()['result']]

    return res.json()['result']

# Removing search items from LLM tools because the model doesn't know how to use it.
@tool
def search_items(search_query: str, n_items=3) -> list:
    """
    This Tool searches for items given a search query which is anything that may lead to an item, \
        whether it is description, relevant items, or a name. Then, returns the top n_items matches.
    This should be your most used tool as it serves most cases.
    """
    
    global shopping_cart
    res = requests.get(f"{base_url}/api/vector/similar_by_text/?query={search_query}&n={n_items}")
    shopping_cart = [item['item_id'] for item in res.json()['result']]

    return res.json()['result']


# Add the tool to the collection
tools = [test_connection, get_item_by_id, get_similar_by_id, search_items]

# Views
@csrf_exempt
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'query': openapi.Schema(
                type=openapi.TYPE_STRING,
            )
        },
        required=['query']
    )
)
@api_view(['POST'])
def query(request):
    query = request.data.get('query')

    # Get the Session_id if it exists else initialize it.
    session_id = request.COOKIES.get('session_id') or str(uuid.uuid4())

    
    try:
        # Initialize the agent
        agent = Agent(tools, session_id)
        
        # Ask the model and structure the response
        result = agent.ask(query)
        result = markdown.markdown(result)
        
        # Remove surrounding <p> tags if present
        if result.startswith('<p>'):
            result = result[3:-4]

        # Construct the response
        response_data = {
            'items': shopping_cart,
            'response': result
        }
        # Set the session ID cookie
        response = JsonResponse(response_data)
        response.set_cookie('session_id', session_id, max_age=50)
        
    except Exception as e:
        # Handle exceptions gracefully
        response_data = {'error': str(e)}
        response = JsonResponse(response_data, status=500)
        
    return response


@csrf_exempt
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'query': openapi.Schema(
                type=openapi.TYPE_STRING,
            )
        },
        required=['query']
    )
)
@api_view(['POST'])
def stream(request):
    query = request.data.get('query')
    
    return HttpResponse('Unimplemented')