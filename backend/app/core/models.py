from django.db import models
from django.contrib.postgres.fields import ArrayField

class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category = models.CharField(max_length=100)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, db_column='Parent', related_name='children')

    def __str__(self):
        return self.category
    
    def get_descendants(self, include_self=False):
        descendants = []
        queue = [self] if include_self else []
        while queue:
            current = queue.pop()
            descendants.append(current)
            queue.extend(current.children.all())
        return descendants
    
    class Meta:
        db_table = 'categories'


class Item(models.Model):
    item_id = models.AutoField(primary_key=True, db_column='Item_ID')
    name = models.CharField(max_length=255)
    urls = ArrayField(models.JSONField(default=dict, blank=True, null=True), blank=True, null=True)
    details = models.JSONField(default=dict, blank=True, null=True)
    description = models.CharField(max_length=5000, null= True, blank=True)
    price = models.FloatField()
    rating = models.FloatField(null=True, default=None)
    review_count = models.IntegerField()
    summary = models.CharField(max_length=2000, null= True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'items'


class Image(models.Model):
    image_id = models.AutoField(primary_key=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, db_column='Item_ID', related_name='images')
    image_name = models.CharField(max_length=255)
    image_url = models.URLField(max_length=255)

    class Meta:
        db_table = 'images'


class Store(models.Model):
    store_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    store_url = models.URLField(max_length=255)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'stores'


class ItemsHistory(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, db_column='Item_ID')
    store = models.ForeignKey(Store, on_delete=models.CASCADE, db_column='Store_ID')
    price = models.FloatField()

    class Meta:
        db_table = 'items_history'
        unique_together = (('created_on', 'item', 'store'),)

class ItemBelongsTo(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, db_column='Item_ID')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, db_column='Category_ID')

    class Meta:
        db_table = 'item_belongs_to'
        unique_together = (('item', 'category'),)

class Review(models.Model):
    review_id = models.AutoField(primary_key=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, db_column='Item_ID', related_name='reviews')
    rating = models.PositiveSmallIntegerField()
    content = models.CharField(max_length=5000)
    date = models.DateField()
    # review_url = models.URLField(max_length=255)

    class Meta:
        db_table = 'review'