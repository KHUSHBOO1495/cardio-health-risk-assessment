from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib
import os

from models.risk_logic import classify_risk

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
