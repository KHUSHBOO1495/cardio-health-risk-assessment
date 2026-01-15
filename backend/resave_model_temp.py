import os

import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load the model with the correct NumPy
model = joblib.load(os.path.join(BASE_DIR, "saved_models", "best_model.pkl"))
joblib.dump(model, os.path.join(BASE_DIR, "saved_models", "best_model.pkl"))

# Load and re-save the scaler if it exists
try:
    scaler = joblib.load(os.path.join(BASE_DIR, "saved_models", "scaler.pkl"))
    joblib.dump(scaler, os.path.join(BASE_DIR, "saved_models", "scaler.pkl"))
except FileNotFoundError:
    pass

print("Model and scaler re-saved successfully for compatibility.")
