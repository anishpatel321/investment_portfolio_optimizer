import numpy as np
import pandas as pd
from fredapi import Fred
from data import get_all_data
from scipy.optimize import minimize
#for testing

import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta
import numpy as np
from scipy.optimize import minimize
from sklearn.linear_model import LinearRegression




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







def fetch_adj_close(tickers, start_date, end_date):
    """
    Fetch adjusted close prices for given tickers between startdate and end_date.
    """
    df_adj_close = pd.DataFrame()
    for ticker in tickers:
        df_adj_close[ticker] = yf.download(ticker, start=start_date, end=end_date)['Adj Close']
    return df_adj_close

def calculate_log_returns(df_adj_close):
    """
    Calculate the log returns of the adjusted close prices.
    """
    log_returns = np.log(df_adj_close / df_adj_close.shift(1)).dropna()
    return log_returns

def calculate_covariance_matrix(log_returns):
    """
    Calculate the covariance matrix of the log returns.
    """
    cov_matrix = log_returns.cov() * 252
    return cov_matrix

def cov_matrix_as_df(cov_matrix, log_returns):
    df_cov = pd.DataFrame(cov_matrix, columns=log_returns.columns, index=log_returns.columns)
    return df_cov

def calculate_correlation_matrix(log_returns):
    """
    Calculate the covariance matrix of the log returns.
    """
    cor_matrix = log_returns.corr()
    return cor_matrix

def cor_matrix_as_df(cor_matrix, log_returns):
    df_cor = pd.DataFrame(cor_matrix, columns=log_returns.columns, index=log_returns.columns)
    return df_cor

def standard_deviation(weights, cov_matrix):
    variance = weights.T @ cov_matrix @ weights
    return np.sqrt(variance)

def expected_return(weights, log_returns):
    return np.sum(log_returns.mean()*weights) * 252

def sharpe_ratio(weights, log_returns, cov_matrix, risk_free_rate):
    return (expected_return(weights, log_returns) - risk_free_rate) / standard_deviation(weights, cov_matrix)

def fetch_risk_free_rate():
    try:
        # risk-free rate using FRED data:

        fred = Fred(api_key = '8904274911e725444691989e24d911cb')
        ten_year_treasury_rate = fred.get_series_latest_release('GS10') / 100

        # set the risk-free rate to 10yr US treasury yield, which is essentially risk-free return as we assume US gov won't default that soon
        risk_free_rate = ten_year_treasury_rate.iloc[-1]

    except Exception as e:
        risk_free_rate = 0.04  # Default to 4% if there's an error

    return risk_free_rate

def neg_sharpe_ratio(weights, log_returns, cov_matrix, risk_free_rate):
    return -sharpe_ratio(weights, log_returns, cov_matrix, risk_free_rate)

def calculate_optimal_theoretical_portfolio_allocations(tickers, min_hold, max_hold, log_returns, cov_matrix, risk_free_rate):
    # making sure all weights in portfolio sum to 1
    constraints = {'type': 'eq', 'fun': lambda weights: np.sum(weights) - 1}

    # min, max of individual portfolio holding, negative is a short position
    bounds = [(min_hold, max_hold) for _ in range(len(tickers))]

    # initializes weights so all tickers in portfolio are equal to begin
    initial_weights = np.array([1/len(tickers)]*len(tickers))

    # optimizes weights to maximize Sharpe Ratio
    # SLSQP is Sequential Least Squares Quadratic Programming, a numerical optimization technique for solving nonlinear optimization problems w/ constraints
    optimized_results = minimize(neg_sharpe_ratio, initial_weights, args=(log_returns, cov_matrix, risk_free_rate), method='SLSQP', constraints=constraints, bounds=bounds)
    optimal_weights = optimized_results.x
    return optimal_weights

def optimal_theoretical_porfolio_allocations_as_df(tickers, optimal_weights):
    data = {'Ticker': tickers, 'Optimal Weights': optimal_weights}
    df_max_sharpe_portfolio = pd.DataFrame(data)
    return df_max_sharpe_portfolio

def calculate_optimal_theoretical_portfolio_return (optimal_weights, log_returns):
    optimal_portfolio_return = expected_return(optimal_weights, log_returns)
    return optimal_portfolio_return

def calculate_optimal_theoretical_portfolio_volatility (optimal_weights, cov_matrix):
    optimal_portfolio_volatility = standard_deviation(optimal_weights, cov_matrix)
    return optimal_portfolio_volatility

def calculate_optimal_theoretical_portfolio_sharpe (optimal_weights, log_returns, cov_matrix, risk_free_rate):
    optimal_sharpe_ratio = sharpe_ratio(optimal_weights, log_returns, cov_matrix, risk_free_rate)
    return optimal_sharpe_ratio

def generate_random_portfolios(log_returns, risk_free_rate):
    noOfPortfolios = 10000
    noOfTickers = len(tickers)

    meanLogRet = log_returns.mean() * 252
    Sigma = log_returns.cov() * 252

    # initialize
    weight = np.zeros((noOfPortfolios, noOfTickers))
    expectedReturn = np.zeros(noOfPortfolios)
    expectedVolatility = np.zeros(noOfPortfolios)
    sharpeRatio = np.zeros(noOfPortfolios)

    for k in range(noOfPortfolios):
        # generate random weight vector
        w = np.array(np.random.random(noOfTickers))
        # Normalize so sums to 1
        w = w / np.sum(w)
        weight[k,:] = w
        # Expected log return
        expectedReturn[k] = np.sum(meanLogRet * w)
        # Ecpected volatility
        expectedVolatility[k] = np.sqrt(np.dot(w.T, np.dot(Sigma,w)))
        # Sharpe Ratio
        sharpeRatio[k] = (expectedReturn[k] - risk_free_rate)/expectedVolatility[k]
    return sharpeRatio, expectedVolatility, expectedReturn, weight

def calculate_optimal_generated_portfolio_allocations(sharpeRatio, weight):
    maxIndex = sharpeRatio.argmax()
    optimal_generated = weight[maxIndex,:]
    return optimal_generated, maxIndex

def optimal_generated_porfolio_allocations_as_df(tickers, optimal_generated):
    data = {'Ticker': tickers, 'Optimal Weights': optimal_generated}
    df_max_sharpe_generated_portfolio = pd.DataFrame(data)
    return df_max_sharpe_generated_portfolio

def calculate_optimal_generated_portfolio_sharpe(optimal_generated, log_returns, cov_matrix, risk_free_rate):
    optimal_generated_sharpe_ratio = sharpe_ratio(optimal_generated, log_returns, cov_matrix, risk_free_rate)
    return optimal_generated_sharpe_ratio

def generate_MEF_curve(tickers, min_hold, max_hold, log_returns):
    # initializes weights so all tickers in portfolio are equal to begin
    initial_weights = np.array([1/len(tickers)]*len(tickers))
    bounds = [(min_hold, max_hold) for _ in range(len(tickers))]
    Sigma = log_returns.cov() * 252
    meanLogRet = log_returns.mean() * 252

    min_return = np.min(meanLogRet)
    max_return = np.max(meanLogRet)

    # Dynamically adjust the range of returns based on min and max points
    returns_range = np.linspace(min_return, max_return, 50)
    volatility_opt = []

    def minimizeMyVolatility(w):
        w = np.array(w)
        V = np.sqrt(np.dot(w.T,np.dot(Sigma,w)))
        return V

    def getReturn(w):
        w = np.array(w)
        R = np.sum(meanLogRet*w)
        return R

    def checkSumToOne(w):
        return np.sum(w)-1

    for item in returns_range:
        # find best volatility
        constraints = ({'type':'eq', 'fun':checkSumToOne},{'type':'eq','fun':lambda w: getReturn(w) - item})
        opt = minimize(minimizeMyVolatility,initial_weights, method='SLSQP', constraints=constraints, bounds=bounds)

        # save my optimal volatility
        volatility_opt.append(opt['fun'])

    return volatility_opt, returns_range

def return_index_of_optimal_generated_portfolio_below_risk_threshold(risk_threshold, sharpeRatio, expectedVolatility, expectedReturn, risk_free_rate):
    risk_threshold = 0.3
    # Find the index of the portfolio with maximum Sharpe ratio below risk_threshold
    valid_indices = np.where(expectedVolatility < risk_threshold)[0]

    if len(valid_indices) > 0:
        # There are indices below the threshold, so proceed as normal
        validIndex = valid_indices[sharpeRatio[valid_indices].argmax()]
        state = 1
        return validIndex, state
    else:
        # If no valid indices, fallback to lowest volatility with return above risk-free rate
        valid_indices = np.where((expectedVolatility > 0) & (expectedReturn > risk_free_rate))[0]
        if valid_indices.size > 0:
            # Find the index with the lowest volatility among those with return above risk-free rate
            validIndex = valid_indices[expectedVolatility[valid_indices].argmin()]
            state = 2
            return validIndex, state
        else:
            # Select the portfolio with the overall maximum Sharpe ratio as a fallback
            validIndex = sharpeRatio.argmax()
            state = 3
            return validIndex, state
        
def optimal_generated_porfolio_allocations_below_risk_threshold_as_df(tickers, weight, validIndex):
    optimal_valid = weight[validIndex,:]

    data = {'Ticker': tickers, 'Optimal Weights': optimal_valid}
    df_max_sharpe_below_threshold_generated_portfolio = pd.DataFrame(data)
    return df_max_sharpe_below_threshold_generated_portfolio, optimal_valid

def calculate_optimal_generated_porfolio_allocations_below_risk_threshold_sharpe(weight, validIndex, log_returns, cov_matrix, risk_free_rate):
    # Sharpe Ratio of this Portfolio
    optimal_below_threshold_sharpe_ratio = sharpe_ratio(weight[validIndex], log_returns, cov_matrix, risk_free_rate)
    return optimal_below_threshold_sharpe_ratio

def create_recommended_portfolio_historical_returns_df(optimal_valid, log_returns):
    # Calculate Historical Portfolio Returns
    allocations = optimal_valid / np.sum(optimal_valid)
    historical_returns = (log_returns * allocations).sum(axis=1)

    # Convert log returns to simple returns for plotting
    historical_simple_returns = np.exp(historical_returns.cumsum())

    # Create DataFrames for Historical and Projected Returns
    df_historical = pd.DataFrame(historical_simple_returns, columns=['Historical Returns'])

    return df_historical

def create_recommended_portfolio_historical_trendline_df(df_historical):
    # Convert historical dates to a numeric format for the regression model
    df_historical['NumericDate'] = (df_historical.index - df_historical.index[0]).days

    # Prepare data for linear regression
    X_historical = df_historical[['NumericDate']].values
    y_historical = df_historical['Historical Returns'].values

    # Fit the linear regression model to the historical data
    model = LinearRegression()
    model.fit(X_historical, y_historical)

    # Predict across the historical range
    y_historical_pred = model.predict(X_historical)

    # Create a DataFrame for the linear trend
    df_linear_trend = pd.DataFrame(y_historical_pred, index=df_historical.index, columns=['Historical Linear Trend'])

    # Display the DataFrame
    return df_linear_trend

def create_recommended_portfolio_forecast_trendline_df(df_historical, end_date, start_date):
    forecast_period = end_date - start_date

    # Convert index to a numeric value for regression analysis (e.g., days)
    df_historical['NumericDate'] = (df_historical.index - df_historical.index[0]).days

    # Historical dates and returns
    historic_dates = df_historical[['NumericDate']].values
    historic_returns = df_historical['Historical Returns'].values

    # Initialize and fit the linear regression model
    model = LinearRegression()
    model.fit(historic_dates, historic_returns)

    # Define future dates for which we want to predict returns
    # Predict for the next 30 days
    future_dates = np.array([[historic_dates[-1][0] + i] for i in range(1, forecast_period.days)])

    # Predict future returns
    future_returns = model.predict(future_dates)

    # Convert future_dates back to datetime for plotting and analysis
    forecast_start = df_historical.index[0]
    future_dates_datetime = [forecast_start + pd.Timedelta(days=int(x[0])) for x in future_dates]

    # Create a DataFrame for future returns
    df_future_returns = pd.DataFrame(future_returns, index=future_dates_datetime, columns=['Projected Returns'])

    # Display the future returns DataFrame
    return df_future_returns

def define_volatility_range(expectedVolatility):
    # Define the range for the CML & CAL to cover, extending from 0 to a bit beyond the max expected volatility
    volatility_range = np.linspace(0, max(expectedVolatility) * 1.1, 50)
    return volatility_range

def create_CML(risk_free_rate, optimal_sharpe_ratio, volatility_range):
    # Calculate the CML returns for the range
    cml_returns = risk_free_rate + optimal_sharpe_ratio * volatility_range
    return volatility_range, cml_returns

def create_CAL(risk_free_rate, optimal_below_threshold_sharpe_ratio, volatility_range):
    # Calculate the CAL returns for the range
    cal_returns = risk_free_rate + optimal_below_threshold_sharpe_ratio * volatility_range
    return cal_returns


# Converting Existing Data into DataFrames
def create_df_generated_portfolios(expectedVolatility, expectedReturn, sharpeRatio):
    return pd.DataFrame({
        'Volatility': expectedVolatility,
        'Returns': expectedReturn,
        'Sharpe Ratio': sharpeRatio
    })

def create_df_optimal_theoretical(optimal_portfolio_volatility, optimal_portfolio_return, optimal_sharpe_ratio):
    return pd.DataFrame({
        'Volatility': [optimal_portfolio_volatility],
        'Returns': [optimal_portfolio_return],
        'Sharpe Ratio': optimal_sharpe_ratio
    }, index=['Optimal Theoretical Portfolio'])

def create_df_optimal_generated(expectedVolatility, expectedReturn, maxIndex, optimal_generated_sharpe_ratio):
    return pd.DataFrame({
        'Volatility': [expectedVolatility[maxIndex]],
        'Returns': [expectedReturn[maxIndex]],
        'Sharpe Ratio': optimal_generated_sharpe_ratio
    }, index=['Optimal Generated Portfolio'])

def create_df_optimal_valid(expectedVolatility, expectedReturn, validIndex, optimal_below_threshold_sharpe_ratio):
    return pd.DataFrame({
        'Volatility': expectedVolatility[validIndex],
        'Returns': expectedReturn[validIndex],
        'Sharpe Ratio': optimal_below_threshold_sharpe_ratio
    }, index=['Optimal Below Threshold'])

def create_df_MEF(volatility_opt, returns_range):
    return pd.DataFrame({
        'Volatility': volatility_opt,
        'Returns': returns_range
    })

def create_df_CML(volatility_range, cml_returns):
    return pd.DataFrame({
        'Volatility': volatility_range,
        'Returns': cml_returns
    })

def create_df_CAL(volatility_range, cal_returns):
    return pd.DataFrame({
        'Volatility': volatility_range,
        'Returns': cal_returns
    })

def create_df_risk_threshold(returns_range, risk_threshold):
    return pd.DataFrame({
        'Volatility': np.full(len(returns_range), risk_threshold),
        'Returns': returns_range
    })

def create_df_risk_free_rate(volatility_range, risk_free_rate):
    return pd.DataFrame({
        'Volatility': volatility_range,
        'Returns': np.full(len(volatility_range), risk_free_rate)
    })








# def optimize_portfolio(log_returns, cov_matrix, tickers, risk_free_rate=0.02):
#     """
#     Optimize the portfolio using the Sharpe ratio.
#     """
#     # Define optimization logic
#     pass

# def main():
#     """
#     Main function to run the portfolio optimization.
#     """
#     tickers = ['AAPL', 'MSFT', 'GOOG']
#     start_date = datetime.now() - timedelta(days=365)
#     end_date = datetime.now()

#     df_adj_close = fetch_data(tickers, start_date, end_date)
#     log_returns = calculate_log_returns(df_adj_close)
#     cov_matrix = calculate_covariance_matrix(log_returns)
#     optimized_portfolio = optimize_portfolio(log_returns, cov_matrix, tickers)

#     # Process and display the results
#     print(optimized_portfolio)

# if __name__ == "__main__":
#     main()







# def run_algo(tickers, start_date, end_date, risk_tolerance, investment_amount, min_bound, max_bound):

#     # Algo calls data to retrive data using apis
#     adj_close_prices_df = get_all_data(tickers, start_date, end_date)
#     risk_free_rate = get_risk_free_rate()

#     if adj_close_prices_df is None or adj_close_prices_df.empty or adj_close_prices_df.shape[1] == 1:
#         print("Data retrieval failed or insufficient ticker data")
#         return None, None, None, None, None
#     else:
#         # Define initial weights to be equal
#         initial_weights = np.array([1/adj_close_prices_df.shape[1]]*adj_close_prices_df.shape[1]) 
#         print(adj_close_prices_df) # print head
#         print(f"risk_free_rate = {risk_free_rate}")
#         log_ret = calculateLogReturns(adj_close_prices_df)
#         cov = calculateCovarianceMatrix(log_ret)
#         corr = get_corr(adj_close_prices_df)

#     # for now, return data not the calculated results to App
#     return adj_close_prices_df, risk_free_rate, log_ret, cov, corr


# def calculateLogReturns(adj_close):
#     log_ret = np.log(adj_close / adj_close.shift(1))
#     log_ret = log_ret.dropna()  # Drop missing values
#     return log_ret

# def calculateCovarianceMatrix(log_ret):
#     return log_ret.cov() * 252 # using 252 as the trading days in a year

# def get_corr(df):
#     return df.corr()

# def std_dev(w, cov):
#     deviation = np.dot(w.T, np.dot(cov, w))
#     return np.sqrt(deviation)

# def expected_return(w, log_ret):
#     return np.sum(log_ret.mean() * w) * 252

# def sharpe_ratio(exp_return, std, risk_free_rate):    
#     return (exp_return - risk_free_rate)/std

# def allocation(capital, weights):
#     return [w * capital for w in weights]

# def get_risk_free_rate():
#     fr = Fred(api_key='9b01535ec1ca714437ec3bed84a37f77') # free api key
#     treasury = fr.get_series_latest_release('GS10')/100
#     risk = treasury.iloc[-1]
#     return risk