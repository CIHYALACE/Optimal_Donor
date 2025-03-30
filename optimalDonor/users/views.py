from django.shortcuts import render
from rest_framework import viewsets
from .models import CustomUser, UserProfile
from .serializers import CustomUserSerializer, UserProfileSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

