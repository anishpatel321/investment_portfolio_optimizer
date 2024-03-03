import numpy as np
from get_risk_free import get_risk_free_rate
from data import get_data
from get_log_norm_return import calculateLogReturns
from get_covariance import calculateCovarianceMatrix
from get_correlation import get_corr
from get_std_dev import std_dev
from get_exp_return import expected_return
from get_sharpe_ratio import sharpe_ratio
from get_allocation import allocation

def run_algo(tickers, start_date, end_date, risk_tolerance, investment_amount, min_bound, max_bound):

    # Algo calls data to retrive data using apis
    adj_close_prices_df = get_data(tickers, start_date, end_date)
    risk_free_rate = get_risk_free_rate()

    if adj_close_prices_df is None or adj_close_prices_df.empty or adj_close_prices_df.shape[1] == 1:
        print("Data retrieval failed or insufficient ticker data")
        return None, None, None, None, None
    else:
        # Define initial weights to be equal
        initial_weights = np.array([1/adj_close_prices_df.shape[1]]*adj_close_prices_df.shape[1]) 
        # print head
        print(adj_close_prices_df)
        print(f"risk_free_rate = {risk_free_rate}")
        log_ret = calculateLogReturns(adj_close_prices_df)
        cov = calculateCovarianceMatrix(log_ret)
        corr = get_corr(adj_close_prices_df)

    # for now, return data not the calculated results to App
    return adj_close_prices_df, risk_free_rate, log_ret, cov, corr