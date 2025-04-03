from django.db import models
# from users.models import CustomUser,UserProfile

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
    goal_amount = models.DecimalField(max_digits=10, decimal_places=2)
    raised_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()
    owner = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE, related_name='campaigns')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=active)
    donors = models.ManyToManyField('users.UserProfile', related_name='user_donations', blank=True)

    def __str__(self):
        return self.title
