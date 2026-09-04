# 🏆 MSU Hack-A-Throne 2026 — Submission & Presentation Guide

> **Problem Statement Selected:** **P11 — AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs**  
> **Team Lead:** Chirag Vasava  
> **Project Name:** GramSaarthi AI (ग्रामसारथी)  
> **GitHub Repository:** [https://github.com/ChiragVasava/gramsaarthi-ai](https://github.com/ChiragVasava/gramsaarthi-ai)  
> **AWS Production URL:** [https://gramsaarthi-ai.chiragvasava.me](https://gramsaarthi-ai.chiragvasava.me)  
> **Vercel Production URL:** [https://gramsaarthi.chiragvasava.me](https://gramsaarthi.chiragvasava.me)

---

## 🎯 Purpose of This Document

This guide was created as an **all-in-one operational checklist and submission blueprint** for the **MSU Hack-A-Throne 2026** competition. It contains:
1. **Exact Form Field Copy-Paste Data**: Pre-drafted summaries, technical descriptions, and links ready for the hackathon submission form.
2. **Slide-by-Slide Presentation Structure**: Content and cue alignment matching `GramSaarthi_AI_Hackathon_Presentation.pptx` and `GramSaarthi_AI_Hackathon_Presentation.pdf`.
3. **Pre-Submission Quality Checklist**: Comprehensive verification verifying functional readiness, cloud stability, and artifact availability.

---

## 📝 1. Official Submission Form Entries

When filling out the hackathon submission portal / Google Form, use these verified entries:

| Field Name | Official Entry to Copy & Paste |
| :--- | :--- |
| **Problem Statement Code** | **P11** |
| **Problem Statement Title** | AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs |
| **Project Title** | **GramSaarthi AI (ग्रामसारथी)** |
| **Short Description (Tagline)** | National Micro-Enterprise Evaluation Engine & Concessional Credit Appraisal Framework for Bharat |
| **Live Deployed URL (AWS Cloud)** | `https://gramsaarthi-ai.chiragvasava.me` |
| **Live Deployed URL (Vercel Edge)** | `https://gramsaarthi.chiragvasava.me` |
| **GitHub Repository Link** | `https://github.com/ChiragVasava/gramsaarthi-ai.git` |
| **Tech Stack** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Prisma ORM (SQLite), jsPDF + html2canvas with Canvas2D Color Proxy, Docker, AWS EC2, Caddy Reverse Proxy (Auto-TLS), Terraform IaC. |
| **Key Innovations** | 1. **Multi-Enterprise Portfolio Engine**: Real-time cross-application synchronization across Dashboard, Report, Map, Calculator, and AI Chat.<br>2. **Deterministic Statutory Credit Sizing**: Automated 10% equity committed sizing with Micro Finance (6.5%) vs. Term Loan (8.0%) routing and moratorium modeling.<br>3. **1-Click Direct PDF Engine**: Zero-crash client-side Canvas2D color proxy enabling direct PDF download in <2s without browser print dialogs.<br>4. **Trilingual Guardrailed AI Desk**: English, Hindi, and Gujarati advisory strictly constrained to rural business and credit scheme domains.<br>5. **Dual-Cloud Production Deployment**: Live on Vercel Edge and AWS EC2 with Docker and automated Terraform provisioning. |

---

## 📊 2. Presentation Deck Alignment (12-Slide Master)

The presentation deck files are located directly in the `MD_Files/` directory:
- **PowerPoint Deck:** [`MD_Files/GramSaarthi_AI_Hackathon_Presentation.pptx`](./GramSaarthi_AI_Hackathon_Presentation.pptx)
- **High-Resolution PDF:** [`MD_Files/GramSaarthi_AI_Hackathon_Presentation.pdf`](./GramSaarthi_AI_Hackathon_Presentation.pdf)

### Slide Structure Overview
1. **Slide 1: Title & Vision** — Project introduction, problem statement P11, and team credits.
2. **Slide 2: The Rural Entrepreneurship Crisis** — High failure rate, credit linkage failure, spatial illiteracy.
3. **Slide 3: Statutory Concessional Credit Framework** — 10% margin rule, 90% loan, scheme qualification.
4. **Slide 4: GramSaarthi AI Solution Architecture** — Presentation, State Store, Calculation, and Intelligence tiers.
5. **Slide 5: Guided Feasibility Wizard** — 4-step intake, 8 trade categories, real-time dynamic scoring.
6. **Slide 6: Dynamic Multi-Report & Portfolio Management** — Multi-enterprise switching and aggregated capital.
7. **Slide 7: Spatial Catchment Intelligence (5 km & 10 km)** — Geofenced catchment, trade-adaptive POIs.
8. **Slide 8: Concessional Financial Calculator & Moratorium** — Grace period modeling, quarterly amortization.
9. **Slide 9: Trilingual Guardrailed AI Advisor (ArthaBot)** — EN/HI/GU localization, strict domain boundaries.
10. **Slide 10: 1-Click Client-Side PDF Engine** — Canvas2D color proxy architecture and instant export.
11. **Slide 11: Production Cloud Architecture & DevOps** — AWS EC2, Docker, Caddy auto-TLS, and Terraform IaC.
12. **Slide 12: Business Impact, Scalability & Roadmap** — Bank integration, e-NAM mandi feeds, offline PWA.

---

## ✅ 3. Pre-Submission Verification Checklist

- [x] **Production Endpoints Active:**
  - AWS EC2 (`https://gramsaarthi-ai.chiragvasava.me`) returns `HTTP/2 200 OK`.
  - Vercel Edge (`https://gramsaarthi.chiragvasava.me`) returns `200 OK`.
- [x] **Zero TypeScript / Build Errors:** Verified with `npx tsc --noEmit` and `npm run build`.
- [x] **Multi-Business Support Verified:** Users can run appraisals for multiple businesses, view unique dossiers (`/report?id=...`), and toggle active businesses across all modules.
- [x] **1-Click PDF Generation Verified:** Downloads directly in <2 seconds with Canvas2D color proxy.
- [x] **Trilingual & Guardrailed AI Verified:** Greets by name in EN/HI/GU, rejects off-topic queries.
- [x] **One-Click Demo Credentials:** Active and tested (`demo@gramsaarthi.ai` / `demo123`).
- [x] **Documentation Suite Complete:** All 10 MD documents indexed in [`MD_Files/INDEX.md`](./INDEX.md).
- [x] **Presentation Deck Generated:** PPTX and PDF generated in `MD_Files/`.

---
*MSU Hack-A-Throne 2026 — Ready for Submission & Demonstration*
