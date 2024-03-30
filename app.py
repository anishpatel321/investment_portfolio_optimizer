from datetime import datetime
from data import get_data
from flask import Flask
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from testalgo import (
    run_algo,
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

from testalgo import get_df_adj_close, get_risk_free_rate, get_log_returns, get_df_cov_matrix, get_df_cor_matrix, get_df_max_sharpe_below_threshold_generated_portfolio, get_threshold_state, get_df_historical, get_df_historical_trendline, get_df_forecast_trendline, get_df_generated_portfolios, get_df_optimal_theoretical, get_df_optimal_generated, get_df_optimal_valid, get_df_MEF, get_df_CML, get_df_CAL, get_df_risk_threshold, get_df_risk_free_rate


app = Flask(__name__)
CORS(app)

# Global variables to store data
df_max_sharpe_below_threshold_generated_portfolio = None
df_MEF = None
df_cor_matrix = None


@app.route('/process_data', methods=['POST'])


def process_data():
    try:
        data = request.get_json()
        print(data)
        end_date = str(datetime.today().date())
        global algo_results
        algo_results = run_algo(data["tickers"], data["lookBackDate"], end_date, 
                                         data["riskThreshold"], data["investmentAmount"], 
                                         data["minAllocationBound"], data["maxAllocationBound"]) 

        # Check if the result is empty
        if not algo_results:
            raise ValueError("The result is empty")
        
        return algo_results, 200  # Returning 200 status code along with the result
        
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 400  # Return a 400 status code for any errors


@app.route('/pie-chart-data2')
def pie_chart_data2():
    
    # replace with function call to get data from algo team
    
    data = {
    'Ticker': ['MSFT', 'AAPL', 'AMZN', 'NVDA', 'AVGO'],
    'Optimal Weights': [16.5788, 4.8821, 0.9022, 57.2737, 20.3633]
    }

    formatted_data = [{'id': i, 'value': value, 'label': ticker} for i, (ticker, value) in enumerate(zip(data['Ticker'], data['Optimal Weights']))]
    
    print(data)
    
    
    return jsonify(data)


@app.route('/pie-chart-data')
def pie_chart_data():
    
    pie_data = get_df_max_sharpe_below_threshold_generated_portfolio()
    
    return jsonify(pie_data)

@app.route('/all-data')
def all_data():
    
      
    return jsonify(algo_results)



@app.route('/MEF-data')
def MEF_data():
    
    
    MEF_df = get_df_MEF()
    
    return jsonify(MEF_df)



if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=5000)
    app.run(debug=True)










# adj_close_df = get_df_adj_close()
# risk_free_rate = get_risk_free_rate()
# log_returns = get_log_returns()
# cov_matrix_df = get_df_cov_matrix()
# cor_matrix_df = get_df_cor_matrix()
# max_sharpe_below_threshold_df = get_df_max_sharpe_below_threshold_generated_portfolio()
# threshold_state = get_threshold_state()
# historical_df = get_df_historical()
# historical_trendline_df = get_df_historical_trendline()
# forecast_trendline_df = get_df_forecast_trendline()
# generated_portfolios_df = get_df_generated_portfolios()
# optimal_theoretical_df = get_df_optimal_theoretical()
# optimal_generated_df = get_df_optimal_generated()
# optimal_valid_df = get_df_optimal_valid()
# MEF_df = get_df_MEF()
# CML_df = get_df_CML()
# CAL_df = get_df_CAL()
# risk_threshold_df = get_df_risk_threshold()
# risk_free_rate_df = get_df_risk_free_rate()