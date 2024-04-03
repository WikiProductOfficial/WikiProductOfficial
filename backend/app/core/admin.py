from django.contrib import admin

from core.models import Category, Image, Item, ItemsHistory, ItemBelongsTo, Review, Store

admin.site.register(Category)
admin.site.register(Image)
admin.site.register(Item)
admin.site.register(ItemsHistory)
admin.site.register(ItemBelongsTo)
admin.site.register(Review)
admin.site.register(Store)

