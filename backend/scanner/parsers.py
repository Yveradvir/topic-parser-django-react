import requests
from bs4 import BeautifulSoup

search_url = "https://www.google.com/search"
headers = {
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0"
}

def get_these(
    soup: BeautifulSoup,
    in_statement: str = "/", #means all urls, cuz they all have / in their urls,
    until: int = 1
) -> list[dict] | None:
    data = [] 
    
    for n, tag in enumerate(soup.select("#rso > div > div > div"), 1): 
        a_tag = tag.select_one("a:has(h3)")
        
        if a_tag and in_statement in a_tag['href']:
            description_tag = soup.select_one(f"#rso > div:nth-child({n}) > div > div > div > div:nth-child(2) > div > span")
            description = description_tag.get_text() if description_tag else None
            
            data.append({
                "name": a_tag.find('h3').text, 
                "link": a_tag['href'],
                "description": description
            })
        
        if n == until: break
            
    return data or None # if bool(data) == False, then this statement returns None (empty list is False).

def parse_wiki(query: str) -> dict | None:
    markup = requests.get(
        search_url, params={"q": query, "lang": "en"}, headers=headers
    ).text
    soup = BeautifulSoup(markup, "html.parser")
    result = get_these(soup, "wikipedia.org", 1)
    
    return result[0] if result else None

def parse_sites(query: str) -> list | None:
    markup = requests.get(
        search_url, params={"q": query, "lang": "en"}, headers=headers
    ).text
    soup = BeautifulSoup(markup, "html.parser")
    result = get_these(soup, "/", 4)
    
    return result