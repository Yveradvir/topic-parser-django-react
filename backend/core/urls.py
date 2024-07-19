from django.urls import path
from .views import (
    HTTPOnlyCookieTokenObtainPairView,
    HTTPOnlyCookieTokenRefreshView,
    HTTPOnlyTokenBlacklistView,
    RegistrationView,
    set_csrf_cookies
)

urlpatterns = [
    path('a/register', RegistrationView.as_view(), name='register'),
    path('a/token', HTTPOnlyCookieTokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('a/token/refresh', HTTPOnlyCookieTokenRefreshView.as_view(), name='token-refresh'),
    path('a/token/delete', HTTPOnlyTokenBlacklistView.as_view(), name='token-delete'),
    path('a/csrf/', set_csrf_cookies, name='set-csrf-cookies'),
]
