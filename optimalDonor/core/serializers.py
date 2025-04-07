from rest_framework import serializers
from .models import (
    Category, Tag, CampaignImage, Campaign,
    Donation, Rating, Comment, Report
)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class CampaignImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignImage
        fields = ['id', 'image']


class CampaignSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    images = CampaignImageSerializer(many=True, read_only=True)
    average_rating = serializers.FloatField(source='average_rating', read_only=True)

    class Meta:
        model = Campaign
        fields = [
            'id', 'title', 'description', 'category', 'goal_amount', 'raised_amount',
            'start_time', 'end_date', 'owner', 'status', 'tags', 'images', 'average_rating'
        ]
        read_only_fields = ['id', 'start_time', 'raised_amount', 'owner', 'status']


class DonationSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    campaign = serializers.ReadOnlyField(source='campaign.title')

    class Meta:
        model = Donation
        fields = ['id', 'user', 'campaign', 'amount', 'created_at']
        read_only_fields = ['id', 'created_at']


class RatingSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    campaign = serializers.ReadOnlyField(source='campaign.title')

    class Meta:
        model = Rating
        fields = ['id', 'user', 'campaign', 'value']


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    campaign = serializers.ReadOnlyField(source='campaign.title')

    class Meta:
        model = Comment
        fields = ['id', 'user', 'campaign', 'text', 'created_at']
        read_only_fields = ['id', 'created_at']


class ReportSerializer(serializers.ModelSerializer):
    reporter = serializers.ReadOnlyField(source='reporter.username')
    project_title = serializers.CharField(source='project.title', read_only=True)
    comment_id = serializers.IntegerField(source='comment.id', read_only=True)

    class Meta:
        model = Report
        fields = [
            'id', 'reporter', 'report_type', 'project', 'project_title',
            'comment', 'comment_id', 'reason', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
