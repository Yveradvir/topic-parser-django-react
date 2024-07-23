import requests
from bs4 import BeautifulSoup

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import QuerySerializer
from .parsers import (
    parse_wiki, 
    parse_sites, 
    parse_reddit,
    parse_twitter
)

def default_func(
    request, parse_func, additional_text: str = ""
) -> Response:
    serializer = QuerySerializer(data=request.data)
    if serializer.is_valid():
        query = "%20".join((serializer.validated_data['query'] + additional_text).split(" "))
        data = parse_func(query)
        if data:
            return Response(data, status=status.HTTP_200_OK)
        return Response({"error": "No link/s found"}, status=status.HTTP_404_NOT_FOUND)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SitesScanView(APIView):
    def post(self, request):
        return default_func(request, parse_sites)

class WikipediaScanView(APIView):
    def post(self, request):
        return default_func(request, parse_wiki, " wikipedia")
    
class RedditScanView(APIView):
    def post(self, request):
        return default_func(request, parse_reddit, " reddit")
    
class TwitterScanView(APIView):
    def post(self, request):
        return default_func(request, parse_twitter, " twitter")