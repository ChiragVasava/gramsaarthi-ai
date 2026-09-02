# ⚖️ Limitations, Disclaimers & Future Roadmap — GramSaarthi AI

### Hack-A-Throne 2026 · Problem Statement P11

---

## 1. Statutory & Prototype Disclaimers

### A. Non-Guaranteed Approvals
GramSaarthi AI is an educational, decision-support, and feasibility appraisal tool designed to assist first-time rural micro-entrepreneurs. It does **NOT** guarantee loan approvals, subsidies, or institutional bank sanctions. Actual loan sanctions remain subject to physical field verification, collateral evaluation (where applicable), and formal approval by designated **State Channelizing Agencies (SCAs)** or commercial financial institutions.

### B. Indicative Demographic & Market Data
Demographic numbers (such as 4,200 core residents within 5 km) and competitor numbers represent model-driven indicative approximations calibrated on regional rural census patterns in Gujarat. Micro-entrepreneurs must conduct ground-level verification of customer demand before committing significant capital.

### C. Deterministic Financial Guardrails
All financial mathematics (Project Cost, Maximum Loan, EMI, and Moratorium) are governed by strict deterministic algorithms conforming to National Concessional Finance guidelines. The LLM is strictly restricted from fabricating or adjusting financial numbers.

---

## 2. Known Prototype Limitations

| Dimension | Current Prototype Status | Production Vision |
| :--- | :--- | :--- |
| **Geographic Baseline** | Calibrated around Gujarat districts (Vadodara, Anand, Narmada, Bharuch). | Full pan-India pin-code integration with Census of India & GIS datasets. |
| **Data Persistence** | Synchronized across `localStorage` and SQLite (`prisma/dev.db`). | Neon PostgreSQL / Supabase cloud multi-tenant database. |
| **Voice Recognition** | Web Speech API (browser-native speech synthesis and capture). | Server-side Whisper API with native Indian dialect adaptation. |
| **Cartography** | High-fidelity spatial radial visualizer. | Live Mapbox / OpenStreetMap Leaflet layers with live GeM / Mandi POIs. |

---

## 3. Future Scalability Roadmap

```
[ Phase 1: Hackathon MVP (Current) ]
  • Module 1: Hyper-local Feasibility & SWOT
  • Module 2: Concessional Financial Calculator & Scheme Router
  • Multilingual Advisor (EN / HI / GU) + PDF Dossier Export
                    │
                    ▼
[ Phase 2: Institutional & Government Integration ]
  • Direct API integration with State Channelizing Agencies (SCA)
  • Automated pre-filled application export for PMEGP & Mudra portals
  • FPO (Farmer Producer Organization) collective procurement bulk pricing
                    │
                    ▼
[ Phase 3: Rural Offline PWA & Voice First ]
  • 100% offline edge caching for zero-connectivity village operation
  • Voice-first conversational onboarding for low-literacy users in 12+ Indian languages
  • Live mandi pricing feeds via e-NAM (National Agriculture Market)
```
