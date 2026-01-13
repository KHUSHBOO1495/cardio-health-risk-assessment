"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, AlertTriangle, User, Ruler, Heart, FlaskConical, Activity, ArrowLeft, Zap, Target } from "lucide-react";
import styles from "./page.module.css";

export default function PatientForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    ap_hi: "",
    ap_lo: "",
    cholesterol: "",
    gluc: "",
    smoke: "",
    alco: "",
    active: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate all fields
    const emptyFields = Object.entries(formData).filter(([_, value]) => value === "");
    if (emptyFields.length > 0) {
      setError("Please fill in all fields to proceed with the assessment");
      setLoading(false);
      return;
    }

    // Convert to the format backend expects
    const payload = {
      age: parseInt(formData.age),
      gender: parseInt(formData.gender),
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      ap_hi: parseInt(formData.ap_hi),
      ap_lo: parseInt(formData.ap_lo),
      chol: parseInt(formData.cholesterol),  // Note: backend uses "chol"
      gluc: parseInt(formData.gluc),
      smoke: parseInt(formData.smoke),
      alco: parseInt(formData.alco),
      active: parseInt(formData.active),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Prediction failed. Please try again.");
      }

      const data = await response.json();
      // Backend returns: { probability: 72.45, risk_level: "High" or "Low" or "Medium" }
      // Convert risk_level to prediction format for report page
      // Convert probability to binary: 1 for Moderate/High risk (>30%), 0 for Low risk (≤30%)
      const prediction = data.probability > 30 ? 1 : 0;
      sessionStorage.setItem("prediction", prediction);
      sessionStorage.setItem("probability", data.probability);
      sessionStorage.setItem("risk_level", data.risk_level);
      sessionStorage.setItem("patientData", JSON.stringify(formData));
      router.push("/report");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      age: "",
      gender: "",
      height: "",
      weight: "",
      ap_hi: "",
      ap_lo: "",
      cholesterol: "",
      gluc: "",
      smoke: "",
      alco: "",
      active: "",
    });
    setError(null);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header Section */}
      <section className={styles.headerSection}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Heart Disease Risk Assessment</h1>
          <p className={styles.pageSubtitle}>
            Enter your health information below to receive an instant AI-powered prediction of your cardiovascular disease risk. All fields are required for accurate analysis.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formWrapper}>
            <div className={styles.formCard}>
              <div className={styles.infoBox}>
                <div className={styles.infoIcon}>
                  <Lock size={40} />
                </div>
                <div>
                  <h3>Your Data is Secure</h3>
                  <p>All information is processed securely and never stored permanently. Your privacy is our priority.</p>
                </div>
              </div>

              {error && (
                <div className={styles.errorAlert}>
                  <AlertTriangle className={styles.errorIcon} size={24} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Demographics Section */}
                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>
                    <User className={styles.sectionIcon} size={28} />
                    Demographics
                  </h2>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Age (years)
                        <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="e.g., 50"
                        min="1"
                        max="120"
                        required
                      />
                      <p className={styles.hint}>Your current age in years</p>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Gender
                        <span className={styles.required}>*</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={styles.select}
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="1">Female</option>
                        <option value="2">Male</option>
                      </select>
                      <p className={styles.hint}>Biological sex at birth</p>
                    </div>
                  </div>
                </div>

                {/* Body Measurements Section */}
                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>
                    <Ruler className={styles.sectionIcon} size={28} />
                    Body Measurements
                  </h2>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Height (cm)
                        <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="e.g., 170"
                        min="50"
                        max="250"
                        required
                      />
                      <p className={styles.hint}>Height in centimeters</p>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Weight (kg)
                        <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="e.g., 70"
                        min="20"
                        max="300"
                        required
                      />
                      <p className={styles.hint}>Weight in kilograms</p>
                    </div>
                  </div>
                </div>

                {/* Blood Pressure Section */}
                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>
                    <Heart className={styles.sectionIcon} size={28} />
                    Blood Pressure
                  </h2>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Systolic BP (ap_hi) - mm Hg
                        <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        name="ap_hi"
                        value={formData.ap_hi}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="e.g., 120"
                        min="60"
                        max="250"
                        required
                      />
                      <p className={styles.hint}>Upper number when measuring blood pressure</p>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Diastolic BP (ap_lo) - mm Hg
                        <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        name="ap_lo"
                        value={formData.ap_lo}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="e.g., 80"
                        min="40"
                        max="150"
                        required
                      />
                      <p className={styles.hint}>Lower number when measuring blood pressure</p>
                    </div>
                  </div>
                </div>

                {/* Lab Results Section */}
                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>
                    <FlaskConical className={styles.sectionIcon} size={28} />
                    Lab Results
                  </h2>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Cholesterol Level
                        <span className={styles.required}>*</span>
                      </label>
                      <select
                        name="cholesterol"
                        value={formData.cholesterol}
                        onChange={handleChange}
                        className={styles.select}
                        required
                      >
                        <option value="">Select cholesterol level</option>
                        <option value="1">Normal</option>
                        <option value="2">Above Normal</option>
                        <option value="3">Well Above Normal</option>
                      </select>
                      <p className={styles.hint}>Based on recent lab test results</p>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Glucose Level
                        <span className={styles.required}>*</span>
                      </label>
                      <select
                        name="gluc"
                        value={formData.gluc}
                        onChange={handleChange}
                        className={styles.select}
                        required
                      >
                        <option value="">Select glucose level</option>
                        <option value="1">Normal</option>
                        <option value="2">Above Normal</option>
                        <option value="3">Well Above Normal</option>
                      </select>
                      <p className={styles.hint}>Blood sugar levels from lab tests</p>
                    </div>
                  </div>
                </div>

                {/* Lifestyle Factors Section */}
                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>
                    <Activity className={styles.sectionIcon} size={28} />
                    Lifestyle Factors
                  </h2>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Smoker
                        <span className={styles.required}>*</span>
                      </label>
                      <select
                        name="smoke"
                        value={formData.smoke}
                        onChange={handleChange}
                        className={styles.select}
                        required
                      >
                        <option value="">Select option</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                      <p className={styles.hint}>Do you smoke cigarettes?</p>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Alcohol Intake
                        <span className={styles.required}>*</span>
                      </label>
                      <select
                        name="alco"
                        value={formData.alco}
                        onChange={handleChange}
                        className={styles.select}
                        required
                      >
                        <option value="">Select option</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                      <p className={styles.hint}>Regular alcohol consumption</p>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Physical Activity
                        <span className={styles.required}>*</span>
                      </label>
                      <select
                        name="active"
                        value={formData.active}
                        onChange={handleChange}
                        className={styles.select}
                        required
                      >
                        <option value="">Select option</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                      <p className={styles.hint}>Regular physical exercise</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    onClick={handleClear}
                    className={styles.clearButton}
                    disabled={loading}
                  >
                    Clear Form
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className={styles.spinner}></span>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Get Prediction
                        <span className={styles.arrow}>→</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className={styles.disclaimer}>
                <strong>Medical Disclaimer:</strong> This tool is for educational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for medical decisions.
              </div>
            </div>

            {/* Info Sidebar */}
            <div className={styles.infoSidebar}>
              <div className={styles.sidebarCard}>
                <h3>Why These Factors?</h3>
                <p>Our AI model analyzes 11 critical health parameters that have been scientifically proven to correlate with cardiovascular disease risk.</p>
              </div>

              <div className={styles.sidebarCard}>
                <h3>How Accurate Is It?</h3>
                <p>Our models achieve up to 73% accuracy, trained on over 70,000 patient records using state-of-the-art machine learning algorithms.</p>
              </div>

              <div className={styles.sidebarCard}>
                <h3>What Happens Next?</h3>
                <p>After submission, our AI instantly processes your data and generates a comprehensive risk assessment with personalized recommendations.</p>
              </div>

              <div className={styles.sidebarCard}>
                <div className={styles.statBox}>
                  <Zap className={styles.statIcon} size={32} />
                  <div className={styles.statValue}>Instant</div>
                  <div className={styles.statLabel}>Results in Seconds</div>
                </div>
                <div className={styles.statBox}>
                  <Lock className={styles.statIcon} size={32} />
                  <div className={styles.statValue}>Secure</div>
                  <div className={styles.statLabel}>No Data Stored</div>
                </div>
                <div className={styles.statBox}>
                  <Target className={styles.statIcon} size={32} />
                  <div className={styles.statValue}>73%</div>
                  <div className={styles.statLabel}>Model Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
