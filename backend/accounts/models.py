from django.db import models
from django.contrib.auth.models import User

MAJOR_CHOICES = [
    ('CS', 'Computer Science'),
    ('CE', 'Computer Engineering'),
    ('EE', 'Electrical Engineering'),
    ('ME', 'Mechanical Engineering'),
    ('CI', 'Computer Information Systems'),
]

GRADUATION_YEAR_CHOICES = [(year, year) for year in range(2025, 2031)]

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    preferred_name = models.CharField(max_length=100, blank=True)
    major = models.CharField(max_length=10, choices=MAJOR_CHOICES, blank=True)
    graduation_year = models.IntegerField(choices=GRADUATION_YEAR_CHOICES, null=True, blank=True)
    current_classes = models.TextField(blank=True)
    # future fields: linkedin, instagram, profile picture, etc.
    # future update: minor, gender, school_id

    def __str__(self):
        return self.user.username

