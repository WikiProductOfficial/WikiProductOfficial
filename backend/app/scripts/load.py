import pandas as pd
import numpy as np
from core import models

def run(*args):
    df = pd.read_csv("./scripts/warehouse.csv")
    
    # # deleting all records
    # models.Category.objects.all().delete()
    # models.Image.objects.all().delete()
    # models.Item.objects.all().delete()
    # models.ItemBelongsTo.objects.all().delete()
    # models.ItemsHistory.objects.all().delete()
    # models.Location.objects.all().delete()
    # models.Review.objects.all().delete()
    # models.Store.objects.all().delete()
    
    count = 0
    if not len(args):
        limit  = len(df)
    else:
        limit = int(args[0]) *  100
    
    for _, row in df.iterrows():
        if count < limit:
            print(row) # For Debugging
            count += 1
            category = None
            # Inserting Category
            if "/" in str(row["category"]):
                parent, child= str(row["category"]).split("/")
                models.Category.objects.update_or_create(category=parent)
                category = models.Category.objects.update_or_create(category=child, parent=models.Category.objects.get(category=parent))
            else:
                parent= str(row["category"])
                category = models.Category.objects.update_or_create(category=parent)
            
            # Inserting Store
            models.Store.objects.update_or_create(name=row["store"], store_url=row['store_url'])
            # Inserting Item
            item = models.Item.objects.update_or_create(name=row["name"], 
                                                    urls={row["store"]: row["url"]},
                                                    details={} if row["details"] is np.nan else row["details"],
                                                    description=str(row["description"])[:500],
                                                    price=row["price"],
                                                    rating = 0 if pd.isna(row["stars"]) else float(row["stars"]),
                                                    review_count = 0 if pd.isna(row["star_count"]) else int(row["star_count"]),
                                                    summarized_reviews="null")
            # Inserting Image
            models.Image.objects.update_or_create(item=item[0], image_name=row["name"], image_url=row["image_url"])
            
            # Inserting Item_belongs_to
            models.ItemBelongsTo.objects.update_or_create(item=item[0], category=category[0])
            
            # Inserting Reviews