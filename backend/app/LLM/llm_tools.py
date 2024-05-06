import requests
from langchain.tools import tool
import os

"""
STEPS FOR CREATING A TOOL FOR THE LLM TO USE:

1- add @tool decorator
2- Create the function (try to make it less input dependant so AI doesn't need too much data)
3- Create the Docstring AND DESCRIBE THE FUNCTION INSIDE IT, THIS IS IMPORTANT SO THE AI KNOWS WHEN TO USE IT.
4- Set datatypes for inputs and return variables so there is no room for syntatical errors.
5- Add it to the tools array so it is integrated to the chatbot.

EXAMPLE:
@tool
def sum(x: int, y: int) -> int:
    Use this when you want to sum 2 numbers.
    
    return x + y
"""


base_url = "http://localhost:8000" if os.environ.get('DEBUG') == "1" else os.environ.get('DEPLOY_URL')

shopping_cart = [] # Add items to shopping cart instead of giving to model to properly view it in front-end

@tool
def test_connection() -> str:
    """Use this tool to test the connectivity. Mention the status code"""
    res = requests.get("https://google.com/")
    print("DEBUGGING IS:" + str(os.environ.get('DEBUG')))
    return f"Status code: {res.status_code}, the base url is: {base_url}"

@tool
def get_item_by_id(item_id: int) -> str:
    """Use this tool to look up items using the id."""
    res = requests.get(f"{base_url}/api/items/{item_id}/")
    
    shopping_cart.append(res.json()['item_id'])
    return res.json()

@tool
def get_similar_by_id(item_id: int) -> list:
    """Use this tool to get the top 10 similar items to the item_id you input."""

    res = requests.get(f"{base_url}/api/vector/similar_by_id/?id={item_id}")
    shopping_cart.extend([item['item_id'] for item in res.json()['result']])

    return res.json()['result']

@tool
def search_items(search_query: str, n_items=3) -> list:
    """
    This Tool searches for items given a search query which is anything that may lead to an item, \
        whether it is description, relevant items, or a name. Then, returns the top n_items matches.
    This should be your most used tool as it serves most cases.
    """
    res = requests.get(f"{base_url}/api/vector/similar_by_text/?query={search_query}&n={n_items}")
    
    shopping_cart.extend([item['item_id'] for item in res.json()['result']])
    # TODO: Send the shopping cart alone to save time
    # Stream api
    
    items = res.json()['result']
    return items

# Add your tool to the collection
tools = [test_connection, get_item_by_id, get_similar_by_id, search_items]
