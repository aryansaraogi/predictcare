# 🏥 PredictCare

A full-stack health prediction web application built with **Next.js 15** (frontend) and a **Flask** backend. PredictCare lets users assess their risk for three conditions — Coronary Heart Disease, Stroke, and Diabetes — by submitting health parameters through a clean, responsive UI powered by machine learning models.

> This is the **frontend** repository. The companion Flask backend is in [`backend-main`](../backend-main).

---

## 📁 Project Structure

```
predictcare-main/
├── app/
│   ├── layout.tsx                  # Root layout — Header, Footer, ThemeProvider
│   ├── page.tsx                    # Home page — 3 prediction cards + how-it-works
│   ├── about/page.tsx              # About page — mission & model descriptions
│   ├── suggestion/page.tsx         # Feedback form (EmailJS integration)
│   └── predict/
│       ├── chd/page.tsx            # CHD prediction form & result display
│       ├── diabetes/page.tsx       # Diabetes prediction form & result display
│       └── stroke/page.tsx         # Stroke prediction form & result display
├── components/
│   ├── header.tsx                  # Responsive nav with dark mode toggle
│   ├── footer.tsx                  # Site footer
│   ├── mode-toggle.tsx             # Light/dark theme switch
│   ├── theme-provider.tsx          # next-themes wrapper
│   └── ui/                         # shadcn/ui component library
├── hooks/
│   ├── use-mobile.tsx              # Mobile breakpoint hook
│   └── use-toast.ts                # Toast notification hook
├── lib/
│   └── utils.ts                    # Tailwind class merge utility
├── public/                         # Static assets
├── styles/globals.css              # Global Tailwind styles
├── next.config.mjs                 # Next.js config + API proxy to Flask
├── tailwind.config.ts              # Tailwind configuration
└── package.json
```

---

## ✨ Features

- 💊 **Three health prediction tools** — CHD, Stroke, and Diabetes
- 📋 **Rich forms** — sliders, radio groups, selects, and number inputs for each health parameter
- 📊 **Instant results** — risk level (Low / Moderate / High) and probability score displayed post-submit
- 🌗 **Dark / light mode** — system-aware theme toggle via `next-themes`
- 📱 **Responsive layout** — mobile hamburger nav, fluid grid for desktop
- 📬 **Feedback form** — suggestion page sends emails via EmailJS
- 🔗 **API proxy** — `/api/*` requests are transparently forwarded to `http://localhost:5000`

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- The Flask backend running on port `5000` (see [backend-main](../backend-main))

### Installation

```bash
git clone <your-repo-url>
cd predictcare-main

npm install
```

### Running in Development

```bash
# Start the Flask backend first (in the backend-main directory)
python app.py

# Then start the Next.js dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

---

## 🔗 API Integration

The frontend communicates with the Flask backend via **Next.js rewrites**. All requests to `/api/*` are proxied to `http://localhost:5000/*`:

```
/api/predict/chd      →  http://localhost:5000/predict/chd
/api/predict/stroke   →  http://localhost:5000/predict/stroke
/api/predict/diabetes →  http://localhost:5000/predict/diabetes
```

Each prediction page sends a `POST` request with a JSON body containing the form fields and expects a response with `prediction` and `probability`/`confidence`.

---

## 🩺 Prediction Pages

### Coronary Heart Disease — `/predict/chd`

| Field | Type | Description |
|---|---|---|
| `male` | Radio | Gender (0 = Female, 1 = Male) |
| `age` | Slider | Age in years |
| `education` | Select | Education level (1–4) |
| `currentSmoker` | Radio | Current smoker status |
| `cigsPerDay` | Number | Cigarettes per day |
| `BPMeds` | Radio | On blood pressure medication |
| `prevalentStroke` | Radio | Previous stroke history |
| `prevalentHyp` | Radio | Hypertension status |
| `diabetes` | Radio | Diabetes status |
| `totChol` | Slider | Total cholesterol (mg/dL) |
| `sysBP` | Slider | Systolic blood pressure |
| `diaBP` | Slider | Diastolic blood pressure |
| `BMI` | Slider | Body Mass Index |
| `heartRate` | Slider | Heart rate (bpm) |
| `glucose` | Slider | Glucose level (mg/dL) |

### Stroke — `/predict/stroke`

| Field | Type | Description |
|---|---|---|
| `gender` | Select | Male / Female / Other |
| `age` | Slider | Age in years |
| `hypertension` | Radio | Hypertension status |
| `heart_disease` | Radio | Heart disease status |
| `Residence_type` | Radio | Urban / Rural |
| `avg_glucose_level` | Slider | Average glucose level |
| `bmi` | Slider | Body Mass Index |
| `smoking_status` | Select | Never / Formerly / Currently smokes |

### Diabetes — `/predict/diabetes`

| Field | Type | Description |
|---|---|---|
| `Age` | Slider | Age in years |
| `Gender` | Radio | Male / Female |
| `BMI` | Slider | Body Mass Index |
| `SBP` | Number | Systolic blood pressure |
| `DBP` | Number | Diastolic blood pressure |
| `FPG` | Number | Fasting plasma glucose |
| `Chol` | Number | Total cholesterol |
| `HDL` | Number | HDL cholesterol |
| `LDL` | Number | LDL cholesterol |
| `BUN` | Number | Blood urea nitrogen |
| `CCR` | Number | Creatinine clearance rate |
| `FFPG` | Number | Follow-up fasting plasma glucose |
| `smoking` | Radio | Smoking status |
| `drinking` | Radio | Drinking status |
| `family_histroy` | Radio | Family history of diabetes |

---

## 📬 Feedback / Suggestion Page

The `/suggestion` page uses **EmailJS** to send form submissions directly from the browser — no backend required. To configure it with your own account, replace the credentials in `app/suggestion/page.tsx`:

```ts
await emailjs.send(
  "YOUR_SERVICE_ID",
  "YOUR_TEMPLATE_ID",
  { name, subject, suggestion },
  "YOUR_PUBLIC_KEY"
)
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui + Radix UI |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Theme | next-themes |
| Email | EmailJS |
| Icons | Lucide React |
| Backend | Flask (separate repo) |

---

## 📄 Pages Summary

| Route | Description |
|---|---|
| `/` | Home — prediction tool cards + how-it-works |
| `/about` | About the platform and each ML model |
| `/predict/chd` | CHD risk prediction form |
| `/predict/stroke` | Stroke risk prediction form |
| `/predict/diabetes` | Diabetes risk prediction form |
| `/suggestion` | Feedback / suggestion form |
