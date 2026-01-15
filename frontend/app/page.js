"use client";

import { Award, BarChart3, Brain, Database, Github, Heart, Lightbulb, Linkedin, Lock, Mail, Target, Twitter, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://cardio-health-risk-assessment.onrender.com";

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch(`${API_URL}/model-metrics`);
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
        <p>Loading model metrics...</p>
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

  const modelData = Object.entries(metrics || {})
    .filter(([key]) => key !== "best_model")
    .map(([name, accuracy]) => ({
      name,
      accuracy: (accuracy * 100).toFixed(2),
      isBest: name === metrics?.best_model,
    }))
    .sort((a, b) => {
      // Sort best model first
      if (a.isBest) return -1;
      if (b.isBest) return 1;
      return 0;
    });

  const avgAccuracy = (
    modelData.reduce((sum, m) => sum + parseFloat(m.accuracy), 0) / modelData.length
  ).toFixed(1);

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>AI-Powered Health Assessment</div>
          <h1 className={styles.heroTitle}>
            Cardiovascular Risk Prediction System
          </h1>
          <p className={styles.heroSubtitle}>
            Advanced machine learning models analyze your health data to provide accurate cardiovascular disease risk predictions. Take control of your heart health with AI-driven insights.
          </p>
          <div className={styles.heroCTA}>
            <Link href="/form">
              <button className={styles.primaryButton}>
                Start Assessment Now
                <span className={styles.arrow}>→</span>
              </button>
            </Link>
            <Link href="/about">
              <button className={styles.secondaryButton}>
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={`${styles.statCard} ${styles.stagger1}`}>
              <div className={styles.statIcon}>
                <Database size={48} />
              </div>
              <div className={styles.statValue}>70,000+</div>
              <div className={styles.statLabel}>Patient Records</div>
            </div>
            <div className={`${styles.statCard} ${styles.stagger2}`}>
              <div className={styles.statIcon}>
                <Target size={48} />
              </div>
              <div className={styles.statValue}>{avgAccuracy}%</div>
              <div className={styles.statLabel}>Average Accuracy</div>
            </div>
            <div className={`${styles.statCard} ${styles.stagger3}`}>
              <div className={styles.statIcon}>
                <Zap size={48} />
              </div>
              <div className={styles.statValue}>11</div>
              <div className={styles.statLabel}>Risk Factors</div>
            </div>
            <div className={`${styles.statCard} ${styles.stagger4}`}>
              <div className={styles.statIcon}>
                <Lock size={48} />
              </div>
              <div className={styles.statValue}>100%</div>
              <div className={styles.statLabel}>Data Secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Performance Section */}
      <section className={styles.modelsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Model Performance Metrics</h2>
            <p className={styles.sectionSubtitle}>
              Compare accuracy across multiple machine learning algorithms trained on extensive cardiovascular datasets
            </p>
          </div>
          <div className={styles.modelsGrid}>
            {modelData.map((model, index) => (
              <div
                key={index}
                className={`${styles.modelCard} ${
                  model.isBest ? styles.bestModelCard : ""
                }`}
              >
                {model.isBest && (
                  <div className={styles.bestBadge}>
                    <Award size={16} style={{ marginRight: '6px' }} />
                    <span>Best Model</span>
                  </div>
                )}
                <div className={styles.modelHeader}>
                  <h3 className={styles.modelName}>{model.name}</h3>
                </div>
                <div className={styles.accuracyCircle}>
                  <svg className={styles.progressRing} width="140" height="140" viewBox="0 0 140 140">
                    <circle
                      className={styles.progressRingCircle}
                      stroke="#e0e0e0"
                      strokeWidth="10"
                      fill="transparent"
                      r="60"
                      cx="70"
                      cy="70"
                    />
                    <circle
                      className={styles.progressRingCircle}
                      stroke={model.isBest ? "#f39c12" : "#667eea"}
                      strokeWidth="10"
                      fill="transparent"
                      r="60"
                      cx="70"
                      cy="70"
                      strokeDasharray={`${(parseFloat(model.accuracy) / 100) * 376.99} 376.99`}
                      strokeLinecap="round"
                      transform="rotate(-90 70 70)"
                    />
                  </svg>
                  <div className={styles.accuracyText}>
                    <span className={styles.accuracyValue}>{model.accuracy}%</span>
                    <span className={styles.accuracyLabel}>Accuracy</span>
                  </div>
                </div>
                <p className={styles.modelDescription}>
                  {model.isBest
                    ? "Optimal performance for cardiovascular risk assessment"
                    : "Trained on 70K+ clinical patient records"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why Choose Our Platform?</h2>
            <p className={styles.sectionSubtitle}>
              Cutting-edge technology meets medical expertise for reliable heart health insights
            </p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={`${styles.featureCard} ${styles.stagger1}`}>
              <div className={styles.featureIcon}>
                <Brain size={56} />
              </div>
              <h3 className={styles.featureTitle}>Advanced ML Models</h3>
              <p className={styles.featureDescription}>
                Multiple algorithms including Random Forest, Decision Tree, KNN, and Logistic Regression for comprehensive analysis
              </p>
            </div>
            <div className={`${styles.featureCard} ${styles.stagger2}`}>
              <div className={styles.featureIcon}>
                <Zap size={56} />
              </div>
              <h3 className={styles.featureTitle}>Instant Results</h3>
              <p className={styles.featureDescription}>
                Get your cardiovascular risk assessment in seconds with real-time AI processing and immediate feedback
              </p>
            </div>
            <div className={`${styles.featureCard} ${styles.stagger3}`}>
              <div className={styles.featureIcon}>
                <Lock size={56} />
              </div>
              <h3 className={styles.featureTitle}>Privacy First</h3>
              <p className={styles.featureDescription}>
                Your health data is processed securely with no permanent storage. Privacy and security are our top priorities
              </p>
            </div>
            <div className={`${styles.featureCard} ${styles.stagger4}`}>
              <div className={styles.featureIcon}>
                <BarChart3 size={56} />
              </div>
              <h3 className={styles.featureTitle}>Comprehensive Analysis</h3>
              <p className={styles.featureDescription}>
                Analyzes 11 critical risk factors including age, blood pressure, cholesterol, glucose, and lifestyle habits
              </p>
            </div>
            <div className={`${styles.featureCard} ${styles.stagger5}`}>
              <div className={styles.featureIcon}>
                <Target size={56} />
              </div>
              <h3 className={styles.featureTitle}>High Accuracy</h3>
              <p className={styles.featureDescription}>
                Models validated on extensive datasets achieving up to 73% accuracy on cardiovascular disease prediction
              </p>
            </div>
            <div className={`${styles.featureCard} ${styles.stagger6}`}>
              <div className={styles.featureIcon}>
                <Lightbulb size={56} />
              </div>
              <h3 className={styles.featureTitle}>Actionable Insights</h3>
              <p className={styles.featureDescription}>
                Receive detailed recommendations and next steps based on your personalized risk assessment results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorksSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              Get your heart disease risk assessment in three simple steps
            </p>
          </div>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>01</div>
              <h3 className={styles.stepTitle}>Enter Your Data</h3>
              <p className={styles.stepDescription}>
                Fill in the comprehensive health assessment form with your demographic information, body measurements, blood pressure readings, lab results, and lifestyle factors. All fields are required for accurate prediction.
              </p>
              <ul className={styles.stepList}>
                <li>Age, gender, height, and weight</li>
                <li>Systolic and diastolic blood pressure</li>
                <li>Cholesterol and glucose levels</li>
                <li>Smoking, alcohol, and physical activity</li>
              </ul>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>02</div>
              <h3 className={styles.stepTitle}>AI Analysis</h3>
              <p className={styles.stepDescription}>
                Our machine learning models process your data through multiple algorithms simultaneously. The best-performing model analyzes patterns and correlations to calculate your cardiovascular risk score with high precision.
              </p>
              <ul className={styles.stepList}>
                <li>Multi-algorithm processing</li>
                <li>Feature correlation analysis</li>
                <li>Pattern recognition and risk scoring</li>
                <li>Real-time computation in seconds</li>
              </ul>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>03</div>
              <h3 className={styles.stepTitle}>Get Results</h3>
              <p className={styles.stepDescription}>
                Receive an instant, comprehensive report with your risk level clearly indicated. The report includes contributing factors, detailed explanations, and personalized recommendations for next steps and preventive care.
              </p>
              <ul className={styles.stepList}>
                <li>Clear risk level indication</li>
                <li>Contributing factor analysis</li>
                <li>Personalized recommendations</li>
                <li>Actionable health insights</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Assess Your Heart Health?</h2>
            <p className={styles.ctaSubtitle}>
              Take the first step towards understanding your cardiovascular risk with our AI-powered assessment
            </p>
            <Link href="/form">
              <button className={styles.ctaButton}>
                Start Your Free Assessment
                <span className={styles.arrow}>→</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <Heart size={32} />
                <h3 className={styles.footerTitle}>CardioPredict AI</h3>
              </div>
              <p className={styles.footerDescription}>
                AI-powered cardiovascular disease prediction platform helping you understand and manage your heart health with cutting-edge technology.
              </p>
              <div className={styles.footerSocial}>
                <a href="#" className={styles.socialLink} aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="Email">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <h4 className={styles.footerColumnTitle}>Navigation</h4>
                <ul className={styles.footerList}>
                  <li><Link href="/">Dashboard</Link></li>
                  <li><Link href="/form">Assessment</Link></li>
                  <li><Link href="/models">Models</Link></li>
                  <li><Link href="/about">About</Link></li>
                </ul>
              </div>
              <div className={styles.footerColumn}>
                <h4 className={styles.footerColumnTitle}>Resources</h4>
                <ul className={styles.footerList}>
                  <li><Link href="/about">How It Works</Link></li>
                  <li><Link href="/models">Model Details</Link></li>
                  <li><Link href="/about">Technology Stack</Link></li>
                  <li><Link href="/about">Limitations</Link></li>
                </ul>
              </div>
              <div className={styles.footerColumn}>
                <h4 className={styles.footerColumnTitle}>Legal</h4>
                <ul className={styles.footerList}>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li>
                  <li><a href="#">Medical Disclaimer</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.copyright}>© 2026 CardioPredict AI. All rights reserved.</p>
            <p className={styles.disclaimer}>For educational purposes only. Not a substitute for professional medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
