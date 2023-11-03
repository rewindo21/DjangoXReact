from django.urls import path
from base.views import product_views, user_views, order_views

# from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [
    # path('', views.getRoutes, name='routes'),

    path('products/', product_views.getProducts, name='products'),
    path('products/<str:pk>/', product_views.getProductDetails, name='product-details'),

    path('users/', user_views.getUsers, name='users'),
    path('users/profile/', user_views.getUserProfile, name='user-profile'),

    # path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),      # it just return referesh and access, so we have to overwrite it 
    path('users/login/', user_views.myTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', user_views.registerUser, name='register'),
]
