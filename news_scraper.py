import requests
import json
from datetime import datetime, timedelta
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def scrape_news():
    # CoinGecko API endpoint for news
    url = "https://api.coingecko.com/api/v3/news"
    
    try:
        logger.info("Making request to CoinGecko API...")
        # Make the API request
        response = requests.get(url)
        logger.info(f"Response status code: {response.status_code}")
        
        # Check if the request was successful
        if response.status_code != 200:
            logger.error(f"API request failed with status code: {response.status_code}")
            logger.error(f"Response content: {response.text}")
            return []
        
        # Parse the response
        data = response.json()
        logger.info(f"Received {len(data.get('data', []))} articles")
        
        # Format the articles
        formatted_articles = []
        for article in data.get('data', [])[:5]:  # Get first 5 articles
            # Convert timestamp to readable date
            date = datetime.fromtimestamp(article.get('published_at', 0))
            formatted_date = date.strftime('%Y-%m-%d %H:%M')
            
            formatted_article = {
                'title': article.get('title', 'No title'),
                'link': article.get('url', '#'),
                'date': formatted_date,
                'desc': article.get('description', 'No description')
            }
            formatted_articles.append(formatted_article)
        
        # Save to JSON file
        with open('news.json', 'w', encoding='utf-8') as f:
            json.dump(formatted_articles, f, ensure_ascii=False, indent=4)
        
        logger.info(f"Successfully saved {len(formatted_articles)} articles to news.json")
        return formatted_articles
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching news: {e}")
        return []
    except json.JSONDecodeError as e:
        logger.error(f"Error parsing JSON response: {e}")
        logger.error(f"Response content: {response.text}")
        return []
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return []

if __name__ == '__main__':
    scrape_news() 