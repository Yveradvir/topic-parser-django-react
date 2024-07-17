from django.urls import path
from .views import (
    HTTPOnlyCookieTokenObtainPairView, 
    HTTPOnlyCookieTokenRefreshView,
    
)

urlpatterns = [
    path('a/create', ..., name='create'),
    path('a/token', HTTPOnlyCookieTokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('a/token/refresh', HTTPOnlyCookieTokenRefreshView.as_view(), name='token-refresh'),
    path('a/token/delete', HTTPOnlyCookieTokenRefreshView.as_view(), name='token-delete'),
]
