from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from decimal import Decimal 
from django.core.exceptions import PermissionDenied
from .models import (
    Campaign, Tag, Category, CampaignImage,
    Donation, Rating, Comment, Report
)
from .serializers import (
    CampaignSerializer, TagSerializer, CategorySerializer,
    CampaignImageSerializer, DonationSerializer,
    RatingSerializer, CommentSerializer, ReportSerializer
)

class CampaignViewSet(viewsets.ModelViewSet):
    serializer_class = CampaignSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [SearchFilter]
    search_fields = ['title', 'tags__name'] 

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Campaign.objects.all()
        return Campaign.objects.filter(is_published=True)
       
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_destroy(self, instance):
        # Check if the user is the owner of the campaign
        if instance.owner != self.request.user:
            raise PermissionDenied("You do not have permission to delete this campaign.")
        instance.is_published = False
        instance.save()


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CampaignImageViewSet(viewsets.ModelViewSet):
    queryset = CampaignImage.objects.all()
    serializer_class = CampaignImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class DonationViewSet(viewsets.ModelViewSet):
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Donation.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DonateToCampaignView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, campaign_id):
        try:
            campaign = Campaign.objects.get(id=campaign_id)
            amount = request.data.get('amount')

            # Validate the donation amount
            if not amount or float(amount) <= 0:
                return Response({'error': 'Invalid donation amount'}, status=400)

            # Convert amount to Decimal
            amount = Decimal(amount)

            # Create the donation
            donation = Donation.objects.create(user=request.user, campaign=campaign, amount=amount)

            # Update the raised_amount of the campaign
            campaign.raised_amount += amount
            campaign.save()

            return Response({'status': 'donation created', 'donation_id': donation.id, 'raised_amount': campaign.raised_amount})
        except Campaign.DoesNotExist:
            return Response({'error': 'Campaign not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
class RatingViewSet(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Rating.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Comment.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ReportViewSet(viewsets.ModelViewSet):
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Report.objects.filter(reporter=self.request.user)

    def perform_create(self, serializer):
        serializer.save(reporter=self.request.user)


class LatestCampaignsView(viewsets.ModelViewSet):
    serializer_class = CampaignSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Campaign.objects.all().filter(is_published=True).order_by('-start_time')[:5]