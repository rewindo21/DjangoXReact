from django.shortcuts import render
from .products import products
from .models import Product
from .serializers import ProductSerializer

from rest_framework.decorators import api_view  # it specifies allowed methods
from rest_framework.response import Response    # it gives a dicionary and converts it to json and sends to client

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products',
        '/api/products/<id>/',
    ]
    return Response(routes)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()    # fetch all datas: all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    products = Product.objects.get(_id=pk)    # fetch one data: get()
    serializer = ProductSerializer(products, many=False)
    return Response(serializer.data)
