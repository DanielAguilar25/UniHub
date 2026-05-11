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
    hashtags = models.TextField(blank=True)

    # future fields: linkedin, instagram, profile picture, etc.
    # future update: minor, gender, school_id

    def __str__(self):
        return self.user.username

DAYS_OF_WEEK = [
    ('MON', 'Monday'),
    ('TUE', 'Tuesday'),
    ('WED', 'Wednesday'),
    ('THU', 'Thursday'),
    ('FRI', 'Friday'),
]

TIME_SLOTS = [
    ('08:00', '8:00 AM - 9:15 AM'),
    ('09:30', '9:30 AM - 10:45 AM'),
    ('11:00', '11:00 AM - 12:15 PM'),
    ('12:30', '12:30 PM - 1:45 PM'),
    ('14:00', '2:00 PM - 3:15 PM'),
    ('15:30', '3:30 PM - 4:45 PM'),
    ('17:00', '5:00 PM - 6:15 PM'),
    ('18:30', '6:30 PM - 7:45 PM'),
    ('20:00', '8:00 PM - 9:15 PM'),
    ('21:30', '9:30 PM - 10:45 PM'),
]

class ScheduleEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    day = models.CharField(max_length=3, choices=DAYS_OF_WEEK)
    time_slot = models.CharField(max_length=5, choices=TIME_SLOTS)
    class_name = models.CharField(max_length=100)

    class Meta:
        unique_together = ('user', 'day', 'time_slot')

    def __str__(self):
        return f'{self.user.username} - {self.day} {self.time_slot}: {self.class_name}'