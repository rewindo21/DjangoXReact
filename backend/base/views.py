from django.shortcuts import render
from .models import Product
from .serializers import ProductSerializer

from rest_framework.decorators import api_view  # it specifies allowed methods
from rest_framework.response import Response    # it gives a dicionary and converts it to json and sends to client

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/products',
        '/products/<id>/',
        '/users/login/',
    ]
    return Response(routes)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()        # fetch all datas: all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    products = Product.objects.get(_id=pk)  # fetch one data: get()
    serializer = ProductSerializer(products, many=False)
    return Response(serializer.data)


# overwrite TokenObtainPairSerializer to return username and email with referesh and access
class myTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username
        data['email'] = self.user.email

        return data

class myTokenObtainPairView(TokenObtainPairView):
    serializer_class = myTokenObtainPairSerializer
