from fredapi import Fred

def get_risk_free_rate():
    fr = Fred(api_key='9b01535ec1ca714437ec3bed84a37f77')
    treasury = fr.get_series_latest_release('GS10')/100

    risk = treasury.iloc[-1]
    return risk