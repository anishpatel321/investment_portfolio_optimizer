from datetime import datetime
import pandas as pd
import numpy as np
from fredapi import Fred
from data import get_all_data
from scipy.optimize import minimize
#for testing
import yfinance as yf
from datetime import datetime, timedelta
from scipy.optimize import minimize
from sklearn.linear_model import LinearRegression
from testalgo import (
    fetch_adj_close,
    calculate_log_returns,
    calculate_covariance_matrix,
    cov_matrix_as_df,
    calculate_correlation_matrix,
    cor_matrix_as_df,
    standard_deviation,
    expected_return,
    sharpe_ratio,
    fetch_risk_free_rate,
    neg_sharpe_ratio,
    calculate_optimal_theoretical_portfolio_allocations,
    optimal_theoretical_porfolio_allocations_as_df,
    calculate_optimal_theoretical_portfolio_return,
    calculate_optimal_theoretical_portfolio_volatility,
    calculate_optimal_theoretical_portfolio_sharpe,
    generate_random_portfolios,
    calculate_optimal_generated_portfolio_allocations,
    optimal_generated_porfolio_allocations_as_df,
    calculate_optimal_generated_portfolio_sharpe,
    generate_MEF_curve,
    return_index_of_optimal_generated_portfolio_below_risk_threshold,
    optimal_generated_porfolio_allocations_below_risk_threshold_as_df,
    calculate_optimal_generated_porfolio_allocations_below_risk_threshold_sharpe,
    create_recommended_portfolio_historical_returns_df,
    create_recommended_portfolio_historical_trendline_df,
    create_recommended_portfolio_forecast_trendline_df,
    define_volatility_range,
    create_CML,
    create_CAL,
    create_df_generated_portfolios,
    create_df_optimal_theoretical,
    create_df_optimal_generated,
    create_df_optimal_valid,
    create_df_MEF,
    create_df_CML,
    create_df_CAL,
    create_df_risk_threshold,
    create_df_risk_free_rate
)
# try:
#     from testalgo import run_algo
# except ImportError:
#     print("Error: algo module not found. Make sure the module is in the same directory or in the Python path.")
#     exit()

# def get_user_input():
#     try:
#         tickers = input("Enter tickers separated by commas (e.g., AAPL,MSFT,GOOG): ").split(',')
#         lookback_start = input("Enter lookback start date (YYYY-MM-DD): ")
#         lookback_end = str(datetime.today().date())  # Assumes end date is today
#         risk_tolerance = float(input("Enter your risk tolerance (0.0 to 1.0): "))
#         investment_amount = float(input("Enter your investment amount: "))
#         min_bound = float(input("Enter the Minimum bound for portfolio allocation (0.0-1.0): "))
#         max_bound = float(input("Enter the Maximum bound for portfolio allocation (0.0-1.0): "))
#     except ValueError as e:
#         print("Error:", e)
#         exit()
    
#     return tickers, lookback_start, lookback_end, risk_tolerance, investment_amount, min_bound, max_bound

def main():
#     try:
#         tickers, start_date, end_date, risk_tolerance, investment_amount, min_bound, max_bound = get_user_input()
#         adj_close_prices_df, risk_free_rate, log_ret, cov, corr = run_algo(tickers, start_date, end_date, risk_tolerance, investment_amount, min_bound, max_bound)

#         print("adj close")
#         print(adj_close_prices_df)
#         print("risk free")
#         print(risk_free_rate)
#         print("log norm returns")
#         print(log_ret)
#         print("covariance")
#         print(cov)
#         print("correlation")
#         print(corr)


 # Add algo into testalgo.py and print here.
    # tickers
    etf_5 = ['SPY','BND','GLD','QQQ','VTI']
    nasdaq_100 = ['MSFT', 'AAPL', 'AMZN', 'NVDA', 'AVGO', 'META', 'TSLA', 'GOOGL', 'GOOG', 'COST', 'ADBE', 'AMD', 'NFLX', 'PEP', 'CSCO', 'TMUS', 'CMCSA', 'INTC', 'INTU', 'AMGN', 'QCOM', 'TXN', 'AMAT', 'ISRG', 'HON', 'BKNG', 'VRTX', 'LRCX', 'PANW', 'SBUX', 'MDLZ', 'REGN', 'ADP', 'GILD', 'ADI', 'MU', 'MELI', 'PDD', 'SNPS', 'KLAC', 'CDNS', 'ASML', 'CSX', 'MAR', 'CRWD', 'PYPL', 'ABNB', 'CTAS', 'ORLY', 'WDAY', 'ROP', 'MNST', 'MRVL', 'CHTR', 'LULU', 'NXPI', 'ADSK', 'PCAR', 'FTNT', 'ROST', 'DXCM', 'CPRT', 'MCHP', 'KHC', 'KDP', 'IDXX', 'PAYX', 'ODFL', 'AEP', 'CEG', 'FAST', 'DASH', 'TEAM', 'CTSH', 'AZN', 'DDOG', 'MRNA', 'EA', 'BIIB', 'VRSK', 'ZS', 'EXC', 'CSGP', 'GEHC', 'XEL', 'CCEP', 'CDW', 'ON', 'TTD', 'GFS', 'DLTR', 'MDB', 'ANSS', 'BKR', 'TTWO', 'FANG', 'SPLK', 'WBD', 'ILMN', 'SIRI', 'WBA']
    nasdaq_10 = ['MSFT', 'AAPL', 'AMZN', 'NVDA', 'AVGO', 'META', 'TSLA', 'GOOGL', 'GOOG', 'COST']
    nasdaq_5 = ['MSFT', 'AAPL', 'AMZN', 'NVDA', 'AVGO']
    stocks_ex2 = ['CEVA', 'GOOGL', 'TSLA', 'ZOM']

    # dates
    today = datetime.today()
    thirty_days_ago = today - timedelta(days = 30)
    one_year_ago = today - timedelta(days = 365)
    five_years_ago = today - timedelta(days = 5*365)
    ten_years_ago = today - timedelta(days = 10*365)
    jan_01_2021 = datetime(2021,1,1)
    jan_22_2021 = datetime(2021,1,22)
    
    # Initialize variables and settings
    tickers = nasdaq_5  # As an example, using 'nasdaq_5' tickers list
    start_date = ten_years_ago
    end_date = today
    min_hold = 0
    max_hold = 1

    # Fetch Adjusted Close Prices
    df_adj_close = fetch_adj_close(tickers, start_date, end_date)
    

    # Calculate Log Returns
    log_returns = calculate_log_returns(df_adj_close)

    # Calculate Covariance and Correlation Matrices
    cov_matrix = calculate_covariance_matrix(log_returns)
    cor_matrix = calculate_correlation_matrix(log_returns)

    # Get Risk-Free Rate
    risk_free_rate = fetch_risk_free_rate()

    # Calculate Optimal Theoretical Portfolio Allocations
    optimal_weights = calculate_optimal_theoretical_portfolio_allocations(tickers, min_hold, max_hold, log_returns, cov_matrix, risk_free_rate)

    # Generate Random Portfolios
    sharpeRatio, expectedVolatility, expectedReturn, weight = generate_random_portfolios(log_returns, risk_free_rate)

    # Calculate Optimal Generated Portfolio Allocations
    optimal_generated = calculate_optimal_generated_portfolio_allocations(sharpeRatio, weight)

    # Generate MEF (Markowitz Efficient Frontier) Curve
    volatility_opt, returns_range = generate_MEF_curve(tickers, min_hold, max_hold, log_returns)

    # Find Optimal Portfolio Below a Given Risk Threshold
    validIndex, state = return_index_of_optimal_generated_portfolio_below_risk_threshold(0.3, sharpeRatio, expectedVolatility, expectedReturn, risk_free_rate)
    if state == 1:
        print("Found valid portfolio below risk threshold.")
    elif state == 2:
        print("Fallback to least volatile portfolio above risk-free rate.")
    elif state == 3:
        print("Fallback to portfolio with overall maximum Sharpe ratio.")

    # # Get DataFrames for Various Outputs
    df_max_sharpe_portfolio = optimal_theoretical_porfolio_allocations_as_df(tickers, optimal_weights)
    print(df_max_sharpe_portfolio)
    print("Length of tickers:", len(tickers))
    print("Length of optimal_generated:", len(optimal_generated))
    print(tickers)
    print(optimal_generated)

    df_max_sharpe_generated_portfolio = optimal_generated_porfolio_allocations_as_df(tickers, optimal_generated)
    print(df_max_sharpe_generated_portfolio)
    df_max_sharpe_below_threshold_generated_portfolio, optimal_valid = optimal_generated_porfolio_allocations_below_risk_threshold_as_df(tickers, weight, validIndex)

    # Calculate Portfolio Metrics
    optimal_portfolio_return = calculate_optimal_theoretical_portfolio_return(optimal_weights, log_returns)
    optimal_portfolio_volatility = calculate_optimal_theoretical_portfolio_volatility(optimal_weights, cov_matrix)
    optimal_sharpe_ratio = calculate_optimal_theoretical_portfolio_sharpe(optimal_weights, log_returns, cov_matrix, risk_free_rate)

    # Create DataFrames for Various Graphical Outputs
    df_generated_portfolios = create_df_generated_portfolios(expectedVolatility, expectedReturn, sharpeRatio)
    df_optimal_theoretical = create_df_optimal_theoretical(optimal_portfolio_volatility, optimal_portfolio_return, optimal_sharpe_ratio)
    # df_optimal_generated = create_df_optimal_generated(expectedVolatility, expectedReturn, maxIndex, optimal_generated_sharpe_ratio)
    # df_optimal_valid = create_df_optimal_valid(expectedVolatility, expectedReturn, validIndex, optimal_below_threshold_sharpe_ratio)
    df_MEF = create_df_MEF(volatility_opt, returns_range)





    # except Exception as e:
    #     print("An error occurred:", e)

if __name__ == "__main__":
    main()