from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

def compare_models(X_train, X_test, y_train, y_test, scaler):

    models = {
        "Logistic Regression": LogisticRegression(),
        "KNN": KNeighborsClassifier(),
        "Decision Tree": DecisionTreeClassifier(max_depth=5),
        "Random Forest": RandomForestClassifier(n_estimators=100)
    }

    accuracy = {}

    for name, model in models.items():
        model.fit(X_train, y_train)
        preds = model.predict(X_test)
        accuracy[name] = accuracy_score(y_test, preds)

    best_model_name = max(accuracy, key=accuracy.get)
    best_model = models[best_model_name]

    joblib.dump(best_model, "saved_models/best_model.pkl")
    joblib.dump(scaler, "saved_models/scaler.pkl")

    return accuracy, best_model_name