# 🧪 GramSaarthi AI — End-to-End Manual Testing Report & Verification Guide

> **Hack-A-Throne 2026 — Problem Statement P11**  
> **Tested Environment:** `http://localhost:3000` (Next.js 16 + React 19 + Tailwind CSS)

---

## 📋 1. Testing Summary & Test Results

All features across the application were manually verified via an autonomous browser subagent. Below are the details of what was tested:

| Test Phase | Test Scenario / Action | Input Data | Observed Output / Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Auth: Registration** | Create new rural enterprise account | **Name:** `Chirag Vasava Enterprise`<br>**Location:** `Narmada, Gujarat`<br>**Email:** `chirag.test@gramsaarthi.ai`<br>**Password:** `password123` | Account registered, session saved to `localStorage`, auto-redirected to `/wizard`. | **PASSED** ✅ |
| **Wizard: Step 1 Location** | Spatial coordinates intake | **State:** `Gujarat`<br>**District:** `Narmada`<br>**Block:** `Rajpipla`<br>**Village:** `Dediapada` | Coordinates accepted and catchment radius set to 5–10 km. | **PASSED** ✅ |
| **Wizard: Step 2 Domain** | Enterprise classification | **Category:** `Food Processing & Flour` | Selected card highlighted with border accent & metadata updated. | **PASSED** ✅ |
| **Wizard: Step 3 Financials** | Equity capital input & instant statutory routing | **Margin Capital:** `₹50,000` (10% equity) | **Project Cost:** `₹5,00,000`<br>**Loan (90%):** `₹4,50,000`<br>**Scheme:** Term Loan Scheme (8.0%, 7 yrs, 6 mo grace). | **PASSED** ✅ |
| **Wizard: Step 4 Review** | Capability & Distribution Target | **Profile:** `Family / Informal Exposure`<br>**Target:** `Local Mandi & Direct Retail` | Synthesized and generated complete AI report. | **PASSED** ✅ |
| **Module 1 & 2 Report** | Full Dossier Inspection (`/report`) | Active synthesized session | Feasibility Score: **78/100 (High Viability)**.<br>SWOT matrix, Local Risk alerts, and Concessional Loan metrics accurately reflected. | **PASSED** ✅ |
| **AI Advisor (`/chat`)** | Multilingual Chat & Voice Simulation | **Query:** *"What equipment do I need for my food processing business?"* | Responded with actionable rural food processing equipment advice; language toggled to Hindi (**HI**). | **PASSED** ✅ |
| **Spatial Map (`/map`)** | 5 km & 10 km Catchment Nodes | Filtered by **Mandi / Weekly Haat** | Concentric radial rings rendered with POIs and consumer demographic counts. | **PASSED** ✅ |
| **Calculator (`/calculator`)** | Statutory Scheme Boundary Test | Changed equity to `₹50,000` | Instantly recalculated EMI: **₹7,417/mo**, quarterly repayment schedule updated. | **PASSED** ✅ |
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
- Review the **Statutory Financial Structuring** table (Margin, Project Cost, Concessional Loan, EMI).
- Read the **SWOT Matrix** (Strengths, Weaknesses, Opportunities, Threats) and local pricing guidance.
- Click **"Download / Print PDF"** to trigger the print dialog for an institutional loan dossier.

### Step 5: Test the Concessional Financial Calculator (`/calculator`)
1. Click **Financial Calculator** in the left sidebar.
2. Click the **₹14k** preset button. Notice the scheme immediately switches to **Micro Finance Scheme (6.5% p.a., 3 Years, 3 Months Grace)** because the project is under `₹1.40 Lakh`.
3. Now click the **₹100k** preset. Notice it automatically switches to **Term Loan Scheme (8.0% p.a., 7 Years, 6 Months Grace)**.
4. Scroll down to inspect the **Quarterly Amortization Table** reflecting the moratorium period.

### Step 6: Test Spatial Catchment & Competitor Map (`/map`)
1. Click **Market & Competitor Map** in the sidebar.
2. Observe the concentric 5 km and 10 km catchment radar rings.
3. Click filter pills (**Dairy**, **Offtake**, **Mandi**) at the top-right to inspect local points of interest.

### Step 7: Chat with the Multilingual AI Business Advisor (`/chat`)
1. Click **AI Business Advisor** in the sidebar.
2. Switch language between **EN**, **HI** (Hindi), and **GU** (Gujarati).
3. Click one of the quick prompt pills or ask:
   - *"What is the best pricing for value-added Ghee vs raw milk?"*
   - *"How should I manage fodder costs during summer months?"*
4. Notice how the response is contextualized to your active business and location!

### Step 8: Verify Saved Dossiers (`/reports`)
1. Click **Saved Reports** in the sidebar.
2. Notice your newly generated appraisal (**GS-ACTIVE-APPRAISAL**) appears at the very top with its custom score and project size.
