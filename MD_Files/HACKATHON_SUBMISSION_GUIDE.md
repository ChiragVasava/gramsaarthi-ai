# 🏆 MSU Hack-A-Throne 2026 — Submission & Presentation Guide

> **Problem Statement Selected:** **P11 — AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs**  
> **Team Lead:** Chirag Vasava  
> **Project Name:** GramSaarthi AI  
> **GitHub Repository:** `https://github.com/ChiragVasava/gramsaarthi-ai.git`

---

## 1. Official Google Form Submission Details

When submitting the official Google Form, enter the following exact parameters:

| Form Field | Recommended Entry |
| :--- | :--- |
| **Problem Statement Code** | **P11** |
| **Problem Statement Title** | AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs |
| **Project Name** | **GramSaarthi AI** |
| **GitHub Repository Link** | `https://github.com/ChiragVasava/gramsaarthi-ai.git` |
| **Tech Stack Used** | Next.js 16, TypeScript, Tailwind CSS, SQLite, Prisma ORM, Gemini API, Web Speech API |
| **Key Innovation** | Decoupled deterministic statutory financial engine with automated scheme routing (Micro Finance vs. Term Loan), paired with hyper-local 5–10 km spatial catchment intelligence and trilingual AI advisory (EN/HI/GU). |

---

## 2. PPT Presentation Guide (Official Template Slide-by-Slide)

Use the official `Hackathon presentation.pptx` template with this structured content:

### Slide 1: Title Slide
- **Title:** GramSaarthi AI (ग्रामसारथी)
- **Tagline:** AI-Powered Hyper-Local Business Advisory & Concessional Financial Structuring for Bharat
- **Problem Statement:** P11
- **Team Members:** Chirag Vasava (Lead) and team details.

### Slide 2: Problem Statement & Rural Context
- Over 70 million rural entrepreneurs face a **40%+ early failure rate** due to hearsay-based business selection.
- Concessional debt schemes (up to 90% funding at 6.5%–8.0%) remain severely underutilized due to financial illiteracy and complex eligibility rules.
- First-time founders lack hyper-local market intelligence (catchment size, seasonal threats, competitor density).

### Slide 3: Proposed Solution — Two Core Modules
- **Module 1 (Hyper-Local Feasibility Report):** Spatial demographic catchment (5 & 10 km), empirical SWOT matrix, competitor density mapping, and commodity pricing guidance.
- **Module 2 (Deterministic Financial Calculator & Scheme Router):** Automatic scheme qualification, 6-month moratorium grace period, quarterly amortization table, and working capital buffers.
- **Inclusive Design:** Trilingual (English, Hindi, Gujarati) with voice recognition.

### Slide 4: System Architecture & Technical Flow
- Present the system architecture diagram from [`MD_Files/ARCHITECTURE.md`](./ARCHITECTURE.md).
- Emphasize the separation of deterministic financial formulas from generative qualitative advice.

### Slide 5: Live Demonstration & Impact
- Show screenshots of:
  1. 4-step guided intake wizard (`/wizard`).
  2. Statutory scheme routing (`/calculator`).
  3. Spatial radar map (`/map`).
  4. Multilingual advisor in Hindi/Gujarati (`/chat`).
  5. Printable loan appraisal dossier (`/report`).

### Slide 6: Future Scope & Scaling Roadmap
- Direct integration with State Channelizing Agencies (SCA).
- Offline PWA edge caching for remote village operation.
- Live APMC mandi pricing feeds via e-NAM.

---

## 3. Pre-Submission Checklist

- [x] Application compiles cleanly with zero TypeScript errors (`npm run build`).
- [x] All 10 routes active and verified (`/`, `/login`, `/dashboard`, `/wizard`, `/calculator`, `/map`, `/chat`, `/report`, `/reports`).
- [x] 1-Click Demo account verified (`demo@gramsaarthi.ai` / `demo123`).
- [x] GitHub repository clean and pushed to `main` branch.
- [x] Complete documentation packaged in `MD_Files/`.
- [x] 3-minute video presentation script rehearsed (`MD_Files/DEMO_SCRIPT.md`).
