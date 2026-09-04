<div align="center">

# 🌾 GramSaarthi AI
### AI-Powered Hyper-Local Business Advisory & Financial Structuring Assistant

**Empowering India's Rural & Semi-Urban Micro-Entrepreneurs with Institutional-Grade Business Intelligence**

[![MSU Hack-A-Throne 2026](https://img.shields.io/badge/MSU%20Hack--A--Throne-2026-059669?style=for-the-badge&logo=target)](https://github.com/ChiragVasava/gramsaarthi-ai)
[![Problem Statement P11](https://img.shields.io/badge/Problem%20Statement-P11-2563EB?style=for-the-badge)](https://github.com/ChiragVasava/gramsaarthi-ai)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## 📌 Problem Context (P11)

In India, over **70 million rural micro-entrepreneurs** aspire to build sustainable village-level businesses. While state and central concessional credit schemes (such as State Channelizing Agencies and National Corporations) offer up to **90% low-interest debt funding**, first-time rural founders face severe barriers:

- ❌ **Guesswork-based Venture Selection:** Picking trades based on anecdotal hearsay rather than empirical local demand.
- ❌ **Financial Structuring Gap:** Inability to calculate feasible project costs, determine debt eligibility, or understand statutory interest rates, tenure, and moratorium grace periods.
- ❌ **Absence of Local Market Intelligence:** Lack of hyper-local competitor mapping, 5–10 km consumer catchment analysis, and seasonal risk warnings.

**GramSaarthi AI** solves this by acting as a digital business advisor—guiding entrepreneurs through a structured feasibility workflow before they commit their hard-earned savings.

---

## 🌟 Core System Modules

### 🔍 Module 1: Hyper-Local Business Feasibility Report
- **Spatial Consumer Catchment:** Quantitative demand sizing within a **5 km primary core** and **10 km secondary institutional** radius.
- **Empirical SWOT Matrix:** Tailored Strengths, Internal Weaknesses, Market Opportunities, and Environmental Threats.
- **Local Threat Identification:** Alerts for summer fodder inflation, seasonal crop demand drops, and supply chain dependencies.
- **Competitor Mapping:** Density profiling of neighboring micro-enterprises and cooperatives.
- **Dynamic Pricing Guidance:** Recommended farm-gate, wholesale, and value-added retail price benchmarks (e.g., raw milk vs. ghee/paneer).

### 💰 Module 2: Deterministic Financial Engine & Scheme Router
*Crucial Design Principle: Financial calculations are 100% deterministic (TypeScript algorithms) rather than delegated to an LLM.*

- **Feasible Project Sizing:**
  $$\text{Project Cost} = \frac{\text{Available Margin Capital}}{10\%}$$
- **Concessional Debt Eligibility:**
  $$\text{Maximum Loan Amount} = \text{Project Cost} \times 90\%$$
- **Statutory Scheme Selection Engine:**
  - **Micro Finance Scheme** (Project Cost $\le \text{₹1,40,000}$): Funding up to 90% (max loan ₹1.25L), **6.5% interest p.a.**, **3-year tenure**, **3-month moratorium grace**.
  - **Term Loan Scheme** ($\text{₹1,40,000} < \text{Project Cost} \le \text{₹50,00,000}$): Funding up to 90% (max loan ₹45L), **8.0% interest p.a.**, **7-year tenure**, **6-month moratorium grace**.
- **Quarterly Amortization Schedule:** Modeling principal and interest outflows with moratorium grace period handling.
- **Working Capital Buffer Guidance:** Recommending a 3-month operational liquidity reserve to prevent startup cashflow strangulation.

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| 📋 **Guided 4-Step Intake Wizard** | Streamlined intake for Village/Block coordinates, business trade, own equity, and experience. |
| 📊 **Executive Feasibility Dossier** | Comprehensive report featuring a 0–100 Feasibility Score, financial breakdown, and SWOT matrix. |
| 🗺️ **Dynamic Spatial Catchment & Competitor Map** | Dynamic radar visualizer adapting center coordinates, 5 km/10 km radiuses, and ecosystem POIs to user's selected village & trade. |
| 🤖 **Multilingual AI Business Advisor** | Personalized conversational advisor greeting users by name with native **English (EN)**, **Hindi (HI)**, and **Gujarati (GU)** support. |
| 🛡️ **Inviolable Domain Guardrails** | Strict boundaries rejecting off-topic queries (coding, trivia, homework) to keep focus on rural enterprise advisory. |
| 📄 **1-Click Direct PDF Dossier Download** | Client-side `.pdf` generation via `jsPDF` & `html2canvas` for immediate dossier downloads without print setup. |
| 🎙️ **Voice Input Integration** | Web Speech API speech-to-text allowing rural entrepreneurs to speak their queries directly. |
| ⚡ **1-Click Instant Demo Mode** | Pre-loaded candidate appraisal (Vadodara & Narmada, Gujarat) for instant presentation testing. |
| ☁️ **Dual Production Deployments** | Live on **Vercel Serverless Edge** and **AWS EC2 via Terraform IaC** with automated Caddy SSL proxy. |

---

## 🌐 Live Production Deployments

- 🚀 **Vercel Production:** [https://gramsaarthi.chiragvasava.me/](https://gramsaarthi.chiragvasava.me/)
- ☁️ **AWS EC2 (Terraform IaC):** [https://gramsaarthi-ai.chiragvasava.me/](https://gramsaarthi-ai.chiragvasava.me/)

---

## 📸 Platform Architecture & Screens

```
[ Rural Micro-Entrepreneur ]
              │
      (Web / Mobile PWA)
              │
    ┌─────────▼────────────────────────────────────────┐
    │  Presentation Layer: Next.js 16 + React 19       │
    │  - Guided 4-Step Feasibility Wizard (/wizard)    │
    │  - Executive Feasibility Dashboard (/dashboard)  │
    │  - Hyper-Local Radial Catchment Map (/map)       │
    │  - Multilingual AI Assistant (/chat)             │
    │  - Statutory Feasibility Dossier (/report)       │
    └─────────┬────────────────────────────────────────┘
              │
    ┌─────────▼────────────────────────────────────────┐
    │  Statutory Financial Structuring Engine          │
    │  - Project Cost Multiplier: (Margin / 0.10)      │
    │  - Concessional Debt Formula: (Project × 0.90)   │
    │  - Statutory Scheme Routing Engine               │
    │  - Moratorium Grace Period & Amortization        │
    └─────────┬────────────────────────────────────────┘
              │
    ┌─────────▼────────────────────────────────────────┐
    │  Intelligence & Persistence Tier                 │
    │  - Gemini API Contextualization Layer            │
    │  - Spatial Radial Demographics (5 & 10 km)       │
    │  - SQLite / Prisma ORM Persistence               │
    └──────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5.0
- **Styling:** Tailwind CSS 4, PostCSS
- **Database:** SQLite with Prisma ORM 5.22
- **PDF Generation:** jsPDF + html2canvas
- **Icons & UI:** Lucide React
- **AI Engine:** Google Gemini API integration with autonomous deterministic fallback
- **Audio / Speech:** Web Speech API for voice recognition
- **Cloud Infrastructure:** AWS EC2 (`t3.micro`), Elastic IP, Ubuntu 24.04 LTS, HashiCorp Terraform IaC
- **Web Server & Reverse Proxy:** Caddy v2 (Automated Let's Encrypt TLS-ALPN-01)

---

## 💻 Local Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/ChiragVasava/gramsaarthi-ai.git
cd gramsaarthi-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize Database & Seed Baseline Data
```bash
npm run db:setup
```
*This command executes Prisma schema synchronization and populates the database with default schemes, demo accounts, and Gujarat baseline market data.*

### 4. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Optional) Add your Google Gemini API key if you wish to run dynamic LLM completions; otherwise, the built-in realistic fallback engine activates automatically.*

### 5. Launch Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧪 Step-by-Step User Testing Guide

### Option 1: 1-Click Instant Demo
1. Visit `http://localhost:3000` (or the live links above).
2. Click **"Try Demo"** in the top navigation bar.
3. You will be automatically authenticated as candidate `Rajesh Patel` (`demo@gramsaarthi.ai`) and taken to the executive dashboard.

### Option 2: Register a New Enterprise & Run Full Intake
1. Visit `http://localhost:3000/login`.
2. Select the **"Register New Account"** tab.
3. Enter your Name, State (`Gujarat`), District (`Narmada`), Email, and Password.
4. Click **Complete Registration & Launch Wizard**.
5. Complete the 4-step wizard:
   - **Location:** Enter your Taluka/Block and Village.
   - **Category:** Choose a trade (e.g., *Dairy & Livestock* or *Food Processing & Flour*).
   - **Capital:** Enter your margin capital (e.g., `₹50,000` or `₹1,00,000`). Observe the instant scheme routing on the right.
   - **Review:** Select your experience level and click **Generate Complete AI Report**.
6. Inspect the generated **Feasibility Dossier** at `/report` and click **Download Official PDF** for instant 1-click download.
7. Explore `/map` to see your location and trade reflected on the radar map, and `/chat` to speak with the personalized advisor!

---

## 📚 Complete Documentation Library (`MD_Files/`)

All technical specifications, verification reports, and presentation guides are indexed in the [`MD_Files/`](./MD_Files/INDEX.md) folder:

| Document | Purpose |
| :--- | :--- |
| 🏗️ [**Architecture Blueprint**](./MD_Files/ARCHITECTURE.md) | Multi-tier architectural specifications, data flow, and mathematical debt models. |
| ✨ [**Features Specification**](./MD_Files/FEATURES.md) | Full breakdown of Module 1 (Feasibility), Module 2 (Financial Engine), dynamic map, and PDF downloads. |
| 🎬 [**3-Minute Demo Script**](./MD_Files/DEMO_SCRIPT.md) | Rehearsed presenter script for the official video submission. |
| 🧪 [**Manual Testing Report & Guide**](./MD_Files/MANUAL_TEST_REPORT.md) | Verified test logs, data persistence mechanics, and step-by-step testing instructions. |
| ⚖️ [**Limitations & Scalability Roadmap**](./MD_Files/LIMITATIONS_AND_ROADMAP.md) | Statutory disclaimers, prototype boundaries, and future integration phases. |
| 🛠️ [**Tech Stack Deep Dive**](./MD_Files/TECH_STACK.md) | Architectural trade-offs and rationale behind deterministic vs. LLM separation. |
| 🚀 [**Deployment Case Study**](./MD_Files/DEPLOYMENT_CASE_STUDY.md) | Dual cloud deployment (Vercel + AWS), Docker multi-stage build, and production troubleshooting logs. |
| ☁️ [**Terraform IaC Master Guide**](./MD_Files/TERRAFORM.md) | Comprehensive master guide for Terraform IaC, HCL code breakdown, cloud-init scripts, and AI teaching prompt. |
| 📝 [**Terraform Deployment CLI Log**](./MD_Files/terraform-deployment-log.md) | Live raw execution transcript of all CLI commands, outputs, and AWS resource states. |
| 🏆 [**Hackathon Submission Guide**](./MD_Files/HACKATHON_SUBMISSION_GUIDE.md) | Form fields, slide-by-slide PPT guide, and pre-submission checklist. |

---

## 👥 Hackathon Team & Project Info

- **Hackathon:** MSU Hack-A-Throne 2026
- **Round:** Elimination / Screening Round
- **Problem Statement:** P11 — *AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs*
- **Team Lead:** Chirag Vasava

---

## 📜 Statutory Disclaimer

*GramSaarthi AI is an advisory and decision-support prototype developed for the MSU Hack-A-Throne 2026 evaluation process. All market size projections, demographic density numbers, and competitor estimates are model-driven indicative approximations. Official credit sanctions remain strictly subject to physical verification and sanctioning by designated State Channelizing Agencies (SCAs) and participating financial institutions.*
