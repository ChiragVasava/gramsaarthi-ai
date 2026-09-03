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
- **Dynamic Catchment Routing:** Dynamically adapts center coordinates, 5 km inner core, and 10 km secondary institutional zones based on the user's selected village, block, and district.
- **Trade-Adaptive Ecosystem:** Surrounding competitors, mandi hubs, and supply chain points automatically update according to enterprise trade (e.g., Dairy hubs, Kirana provision stores, APMC wholesale mandis, Artisanal craft centers).
- **Demographic Sizing:** Model-driven rural consumer population estimates across immediate and adjoining village clusters.
- **Interactive Classification Filters:** Multi-category filtering across direct competitors, procurement hubs, mandis, and support services.

## 5. Multilingual AI Advisory Desk (`/chat`)
- **Personalized Onboarding & Greeting:** Greet entrepreneurs by their registered name and contextualized with their active business sector, capital, and geographic village cluster.
- **Strict Domain Guardrails:** Enforces zero-tolerance boundaries against off-topic queries (such as programming, code generation, essays, or non-business trivia), keeping conversations focused on rural business planning, financial calculator metrics, and Indian government schemes (SCA, Mudra, PMEGP).
- **Trilingual Support:** Native English (EN), Hindi (HI), and Gujarati (GU) synchronized across UI and AI responses.
- **Voice Recognition:** Web Speech API integration for natural language speech input.

## 6. Official Feasibility Dossier (`/report`)
- **Comprehensive Appraisal:** Feasibility Score (0–100), Executive Summary, SWOT Matrix, Local Threat Alerts, and Pricing Guidance.
- **1-Click Direct PDF Download:** Client-side generation using `jsPDF` and `html2canvas` for immediate file download (`.pdf`) without needing manual browser print configuration.
- **Personalized Candidate Identification:** Dossier dynamically reflects candidate name, enterprise type, and localized catchment.
