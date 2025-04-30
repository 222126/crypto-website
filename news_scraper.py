import requests
import json
from datetime import datetime, timedelta

def scrape_news():
    # CoinDesk API endpoint
    url = "https://api.coindesk.com/v1/news"
    
    # API key
    headers = {
        "Authorization": "Bearer ef319ef94d30f1392c60a62f6b693720b052dab8f07ff80d0543a35b78b13f08"
    }
    
    try:
        # Make the API request
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        # Parse the response
        data = response.json()
        
        # Format the articles
        formatted_articles = []
        for article in data['data'][:5]:  # Get first 5 articles
            formatted_article = {
                'title': article['title'],
                'link': article['url'],
                'date': article['publishedAt'],
                'desc': article['description']
            }
            formatted_articles.append(formatted_article)
        
        # Save to JSON file
        with open('news.json', 'w', encoding='utf-8') as f:
            json.dump(formatted_articles, f, ensure_ascii=False, indent=4)
        
        return formatted_articles
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching news: {e}")
        return []

if __name__ == '__main__':
    scrape_news() 