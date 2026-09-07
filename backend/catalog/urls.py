from django.urls import path
from .views import CourseListView, LoginView, ProductListView, RegisterView

urlpatterns = [
    path('courses/', CourseListView.as_view(), name='course-list'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
]
