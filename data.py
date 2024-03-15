import pandas as pd
import yfinance as yf
from yahoo_fin.stock_info import get_data
from tiingo import TiingoClient
from tiingo.restclient import RestClientError

def get_all_data(tickers, start_date, end_date):
    
    df = pd.DataFrame()
    try: # try to get data from yfinance
        print("Attempting to fetch data using yfinance...")
        df = get_data_yfinance(tickers, start_date, end_date)
        
        if not df.empty:
            return df
        else:
            raise ValueError("No data fetched with yfinance.")
    except Exception as e:
        print(f"yfinance failed: {e}. Attempting to fetch data using yahoo_fin...")
        
    try: # did not return so try using yahoo_fin
        df = get_data_yahoo_fin(tickers, start_date, end_date)
        if not df.empty:
            return df
        else:
            raise ValueError("No data fetched with yahoo_fin.")
    except Exception as e:
        print(f"yahoo_fin failed: {e}. Attempting to fetch data using Tiingo...")
        
    try: # did not work so try tiingo
        df = get_data_tiingo(tickers, start_date, end_date)
        if not df.empty:
            return df
        else:
            raise ValueError("No data fetched with Tiingo.")
    except Exception as e:
        print(f"Tiingo failed: {e}. No more data sources to attempt.")
        # it will still return a df, will just be empty
        return df 


def get_data_yfinance(tickers, start_date, end_date, res="1d"):
    df = pd.DataFrame()
    for ticker in tickers:
        data = yf.download(ticker, start=start_date, end=end_date, interval=res)["Adj Close"]
        if data.isnull().all() or data.isna().all():
            continue
        else:
            df.index.name = None
            df[ticker] = data
    return df


def get_data_yahoo_fin(tickers, start_date, end_date, res="1d"):
    df = pd.DataFrame()
    for ticker in tickers:
        try:
            # have to swap / with - for dates
            data = get_data(ticker, start_date=start_date.replace("-", "/"), end_date=end_date.replace("-", "/"), interval=res)["adjclose"]
            if data.isnull().all() or data.isna().all():
                continue
            else:
                df.index.name = None
                df[ticker] = data
        except (KeyError, AssertionError):
            continue
    return df


def get_data_tiingo(tickers, start_date, end_date, res='daily', metric='adjClose'):
    # use default daily resolution and adjClose as the metric to be pulled
    config = {}
    config['session'] = True
    config['api_key'] = "a9716d1a5f9f2178ea0489147199df649d296e86" # free api key
    client = TiingoClient(config)
    
    df = pd.DataFrame()
    for ticker in tickers:
        try:
            data = client.get_dataframe(ticker, frequency=res, metric_name=metric,
                                        startDate=start_date, endDate=end_date)
            if data.isnull().all() or data.isna().all():
                continue
            else:
                df[ticker] = data
        except RestClientError:
            print(f"Ticker '{ticker}' not found. Skipping...")
            continue
    # some formatting for output dataframe
    df.index = pd.to_datetime(df.index)
    df.index = df.index.strftime('%Y-%m-%d')
    df.index.name = None
    return df