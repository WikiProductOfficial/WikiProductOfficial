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

base_url = "http://localhost:8000" if os.environ.get('DEBUG') == "1" else "http://frontend:80"


@tool
def test_connection() -> str:
    """Use this tool to test the connectivity. Mention the status code"""
    res = requests.get(f"https://google.com/")
    print("DEBUGGING IS:" + str(os.environ.get('DEBUG')))
    return f"Status code: {res.status_code}, the base url is: {base_url}"

@tool
def get_item_by_id(item_id: int) -> dict:
    """Use this tool to look up items using the id, the attribute is the data received, default is name."""
    res = requests.get(f"{base_url}/api/items/{item_id}/")
    return res.json()

# TODO: RETURN OUR WEBSITE DETAILED ITEM URL
# TODO: Finish POSTER
# BUG: deploy problem is internal, some localhost issues. Because it can connect to the outside networks

@tool
def search_items(search_query: str) -> dict:
    """Use this tool Search items by the name and get the most relevant items."""
    res = requests.get(f"{base_url}/api/search/?query={search_query}")
    return res.json()

# Add your tool to the collection
tools = [test_connection, get_item_by_id, search_items]