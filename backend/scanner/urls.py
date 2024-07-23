from django.urls import path
from .views import (
    SitesScanView, 
    WikipediaScanView,
    RedditScanView,
    TwitterScanView
)

urlpatterns = [
    path('sites/', SitesScanView.as_view(), name='sites-scan'),
    path('wikipedia/', WikipediaScanView.as_view(), name='wikipedia-scan'),
    path('reddit/', RedditScanView.as_view(), name='reddit-scan'),
    path('twitter/', TwitterScanView.as_view(), name='twitter-scan'),
]
