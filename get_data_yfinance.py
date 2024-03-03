import yfinance as yf
import pandas as pd
import numpy as np
from scipy.optimize import minimize


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