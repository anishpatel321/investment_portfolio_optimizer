import pandas as pd

def calculateCovarianceMatrix(log_ret):
    return log_ret.cov() * 252
