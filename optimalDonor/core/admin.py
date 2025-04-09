from django.contrib import admin
from .models import Campaign, Category, Tag

class CampaignAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'goal_amount', 'raised_amount', 'start_time', 'end_date', 'status')
    search_fields = ('title', 'owner__username')
    list_filter = ('status', 'category')
    ordering = ('-start_time',)
    date_hierarchy = 'start_time'
    list_per_page = 20
admin.site.register(Campaign, CampaignAdmin)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ('name',)
admin.site.register(Category, CategoryAdmin)

class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ('name',)
admin.site.register(Tag, TagAdmin)
