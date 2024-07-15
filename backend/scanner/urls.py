from django.urls import path
from .views import SitesScanView, WikipediaScanView

urlpatterns = [
    path('sites/', SitesScanView.as_view(), name='sites-scan'),
    path('wikipedia/', WikipediaScanView.as_view(), name='wikipedia-scan'),
]
