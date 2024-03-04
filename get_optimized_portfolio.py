# import numpy as np
# from scipy.optimize import minimize
# from get_sharpe_ratio import sharpe_ratio
# from get_std_dev import std_dev
# from get_exp_return import expected_return

# def optimize_portfolio(log_returns, cov_matrix, risk_free_rate, tickers, min_hold, max_hold):

#     num_assets = len(tickers)
#     args = (log_returns, cov_matrix, risk_free_rate)
#     constraints = ({'type': 'eq', 'fun': lambda x: np.sum(x) - 1})
#     bound = (min_hold, max_hold)
#     bounds = tuple(bound for asset in range(num_assets))
#     initial_guess = num_assets * [1. / num_assets,]

#     neg_sr = -1*(sharpe_ratio(expected_return(weights, log_returns), std_dev(), risk_free_rate))

#     constraints = {'type': 'eq', 'fun': lambda weights: np.sum(weights) - 1}
#     initial_weights = np.array([1/len(tickers)]*len(tickers))

#     optimized_results = minimize(neg_sharpe_ratio, initial_weights, args=(log_returns, cov_matrix, risk_free_rate), method='SLSQP', constraints=constraints, bounds=bounds)

#     optimized_result = minimize(neg_sr, initial_guess,
#                                 args=args,
#                                 method='SLSQP',
#                                 bounds=bounds,
#                                 constraints=constraints)

#     return optimized_result.x
