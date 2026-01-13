import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

def preprocess_data(path):
    # Load dataset (semicolon-separated)
    df = pd.read_csv(path, sep=";")

    # Drop ID column if present
    if "id" in df.columns:
        df = df.drop("id", axis=1)

    # ---------- MEDICAL OUTLIER REMOVAL ----------

    # Height (cm)
    df = df[(df["height"] >= 120) & (df["height"] <= 220)]

    # Weight (kg)
    df = df[(df["weight"] >= 40) & (df["weight"] <= 200)]

    # Blood pressure validity
    df = df[(df["ap_hi"] > df["ap_lo"])]
    df = df[(df["ap_hi"] <= 250) & (df["ap_lo"] <= 150)]

    # --------------------------------------------

    # ---------- BMI FEATURE ENGINEERING ----------

    # Convert height to meters
    height_m = df["height"] / 100

    # BMI formula
    df["bmi"] = df["weight"] / (height_m ** 2)

    # Remove extreme BMI outliers
    df = df[(df["bmi"] >= 10) & (df["bmi"] <= 60)]

    # --------------------------------------------

    # Features and target
    X = df.drop("cardio", axis=1)
    y = df["cardio"]

    # Feature scaling
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.25, random_state=42
    )

    print(f"Final dataset size after preprocessing (with BMI): {df.shape[0]} rows")

    return X_train, X_test, y_train, y_test, scaler
