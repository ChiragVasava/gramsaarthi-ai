# ✨ Features & Technical Capabilities — GramSaarthi AI

> **Hack-A-Throne 2026 · Problem Statement P11: AI Rural Business Feasibility & Concessional Credit Appraisal**  
> **Production URL:** [https://gramsaarthi-ai.chiragvasava.me](https://gramsaarthi-ai.chiragvasava.me)

---

## 🎯 Purpose of This Document

This document provides a **complete functional specification and technical inventory** of every feature engineered within **GramSaarthi AI**. It is designed for product evaluators, business analysts, and jury members to evaluate how each requirement of Problem Statement P11 was addressed.

---

## 🚀 1. Authentication & Identity Management
- **1-Click Demo Evaluation Account:** Pre-seeded with `demo@gramsaarthi.ai` / `demo123` to allow instant zero-friction evaluation by judges without mandatory sign-up steps.
- **Enterprise Registration:** Captures entrepreneur name, contact details, home state, district, block, and village cluster.
- **Persistent Multi-Device Synchronization:** Dual persistence across browser-level `localStorage` and backend relational SQLite database (`prisma/dev.db`) via Next.js server actions and API routes.

---

## 📋 2. Guided Feasibility Wizard (`/wizard`)
- **Step 1 — Catchment Geofencing:** Captures State, District, Tehsil/Block, and Village, dynamically resolving spatial catchment boundaries.
- **Step 2 — 8 Enterprise Trade Taxonomies:**
  1. *Dairy & Livestock* (Milch cattle, chilling center linkage, fodder management).
  2. *Food Processing & Flour Milling* (Grains, spices, grading, packaging, FSSAI standards).
  3. *Retail & General Provision Stores* (Kirana, fast-moving consumer goods, credit sales).
  4. *Handicrafts & Handlooms* (Artisanal crafts, tribal weaves, direct-to-consumer e-commerce).
  5. *Agricultural Inputs & Tools* (Certified seeds, bio-fertilizers, micro-irrigation equipment).
  6. *Fabrication & Light Engineering* (Agricultural implements, welding, metal fabrication).
  7. *Rural Repair & Maintenance Services* (Two-wheelers, pumps, solar installations).
  8. *Solar & Renewable Energy Solutions* (Rooftop solar, agri-pumps, battery charging hubs).
- **Step 3 — Margin Capital Sizing:** Interactive currency input with ₹14k, ₹50k, ₹100k, ₹250k, and ₹500k quick presets, paired with a real-time live statutory preview card.
- **Step 4 — Capability & Channel Profiling:** Evaluates founder background (First-Time, Family/Informal Exposure, Experienced Operator) and distribution channels (Direct Retail, APMC Mandi, Local Cooperatives, B2B Institutional Offtake).
- **Dynamic Real-Time Scoring (`computeDynamicScore`):** Synthesizes feasibility (0–100), market opportunity, creditworthiness, and statutory loan assignment in real-time.

---

## 📑 3. Multi-Enterprise Portfolio & Dynamic Dossier Registry
- **Multi-Report Architecture ([`lib/report-store.ts`](file:///c:/Users/Chirag%20Vasava/Downloads/Personal/College/MSU/Hackathone/MSU%20Hack-A-Throne%202026/gramsaarthi-ai/lib/report-store.ts)):**
  - Assigns unique, persistent Dossier IDs (e.g. `GS-2026-P11`, `GS-2026-M04`).
  - Supports unlimited enterprise appraisals per user account.
  - Deep-linkable dossier routes: `/report?id=<DOSSIER_ID>`.
- **Saved Reports Management (`/reports`):**
  - Visual grid of all user dossiers with `CURRENT ACTIVE` badges and `Select Active` toggles.
  - One-click deletion and direct navigation.
- **Dashboard Multi-Enterprise Overview (`/dashboard`):**
  - Aggregates cumulative capital outlay and total institutional credit eligibility across all saved ventures.
  - Interactive portfolio selector cards with one-click enterprise switching.
- **Cross-Application Sync Engine:**
  - Emits window-level custom events (`gs_report_changed`) to synchronize the active business context across Dashboard, Report, Map, Calculator, and AI Chat in real-time.

---

## 📊 4. Statutory Concessional Credit Engine (`/calculator`)
- **Statutory Formula Implementation:**
  - $\text{Project Cost} = \text{Margin Capital} \div 0.10$ (Statutory 10% entrepreneur equity commitment).
  - $\text{Concessional Loan Amount} = \text{Project Cost} \times 0.90$ (Statutory 90% institutional credit).
- **Automated Scheme Tier Assignment:**
  - **Micro Finance Scheme:** Applied to project costs $\le \text{₹1,40,000}$ @ **6.5% p.a.** concessional interest rate, 3-year tenure, with **3-month interest moratorium grace period**.
  - **Term Loan Scheme:** Applied to project costs $> \text{₹1,40,000}$ and $\le \text{₹50,00,000}$ @ **8.0% p.a.** concessional interest rate, 7-year tenure, with **6-month interest moratorium grace period**.
- **Quarterly Amortization Engine:** Models opening balance, interest accrual during moratorium, principal repayment, and terminal debt balance across multiple quarters.
- **Pre-fill from Business:** One-click selector to import loan, margin, and scheme parameters from any saved user enterprise appraisal.

---

## 🗺️ 5. Hyper-Local Catchment & Competitor Radar (`/map`)
- **Dynamic Center Geofencing:** Adapts latitude/longitude and base coordinates based on the active enterprise's village, block, and district.
- **Concentric Radial Zones:**
  - **5 km Primary Zone:** Visualizes immediate doorstep consumption and footfall radius.
  - **10 km Secondary Zone:** Visualizes institutional offtake, processing plants, and APMC wholesale hubs.
- **Trade-Adaptive Points of Interest (POIs):**
  - POIs dynamically morph based on selected enterprise (e.g. Grain Mandis, chilling centers, solar sub-stations, artisan clusters).
- **Catchment Business Switcher:** Top-bar dropdown allowing instant switching of spatial catchment between different saved enterprises without leaving the map.

---

## 💬 6. Multilingual AI Advisory Desk (`/chat`)
- **Personalized Context Injection:** Greeting dynamically references the entrepreneur's name, active trade, margin capital, and village cluster.
- **Strict Domain Guardrails:** Built-in semantic filtering strictly rejects off-topic queries (such as programming, poetry, or general trivia) and directs users back to rural enterprise operations and government schemes (PMEGP, Mudra, NABARD).
- **Trilingual Localization:** Instant real-time UI and AI response toggling across **English (EN)**, **Hindi (HI)**, and **Gujarati (GU)**.
- **Voice Recognition:** Web Speech API integration for natural language speech-to-text input.

---

## 🖨️ 7. 1-Click Client-Side PDF Generation Engine (`/report`)
- **Zero-Crash Color Space Proxy:** Intercepts modern CSS color function tokens (`lab(...)`, `oklch(...)`) across all computed styles and proxies them through an offscreen HTML5 Canvas2D context, converting them into standard RGBA tokens.
- **Instant Client-Side Export:** Generates clean, vectorized multi-page PDFs using `html2canvas` and `jsPDF` in <1.5 seconds.
- **Elimination of Browser Print Modals:** Downloads `GramSaarthi_Feasibility_Report_<Category>_<Name>.pdf` directly to the user's filesystem without invoking cumbersome browser print dialogs.

---
*Comprehensive Technical Specifications for MSU Hack-A-Throne 2026*
