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

## 📊 2. Official 6-Slide Presentation Deck Alignment

The official presentation deck files strictly adhere to the 6-slide limit for the Elimination Round:
- **PowerPoint Deck:** [`MD_Files/GramSaarthi_AI_Hackathon_Presentation.pptx`](./GramSaarthi_AI_Hackathon_Presentation.pptx) *(and in `Elimination Submission/`)*
- **High-Resolution PDF (6 Pages):** [`MD_Files/GramSaarthi_AI_Hackathon_Presentation.pdf`](./GramSaarthi_AI_Hackathon_Presentation.pdf) *(and in `Elimination Submission/`)*

### Slide-by-Slide Structure (Official MSU Hack-A-Throne 2026 Template)
1. **Slide 1: Basic Details of the Team and Problem Statement**
   - Problem Statement Number: P11
   - Problem Statement Title: AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs
   - Project Title: GramSaarthi AI (ग्रामसारथी)
   - Team Leader: Chirag Vasava
   - Live Deployment Links: AWS EC2 (`https://gramsaarthi-ai.chiragvasava.me`), Vercel Edge (`https://gramsaarthi.chiragvasava.me`), and GitHub.
2. **Slide 2: Idea/Approach Details (Prototype & Technology Stack)**
   - Left: Core Problem Addressed (63M+ MSMEs, 40%+ failure rate, 78% credit rejection) + GramSaarthi AI Dual-Engine Solution + Multi-Enterprise Portfolio + 1-Click PDF Engine.
   - Right: Technology Stack (Next.js 16 App Router, TypeScript 5, Tailwind CSS, Prisma/SQLite, Dual-Cloud AWS EC2 + Vercel, Terraform IaC, Gemini API with strict guardrails, Canvas2D PDF proxy).
3. **Slide 3: Idea/Approach Details (Use Cases & Dependencies)**
   - Left: 4 Verified Use Cases: (1) Dairy Enterprise (₹10L project, ₹9L Term Loan @ 8.0%), (2) Food Processing & Flour (₹1.20L project, ₹1.08L Micro Finance @ 6.5%), (3) Multi-Enterprise Portfolio Management, (4) Trilingual Voice-First Advisory in Hindi & Gujarati.
   - Right: Dependencies: Node.js 20, Next.js 16, Prisma 5.22, AWS EC2 Ubuntu 24.04, Docker, Caddy auto-TLS, Terraform, Google Gemini API, Web Speech API.
4. **Slide 4: Idea/Approach Details (Uniqueness of your Idea & Future Scope/Impact)**
   - Left: Uniqueness: Decoupled deterministic math (zero hallucinations), automated scheme routing, 5 & 10 km concentric catchment, multi-enterprise portfolio switching, 1-click zero-crash PDF export, trilingual AI with strict domain guardrails, dual-cloud production.
   - Right: Impact & Roadmap: Reduces 40%+ early failure rate, cuts appraisal time from 4–6 weeks to <90s, unlocks statutory credit. Roadmap: SCA & JanSamarth portal API, e-NAM mandi feeds, offline edge AI, SHG multi-tenant clustering.
5. **Slide 5: Architecture Diagram**
   - Official Template Header: *Architecture Diagram*.
   - High-resolution clean architectural diagram embedding the complete dual-cloud, client, reactive state store, and deterministic engine topology.
6. **Slide 6: Additional Details (Keep the content limited to this slide only)**
   - Left: Live Prototype & Verification Highlights (Dual-cloud HTTP/2 200 OK endpoints, 1-click demo evaluation mode `demo@gramsaarthi.ai`, 10 active live routes, zero hardcoded data, 1-click PDF download).
   - Right: Alignment with P11 Problem Statement & Screening (Strict P11 compliance, mathematical auditability, comprehensive documentation suite in `MD_Files/`, clean GitHub repository, 3-minute video presentation script ready).


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
