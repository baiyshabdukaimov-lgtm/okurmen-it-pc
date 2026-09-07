from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Course, Product, Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['role', 'phone']


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'profile']


class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=Profile.ROLE_CHOICES, write_only=True, default='student')
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'role']

    def create(self, validated_data):
        role = validated_data.pop('role', 'student')
        password = validated_data.pop('password')
        user = User.objects.create_user(password=password, **validated_data)
        Profile.objects.create(user=user, role=role)
        return user


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
