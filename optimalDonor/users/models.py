from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


class CustomUser(AbstractUser):
    phone_number = models.CharField(blank=True, null=True, unique=True, max_length=11,
                    validators=[RegexValidator(
                                        regex=r'^01\d{9}$',
                                        message="Phone number must be 11 digits and start with '01'.",
                                        code='invalid_phone_number'
                                    )
                                ])
    picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    
    def __str__(self):
        return self.username

class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    
    def __str__(self):
        return self.user.username
