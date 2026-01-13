"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, BarChart3, Search, Lightbulb, Target, Lock, Zap, AlertCircle, User, Heart, Ruler, FlaskConical, Activity, Brain } from "lucide-react";
import styles from "./page.module.css";

export default function Report() {
  const [prediction, setPrediction] = useState(null);
  const [probability, setProbability] = useState(null);
  const [riskLevel, setRiskLevel] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const result = sessionStorage.getItem("prediction");
    const prob = sessionStorage.getItem("probability");
    const risk = sessionStorage.getItem("risk_level");
    const data = sessionStorage.getItem("patientData");
    
    if (result !== null) {
      setPrediction(parseInt(result));
      setProbability(prob ? parseFloat(prob) : null);
      setRiskLevel(risk);
      if (data) {
        setPatientData(JSON.parse(data));
      }
    } else {
      router.push("/form");
    }
  }, [router]);

  if (prediction === null) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Generating your report...</p>
      </div>
    );
  }

  // Determine risk level based on probability ranges
  const getRiskInfo = () => {
    if (probability > 70) {
      return {
        riskClass: "highRisk",
        title: "High Cardiovascular Risk",
        badge: "HIGH RISK DETECTED",
        icon: "high"
      };
    } else if (probability > 30) {
      return {
        riskClass: "moderateRisk",
        title: "Moderate Cardiovascular Risk",
        badge: "MODERATE RISK DETECTED",
        icon: "moderate"
      };
    } else {
      return {
        riskClass: "lowRisk",
        title: "Low Cardiovascular Risk",
        badge: "HEALTHY STATUS",
        icon: "low"
      };
    }
  };

  const riskInfo = getRiskInfo();

  const handleNewAssessment = () => {
    sessionStorage.removeItem("prediction");
    sessionStorage.removeItem("probability");
    sessionStorage.removeItem("risk_level");
    sessionStorage.removeItem("patientData");
    router.push("/form");
  };

  const handleBackToDashboard = () => {
    sessionStorage.removeItem("prediction");
    sessionStorage.removeItem("probability");
    sessionStorage.removeItem("risk_level");
    sessionStorage.removeItem("patientData");
    router.push("/");
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>AI-Powered Analysis Complete</div>
            <h1 className={styles.heroTitle}>Your Risk Assessment Report</h1>
            <p className={styles.heroSubtitle}>
              Based on comprehensive analysis of your health data using advanced machine learning algorithms
            </p>
          </div>
        </div>
      </section>

      {/* Result Section */}
      <section className={styles.resultSection}>
        <div className={styles.container}>
          <div className={styles.resultCard}>
            <div
              className={`${styles.resultHeader} ${styles[riskInfo.riskClass]}`}
            >
              <div className={styles.resultIcon}>
                {probability > 70 ? (
                  <AlertTriangle className={styles.warningIcon} size={80} />
                ) : probability > 30 ? (
                  <AlertCircle className={styles.moderateIcon} size={80} />
                ) : (
                  <CheckCircle2 className={styles.successIcon} size={100} />
                )}
              </div>
              <h2 className={styles.resultTitle}>
                {riskInfo.title}
              </h2>
              <div className={styles.riskBadge}>
                {riskInfo.badge}
              </div>
              {probability && (
                <div className={styles.probabilityScore}>
                  <span className={styles.scoreLabel}>Risk Probability:</span>
                  <span className={styles.scoreValue}>{probability.toFixed(2)}%</span>
                </div>
              )}
            </div>

            <div className={styles.resultBody}>
              {/* Interpretation Section */}
              <div className={styles.interpretationSection}>
                <h3 className={styles.sectionTitle}>
                  <BarChart3 className={styles.icon} size={32} />
                  What This Means
                </h3>
                {probability > 70 ? (
                  <div className={styles.content}>
                    <p>
                      Based on the comprehensive analysis of your health data, our AI model has identified patterns and correlations that suggest a <strong>high risk for cardiovascular disease</strong>. This predictive assessment indicates that your current health parameters fall into ranges associated with significantly elevated cardiovascular risk.
                    </p>
                    <p>
                      This is a screening tool and should be used as an early warning system. The prediction is based on statistical patterns found in large datasets and does not constitute a medical diagnosis. Please consult with a healthcare professional for comprehensive evaluation.
                    </p>
                  </div>
                ) : probability > 30 ? (
                  <div className={styles.content}>
                    <p>
                      Based on your health data analysis, our AI model indicates a <strong>moderate risk for cardiovascular disease</strong>. Your current health parameters show some risk factors that warrant attention and proactive health management.
                    </p>
                    <p>
                      While not immediately concerning, these findings suggest the need for lifestyle modifications and regular monitoring. Consider discussing these results with your healthcare provider to develop a personalized prevention plan.
                    </p>
                  </div>
                ) : (
                  <div className={styles.content}>
                    <p>
                      Excellent news! Based on your health data analysis, our AI model indicates a <strong>lower risk for cardiovascular disease</strong>. Your current health parameters fall within favorable ranges that are associated with better cardiovascular health outcomes.
                    </p>
                    <p>
                      While this is encouraging, it's important to maintain these healthy metrics through continued lifestyle management and regular health monitoring.
                    </p>
                  </div>
                )}
              </div>

              {/* Risk Factors Analysis */}
              <div className={styles.analysisSection}>
                <h3 className={styles.sectionTitle}>
                  <Search className={styles.icon} size={32} />
                  Key Factors Analyzed
                </h3>
                <div className={styles.factorsGrid}>
                  <div className={styles.factorCard}>
                    <User className={styles.factorIcon} size={40} />
                    <div className={styles.factorInfo}>
                      <h4>Demographics</h4>
                      <p>Age and gender patterns analyzed</p>
                    </div>
                  </div>
                  <div className={styles.factorCard}>
                    <Heart className={styles.factorIcon} size={40} />
                    <div className={styles.factorInfo}>
                      <h4>Blood Pressure</h4>
                      <p>Systolic and diastolic readings</p>
                    </div>
                  </div>
                  <div className={styles.factorCard}>
                    <Ruler className={styles.factorIcon} size={40} />
                    <div className={styles.factorInfo}>
                      <h4>Body Metrics</h4>
                      <p>Height, weight, and BMI calculated</p>
                    </div>
                  </div>
                  <div className={styles.factorCard}>
                    <FlaskConical className={styles.factorIcon} size={40} />
                    <div className={styles.factorInfo}>
                      <h4>Lab Results</h4>
                      <p>Cholesterol and glucose levels</p>
                    </div>
                  </div>
                  <div className={styles.factorCard}>
                    <Activity className={styles.factorIcon} size={40} />
                    <div className={styles.factorInfo}>
                      <h4>Lifestyle</h4>
                      <p>Activity, smoking, alcohol habits</p>
                    </div>
                  </div>
                  <div className={styles.factorCard}>
                    <Brain className={styles.factorIcon} size={40} />
                    <div className={styles.factorInfo}>
                      <h4>AI Analysis</h4>
                      <p>Pattern recognition algorithms</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className={styles.recommendationsSection}>
                <h3 className={styles.sectionTitle}>
                  <Lightbulb className={styles.icon} size={32} />
                  Recommended Actions
                </h3>
                {probability > 70 ? (
                  <div className={styles.recommendationsList}>
                    <div className={styles.recommendationCard}>
                      <div className={styles.recommendationNumber}>1</div>
                      <div className={styles.recommendationContent}>
                        <h4>Consult a Healthcare Professional</h4>
                        <p>
                          Schedule an appointment with a cardiologist or your primary care physician to discuss these results and undergo comprehensive cardiovascular screening.
                        </p>
                      </div>
                    </div>
                    <div className={styles.recommendationCard}>
                      <div className={styles.recommendationNumber}>2</div>
                      <div className={styles.recommendationContent}>
                        <h4>Get Comprehensive Testing</h4>
                        <p>
                          Consider advanced diagnostic tests such as ECG, echocardiogram, stress test, and detailed lipid panel to assess your cardiovascular health thoroughly.
                        </p>
                      </div>
                    </div>
                    <div className={styles.recommendationCard}>
                      <div className={styles.recommendationNumber}>3</div>
                      <div className={styles.recommendationContent}>
                        <h4>Lifestyle Modifications</h4>
                        <p>
                          Work with your healthcare provider to develop a personalized plan addressing diet, exercise, stress management, and any modifiable risk factors.
                        </p>
                      </div>
                    </div>
                    <div className={styles.recommendationCard}>
                      <div className={styles.recommendationNumber}>4</div>
                      <div className={styles.recommendationContent}>
                        <h4>Monitor Vital Signs Regularly</h4>
                        <p>
                          Keep track of your blood pressure, cholesterol, glucose levels, and weight. Regular monitoring helps detect changes early.
                        </p>
                      </div>
                    </div>
                    <div className={styles.recommendationCard}>
                      <div className={styles.recommendationNumber}>5</div>
                      <div className={styles.recommendationContent}>
                        <h4>Consider Preventive Measures</h4>
                        <p>
                          Discuss preventive medication options, dietary supplements, and therapeutic interventions with your healthcare provider.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : probability > 30 ? (
                  <div className={styles.recommendationsList}>
                    <div className={styles.recommendationCard}>
                      <div className={styles.recommendationNumber}>1</div>
                      <div className={styles.recommendationContent}>
                        <h4>Schedule Medical Consultation</h4>
                        <p>
                          Consult with your healthcare provider to discuss these moderate risk findings and determine the best course of action for your specific situation.
                        </p>
                      </div>
                    </div>
                    <div className={styles.recommendationCard}>
                      <div className={styles.recommendationNumber}>2</div>
                      <div className={styles.recommendationContent}>
                        <h4>Regular Health Monitoring</h4>
                        <p>
                          Increase the frequency of blood pressure and cholesterol checks. Consider more frequent cardiovascular screenings based on your doctor's recommendation.
                        </p>
                      </div>
                    </div>
                    <div className={styles.recommendationCard}>
                      <div className={styles.recommendationNumber}>3</div>
                      <div className={styles.recommendationContent}>
                        <h4>Lifestyle Optimization</h4>
                        <p>
                          Focus on weight management, regular exercise, smoking cessation (if applicable), and dietary improvements to address identified risk factors.
                        </p>
                      </div>
                    </div>
                    <div className={styles.recommendationCard}>
                      <div className={styles.recommendationNumber}>4</div>
                      <div className={styles.recommendationContent}>
                        <h4>Risk Factor Assessment</h4>
                        <p>
                          Work with your doctor to identify and address specific risk factors such as hypertension, dyslipidemia, or prediabetes through targeted interventions.
                        </p>
                      </div>
                    </div>
                    <div className={styles.recommendationCard}>
                      <div className={styles.recommendationNumber}>5</div>
                      <div className={styles.recommendationContent}>
                        <h4>Follow-up Evaluation</h4>
                        <p>
                          Schedule a follow-up assessment in 3-6 months to evaluate the effectiveness of implemented changes and adjust your health management plan.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.recommendationsList}>
                    <div className={styles.recommendationCard}>
                      <div className={styles.recommendationNumber}>1</div>
                      <div className={styles.recommendationContent}>
                        <h4>Maintain Regular Check-ups</h4>
                        <p>
                          Continue scheduling annual health screenings and cardiovascular assessments to ensure your heart health remains optimal.
                        </p>
                      </div>
                    </div>
                    <div className={styles.recommendationCard}>
                      <div className={styles.recommendationNumber}>2</div>
                      <div className={styles.recommendationContent}>
                        <h4>Continue Physical Activity</h4>
                        <p>
                          Maintain at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity per week for optimal cardiovascular health.
                        </p>
                      </div>
                    </div>
                    <div className={styles.recommendationCard}>
                      <div className={styles.recommendationNumber}>3</div>
                      <div className={styles.recommendationContent}>
                        <h4>Heart-Healthy Diet</h4>
                        <p>
                          Continue eating a balanced diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats while limiting sodium and saturated fats.
                        </p>
                      </div>
                    </div>
                    <div className={styles.recommendationCard}>
                      <div className={styles.recommendationNumber}>4</div>
                      <div className={styles.recommendationContent}>
                        <h4>Monitor Your Metrics</h4>
                        <p>
                          Keep tracking your blood pressure, cholesterol, and glucose levels periodically to catch any changes early.
                        </p>
                      </div>
                    </div>
                    <div className={styles.recommendationCard}>
                      <div className={styles.recommendationNumber}>5</div>
                      <div className={styles.recommendationContent}>
                        <h4>Healthy Lifestyle Choices</h4>
                        <p>
                          Avoid smoking, limit alcohol consumption, manage stress effectively, and maintain a healthy weight to protect your heart.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className={styles.infoBoxes}>
                <div className={styles.infoBox}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <Target size={24} />
                    <h4>Model Accuracy</h4>
                  </div>
                  <p>
                    Our AI models have been trained on over 70,000 patient records and achieve up to 73% accuracy in cardiovascular risk prediction.
                  </p>
                </div>
                <div className={styles.infoBox}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <Lock size={24} />
                    <h4>Your Privacy</h4>
                  </div>
                  <p>
                    Your assessment data is processed in real-time and is not stored on our servers. Your privacy and confidentiality are fully protected.
                  </p>
                </div>
                <div className={styles.infoBox}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <Zap size={24} />
                    <h4>Next Steps</h4>
                  </div>
                  <p>
                    Download or save this report to discuss with your healthcare provider. They can provide personalized medical advice based on your complete health history.
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className={styles.disclaimer}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <AlertCircle size={24} />
                  <h4>Important Medical Disclaimer</h4>
                </div>
                <p>
                  This assessment is for <strong>educational and informational purposes only</strong> and is not a substitute for professional medical advice, diagnosis, or treatment. The prediction is based on statistical models and should not be considered a definitive diagnosis. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read in this report.
                </p>
                <p>
                  If you are experiencing chest pain, shortness of breath, or other cardiac symptoms, seek immediate medical attention or call emergency services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className={styles.actionSection}>
        <div className={styles.container}>
          <div className={styles.actionButtons}>
            <button onClick={handleNewAssessment} className={styles.primaryButton}>
              New Assessment
              <span className={styles.arrow}>→</span>
            </button>
            <button onClick={handleBackToDashboard} className={styles.secondaryButton}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>© 2026 CardioPredict AI - Advanced Cardiovascular Risk Assessment Platform</p>
          <p className={styles.footerNote}>
            For educational purposes only. Not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
