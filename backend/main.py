import os

import joblib
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from models.risk_logic import classify_risk
from preprocessing.data_preprocessing import preprocess_data
from pydantic import BaseModel
from sklearn.metrics import (confusion_matrix, f1_score, precision_score,
                             recall_score)

app = FastAPI()

# ---------- CORS ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- LOAD MODEL ----------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(
    os.path.join(BASE_DIR, "saved_models", "best_model.pkl")
)

scaler = joblib.load(
    os.path.join(BASE_DIR, "saved_models", "scaler.pkl")
)

# Load test data for confusion matrix calculation
X_TEST = None
Y_TEST = None
def load_test_data():
    global X_TEST, Y_TEST
    if X_TEST is None or Y_TEST is None:
        _, X_TEST, _, Y_TEST, _ = preprocess_data(
            os.path.join(BASE_DIR, "data", "cardio_train_cleaned.csv")
        )
    return X_TEST, Y_TEST


# ---------- SCHEMA ----------
class PatientData(BaseModel):
    age: int
    gender: int
    height: float
    weight: float
    ap_hi: int
    ap_lo: int
    chol: int
    gluc: int
    smoke: int
    alco: int
    active: int

# ---------- API ----------
@app.post("/predict")
def predict(data: PatientData):
    # BMI calculation (same as preprocessing)
    bmi = data.weight / ((data.height / 100) ** 2)

    input_array = np.array([[
        data.age,
        data.gender,
        data.height,
        data.weight,
        data.ap_hi,
        data.ap_lo,
        data.chol,
        data.gluc,
        data.smoke,
        data.alco,
        data.active,
        bmi
    ]])

    scaled = scaler.transform(input_array)

    # ✅ Decision Tree probability
    prob = float(model.predict_proba(scaled)[0][1])

    # Risk classification (UNCHANGED LOGIC)
    risk_level = classify_risk(
        prob,
        data.age,
        data.ap_hi,
        data.ap_lo,
        data.chol,
        data.gluc,
        data.smoke,
        data.alco
    )

    return {
        "probability": round(prob * 100, 2),
        "risk_level": risk_level
    }

@app.get("/")
def read_root():
    return {"message": "Hello World"}

# ---------- MODEL METRICS API ----------
@app.get("/model-metrics")
def get_model_metrics():
    return {
        "Logistic Regression": 0.720,
        "KNN": 0.651,
        "Decision Tree": 0.733,
        "Random Forest": 0.714,
        "best_model": "Decision Tree"
    }

# ---------- CONFUSION MATRIX API ----------
@app.get("/confusion-matrix")
def get_confusion_matrix():
    X_test, y_test = load_test_data()
    # Get predictions on test set
    y_pred = model.predict(X_test)
    
    # Calculate confusion matrix
    cm = confusion_matrix(y_test, y_pred)
    
    # Calculate metrics
    precision = float(precision_score(y_test, y_pred))
    recall = float(recall_score(y_test, y_pred))
    f1 = float(f1_score(y_test, y_pred))
    accuracy = float(np.sum(y_test == y_pred) / len(y_test))
    
    # Convert confusion matrix to list format
    # Format: [[TN, FP], [FN, TP]]
    cm_list = cm.tolist()
    
    # Calculate percentages for first 50 samples (for display)
    sample_size = min(50, len(y_test))
    y_test_sample = y_test[:sample_size]
    y_pred_sample = y_pred[:sample_size]
    
    cm_sample = confusion_matrix(y_test_sample, y_pred_sample)
    cm_sample_list = cm_sample.tolist()
    
    precision_sample = float(precision_score(y_test_sample, y_pred_sample, zero_division=0))
    recall_sample = float(recall_score(y_test_sample, y_pred_sample, zero_division=0))
    f1_sample = float(f1_score(y_test_sample, y_pred_sample, zero_division=0))
    accuracy_sample = float(np.sum(y_test_sample == y_pred_sample) / len(y_test_sample))
    
    return {
        "full_dataset": {
            "confusion_matrix": cm_list,
            "accuracy": round(accuracy * 100, 1),
            "precision": round(precision * 100, 1),
            "recall": round(recall * 100, 1),
            "f1_score": round(f1 * 100, 1)
        },
        "first_50_samples": {
            "confusion_matrix": cm_sample_list,
            "accuracy": round(accuracy_sample * 100, 1),
            "precision": round(precision_sample * 100, 1),
            "recall": round(recall_sample * 100, 1),
            "f1_score": round(f1_sample, 2)
        }
    }
