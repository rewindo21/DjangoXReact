from django.shortcuts import render
from base.models import Product

from base.serializers import ProductSerializer

from rest_framework.decorators import api_view  # it specifies allowed methods
from rest_framework.response import Response    # it gives a dicionary and converts it to json and sends to client

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework import status   # for error handling


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()        # fetch all datas: all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProductDetails(request, pk):
    product = Product.objects.get(_id=pk)  # fetch one data: get()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

