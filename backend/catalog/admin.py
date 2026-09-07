from django.contrib import admin
from .models import Course, Product, Profile

admin.site.register(Profile)
admin.site.register(Course)
admin.site.register(Product)
