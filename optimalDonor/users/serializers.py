from rest_framework import serializers
from .models import CustomUser, UserProfile
from core.models import Campaign
from core.serializers import CampaignSerializer
from django.db import models
from core.models import Donation

class CustomUserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'name', 'phone_number', 'password']

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            name=validated_data['name'],
            phone_number=validated_data.get('phone_number')
        )
        user.set_password(validated_data['password'])
        user.is_active = False
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class UserProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = CustomUserSerializer(required=False)
    donated_campaigns = serializers.SerializerMethodField()
    created_campaigns = serializers.SerializerMethodField()
    total_donations = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "user",
            "bio",
            "location",
            "date_of_birth",
            "picture",
            'total_donations',
            "donated_campaigns",
            "created_campaigns",
        ]
    def get_total_donations(self, obj):
        return Donation.objects.filter(user=obj.user).aggregate(total=models.Sum('amount'))['total'] or 0

    def get_donated_campaigns(self, obj):
        campaigns = obj.get_donated_campaigns().distinct()
        return CampaignSerializer(campaigns, many=True).data

    def get_created_campaigns(self, obj):
        campaigns = Campaign.objects.filter(owner=obj.user)
        return CampaignSerializer(campaigns, many=True).data

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = CustomUserSerializer(instance.user, data=user_data, partial=True)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()
        return super().update(instance, validated_data)