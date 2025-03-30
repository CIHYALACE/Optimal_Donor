from rest_framework import viewsets, permissions
from .models import Campaign
from .serializers import CampaignSerializer

class CampaignViewSet(viewsets.ModelViewSet):
    serializer_class = CampaignSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] 

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Campaign.objects.all()  
        return Campaign.objects.filter(status='active') 

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user) 
