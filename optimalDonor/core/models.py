from django.db import models
from django.utils import timezone
from users.models import CustomUser
from django.db.models import Avg
from django.core.validators import MinValueValidator, MaxValueValidator

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
    
class Campaign(models.Model):
    active = 'active'
    completed = 'completed'
    failed = 'failed'

    STATUS_CHOICES = [
    (active, 'Active'),
    (completed, 'Completed'),
    (failed, 'Failed'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name="campaigns")
    goal_amount = models.DecimalField(max_digits=10, decimal_places=2)
    raised_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    start_time = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField()
    owner = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE, related_name='campaigns')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=active)
    tags = models.ManyToManyField(Tag, related_name="campaigns", blank=True)

    def __str__(self):
        return self.title
    def get_donors(self):
        return CustomUser.objects.filter(donations__campaign=self).distinct()

    def cancel_project(self):
        if self.raised_amount < (0.25 * self.goal_amount):
            self.status = self.failed
        self.save()

    def average_rating(self):
        return self.ratings.aggregate(Avg('value'))['value__avg'] or 0
    
class CampaignImage(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='campaign_images/')

    def __str__(self):
        return f"Image for {self.campaign.title}"

class Donation(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='donations')
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='donations')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} donated {self.amount} to {self.campaign.title}"

class Rating(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='ratings')
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='ratings')
    value = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    def __str__(self):
        return f"{self.user.username} rated {self.campaign.title} {self.value}/5"

class Comment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='comments')
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.campaign.title}"

class Report(models.Model):
    project = 'project'
    comment = 'comment'
    REPORT_CHOICES = [
    (project, 'Project'),
    (comment, 'Comment'),
    ]

    reporter = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='reports')
    report_type = models.CharField(max_length=10, choices=REPORT_CHOICES)
    project = models.ForeignKey(Campaign, on_delete=models.CASCADE, null=True, blank=True, related_name='reports')
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True, blank=True, related_name='reports')
    reason = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.project:
            return f"Report on Project: {self.project.title}"
        elif self.comment:
            return f"Report on Comment ID: {self.comment.id}"