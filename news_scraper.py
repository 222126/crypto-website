import requests
import json
from datetime import datetime, timedelta
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_crypto_prices():
    # List of top 50 cryptocurrencies by market cap
    symbols = [
        'BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'USDC', 'USDT', 'ADA', 'AVAX', 'DOGE',
        'DOT', 'TRX', 'MATIC', 'LINK', 'WBTC', 'TON', 'SHIB', 'DAI', 'LTC', 'UNI',
        'ATOM', 'XLM', 'BCH', 'NEAR', 'XMR', 'OKB', 'FIL', 'INJ', 'APT', 'HBAR',
        'VET', 'OP', 'MKR', 'CRO', 'RUNE', 'KAS', 'GRT', 'PEPE', 'THETA', 'FTM',
        'RNDR', 'AAVE', 'QNT', 'ALGO', 'ARB', 'STX', 'FLOW', 'EGLD', 'EOS', 'XTZ'
    ]
    
    # Using CryptoCompare API
    url = f"https://min-api.cryptocompare.com/data/pricemultifull?fsyms={','.join(symbols)}&tsyms=USD"
    
    try:
        logger.info("Making request to CryptoCompare API...")
        response = requests.get(url)
        logger.info(f"Response status code: {response.status_code}")
        
        if response.status_code != 200:
            logger.error(f"API request failed with status code: {response.status_code}")
            return []
        
        data = response.json()
        logger.info("Successfully received data from CryptoCompare API")
        
        # Format the data
        formatted_prices = []
        for symbol in symbols:
            raw_data = data.get('RAW', {}).get(symbol, {}).get('USD', {})
            if raw_data:
                formatted_price = {
                    'symbol': symbol,
                    'price': raw_data.get('PRICE', 0),
                    'change_24h': raw_data.get('CHANGEPCT24HOUR', 0),
                    'volume_24h': raw_data.get('VOLUME24HOUR', 0),
                    'high_24h': raw_data.get('HIGH24HOUR', 0),
                    'low_24h': raw_data.get('LOW24HOUR', 0),
                    'market_cap': raw_data.get('MKTCAP', 0)
                }
                formatted_prices.append(formatted_price)
        
        # Save to JSON file
        with open('prices.json', 'w', encoding='utf-8') as f:
            json.dump(formatted_prices, f, ensure_ascii=False, indent=4)
        
        logger.info(f"Successfully saved {len(formatted_prices)} cryptocurrency prices to prices.json")
        return formatted_prices
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching prices: {e}")
        return []
    except json.JSONDecodeError as e:
        logger.error(f"Error parsing JSON response: {e}")
        return []
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return []

if __name__ == '__main__':
    get_crypto_prices() 