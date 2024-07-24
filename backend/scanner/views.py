import requests
from bs4 import BeautifulSoup

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from .models import HistoryModel
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


class HistoryPushView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            serializer = QuerySerializer(data=request.data)
            if serializer.is_valid():
                history = HistoryModel(
                    user=request.user,
                    query=serializer.validated_data['query']
                )
                history.save()
                return Response({"detail": "Query saved successfully"}, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response("Unauthoried", status=status.HTTP_401_UNAUTHORIZED)