import numpy as np

def expected_return(w, log_ret):
    return np.sum(log_ret.mean() * w) * 252
   
