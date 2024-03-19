from datetime import datetime
from data import get_data
from algo import run_algo
from flask import Flask
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

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



#print mef_df


# from algorithm import process_stock_data  # Ensure this function exists in algorithm.py
# def get_user_input():
#     tickers = input("Enter tickers separated by commas (e.g., AAPL,MSFT,GOOG): ").split(',')
#     lookback_start = input("Enter lookback start date (YYYY-MM-DD): ")
#     lookback_end = str(datetime.today().date())  # Assumes end date is today
#     risk_tolerance = float(input("Enter your risk tolerance (0.0 to 1.0): "))
#     investment_amount = float(input("Enter your investment amount: "))
#     min_bound = float(input("Enter the Minimum bound for portfolio allocation (0.0-1.0): "))
#     max_bound = float(input("Enter the Maximum bound for portfolio allocation (0.0-1.0): "))
    
#     return tickers, lookback_start, lookback_end, risk_tolerance, investment_amount, min_bound, max_bound

# def main():
#     tickers, start_date, end_date, risk_tolerance, investment_amount, min_bound, max_bound = get_user_input()
#     adj_close_prices_df, risk_free_rate, log_ret, cov, corr = run_algo(tickers, start_date, end_date, risk_tolerance, investment_amount, min_bound, max_bound)

#     print("adj close")
#     print(adj_close_prices_df)
#     print("risk free")
#     print(risk_free_rate)
#     print("log norm returns")
#     print(log_ret)
#     print("covariance")
#     print(cov)
#     print("correlation")
#     print(corr)


if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=5000)
    app.run(debug=True)