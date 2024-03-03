import pandas as pd
from get_data_yfinance import get_data_yfinance
from get_data_yahoo_fin import get_data_yahoo_fin
from get_data_tiingo import get_data_tiingo

def get_data(tickers, start_date, end_date):
    
    df = pd.DataFrame()

    try:
        print("Attempting to fetch data using yfinance...")
        df = get_data_yfinance(tickers, start_date, end_date)
        
        if not df.empty:
            return df
        else:
            raise ValueError("No data fetched with yfinance.")
    except Exception as e:
        print(f"yfinance failed: {e}. Attempting to fetch data using yahoo_fin...")
        
    try:
        df = get_data_yahoo_fin(tickers, start_date, end_date)
        if not df.empty:
            return df
        else:
            raise ValueError("No data fetched with yahoo_fin.")
    except Exception as e:
        print(f"yahoo_fin failed: {e}. Attempting to fetch data using Tiingo...")
        
    try:
        df = get_data_tiingo(tickers, start_date, end_date)
        if not df.empty:
            return df
        else:
            raise ValueError("No data fetched with Tiingo.")
    except Exception as e:
        print(f"Tiingo failed: {e}. No more data sources to attempt.")
        return df


#insert functions directly into file