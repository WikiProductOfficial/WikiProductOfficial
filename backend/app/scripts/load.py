import time
import pandas as pd
import numpy as np
from core import models
from dateutil.parser import parse

# import chromadb singelton class
from vectorDB.chroma_db import ChromaDB

# instantiating ChromaDB
chromadb = ChromaDB()

def handle_category(category_path):
    """Handle category creation or update based on the category path."""
    if "/" in str(category_path):
        parent, child= str(category_path).rsplit("/", 1)
        parent_category, _ = models.Category.objects.get_or_create(category=parent, parent= None)
        category = models.Category.objects.get_or_create(category=child, parent=parent_category)
    else:
        category = models.Category.objects.update_or_create(category= str(category_path))
    
    return category

def insert_reviews(reviews_list, item):
    """Insert reviews from a string representation of a list of dictionaries."""
    if reviews_list:
        for review in reviews_list:
            models.Review.objects.update_or_create(
                item=item[0], 
                rating= review["rating"], 
                content= review["content"].encode('utf-8', 'ignore').decode('utf-8'), 
                date= parse(review["date"]).date()
    )


def run(*args):
    start = time.time()
    
    df = pd.read_pickle("./scripts/sample_warehouse.pkl")
    
    # Filling NaN values
    df['reviews'] = df['reviews'].fillna('') # Replace NaN with empty string because when in the use it becomes a float type
    df['star_count'] = df['star_count'].fillna(0) #Replace  NaN with zero
    df['description'] = df['description'].fillna(np.nan).replace([np.nan], [None]) # Replace NaN with Null
    df['stars'] = df['stars'].fillna(np.nan).replace([np.nan], [None]) # Replace NaN with Null
    df['summary'] = df['summary'].fillna(np.nan).replace([np.nan], [None]) # Replace NaN with Null
    df['details'] = df['details'].fillna(np.nan).replace([np.nan], [{}]) # Replace NaN with empty dictionary
    
    # Getting the chromadb items collection
    items_collection = chromadb.get_items_collection()
    
    # Filter rows based on provided arguments
    if len(args) == 2:
        start_index = int(args[0]) * 100
        end_index = int(args[1]) * 100
        df = df.iloc[start_index:end_index]
    
    for _, row in df.iterrows():
        # print(row) # For Debugging
        
        # Handle the category and its hierarchy
        category = handle_category(row['category'])
        
        # Handle store creation or update
        store= models.Store.objects.update_or_create(
            name=row["store"], 
            store_url=row['store_url']
        )
        
        
        # Handle item creation or update
        item = models.Item.objects.update_or_create(
            name=row["name"], 
            urls=[{
                # "id":  store[0].store_id,
                "name": str(row["store"]), 
                "link" : str(row["url"])
            }],
            details= row["details"], # Default {}
            description= str(row["description"])[:5000], # Truncate to first 5000 characters
            price=row["price"],
            rating = row["stars"], # Default None
            review_count = row["star_count"], # Default 0
            summary= row['summary']
        )
        
        # Handle image creation or update
        models.Image.objects.update_or_create(
            item=item[0],
            image_name=row["name"],
            image_url=row["image_url"]
        )
        
        # Associate the item with a category
        models.ItemBelongsTo.objects.update_or_create(
            item=item[0],
            category=category[0]
        )
        
        # Record item history
        models.ItemsHistory.objects.update_or_create(
            item=item[0], 
            store=store[0], 
            price=row["price"]
        )
        
        # Insert reviews, if any
        insert_reviews(row["reviews"], item)
        
        # Insert item to chromadb
        items_collection.upsert(
            ids= str(item[0].item_id),
            embeddings= row["embedding"],
            documents= row['summary'],
            # metadatas= row["details"], # TODO: For now, we wil add this for the comparison of items
        )
    
    print("Loading finished")

    end = time.time()
    print(f"Time taken: {end-start} seconds")