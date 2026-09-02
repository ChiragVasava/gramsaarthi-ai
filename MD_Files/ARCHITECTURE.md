# System Architecture — GramSaarthi AI

## 1. Architectural Overview
GramSaarthi AI is structured as a modern monolithic web platform combining Next.js App Router, Tailwind CSS, deterministic financial micro-engines, and multi-modal AI contextualization.

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
    │  - Printable / Exportable Dossier (/report)      │
    │  - Saved Reports Registry (/reports)             │
    └─────────┬────────────────────────────────────────┘
              │
    ┌─────────▼────────────────────────────────────────┐
    │  Business Logic & Financial Structuring Engine   │
    │  - Project Cost Multiplier: (Margin / 0.10)      │
    │  - Concessional Debt Formula: (Project × 0.90)   │
    │  - Rule-Based Statutory Scheme Router:           │
    │      • Micro Finance Scheme (≤ ₹1.40L, 6.5%)     │
    │      • Term Loan Scheme (₹1.40L–₹50L, 8.0%)      │
    │  - Moratorium Grace Period & Amortization Engine │
    │  - 3-Month Working Capital Reserve Modeling      │
    └─────────┬────────────────────────────────────────┘
              │
    ┌─────────▼────────────────────────────────────────┐
    │  Intelligence & Persistence Tier                 │
    │  - Gemini API Contextualization Layer            │
    │  - Autonomous Deterministic Fallback Engine      │
    │  - Spatial Radial Demographics (5 & 10 km)       │
    │  - SQLite / Prisma ORM Persistence               │
    │  - LocalStorage State Synchronization            │
    └──────────────────────────────────────────────────┘
```

## 2. Core Functional Modules

### Module 1: Hyper-Local Feasibility Report
- **Spatial Clustering:** Quantitative demographic density estimations for primary (5 km) and secondary (10 km) market zones.
- **Competitor Mapping:** Density profiling of surrounding competitors, weekly haats (mandis), and government procurement centers.
- **SWOT Analysis Matrix:** Context-aware Strengths, Weaknesses, Opportunities, and Threats for specific rural trade sectors.
- **Local Threat Alerts:** Warning indicators for fodder inflation, animal health, and seasonal demand volatility.
- **Pricing Strategy:** Real-time suggested pricing for raw vs. value-added commodities.

### Module 2: Deterministic Financial Structuring & Scheme Router
- **Project Sizing:** $\text{Project Cost} = \frac{\text{Margin Capital}}{10\%}$
- **Debt Sizing:** $\text{Loan Eligibility} = \text{Project Cost} \times 90\%$
- **Statutory Routing Rules:**
  - `Project Cost <= ₹1,40,000` ➡️ **Micro Finance Scheme** (6.5% p.a., 3-Year Tenure, 3-Month Moratorium)
  - `₹1,40,000 < Project Cost <= ₹50,00,000` ➡️ **Term Loan Scheme** (8.0% p.a., 7-Year Tenure, 6-Month Moratorium)
  - `Project Cost > ₹50,00,000` ➡️ Institutional Banking Escalation Flag
- **Quarterly Repayment Schedule:** Multi-quarter amortization table modeling grace period moratorium.
- **Working Capital Ratio:** 3-month operational buffer calculation based on enterprise domain.
