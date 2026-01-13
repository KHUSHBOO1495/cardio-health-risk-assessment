"use client";

import Link from "next/link";
import { User, Heart, Ruler, FlaskConical, Activity, Scale, AlertCircle } from "lucide-react";
import styles from "./page.module.css";

export default function About() {
  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>Learn More About CardioPredict AI</div>
            <h1 className={styles.heroTitle}>
              Advanced AI for Cardiovascular Health
            </h1>
            <p className={styles.heroSubtitle}>
              Understanding how machine learning helps predict heart disease risk and saves lives through early detection
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            <div className={styles.contentBlock}>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p className={styles.text}>
                CardioPredict AI is an advanced machine learning platform designed to democratize cardiovascular disease risk assessment. Our mission is to provide accessible, accurate, and instant heart health predictions using cutting-edge artificial intelligence technology.
              </p>
              <p className={styles.text}>
                By analyzing 11 critical health parameters through multiple ML algorithms, we empower individuals to take proactive steps toward better cardiovascular health. Early detection can save lives, and our AI makes that possible in seconds.
              </p>
            </div>
            <div className={styles.statsBox}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>70,000+</div>
                <div className={styles.statLabel}>Training Records</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>73%</div>
                <div className={styles.statLabel}>Peak Accuracy</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>4</div>
                <div className={styles.statLabel}>ML Algorithms</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>11</div>
                <div className={styles.statLabel}>Risk Factors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorksSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>How Our AI Works</h2>
          <p className={styles.sectionSubtitle}>
            A sophisticated pipeline combining data science, machine learning, and medical expertise
          </p>

          <div className={styles.processSteps}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>01</div>
              <div className={styles.stepContent}>
                <h3>Data Collection & Preprocessing</h3>
                <p>
                  Our model was trained on the <strong>Cardiovascular Disease Dataset</strong> containing over 70,000 patient records. Each record includes demographic information, body measurements, blood pressure readings, lab results, and lifestyle factors.
                </p>
                <ul className={styles.featureList}>
                  <li>Data cleaning and outlier removal</li>
                  <li>BMI calculation from height and weight</li>
                  <li>Feature scaling and normalization</li>
                  <li>Train-test split for validation</li>
                </ul>
              </div>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>02</div>
              <div className={styles.stepContent}>
                <h3>Model Training & Comparison</h3>
                <p>
                  We train and compare <strong>four different machine learning algorithms</strong> to identify the best performer for cardiovascular risk prediction:
                </p>
                <div className={styles.modelGrid}>
                  <div className={styles.modelBox}>
                    <strong>Logistic Regression</strong>
                    <p>Linear probabilistic model for binary classification</p>
                  </div>
                  <div className={styles.modelBox}>
                    <strong>K-Nearest Neighbors</strong>
                    <p>Instance-based learning using similarity metrics</p>
                  </div>
                  <div className={styles.modelBox}>
                    <strong>Decision Tree</strong>
                    <p>Tree-based model with interpretable decision rules</p>
                  </div>
                  <div className={styles.modelBox}>
                    <strong>Random Forest</strong>
                    <p>Ensemble method combining multiple decision trees</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.processStep}>
              <div className={styles.stepNumber}>03</div>
              <div className={styles.stepContent}>
                <h3>Real-Time Prediction</h3>
                <p>
                  When you submit your health data, our system processes it through the best-performing model (typically <strong>Decision Tree with 73.3% accuracy</strong>) to generate instant predictions.
                </p>
                <ul className={styles.featureList}>
                  <li>Input validation and preprocessing</li>
                  <li>Feature scaling using saved scaler</li>
                  <li>Probability calculation via trained model</li>
                  <li>Risk classification with clinical thresholds</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Factors Section */}
      <section className={styles.riskFactorsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>11 Risk Factors Analyzed</h2>
          <p className={styles.sectionSubtitle}>
            Comprehensive health parameters that influence cardiovascular disease risk
          </p>

          <div className={styles.factorsGrid}>
            <div className={styles.factorCard}>
              <User className={styles.factorIcon} size={48} />
              <h3>Age</h3>
              <p>Risk increases with age, especially after 45 for men and 55 for women</p>
            </div>

            <div className={styles.factorCard}>
              <User className={styles.factorIcon} size={48} />
              <h3>Gender</h3>
              <p>Men have higher risk earlier; women's risk increases after menopause</p>
            </div>

            <div className={styles.factorCard}>
              <Ruler className={styles.factorIcon} size={48} />
              <h3>Height & Weight</h3>
              <p>Used to calculate BMI, a key indicator of obesity and cardiovascular stress</p>
            </div>

            <div className={styles.factorCard}>
              <Heart className={styles.factorIcon} size={48} />
              <h3>Systolic Blood Pressure</h3>
              <p>Upper reading; values above 130 indicate hypertension</p>
            </div>

            <div className={styles.factorCard}>
              <Heart className={styles.factorIcon} size={48} />
              <h3>Diastolic Blood Pressure</h3>
              <p>Lower reading; values above 80 suggest cardiovascular strain</p>
            </div>

            <div className={styles.factorCard}>
              <FlaskConical className={styles.factorIcon} size={48} />
              <h3>Cholesterol</h3>
              <p>High cholesterol causes plaque buildup in arteries, increasing heart disease risk</p>
            </div>

            <div className={styles.factorCard}>
              <FlaskConical className={styles.factorIcon} size={48} />
              <h3>Glucose</h3>
              <p>Elevated blood sugar damages blood vessels and increases cardiovascular risk</p>
            </div>

            <div className={styles.factorCard}>
              <Activity className={styles.factorIcon} size={48} />
              <h3>Smoking</h3>
              <p>Significantly increases risk by damaging blood vessels and reducing oxygen</p>
            </div>

            <div className={styles.factorCard}>
              <Activity className={styles.factorIcon} size={48} />
              <h3>Alcohol</h3>
              <p>Excessive alcohol consumption raises blood pressure and weakens heart muscle</p>
            </div>

            <div className={styles.factorCard}>
              <Activity className={styles.factorIcon} size={48} />
              <h3>Physical Activity</h3>
              <p>Regular exercise strengthens the heart and improves cardiovascular health</p>
            </div>

            <div className={styles.factorCard}>
              <Scale className={styles.factorIcon} size={48} />
              <h3>BMI (Calculated)</h3>
              <p>Body Mass Index indicates if weight is within healthy range for height</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className={styles.techSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Technology Stack</h2>
          <p className={styles.sectionSubtitle}>
            Built with modern tools and frameworks for reliability and performance
          </p>

          <div className={styles.techGrid}>
            <div className={styles.techCategory}>
              <h3>Backend & AI</h3>
              <div className={styles.techItems}>
                <div className={styles.techItem}>
                  <strong>Python 3.x</strong>
                  <p>Core programming language</p>
                </div>
                <div className={styles.techItem}>
                  <strong>FastAPI</strong>
                  <p>High-performance REST API framework</p>
                </div>
                <div className={styles.techItem}>
                  <strong>Scikit-learn</strong>
                  <p>Machine learning library for model training</p>
                </div>
                <div className={styles.techItem}>
                  <strong>Pandas & NumPy</strong>
                  <p>Data manipulation and numerical computing</p>
                </div>
              </div>
            </div>

            <div className={styles.techCategory}>
              <h3>Frontend</h3>
              <div className={styles.techItems}>
                <div className={styles.techItem}>
                  <strong>Next.js 16</strong>
                  <p>React framework with App Router</p>
                </div>
                <div className={styles.techItem}>
                  <strong>React 18</strong>
                  <p>UI component library</p>
                </div>
                <div className={styles.techItem}>
                  <strong>CSS Modules</strong>
                  <p>Scoped styling solution</p>
                </div>
                <div className={styles.techItem}>
                  <strong>JavaScript ES6+</strong>
                  <p>Modern JavaScript features</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limitations Section */}
      <section className={styles.limitationsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Important Limitations & Disclaimers</h2>
          
          <div className={styles.warningBox}>
            <AlertCircle className={styles.warningIcon} size={56} />
            <div className={styles.warningContent}>
              <h3>Not a Medical Diagnosis</h3>
              <p>
                CardioPredict AI is an <strong>educational tool</strong> and should never replace professional medical advice, diagnosis, or treatment.
              </p>
            </div>
          </div>

          <div className={styles.limitationsList}>
            <div className={styles.limitationItem}>
              <strong>73% Accuracy</strong>
              <p>Roughly 1 in 4 predictions may be incorrect. Always consult healthcare professionals.</p>
            </div>

            <div className={styles.limitationItem}>
              <strong>Limited Factors</strong>
              <p>Real cardiovascular risk involves many more factors not captured here.</p>
            </div>

            <div className={styles.limitationItem}>
              <strong>Training Data Bias</strong>
              <p>Model performance may vary across different populations and demographics.</p>
            </div>
          </div>

          <div className={styles.actionBox}>
            <h3>Emergency Symptoms</h3>
            <p><strong>Call emergency services immediately if experiencing chest pain, shortness of breath, or other cardiac symptoms.</strong></p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Assess Your Heart Health?</h2>
            <p className={styles.ctaSubtitle}>
              Get instant AI-powered cardiovascular risk prediction in under 2 minutes
            </p>
            <Link href="/form">
              <button className={styles.ctaButton}>
                Start Free Assessment
                <span className={styles.arrow}>→</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
