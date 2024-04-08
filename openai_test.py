from dotenv import load_dotenv
import os
from openai import OpenAI
import finnhub
import os
import requests
import pandas as pd
from datetime import datetime, timedelta
import json
import re

# # Load the .env file
load_dotenv()

# # Get the API key from the environment variables
api_key = os.getenv("OPENAI_API_KEY")

# # Pass the API key when creating the OpenAI client
client = OpenAI(
  api_key=api_key
)

def dynamic_corr(correlation_matrix):
    # Get the tickers from the correlation matrix
    tickers = correlation_matrix.columns

    # Find the minimum correlation value
    min_corr = round(correlation_matrix.min().min(),2)

    # Create a prompt for the OpenAI API
    prompt = "I have a heatmap correlation matrix of stock tickers: " + ', '.join(tickers) + ". "
    prompt += f"This matrix is represented using a heatmap which uses a color scheme that goes from blue (representing a correlation of {min_corr}) to red (representing a correlation of 1). "
    prompt += "In this case, blue represents the minimum correlation value in the matrix, red represents the maximum correlation value, and colors in between represent correlation values between these two extremes. "
    prompt += "Now, let's analyze this correlation matrix:\n\n"

    # Add the correlations to the prompt
    for i in range(len(tickers)):
        for j in range(i+1, len(tickers)):  # Only consider each pair once
            prompt += f"The correlation between **{tickers[i]}** and **{tickers[j]}** is **{correlation_matrix.iloc[i, j]:.2f}**.\n"

    prompt += "In a short paragraph, briefly explain why min and max values are used for the range and what the values are. Then, mention how to read a heatmap correlation matrix (based on the colors) and explain the importance of correlation for diversification in portfolio management based on the modern portfolio theory. "
    prompt += "\nThen, provide a new paragraph with an analysis of the correlation matrix, highlighting all potential concerns (having high correlations) and suggesting improvements such as which alternate industries they can explore to balance out the high correlations. Also mention any promising correlations (in the context of portfolio management, neutral or negative) that contribute to making the portfolio diverse and robust."
    prompt += "\nThe goal is to provide the user with a holistic view of their portfolio and alert them about certain concerns such as relatively high positive correlations, so craft your response in that way. The goal is not to instill fear and uncertainty to the point they keep trying with new tickers until they get a good message. Keep the paragraphs very concise and specific."
    prompt += "\nPlease provide a response that is summarized, concise and to the point, and use bold styling for the tickers and all values."
    
    # Send the prompt to the OpenAI API
    completion = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a financial assistant, skilled in analyzing and summarizing complex financial data. You do so in a positive, but professional tone, keeping out the casualness in your replies. Consider you may be addressing potentially new investors who have not invested much in stocks before and address them directly."},
            {"role": "user", "content": prompt}
        ]
    )

    # Get the response text
    response_text = completion.choices[0].message.content

    # Format the response text with line breaks and bold styling
    response_text = response_text.replace('\n', '<br/>')
    response_text = re.sub(r'\*\*(.*?)\*\*', r'<span style="color: #FFECB3;"><strong>\1</strong></span>', response_text)
    return response_text



def dynamic_pie(df_max_sharpe_below_threshold_generated_portfolio, investment_amount):
    # Extract tickers and optimal weights from the DataFrame
    tickers = df_max_sharpe_below_threshold_generated_portfolio['Ticker']
    optimal_weights = df_max_sharpe_below_threshold_generated_portfolio['Optimal Weights']
    investment_amount = pd.to_numeric(investment_amount, errors='coerce')
    # Calculate the actual amount to be invested for each ticker
    investment_amounts = optimal_weights * investment_amount

    # Create a prompt for the OpenAI API
    prompt = "I have a portfolio with the following allocations: \n\n"
    for i in range(len(tickers)):
        prompt += f"**{tickers[i]}**: **{optimal_weights[i]*100:.2f}%** (equivalent to **${investment_amounts[i]:.2f}**).\n"
    prompt += "\nPlease provide a short description of this portfolio by mentioning all of the allocation amounts for each company (mention name and ticker) in three to four lines."
    prompt += "\nMake sure that the numbers/percentages and stock ticker and company names are bolded using the double asterisks."
    # Send the prompt to the OpenAI API
    completion = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a financial assistant, skilled in analyzing and summarizing complex financial data in a concise manner. You do so in a positive, but professional tone, keeping out the casualness in your replies."},
            {"role": "user", "content": prompt}
        ]
    )

    # Get the response text
    response_text = completion.choices[0].message.content

    # Format the response text with line breaks and bold styling
    response_text = response_text.replace('\n', '<br/>')
    response_text = re.sub(r'\*\*(.*?)\*\*', r'<span style="color: #FFECB3;"><strong>\1</strong></span>', response_text)
    return response_text

# SENTIMENT ANALYSIS:

import requests
import pandas as pd
import os

def get_sentiment(tickers, api_key):
    dataframes = {}
    for ticker in tickers:
        response = requests.get(f'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers={str(ticker)}&apikey={api_key}&limit=50')
        data = response.json()
        try:
            sentiment_scores = []
            summaries = []
            for item in data['feed']:    
                for ticker_sentiment in item['ticker_sentiment']:
                    if ticker_sentiment['ticker'] == ticker:
                        sentiment_scores.append(ticker_sentiment['ticker_sentiment_score'])
                        summaries.append(item['summary'])
            df_sentiment_scores = pd.DataFrame(sentiment_scores, columns=['sentiment_score'])
            df_summaries = pd.DataFrame(summaries, columns=['summary'])
            dataframes[ticker] = (df_sentiment_scores, df_summaries)
        except KeyError:
            print(f"No sentiment data available for {ticker}")
            dataframes[ticker] = (pd.DataFrame(), pd.DataFrame())  # Placeholder value for tickers with no data
    return dataframes

import json

def overall_sentiment(tickers, api_key):
    dfs = get_sentiment(tickers, api_key)
    overall_results = {}
    for ticker, (df_sentiment_scores, _) in dfs.items():
        if df_sentiment_scores.empty:  # Check if DataFrame is empty
            overall_results[ticker] = "No data available"
        else:
            # Convert sentiment scores to numeric values
            df_sentiment_scores['sentiment_score'] = pd.to_numeric(df_sentiment_scores['sentiment_score'], errors='coerce')
            
            # Determine sentiment label based on score
            df_sentiment_scores['sentiment_label'] = df_sentiment_scores['sentiment_score'].apply(
                lambda x: "Bearish" if x <= -0.35 else
                          "Somewhat-Bearish" if -0.35 < x <= -0.15 else
                          "Neutral" if -0.15 < x < 0.15 else
                          "Somewhat_Bullish" if 0.15 <= x < 0.35 else
                          "Bullish"
            )
            
            # Count sentiment occurrences
            sentiment_counts = df_sentiment_scores['sentiment_label'].value_counts().to_dict()
            
            overall_results[ticker] = sentiment_counts

    # Print results
    print("Sentiment Counts:")
    print(json.dumps(overall_results, indent=4))

    return overall_results

# Example usage:
# overall_results = overall_sentiment(dfs)

import re

def dynamic_sentiment(overall_results):
    # Create a prompt for the OpenAI API
    prompt = "I have sentiment analysis results for the following stock tickers: \n\n"
    for ticker, sentiment in overall_results.items():
        prompt += f"The sentiment for **{ticker}** is **{sentiment}**.\n"

    prompt += "\nPlease provide a very concise insight of these sentiment counts for each stock, explaining what each sentiment means in the context of stock market investment and diversifying your portfolio."
    prompt += "\nMake sure that the tickers and sentiments are bolded."
    # Send the prompt to the OpenAI API
    completion = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a financial assistant, skilled in analyzing and summarizing complex financial data in a very concise manner. You do so in a positive, but professional tone, keeping out the casualness in your replies. Do not refer to yourself at all. Consider you may be addressing potentially new investors who have not invested much in stocks before and address them directly."},
            {"role": "user", "content": prompt}
        ]
    )

    # Get the response text
    response_text = completion.choices[0].message.content

    # Format the response text with line breaks and bold styling
    response_text = response_text.replace('\n', '<br/>')
    response_text = re.sub(r'\*\*(.*?)\*\*', r'<span style="color: #FFECB3;"><strong>\1</strong></span>', response_text)
    return response_text



