from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import CampaignViewSet

router = DefaultRouter()
router.register(r'campaigns', CampaignViewSet, basename='campaign')
urlpatterns = [
    path('', include(router.urls)),
]
