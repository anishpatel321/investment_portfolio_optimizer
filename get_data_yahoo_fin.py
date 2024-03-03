import pandas as pd
from scipy.optimize import minimize
from yahoo_fin.stock_info import get_data


def get_data_yahoo_fin(tickers, start_date, end_date, res="1d"):
  df = pd.DataFrame()
  for ticker in tickers:
    try:
      data = get_data(ticker, start_date=start_date.replace("-", "/"), end_date=end_date.replace("-", "/"), interval=res)["adjclose"]
      if data.isnull().all() or data.isna().all():
        continue
      else:
        df.index.name = None
        df[ticker] = data
    except (KeyError, AssertionError):
      continue
  return df