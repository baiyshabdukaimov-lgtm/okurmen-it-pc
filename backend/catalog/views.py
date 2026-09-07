from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Course, Product
from .serializers import CourseSerializer, ProductSerializer, RegisterSerializer, UserSerializer


class CourseListView(generics.ListCreateAPIView):
    queryset = Course.objects.filter(is_active=True)
    serializer_class = CourseSerializer


class ProductListView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)
        product_type = self.request.query_params.get('type')
        return queryset.filter(product_type=product_type) if product_type in {'laptop', 'pc'} else queryset


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        user = authenticate(username=request.data.get('username'), password=request.data.get('password'))
        if not user:
            return Response({'detail': 'Неверный логин или пароль.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(UserSerializer(user).data)
