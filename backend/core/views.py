from django.contrib.auth.models import User
from django.conf import settings

from rest_framework.request import Request
from rest_framework.response import Response

from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView

from .serializers import RegistrationSerializer

s = settings.SIMPLE_JWT

class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegistrationSerializer


class HTTPOnlyCookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        response = super().post(request, *args, **kwargs)
        
        for key in response.data.keys():
            response.set_cookie(
                key, response.data[key], httponly=True,
                max_age=s[f"{key.upper()}_TOKEN_LIFETIME"].seconds
            )
        
        return response
        
        
class HTTPOnlyCookieTokenRefreshView(TokenRefreshView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        response = super().post(request, *args, **kwargs)
        
        response.set_cookie(
            "access", response.data["access"], httponly=True,
            max_age=s[f"ACCESS_TOKEN_LIFETIME"].seconds
        )
            
        return response

class HTTPOnlyTokenBlacklistView(TokenBlacklistView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        response = super().post(request, *args, **kwargs)
        
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        
        return response