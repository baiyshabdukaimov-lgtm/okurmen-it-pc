from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    ROLE_CHOICES = [('student', 'Студент'), ('buyer', 'Покупатель')]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    phone = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return f'{self.user.username} ({self.get_role_display()})'


class Course(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    duration = models.CharField(max_length=50)
    hours = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    tag = models.CharField(max_length=60, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['price']

    def __str__(self):
        return self.title


class Product(models.Model):
    PRODUCT_TYPES = [('laptop', 'Ноутбук'), ('pc', 'Сборка ПК')]
    name = models.CharField(max_length=120)
    product_type = models.CharField(max_length=20, choices=PRODUCT_TYPES)
    specs = models.CharField(max_length=240)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    old_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    badge = models.CharField(max_length=60, blank=True)
    stock = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['price']

    def __str__(self):
        return self.name
