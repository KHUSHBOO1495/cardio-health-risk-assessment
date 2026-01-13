"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Brain, 
  Award, 
  BarChart3, 
  Settings,
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  Database,
  Activity,
  Calendar,
  Layers,
  Target
} from "lucide-react";
import styles from "./page.module.css";

export default function Models() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/model-metrics");
      if (!response.ok) throw new Error("Failed to fetch metrics");
      const data = await response.json();
      setMetrics(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading model information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Connection Error</h2>
        <p>Unable to connect to the backend API. Please ensure the server is running on port 8000.</p>
        <button onClick={fetchMetrics} className={styles.retryButton}>
          Retry Connection
        </button>
      </div>
    );
  }

  const bestModelName = metrics?.best_model || "Decision Tree";
  const bestModelAccuracy = ((metrics?.[bestModelName] || 0) * 100).toFixed(1);

  const modelDetails = {
    "Logistic Regression": {
      algorithm: "LogisticRegression",
      library: "scikit-learn",
      hyperparameters: {
        "Solver": "lbfgs",
        "Max Iterations": "100",
        "Regularization (C)": "1.0",
        "Multi-class": "auto"
      },
      description: "Linear model that uses logistic function to model binary classification problems.",
      strengths: ["Fast training", "Interpretable", "Low risk of overfitting"],
      weaknesses: ["Assumes linear relationships", "May underfit complex patterns"],
      overfittingRisk: "Low",
      underfittingRisk: "Medium",
      featureCount: 12
    },
    "KNN": {
      algorithm: "KNeighborsClassifier",
      library: "scikit-learn",
      hyperparameters: {
        "Number of Neighbors (k)": "5",
        "Distance Metric": "Euclidean",
        "Weights": "Uniform",
        "Algorithm": "auto"
      },
      description: "Instance-based learning algorithm that classifies based on the majority vote of k nearest neighbors.",
      strengths: ["Simple and intuitive", "No training phase", "Effective for local patterns"],
      weaknesses: ["Slow prediction on large datasets", "Sensitive to irrelevant features"],
      overfittingRisk: "Low (when k is appropriate)",
      underfittingRisk: "Medium",
      featureCount: 12
    },
    "Decision Tree": {
      algorithm: "DecisionTreeClassifier",
      library: "scikit-learn",
      hyperparameters: {
        "Max Depth": "5",
        "Criterion": "gini",
        "Min Samples Split": "2",
        "Splitter": "best",
        "Min Samples Leaf": "1"
      },
      description: "Tree-based model that makes decisions by splitting data based on feature values.",
      strengths: ["Highly interpretable", "Handles non-linear relationships", "No feature scaling needed"],
      weaknesses: ["Can overfit without constraints", "Sensitive to data variations"],
      overfittingRisk: "Medium (controlled by max_depth=5)",
      underfittingRisk: "Low",
      featureCount: 12
    },
    "Random Forest": {
      algorithm: "RandomForestClassifier",
      library: "scikit-learn",
      hyperparameters: {
        "Number of Estimators": "100",
        "Max Depth": "None",
        "Min Samples Split": "2",
        "Min Samples Leaf": "1",
        "Bootstrap": "True"
      },
      description: "Ensemble method that combines multiple decision trees to improve prediction accuracy.",
      strengths: ["Reduces overfitting", "Handles non-linear patterns", "Feature importance"],
      weaknesses: ["Less interpretable", "Slower training", "More memory intensive"],
      overfittingRisk: "Low (ensemble effect)",
      underfittingRisk: "Low",
      featureCount: 12
    }
  };

  const details = modelDetails[bestModelName] || modelDetails["Decision Tree"];

  // Get current date for "Trained At"
  const trainedAt = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>Model Information</div>
            <h1 className={styles.heroTitle}>
              Model Details & Hyperparameters
            </h1>
            <p className={styles.heroSubtitle}>
              Comprehensive details about our best-performing machine learning model
            </p>
          </div>
        </div>
      </section>

      {/* Main Model Card */}
      <section className={styles.modelSection}>
        <div className={styles.container}>
          <div className={styles.modelCard}>
            {/* Model Header */}
            <div className={styles.modelHeader}>
              <div className={styles.modelTitleRow}>
                <Settings className={styles.modelIcon} size={32} />
                <h2 className={styles.modelName}>{bestModelName}</h2>
                <span className={styles.bestBadge}>
                  <Award size={16} />
                  Best
                </span>
              </div>
              <p className={styles.modelDescription}>{details.description}</p>
            </div>

            {/* Model Metadata */}
            <div className={styles.metadataSection}>
              <div className={styles.metadataItem}>
                <Brain className={styles.metadataIcon} size={20} />
                <span className={styles.metadataLabel}>Algorithm</span>
                <span className={styles.metadataValue}>{details.algorithm}</span>
              </div>
              <div className={styles.metadataItem}>
                <Layers className={styles.metadataIcon} size={20} />
                <span className={styles.metadataLabel}>Library</span>
                <span className={styles.metadataValue}>{details.library}</span>
              </div>
              {/* <div className={styles.metadataItem}>
                <Calendar className={styles.metadataIcon} size={20} />
                <span className={styles.metadataLabel}>Trained At</span>
                <span className={styles.metadataValue}>{trainedAt}</span>
              </div> */}
              <div className={styles.metadataItem}>
                <Database className={styles.metadataIcon} size={20} />
                <span className={styles.metadataLabel}>Feature Count</span>
                <span className={styles.metadataValue}>{details.featureCount}</span>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className={styles.performanceSection}>
              <h3 className={styles.sectionTitle}>
                <BarChart3 className={styles.titleIcon} size={24} />
                Performance
              </h3>
              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <div className={styles.metricValue}>{bestModelAccuracy}%</div>
                  <div className={styles.metricLabel}>Accuracy</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricValue}>N/A</div>
                  <div className={styles.metricLabel}>F1 Score</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricValue}>N/A</div>
                  <div className={styles.metricLabel}>ROC AUC</div>
                </div>
              </div>
            </div>

            {/* Hyperparameters */}
            <div className={styles.hyperparametersSection}>
              <h3 className={styles.sectionTitle}>
                <Settings className={styles.titleIcon} size={24} />
                Hyperparameters
              </h3>
              <div className={styles.hyperparametersGrid}>
                {Object.entries(details.hyperparameters).map(([key, value]) => (
                  <div key={key} className={styles.hyperparameterItem}>
                    <div className={styles.hyperparameterKey}>{key}</div>
                    <div className={styles.hyperparameterValue}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div className={styles.strengthsSection}>
              <h3 className={styles.sectionTitle}>
                <TrendingUp className={styles.titleIcon} size={24} />
                Strengths
              </h3>
              <ul className={styles.strengthsList}>
                {details.strengths.map((strength, idx) => (
                  <li key={idx}>
                    <CheckCircle2 className={styles.checkIcon} size={20} />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitations */}
            <div className={styles.limitationsSection}>
              <h3 className={styles.sectionTitle}>
                <TrendingDown className={styles.titleIcon} size={24} />
                Limitations
              </h3>
              <ul className={styles.limitationsList}>
                {details.weaknesses.map((weakness, idx) => (
                  <li key={idx}>
                    <AlertTriangle className={styles.warningIcon} size={20} />
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>

            {/* Overfitting & Underfitting Analysis */}
            <div className={styles.fitAnalysisSection}>
              <h3 className={styles.sectionTitle}>
                <Activity className={styles.titleIcon} size={24} />
                Overfitting & Underfitting Analysis
              </h3>
              <div className={styles.fitGrid}>
                <div className={`${styles.fitCard} ${
                  details.overfittingRisk === "Low" ? styles.lowRisk :
                  details.overfittingRisk.includes("Medium") ? styles.mediumRisk : styles.highRisk
                }`}>
                  <div className={styles.fitLabel}>OVERFITTING RISK</div>
                  <div className={styles.fitValue}>{details.overfittingRisk}</div>
                </div>
                <div className={`${styles.fitCard} ${
                  details.underfittingRisk === "Low" ? styles.lowRisk :
                  details.underfittingRisk === "Medium" ? styles.mediumRisk : styles.highRisk
                }`}>
                  <div className={styles.fitLabel}>UNDERFITTING RISK</div>
                  <div className={styles.fitValue}>{details.underfittingRisk}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <Target className={styles.ctaIcon} size={48} />
            <h2>Ready to Get Your Assessment?</h2>
            <p>Use our best-performing model to get an instant cardiovascular risk prediction</p>
            <Link href="/form">
              <button className={styles.ctaButton}>
                Start Assessment Now
                <Zap className={styles.ctaArrow} size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
