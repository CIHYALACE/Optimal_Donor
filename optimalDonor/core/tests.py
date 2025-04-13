from django.test import TestCase
from django.utils import timezone
from django.core.exceptions import ValidationError
from decimal import Decimal
from datetime import timedelta
from users.models import CustomUser
from .models import Category, Tag, Campaign, CampaignImage, Donation, Rating, Comment, Report

class CategoryTests(TestCase):
    def test_create_category(self):
        category = Category.objects.create(name="Education")
        self.assertEqual(str(category), "Education")
        self.assertEqual(category.name, "Education")

class TagTests(TestCase):
    def test_create_tag(self):
        tag = Tag.objects.create(name="Urgent")
        self.assertEqual(str(tag), "Urgent")
        self.assertEqual(tag.name, "Urgent")

class CampaignTests(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email="test@example.com",
            name="Test User",
            password="testpass123"
        )
        self.category = Category.objects.create(name="Education")
        self.campaign = Campaign.objects.create(
            title="Test Campaign",
            description="Test Description",
            category=self.category,
            goal_amount=Decimal("1000.00"),
            end_date=timezone.now() + timedelta(days=30),
            owner=self.user
        )

    def test_campaign_creation(self):
        self.assertEqual(str(self.campaign), "Test Campaign")
        self.assertEqual(self.campaign.raised_amount, Decimal("0.00"))
        self.assertEqual(self.campaign.status, "active")
        self.assertTrue(self.campaign.is_published)
        self.assertFalse(self.campaign.is_featured)

    def test_campaign_donors(self):
        donor = CustomUser.objects.create_user(
            email="donor@example.com",
            name="Donor User",
            password="donorpass123"
        )
        Donation.objects.create(
            user=donor,
            campaign=self.campaign,
            amount=Decimal("100.00")
        )
        self.assertEqual(self.campaign.get_donors().count(), 1)

    def test_campaign_cancel(self):
        self.campaign.goal_amount = Decimal("1000.00")
        self.campaign.raised_amount = Decimal("200.00")
        self.campaign.cancel_project()
        self.assertEqual(self.campaign.status, "failed")

class DonationTests(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email="test@example.com",
            name="Test User",
            password="testpass123"
        )
        self.category = Category.objects.create(name="Education")
        self.campaign = Campaign.objects.create(
            title="Test Campaign",
            description="Test Description",
            category=self.category,
            goal_amount=Decimal("1000.00"),
            end_date=timezone.now() + timedelta(days=30),
            owner=self.user
        )

    def test_donation_creation(self):
        donation = Donation.objects.create(
            user=self.user,
            campaign=self.campaign,
            amount=Decimal("100.00")
        )
        self.assertEqual(str(donation), f"{self.user.username} donated 100.00 to Test Campaign")

class RatingTests(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email="test@example.com",
            name="Test User",
            password="testpass123"
        )
        self.category = Category.objects.create(name="Education")
        self.campaign = Campaign.objects.create(
            title="Test Campaign",
            description="Test Description",
            category=self.category,
            goal_amount=Decimal("1000.00"),
            end_date=timezone.now() + timedelta(days=30),
            owner=self.user
        )

    def test_rating_creation(self):
        rating = Rating.objects.create(
            user=self.user,
            campaign=self.campaign,
            value=5
        )
        self.assertEqual(rating.value, 5)
        self.assertEqual(self.campaign.average_rating(), 5.0)

class CommentTests(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email="test@example.com",
            name="Test User",
            password="testpass123"
        )
        self.category = Category.objects.create(name="Education")
        self.campaign = Campaign.objects.create(
            title="Test Campaign",
            description="Test Description",
            category=self.category,
            goal_amount=Decimal("1000.00"),
            end_date=timezone.now() + timedelta(days=30),
            owner=self.user
        )

    def test_comment_creation(self):
        comment = Comment.objects.create(
            user=self.user,
            campaign=self.campaign,
            text="Test comment"
        )
        self.assertEqual(str(comment), f"Comment by {self.user.username} on Test Campaign")

class ReportTests(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email="test@example.com",
            name="Test User",
            password="testpass123"
        )
        self.category = Category.objects.create(name="Education")
        self.campaign = Campaign.objects.create(
            title="Test Campaign",
            description="Test Description",
            category=self.category,
            goal_amount=Decimal("1000.00"),
            end_date=timezone.now() + timedelta(days=30),
            owner=self.user
        )

    def test_report_creation(self):
        report = Report.objects.create(
            reporter=self.user,
            report_type="project",
            project=self.campaign,
            reason="Inappropriate content"
        )
        self.assertEqual(str(report), f"Report on Project: Test Campaign")

    def test_comment_report(self):
        comment = Comment.objects.create(
            user=self.user,
            campaign=self.campaign,
            text="Test comment"
        )
        report = Report.objects.create(
            reporter=self.user,
            report_type="comment",
            comment=comment,
            reason="Inappropriate comment"
        )
        self.assertEqual(str(report), f"Report on Comment ID: {comment.id}")
