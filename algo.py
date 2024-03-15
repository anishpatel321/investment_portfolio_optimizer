import numpy as np
import pandas as pd
from fredapi import Fred
from data import get_all_data
from scipy.optimize import minimize

def run_algo(tickers, start_date, end_date, risk_tolerance, investment_amount, min_bound, max_bound):

    # Algo calls data to retrive data using apis
    adj_close_prices_df = get_all_data(tickers, start_date, end_date)
    risk_free_rate = get_risk_free_rate()

    if adj_close_prices_df is None or adj_close_prices_df.empty or adj_close_prices_df.shape[1] == 1:
        print("Data retrieval failed or insufficient ticker data")
        return None, None, None, None, None
    else:
        # Define initial weights to be equal
        initial_weights = np.array([1/adj_close_prices_df.shape[1]]*adj_close_prices_df.shape[1]) 
        print(adj_close_prices_df) # print head
        print(f"risk_free_rate = {risk_free_rate}")
        log_ret = calculateLogReturns(adj_close_prices_df)
        cov = calculateCovarianceMatrix(log_ret)
        corr = get_corr(adj_close_prices_df)

    # for now, return data not the calculated results to App
    return adj_close_prices_df, risk_free_rate, log_ret, cov, corr


def calculateLogReturns(adj_close):
    log_ret = np.log(adj_close / adj_close.shift(1))
    log_ret = log_ret.dropna()  # Drop missing values
    return log_ret

def calculateCovarianceMatrix(log_ret):
    return log_ret.cov() * 252 # using 252 as the trading days in a year

def get_corr(df):
    return df.corr()

def std_dev(w, cov):
    deviation = np.dot(w.T, np.dot(cov, w))
    return np.sqrt(deviation)

def expected_return(w, log_ret):
    return np.sum(log_ret.mean() * w) * 252

def sharpe_ratio(exp_return, std, risk_free_rate):    
    return (exp_return - risk_free_rate)/std

def allocation(capital, weights):
    return [w * capital for w in weights]

def get_risk_free_rate():
    fr = Fred(api_key='9b01535ec1ca714437ec3bed84a37f77') # free api key
    treasury = fr.get_series_latest_release('GS10')/100
    risk = treasury.iloc[-1]
    return risk