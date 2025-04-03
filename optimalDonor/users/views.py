from django.shortcuts import render
from rest_framework import viewsets
from .models import CustomUser, UserProfile
from .serializers import CustomUserSerializer, UserProfileSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    def get_queryset(self):
        queryset = super().get_queryset()
        # Add any custom filtering or ordering logic here if needed
        return queryset
    
    def perform_create(self, serializer):
        # Custom logic before saving the user instance
        serializer.save()

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        # Add any custom filtering or ordering logic here if needed
        return queryset
    
    def perform_create(self, serializer):
        # Custom logic before saving the user profile instance
        serializer.save()