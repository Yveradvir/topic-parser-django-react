import requests
from bs4 import BeautifulSoup

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import QuerySerializer
from .parsers import wiki_parse

class SitesScanView(APIView):
    def post(self, request):
        serializer = QuerySerializer(data=request.data)
        if serializer.is_valid():
            query = serializer.validated_data['query']
            data = self.perform_google_search(query)
            return Response(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_google_search(self, query):
        url = f"https://www.google.com/search?q={query}"
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        results = []
        for div in soup.select("#rso > div > div"):
            anchor = div.select_one("div > div > div:nth-child(1) > div > div > span > a")
            if anchor:
                href = anchor.get("href")
                if "wikipedia.org" in href:
                    title = anchor.select_one("h3").text if anchor.select_one("h3") else None
                    if title:
                        results.append({"title": title, "link": href})
        return results

class WikipediaScanView(APIView):
    def post(self, request):
        serializer = QuerySerializer(data=request.data)
        if serializer.is_valid():
            query = serializer.validated_data['query']
            print(query)
            data = wiki_parse(query)
            if data:
                return Response(data, status=status.HTTP_200_OK)
            return Response({"error": "No Wikipedia link found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)