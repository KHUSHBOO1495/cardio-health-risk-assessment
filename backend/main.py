from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib
import os
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score

from models.risk_logic import classify_risk
from preprocessing.data_preprocessing import preprocess_data

app = FastAPI()

# ---------- CORS ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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
_, X_test, _, y_test, _ = preprocess_data(
    os.path.join(BASE_DIR, "data", "cardio_train.csv")
)

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
