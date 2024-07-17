from django.urls import path
from .views import (
    HTTPOnlyCookieTokenObtainPairView, 
    HTTPOnlyCookieTokenRefreshView,
    HTTPOnlyTokenBlacklistView,
    RegistrationView
)

urlpatterns = [
    path('a/register', RegistrationView.as_view(), name='register'),
    path('a/token', HTTPOnlyCookieTokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('a/token/refresh', HTTPOnlyCookieTokenRefreshView.as_view(), name='token-refresh'),
    path('a/token/delete', HTTPOnlyTokenBlacklistView.as_view(), name='token-delete'),
]
