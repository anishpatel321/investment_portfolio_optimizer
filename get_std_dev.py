import numpy as np

def std_dev(w, cov):
    deviation = np.dot(w.T, np.dot(cov, w))
    return np.sqrt(deviation)
