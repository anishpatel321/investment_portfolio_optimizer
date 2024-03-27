from dotenv import load_dotenv
import os
from openai import OpenAI
import finnhub
import os
import requests
from datetime import datetime, timedelta

# # Load the .env file
load_dotenv()

# # Get the API key from the environment variables
# api_key = os.getenv("OPENAI_API_KEY")

# # Pass the API key when creating the OpenAI client
# client = OpenAI(
#   api_key=api_key
# )

# completion = client.chat.completions.create(
#   model="gpt-3.5-turbo",
#   messages=[
#     {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
#     {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
#   ]
# )

# print(completion.choices[0].message)

# Setup client
# finnhub_client = finnhub.Client(api_key=os.getenv('FINNHUB_API_KEY'))

# today = datetime.today()
# one_year_ago = today - timedelta(days = 365)

# date_today = today.strftime('%Y-%m-%d')
# date_one_yr = one_year_ago.strftime('%Y-%m-%d')

# print(date_today)
# print(date_one_yr)

# Get company news
# company_news = finnhub_client.company_news('AAPL', date_one_yr, date_today)
# for news in company_news:
#     print(news['summary'])
    
    
# url = 'https://www.alphavantage.co/query'

# # Define the parameters
# params = {
#     'function': 'NEWS_SENTIMENT',
#     'tickers': 'AAPL',
#     'apikey': os.getenv('ALPHA_VANTAGE_API_KEY')
# }

# # Make the request
# response = requests.get(url, params=params)

# # Parse the JSON response
# data = response.json()

# # Print the data
# print(data)

import requests
import pandas as pd
import os

def get_sentiment(tickers, api_key):
    dataframes = {}
    count = 0
    for ticker in tickers:
        response = requests.get(f'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers={str(ticker)}&apikey={api_key}&limit=50')
        data = response.json()
        # print(data)
        # url = "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo"
        # response = requests.get(url)
        data = response.json()
        sentiment_scores = []
        summaries = []
        for item in data['feed']:  
            # break        
            for ticker_sentiment in item['ticker_sentiment']:
                if ticker_sentiment['ticker'] == ticker:
                    sentiment_scores.append(ticker_sentiment['ticker_sentiment_score'])
                    summaries.append(item['summary'])
        # print(sentiment_scores)
        # print("\n\n",summaries)
        df_sentiment_scores = pd.DataFrame(sentiment_scores, columns=['sentiment_score'])
        df_summaries = pd.DataFrame(summaries, columns=['summary'])
        dataframes[ticker] = (df_sentiment_scores, df_summaries)
    return df_sentiment_scores, df_summaries, dataframes

tickers = ['AAPL', 'TSLA']  # replace with your tickers
api_key = os.getenv('ALPHA_VANTAGE_API_KEY')  # replace with your API key
df_sent, df_summ, dfs = get_sentiment(tickers, api_key)

# print(df_sent.head(50))
# print(df_summ.head(50))

print(dfs)
# print(dfs['AAPL'].head(10))
# for ticker, (df_sentiment_scores, df_summaries) in dataframes.items():
#     print(f"\nSentiment scores for {ticker}:")
#     print(df_sentiment_scores)
#     print("\nSummaries for {ticker}:")
#     print(df_summaries)



