from django.contrib import admin
from .models import Campaign

class CampaignAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'goal_amount', 'raised_amount', 'start_time', 'end_date', 'status')
    search_fields = ('title', 'owner__username')
    list_filter = ('status', 'category')
    ordering = ('-start_time',)
    date_hierarchy = 'start_time'
    list_per_page = 20
