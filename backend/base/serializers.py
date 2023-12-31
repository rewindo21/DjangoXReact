from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, User
from rest_framework_simplejwt.tokens import RefreshToken


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class UserSerializerWithToken(UserSerializer):  # for registratig and updating users (to login right away)
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'token']   

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)  # token and access are the same but encoded differently