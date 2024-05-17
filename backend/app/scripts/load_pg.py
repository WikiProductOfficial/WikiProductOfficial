import time
from core import models
from dateutil.parser import parse

# import the data singleton class
from .data import Data

# instantiating Data
data = Data()

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
    
    # getting the data
    df = data.get_df()
    
    # Filter rows based on provided arguments
    if len(args) == 2:
        # TODO: make error pruned
        start_index = max(int(args[0]) * 100, 0)
        end_index = min(int(args[1]) * 100, len(df))
        df = df.iloc[start_index:end_index]
    
    for i, row in df.iterrows():
        ## For Debugging
        # if(i < 50):
        #     print(row)
        #     print(i + 1, type(i))
        
        # Handle the category and its hierarchy
        category = handle_category(row['category'])
        
        # Handle store creation or update
        store_name = row["store"] + "." + row["store_url"].split(".")[-1].rstrip("/") # making each store name unique
        store= models.Store.objects.update_or_create(
            name=store_name, 
            store_url=row['store_url']
        )
        
        
        # Handle item creation or update
        item = models.Item.objects.update_or_create(
            item_id = i + 1,
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
        
    print("Postgres Loading finished")

    end = time.time()
    print(f"Time taken for Postgres: {end-start} seconds")