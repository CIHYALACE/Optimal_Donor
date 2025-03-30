from rest_framework import serializers
from .models import *


class CustomUserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'phone_number', 'picture']



class UserProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = CustomUserSerializer()
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'bio', 'location', 'date_of_birth']
