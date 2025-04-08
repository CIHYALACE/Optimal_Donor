from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.apps import apps



class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=False)
    name = models.CharField(max_length=255, blank=False, null=False)
    phone_number = models.CharField(blank=True, null=True, unique=True, max_length=11,
                    validators=[RegexValidator(
                                        regex=r'^01\d{9}$',
                                        message="Phone number must be 11 digits and start with '01'.",
                                        code='invalid_phone_number'
                                    )
                                ])
    picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    
    def get_donated_campaigns(self):
        Campaign = apps.get_model('core', 'Campaign')
        return Campaign.objects.filter(donations__user=self)

    def __str__(self):
        return self.user.username