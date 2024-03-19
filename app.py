from datetime import datetime
from data import get_data
#from algo import run_algo
from flask import Flask
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from testalgo import run_algo



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
        (
        df_adj_close,
        risk_free_rate,
        log_returns,
        df_cov_matrix,
        df_cor_matrix,
        df_max_sharpe_below_threshold_generated_portfolio,
        threshold_state,
        df_historical,
        df_historical_trendline,
        df_forecast_trendline,
        df_generated_portfolios,
        df_optimal_theoretical,
        df_optimal_generated,
        df_optimal_valid,
        df_MEF,
        df_CML,
        df_CAL,
        df_risk_threshold,
        df_risk_free_rate
        ) = run_algo(data["tickers"], data["lookBackDate"], end_date, 
                                         data["riskThreshold"], data["investmentAmount"], 
                                         data["minAllocationBound"], data["maxAllocationBound"]) 
        result = df_result.to_json(orient='records')
        return jsonify(result), 200  # Returning 200 status code along with the result
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 400  # Return a 400 status code for any errors


@app.route('/pie-chart-data')
def pie_chart_data():
    
    try:
        # Call process_data to get the required data
        result = process_data()
        # Extract df_max_sharpe_below_threshold_generated_portfolio from the result
        data = result.json['df_max_sharpe_below_threshold_generated_portfolio']

        return jsonify(data)
    
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 400  # Return a 400 status code for any errors

@app.route('/MEF-data')
def MEF_data():
    
    try:
        # Call process_data to get the required data
        result = process_data()
        # Extract df_max_sharpe_below_threshold_generated_portfolio from the result
        data = result.json['df_MEF']

        return jsonify(data)
    
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 400  # Return a 400 status code for any errors

@app.route('/correlation-data')
def correlation_data():
    
    try:
        # Call process_data to get the required data
        result = process_data()
        # Extract df_max_sharpe_below_threshold_generated_portfolio from the result
        data = result.json['df_cor_matrix']

        return jsonify(data)
    
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 400  # Return a 400 status code for any errors


if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=5000)
    app.run(debug=True)