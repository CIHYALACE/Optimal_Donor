from rest_framework import serializers
from .models import Campaign

class CampaignSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Campaign
        fields = ['id', 'title', 'description', 'goal_amount', 'raised_amount', 'created_at', 'end_date', 'owner', 'status']
        read_only_fields = ['id', 'created_at', 'owner']
