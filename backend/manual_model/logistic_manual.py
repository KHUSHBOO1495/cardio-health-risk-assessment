import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def train_logistic(X, y, lr=0.01, epochs=1000):
    w = np.zeros(X.shape[1])
    b = 0

    for _ in range(epochs):
        y_hat = sigmoid(np.dot(X, w) + b)
        dw = np.dot(X.T, (y_hat - y)) / len(y)
        db = np.sum(y_hat - y) / len(y)
        w -= lr * dw
        b -= lr * db

    return w, b
