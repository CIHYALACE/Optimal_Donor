from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *

router = DefaultRouter()
router.register(r'campaigns', CampaignViewSet, basename='campaign')
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'campaign-images', CampaignImageViewSet, basename='campaign-image')
router.register(r'donations', DonationViewSet, basename='donation')
router.register(r'ratings', RatingViewSet, basename='rating')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'reports', ReportViewSet, basename='report')

urlpatterns = [
    path('', include(router.urls)),
    path('donations/<int:campaign_id>/', DonationViewSet.as_view({'post': 'create'}), name='donation-create'),
    path('ratings/<int:campaign_id>/', RatingViewSet.as_view({'post': 'create'}), name='rating-create'),
    path('comments/<int:campaign_id>/', CommentViewSet.as_view({'post': 'create'}), name='comment-create'),
    path('reports/<int:campaign_id>/', ReportViewSet.as_view({'post': 'create'}), name='report-create'),
    path('reports/<int:comment_id>/', ReportViewSet.as_view({'post': 'create'}), name='report-comment-create'),
    path('campaigns/<int:campaign_id>/cancel/', CampaignViewSet.as_view({'post': 'cancel_project'}), name='cancel-project'),
    path('campaigns/<int:campaign_id>/donors/', CampaignViewSet.as_view({'get': 'get_donors'}), name='get-donors'),
    path('campaigns/<int:campaign_id>/average-rating/', CampaignViewSet.as_view({'get': 'average_rating'}), name='average-rating'),
    path('campaigns/<int:campaign_id>/tags/', CampaignViewSet.as_view({'post': 'add_tags'}), name='add-tags'),
    path('campaigns/<int:campaign_id>/tags/<int:tag_id>/', CampaignViewSet.as_view({'delete': 'remove_tag'}), name='remove-tag'),
    path('campaigns/<int:campaign_id>/images/', CampaignViewSet.as_view({'post': 'add_images'}), name='add-images'),
    path('campaigns/<int:campaign_id>/images/<int:image_id>/', CampaignViewSet.as_view({'delete': 'remove_image'}), name='remove-image'),
    path('campaigns/<int:campaign_id>/images/<int:image_id>/', CampaignViewSet.as_view({'get': 'get_image'}), name='get-image'),
    path('campaigns/<int:campaign_id>/images/<int:image_id>/', CampaignViewSet.as_view({'put': 'update_image'}), name='update-image'),
]
