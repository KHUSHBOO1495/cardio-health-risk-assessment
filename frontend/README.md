# CardioPredict AI - Frontend

🚀 **Professional Next.js frontend for cardiovascular disease risk prediction**

A modern, feature-rich web application that provides AI-powered cardiovascular health risk assessment with beautiful UI/UX design.

## 🎯 Features

### 🏠 Dashboard Page
- **Hero Section** with compelling call-to-action
- **Live Statistics** displaying 70K+ patient records, model accuracy, risk factors
- **Model Performance Metrics** with visual circular progress indicators
- **Best Model Highlighting** with special badges and styling
- **Why Choose Us** section with 6 feature cards
- **How It Works** detailed 3-step process explanation
- **Professional Footer** with quick links and resources

### 📋 Assessment Form Page
- **Comprehensive 11-parameter Form** with organized sections:
  - Demographics (Age, Gender)
  - Body Measurements (Height, Weight)
  - Blood Pressure (Systolic, Diastolic)
  - Lab Results (Cholesterol, Glucose)
  - Lifestyle Factors (Smoking, Alcohol, Physical Activity)
- **Input Validation** with helpful hints and error messages
- **Information Sidebar** with contextual help
- **Real-time Statistics** showing accuracy and security
- **Security Assurance** messaging
- **Loading States** with smooth animations

### 📊 Report Page
- **Risk Level Display** with color-coded results (Red/Green)
- **Detailed Interpretation** of prediction results
- **Key Factors Analysis** showing all analyzed parameters
- **Personalized Recommendations** (5 detailed action items)
- **Model Accuracy Information** and privacy assurance
- **Medical Disclaimer** with comprehensive warnings
- **Professional Report Layout** suitable for sharing with doctors

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript (ES6+)
- **Styling:** CSS Modules (No Tailwind)
- **API:** Fetch API for backend integration
- **State Management:** React Hooks (useState, useEffect)
- **Storage:** SessionStorage for prediction data

## 📦 Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

## 🌐 Backend Requirements

The backend API must be running on `http://127.0.0.1:8000` with the following endpoints:

### GET /model-metrics
Returns model accuracy metrics:
```json
{
  "Logistic Regression": 0.72,
  "KNN": 0.651,
  "Decision Tree": 0.733,
  "Random Forest": 0.714,
  "best_model": "Decision Tree"
}
```

### POST /predict
Accepts patient data and returns risk prediction:
```json
// Request
{
  "features": [age, gender, height, weight, ap_hi, ap_lo, cholesterol, gluc, smoke, alco, active]
}

// Response
{
  "prediction": 0 or 1
}
```

## 📁 Project Structure

```
frontend/
├── app/
│   ├── page.js                    # Dashboard with hero, stats, features
│   ├── page.module.css            # Dashboard styles
│   ├── layout.js                  # Root layout wrapper
│   ├── globals.css                # Global styles and variables
│   ├── form/
│   │   ├── page.js                # Patient assessment form
│   │   └── page.module.css        # Form styles
│   └── report/
│       ├── page.js                # Detailed prediction report
│       └── page.module.css        # Report styles
├── package.json                   # Dependencies
├── next.config.js                 # Next.js configuration
└── README.md                      # Documentation
```

## 🎨 Design Highlights

### Visual Features
- ✅ **Gradient Backgrounds** - Purple/blue theme throughout
- ✅ **Circular Progress Rings** - SVG-based accuracy visualization
- ✅ **Animated Icons** - Pulse animations for warnings, scale-in for success
- ✅ **Hover Effects** - Card lifts, button transitions
- ✅ **Color Coding** - Red for high risk, green for low risk
- ✅ **Responsive Grid Layouts** - Adapts to all screen sizes
- ✅ **Glass Morphism** - Backdrop blur effects on badges
- ✅ **Professional Typography** - Clear hierarchy and readability

### UX Features
- ✅ **Loading States** - Spinners and loading messages
- ✅ **Error Handling** - User-friendly error messages with retry options
- ✅ **Form Validation** - Real-time validation with helpful hints
- ✅ **Progress Indicators** - Visual feedback during analysis
- ✅ **Contextual Help** - Tooltips and explanations throughout
- ✅ **Clear Navigation** - Intuitive page flow without navbar
- ✅ **Accessibility** - Semantic HTML and proper labeling

## 🔄 Application Flow

```
┌─────────────┐
│  Dashboard  │  ← View model metrics, statistics, features
│     (/)     │
└──────┬──────┘
       │ [Start Assessment]
       ▼
┌─────────────┐
│    Form     │  ← Fill 11 health parameters
│   (/form)   │
└──────┬──────┘
       │ [Get Prediction] → API Call
       ▼
┌─────────────┐
│   Report    │  ← View results, recommendations
│  (/report)  │
└──────┬──────┘
       │
       ├─ [New Assessment] → /form
       └─ [Dashboard] → /
```

## 📊 Feature Mapping

### Form Input → Backend Values

| Field | Frontend | Backend Value |
|-------|----------|---------------|
| Gender | Female/Male | 1/2 |
| Cholesterol | Normal/Above/Well Above | 1/2/3 |
| Glucose | Normal/Above/Well Above | 1/2/3 |
| Smoking | No/Yes | 0/1 |
| Alcohol | No/Yes | 0/1 |
| Physical Activity | No/Yes | 0/1 |

### Risk Levels

| Prediction | Display | Color | Theme |
|-----------|---------|-------|-------|
| 0 | Low Risk | Green | Success/Healthy |
| 1 | High Risk | Red | Warning/Alert |

## 🚀 Key Features Comparison

Inspired by professional implementations:
- ✅ Hero section with statistics (like CardioML)
- ✅ Feature showcase cards (like CardioPredict)
- ✅ Detailed "How It Works" section
- ✅ Professional form with sections and hints
- ✅ Comprehensive report with recommendations
- ✅ Privacy and security messaging
- ✅ Medical disclaimers and warnings
- ✅ Modern gradient design aesthetic

## 📱 Responsive Design

- **Desktop** (>1024px): Full multi-column layouts
- **Tablet** (768px-1024px): Adjusted grid columns
- **Mobile** (<768px): Single-column stacked layouts

## 🔧 Configuration

### Environment Variables
No environment variables required - API endpoint is hardcoded to `http://127.0.0.1:8000`

### Customization
- Colors: Edit CSS module files
- Content: Edit page.js files
- API endpoint: Search and replace `http://127.0.0.1:8000`

## ⚠️ Important Notes

1. **Backend Dependency**: Frontend requires backend to be running
2. **CORS**: Backend must allow requests from frontend origin
3. **Session Storage**: Prediction data stored temporarily in browser
4. **No Authentication**: This is an educational project without user accounts
5. **Medical Disclaimer**: Always included - this is not medical software

## 🐛 Troubleshooting

### Issue: "Failed to load model metrics"
- **Solution**: Ensure backend is running on port 8000
- Check CORS settings in FastAPI

### Issue: "Prediction failed"
- **Solution**: Verify all form fields are filled correctly
- Check browser console for error details
- Verify backend /predict endpoint is working

### Issue: Report page redirects to form
- **Solution**: This is expected if no prediction was made
- Complete the assessment form first

### Issue: Styling not loading
- **Solution**: Clear browser cache and restart dev server
- Check CSS module imports are correct

## 📝 Development Tips

1. **Hot Reload**: Changes to JS/CSS auto-reload in dev mode
2. **CSS Modules**: Styles are scoped to components
3. **Browser DevTools**: Use to debug API calls and storage
4. **Console Logging**: Check browser console for errors

## 🎓 Educational Purpose

This project is designed for educational purposes to demonstrate:
- Next.js App Router implementation
- Modern React patterns and hooks
- CSS Modules for styling
- API integration with Fetch
- Form handling and validation
- Responsive design principles
- Professional UI/UX design

## 📄 License

Educational/College Project - Free to use and modify for learning purposes

## 🤝 Credits

Developed for: MLDL_KL Project  
Framework: Next.js 16  
Design Inspiration: Professional health tech applications

---

**Ready to start?** Run `npm run dev` and visit `http://localhost:3000` 🚀
