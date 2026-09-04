# 🧪 GramSaarthi AI — End-to-End Manual Testing Report & Verification Guide

> **Hack-A-Throne 2026 — Problem Statement P11**  
> **Tested Environment:** `http://localhost:3000` (Next.js 16 + React 19 + Tailwind CSS)

---

## 📋 1. Testing Summary & Test Results

All features across the application were manually verified via an autonomous browser subagent. Below are the details of what was tested:

| Test Phase | Test Scenario / Action | Input Data | Observed Output / Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Auth: Registration** | Create new rural enterprise account | **Name:** `chirag.test`<br>**Location:** `Dediapada, Rajpipla, Narmada, Gujarat`<br>**Email:** `chirag.test@gramsaarthi.ai`<br>**Password:** `password123` | Account registered, session saved to `localStorage`, auto-redirected to `/wizard`. | **PASSED** ✅ |
| **Wizard: Step 1 Location** | Spatial coordinates intake | **State:** `Gujarat`<br>**District:** `Narmada`<br>**Block:** `Dediapada`<br>**Village:** `Rajpipla` | Coordinates accepted and catchment radius set to 5–10 km around Dediapada, Narmada. | **PASSED** ✅ |
| **Wizard: Step 2 Domain** | Enterprise classification | **Category:** `Food Processing & Flour` | Selected card highlighted with border accent & metadata updated. | **PASSED** ✅ |
| **Wizard: Step 3 Financials** | Equity capital input & instant statutory routing | **Margin Capital:** `₹50,000` (10% equity) | **Project Cost:** `₹5,00,000`<br>**Loan (90%):** `₹4,50,000`<br>**Scheme:** Term Loan Scheme (8.0%, 7 yrs, 6 mo grace). | **PASSED** ✅ |
| **Wizard: Step 4 Review** | Capability & Distribution Target | **Profile:** `Family / Informal Exposure`<br>**Target:** `Local Mandi & Direct Retail` | Synthesized and generated complete AI report. | **PASSED** ✅ |
| **Module 1 & 2 Report** | Full Dossier Inspection (`/report`) | Active synthesized session | Feasibility Score: **78/100 (High Viability)**.<br>**Dynamic SWOT Matrix:** Tailored to Food Processing (grain procurement, FSSAI compliance, branded chakki atta, monsoon pest risk, PMFME 35% subsidy) instead of hardcoded Dairy.<br>**Pricing Strategy:** Displays Food Processing benchmarks (Flour Milling ₹4.50–₹7, Branded Chakki Atta ₹38–₹46, Ground Spices ₹260–₹380, Grain Bulk ₹2,800–₹3,400). | **PASSED** ✅ |
| **AI Advisor (`/chat`)** | Domain Intelligence & Prompt Q&A | **Query 1:** *"What is the best pricing strategy vs local competitors?"*<br>**Query 2:** *"How should I manage operational costs in the first 6 months?"*<br>**Query 3:** *"Can you explain how the statutory moratorium grace period works?"*<br>**Query 4:** *"What government subsidies can I combine with this loan scheme?"* | Responded with rich, tailored answers for Food Processing (two-tier pricing, 35% working capital buffer, power factor capacitors, 6-month principal holiday, and PMFME 35% subsidy convergence). Eliminated repetitive menu loop. | **PASSED** ✅ |
| **AI Advisor Guardrails** | Off-topic query rejection | **Query:** *"write a python code for binary search"* | Strictly and politely refused to answer; guided user back to rural enterprise and government loan topics. | **PASSED** ✅ |
| **Spatial Map (`/map`)** | 5 km & 10 km Catchment Nodes | Filtered by **Mandi / Weekly Haat** | Concentric radial rings rendered around **Dediapada, Narmada** for **Food Processing**. | **PASSED** ✅ |
| **Calculator (`/calculator`)** | Statutory Scheme Boundary Test | Selected equity `₹50,000` preset | Instantly recalculated: **₹5,00,000** Project Cost, **₹4,50,000** Loan, **₹7,417/mo** EMI, 8% p.a., 7 Years tenure, and 6 Months Moratorium. | **PASSED** ✅ |
| **Direct PDF Export (`/report`)** | 1-Click Client-Side PDF Generation | Clicked **"Download Official PDF"** | Intercepted global and iframe `window.getComputedStyle` color space tokens (`lab(...)`, `oklch(...)`) converting them dynamically to standard RGBA via offscreen Canvas2D. Generated and directly downloaded `GramSaarthi_Feasibility_Report_<Category>_<Name>.pdf` without `unsupported color function "lab"` error or print modal fallback. | **PASSED** ✅ |
| **Dossier Registry (`/reports`)** | Custom Analysis Persistence | Checked saved reports index | **GS-ACTIVE-APPRAISAL** displayed at top with `Score: 78/100` and `₹5,00,000` project size. | **PASSED** ✅ |

---

## 💾 2. How Data Persistence & Caching Works

### Does the saved data stay the same or does it get cached/reset?
- **Data Persistence Location:**  
  The application utilizes browser-level **`localStorage` keys (`gs_user` and `gs_analysis`)** in synchronization with the underlying **Prisma SQLite database (`prisma/dev.db`)**.
- **Behavior Across Navigation:**  
  When you navigate between pages (`/wizard` ➡️ `/report` ➡️ `/dashboard` ➡️ `/calculator` ➡️ `/chat` ➡️ `/reports`), **your data remains completely intact and does not get reset**.
- **Dynamic Updates:**  
  If you run a new appraisal via the Wizard with different values (e.g., changing from `Dairy` to `Food Processing`, or changing `₹1,00,000` to `₹50,000`), the application immediately updates `gs_analysis`. Both the **Dashboard**, **Report Dossier**, and **Saved Reports (`/reports`)** dynamically pull this active custom appraisal.
- **Session Lifecycle:**  
  Even if you refresh the page (`F5`) or close and reopen your browser tab, your user identity and business analysis are preserved until you explicitly click **Logout** in the bottom sidebar.

---

## 🛠️ 3. Step-by-Step Self-Testing Guide

Follow these exact steps to test and experience the entire platform yourself:

### Step 1: Open the Application
1. Open your browser (Google Chrome, Microsoft Edge, etc.).
2. Navigate to: **`http://localhost:3000`**
3. Notice the **Landing Page** with Problem Statement P11 metrics, value propositions, and dashboard previews.

### Step 2: Test Account Registration (Or 1-Click Demo)
- **Option A (New Registration):**
  1. Click **"Sign In"** in the top-right navbar.
  2. Click the **"Register New Account"** tab.
  3. Enter your Name, State (`Gujarat`), District (`Narmada`), Email, and Password.
  4. Click **"Complete Registration & Launch Wizard"**.
- **Option B (1-Click Instant Demo):**
  1. Simply click the green button: **"One-Click Demo Account Login"** (`demo@gramsaarthi.ai`).

### Step 3: Run the Guided Feasibility Wizard (`/wizard`)
1. **Step 1 (Location):** Enter your State, District, Tehsil/Block (`Rajpipla`), and Village (`Dediapada`). Click **Continue**.
2. **Step 2 (Business Category):** Click on any trade tile (e.g., **Dairy & Livestock** or **Food Processing & Flour**). Click **Continue**.
3. **Step 3 (Margin Capital):**
   - Enter your own contribution (e.g., `₹50,000` or `₹1,00,000`).
   - Notice the green card on the right instantly calculating your **Project Cost** (`Margin ÷ 10%`), **Loan Amount (90%)**, **Interest Rate**, and **Scheme Name**.
   - Click **Continue**.
4. **Step 4 (Experience):** Select your experience level, enter your target distribution (e.g., `Local Mandi & Retail`), and click **"Generate Complete AI Report"**.

### Step 4: Examine the Feasibility Report (`/report`)
- Observe your **Feasibility Score** (e.g., `78` or `84` / 100).
- Verify that your **registered entrepreneur name** is personalized at the top right of the dossier.
- Review the **Statutory Financial Structuring** table (Margin, Project Cost, Concessional Loan, EMI).
- Read the **SWOT Matrix** (Strengths, Weaknesses, Opportunities, Threats) and local pricing guidance.
- Click **"Download Official PDF"** — notice the live spinner (*"Generating PDF..."*) and the immediate client-side `.pdf` download directly to your downloads folder without triggering any browser print dialog.

### Step 5: Test the Concessional Financial Calculator (`/calculator`)
1. Click **Financial Calculator** in the left sidebar.
2. Click the **₹14k** preset button. Notice the scheme immediately switches to **Micro Finance Scheme (6.5% p.a., 3 Years, 3 Months Grace)** because the project is under `₹1.40 Lakh`.
3. Now click the **₹100k** preset. Notice it automatically switches to **Term Loan Scheme (8.0% p.a., 7 Years, 6 Months Grace)**.
4. Scroll down to inspect the **Quarterly Amortization Table** reflecting the moratorium period.

### Step 6: Test Dynamic Spatial Catchment & Competitor Map (`/map`)
1. Click **Market & Competitor Map** in the sidebar.
2. Verify that the **Center node and header** dynamically display the exact village, block, and district you entered in Step 1 (e.g., `Dediapada, Rajpipla, Narmada`).
3. Observe that surrounding competitors and mandi hubs dynamically reflect the business type you selected (e.g. Grain mandis and wholesale hubs for Retail/Food Processing vs. milk collection centers for Dairy).
4. Click filter pills (**All**, **Dairy/Retail**, **Offtake**, **Mandi**) at the top-right to inspect local points of interest.

### Step 7: Chat with the Multilingual AI Business Advisor (`/chat`)
1. Click **AI Business Advisor** in the sidebar.
2. Notice the advisor greets you personally by name: *"Namaste [Your Name]!"* with your active business details.
3. Switch language between **EN**, **HI** (Hindi), and **GU** (Gujarati) to observe real-time translation of UI and prompt templates.
4. Ask a business planning question: *"What is the best pricing for value-added Ghee vs raw milk?"*
5. **Test Strict Domain Guardrails:** Try asking an off-topic question like *"Write code in Python to reverse a string"*. Observe that the advisor politely declines and guides you back to your rural enterprise and government loan schemes!

### Step 8: Verify Saved Dossiers (`/reports`)
1. Click **Saved Reports** in the sidebar.
2. Notice your newly generated appraisal (**GS-ACTIVE-APPRAISAL**) appears at the very top with its custom score and project size.
