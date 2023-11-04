from django.shortcuts import render
from django.contrib.auth.models import User

from base.serializers import UserSerializer, UserSerializerWithToken

from rest_framework.decorators import api_view  # it specifies allowed methods
from rest_framework.response import Response    # it gives a dicionary and converts it to json and sends to client

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password   # for registeration (88)
from rest_framework import status   # for error handling (65)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# overwrite TokenObtainPairSerializer to return other datas with referesh and access token
class myTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

class myTokenObtainPairView(TokenObtainPairView):
    serializer_class = myTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data     # get the data
    try:
        user = User.objects.create(     # insert the data: create()
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail':'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user     # get user object from token that sent
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
#@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.username = data['email']
    user.email = data['email']
    if  data['password'] != '':
        user.password = make_password(data['password'])
    user.save()

    return Response(serializer.data)