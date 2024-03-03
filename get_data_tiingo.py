import pandas as pd
from tiingo import TiingoClient
from tiingo.restclient import RestClientError

def get_data_tiingo(tickers, start_date, end_date, res='daily', metric='adjClose'):
  # use default daily resolution and adjClose as the metric to be pulled
  config = {}
  config['session'] = True
  config['api_key'] = "a9716d1a5f9f2178ea0489147199df649d296e86" # free api key
  client = TiingoClient(config)
  # pull relevant data
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

  df.index = pd.to_datetime(df.index)
  df.index = df.index.strftime('%Y-%m-%d')
  df.index.name = None
  return df