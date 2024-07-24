from django.contrib.auth.models import User
from django.conf import settings
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404

from rest_framework.request import Request
from rest_framework.response import Response

from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view
from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView

from .serializers import RegistrationSerializer
from scanner.models import User, HistoryModel

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
    @csrf_exempt
    def post(self, request: Request, *args, **kwargs) -> Response:
        response = super().post(request, *args, **kwargs)
        
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        
        return response

@csrf_exempt
def set_csrf_cookies(request):
    response = Response({'detail': 'CSRF cookie set'})
    response.set_cookie('csrftoken', get_token(request))
    return response

class CustomPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 100

@api_view(['GET'])
def paginated_history_view(request):
    if request.user.is_authenticated:
        user = request.user
        history_list = HistoryModel.objects.filter(user=user).order_by('-id')
        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(history_list, request)

        history_data = [{'id': history.id, 'query': history.query} for history in result_page]

        response_data = {
            'username': user.username,
            'histories': history_data,
            'total_pages': paginator.page.paginator.num_pages,
            'total_items': paginator.page.paginator.count
        }
        
        return paginator.get_paginated_response(response_data)
    else:
        return Response({'detail': "Unauthorized"}, status=401)