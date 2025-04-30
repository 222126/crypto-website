import requests
import json
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_crypto_prices():
    try:
        # CoinDesk API endpoint for real-time prices
        url = 'https://data-api.coindesk.com/spot/v1/latest/tick'
        
        # API parameters
        params = {
            "market": "coinbase",
            "instruments": "BTC-USD,ETH-USD,BNB-USD,XRP-USD,ADA-USD,SOL-USD",
            "apply_mapping": "true",
            "api_key": "ef319ef94d30f1392c60a62f6b693720b052dab8f07ff80d0543a35b78b13f08"
        }
        
        headers = {
            "Content-type": "application/json; charset=UTF-8"
        }
        
        logger.info("Fetching cryptocurrency prices...")
        response = requests.get(url, params=params, headers=headers)
        
        if response.status_code != 200:
            logger.error(f"API request failed with status code: {response.status_code}")
            return {}
        
        data = response.json()
        
        # Format the prices
        formatted_prices = {
            'BTC': {
                'price': data.get('BTC-USD', {}).get('last', 0),
                'change': data.get('BTC-USD', {}).get('change', 0)
            },
            'ETH': {
                'price': data.get('ETH-USD', {}).get('last', 0),
                'change': data.get('ETH-USD', {}).get('change', 0)
            },
            'BNB': {
                'price': data.get('BNB-USD', {}).get('last', 0),
                'change': data.get('BNB-USD', {}).get('change', 0)
            },
            'XRP': {
                'price': data.get('XRP-USD', {}).get('last', 0),
                'change': data.get('XRP-USD', {}).get('change', 0)
            },
            'ADA': {
                'price': data.get('ADA-USD', {}).get('last', 0),
                'change': data.get('ADA-USD', {}).get('change', 0)
            },
            'SOL': {
                'price': data.get('SOL-USD', {}).get('last', 0),
                'change': data.get('SOL-USD', {}).get('change', 0)
            }
        }
        
        # Save to JSON file
        with open('prices.json', 'w', encoding='utf-8') as f:
            json.dump(formatted_prices, f, ensure_ascii=False, indent=4)
        
        logger.info("Successfully saved prices to prices.json")
        return formatted_prices
        
    except Exception as e:
        logger.error(f"Error fetching prices: {e}")
        return {}

if __name__ == '__main__':
    get_crypto_prices() 