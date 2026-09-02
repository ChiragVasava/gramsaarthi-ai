# ✨ Features Specification — GramSaarthi AI

### Hack-A-Throne 2026 · Problem Statement P11

---

## 1. Authentication & Onboarding
- **1-Click Demo Mode:** Instant evaluation credentials pre-populated (`demo@gramsaarthi.ai` / `demo123`).
- **Entrepreneur Registration:** Capture enterprise name, home district, state, and credentials.
- **Session Continuity:** Automated synchronization between browser `localStorage` and Prisma backend.

## 2. Guided Feasibility Intake Wizard (`/wizard`)
- **Step 1 — Geographic Coordinates:** Capture State, District, Tehsil/Block, and Village.
- **Step 2 — Trade Classification:** 8 curated rural enterprise categories (Dairy, Retail, Food Processing, Textiles, Agri-inputs, Handicrafts, Services, Fabrication).
- **Step 3 — Margin Capital Sizing:** Interactive numeric input with ₹14k, ₹50k, ₹100k, ₹250k, and ₹500k quick presets, paired with a real-time live statutory preview card.
- **Step 4 — Capability Profile:** Capturing founder background (First-time, Family exposure, Experienced) and target distribution channel.

## 3. Statutory Financial Engine (`/calculator`)
- **Statutory Formula Implementation:**
  - $\text{Project Cost} = \text{Margin} \div 0.10$
  - $\text{Loan Amount} = \text{Project Cost} \times 0.90$
- **Automatic Scheme Selection:**
  - Micro Finance Scheme for projects $\le \text{₹1,40,000}$
  - Term Loan Scheme for projects $> \text{₹1,40,000}$ and $\le \text{₹50,00,000}$
- **Grace Period Moratorium:** 3-month (Micro) or 6-month (Term) interest moratorium handling before principal repayment starts.
- **Quarterly Amortization Schedule:** Breakdown of principal, interest, and residual debt balance across 8+ quarters.
- **Working Capital Reserve:** Calculating emergency buffer for inventory, utilities, and wages.

## 4. Hyper-Local Market & Competitor Radar (`/map`)
- **Radial Catchment Rings:** Visualizing 5 km inner core and 10 km secondary institutional radius.
- **Demographic Sizing:** Estimating rural consumer counts across village clusters.
- **Ecosystem Points of Interest:** Filterable markers for dairy competitors, Amul collection hubs, weekly mandis (haats), and veterinary clinics.

## 5. Multilingual AI Advisory Desk (`/chat`)
- **Trilingual Support:** Native English (EN), Hindi (HI), and Gujarati (GU).
- **Voice Recognition:** Web Speech API integration allowing voice input.
- **Contextual Intelligence:** Responses automatically aware of the active enterprise trade, location, and loan structure.

## 6. Official Feasibility Dossier (`/report`)
- **Comprehensive Appraisal:** Feasibility Score (0–100), Executive Summary, SWOT Matrix, Local Threat Alerts, and Pricing Guidance.
- **PDF Export:** Browser print stylesheet enabling instant export of an institutional loan appraisal dossier.
