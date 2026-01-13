from preprocessing.data_preprocessing import preprocess_data
from models.model_comparison import compare_models

# Step 1: Preprocess data
X_train, X_test, y_train, y_test, scaler = preprocess_data(
    "data/cardio_train.csv"
)

# Step 2: Train & compare models
accuracy_results, best_model_name = compare_models(
    X_train, X_test, y_train, y_test, scaler
)

print("\nModel Accuracy Results:")
for model, acc in accuracy_results.items():
    print(f"{model}: {acc:.3f}")

print("\nBest Model Selected:", best_model_name)
