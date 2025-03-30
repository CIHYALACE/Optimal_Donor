from django.contrib import admin
from .models import Campaign

@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ('title', 'goal_amount', 'raised_amount', 'created_at', 'end_date', 'owner', 'status')
    search_fields = ('title',)
    list_filter = ('status',)
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
