import numpy as np
import pandas as pd

def calculateLogReturns(adj_close):

    log_ret = np.log(adj_close / adj_close.shift(1))
    log_ret = log_ret.dropna()  # Drop missing values

    return log_ret
