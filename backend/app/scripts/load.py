import pandas as pd
import numpy as np
from core import models

def run():
    df = pd.read_csv("./scripts/warehouse.csv")
    
    # deleting all records
    models.Category.objects.all().delete()
    models.Image.objects.all().delete()
    models.Item.objects.all().delete()
    models.ItemBelongsTo.objects.all().delete()
    models.ItemsHistory.objects.all().delete()
    models.Location.objects.all().delete()
    models.Review.objects.all().delete()
    models.Store.objects.all().delete()
    
    for _, row in df.iterrows():
        print(row)
        
        # Inserting Category
        if "/" in str(row["category"]):
            parent, child= str(row["category"]).split("/")
            models.Category.objects.update_or_create(category=parent)
            models.Category.objects.update_or_create(category=child, parent=models.Category.objects.get(category=parent))
        else:
            parent= str(row["category"])
            models.Category.objects.update_or_create(category=parent)
        
        # Inserting Store
        models.Store.objects.update_or_create(name=row["store"], store_url=row['store_url'])
        # Inserting Item
        item = models.Item.objects.update_or_create(name=row["name"], 
                                                urls={row["store"]: row["url"]},
                                                details={} if row["details"] is np.nan else row["details"],
                                                description=str(row["description"])[:500],
                                                price=row["price"],
                                                summarized_reviews="null")
        # Inserting Image
        models.Image.objects.update_or_create(item=item[0], image_name=row["name"], image_url=row["image_url"])