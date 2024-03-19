from datetime import datetime
from data import get_data
from algo import run_algo
from flask import Flask
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
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


app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/process_data', methods=['POST'])
def process_data():
    try:
        data = request.get_json()
        print(data)
        end_date = str(datetime.today().date())
        df_result, _, _, _, _ = run_algo(data["tickers"], data["lookBackDate"], end_date, 
                                         data["riskThreshold"], data["investmentAmount"], 
                                         data["minAllocationBound"], data["maxAllocationBound"]) 
        result = df_result.to_json(orient='records')
        return jsonify(result), 200  # Returning 200 status code along with the result
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 400  # Return a 400 status code for any errors


@app.route('/pie-chart-data')
def pie_chart_data():
    
    # replace with function call to get data from algo team
    
    data = {
    'Ticker': ['MSFT', 'AAPL', 'AMZN', 'NVDA', 'AVGO'],
    'Optimal Weights': [0.165788, 0.048821, 0.009022, 0.572737, 0.203633]
    }

    return jsonify(data)



if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=5000)
    app.run(debug=True)