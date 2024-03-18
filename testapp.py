from datetime import datetime
import pandas as pd

try:
    from testalgo import run_algo
except ImportError:
    print("Error: algo module not found. Make sure the module is in the same directory or in the Python path.")
    exit()

def get_user_input():
    try:
        tickers = input("Enter tickers separated by commas (e.g., AAPL,MSFT,GOOG): ").split(',')
        lookback_start = input("Enter lookback start date (YYYY-MM-DD): ")
        lookback_end = str(datetime.today().date())  # Assumes end date is today
        risk_tolerance = float(input("Enter your risk tolerance (0.0 to 1.0): "))
        investment_amount = float(input("Enter your investment amount: "))
        min_bound = float(input("Enter the Minimum bound for portfolio allocation (0.0-1.0): "))
        max_bound = float(input("Enter the Maximum bound for portfolio allocation (0.0-1.0): "))
    except ValueError as e:
        print("Error:", e)
        exit()
    
    return tickers, lookback_start, lookback_end, risk_tolerance, investment_amount, min_bound, max_bound

def main():
    try:
        tickers, start_date, end_date, risk_tolerance, investment_amount, min_bound, max_bound = get_user_input()
        adj_close_prices_df, risk_free_rate, log_ret, cov, corr = run_algo(tickers, start_date, end_date, risk_tolerance, investment_amount, min_bound, max_bound)

        print("adj close")
        print(adj_close_prices_df)
        print("risk free")
        print(risk_free_rate)
        print("log norm returns")
        print(log_ret)
        print("covariance")
        print(cov)
        print("correlation")
        print(corr)


 # Add algo into testalgo.py and print here.










    except Exception as e:
        print("An error occurred:", e)

if __name__ == "__main__":
    main()