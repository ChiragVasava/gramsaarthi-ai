# 📁 GramSaarthi AI — Documentation Index & Evaluation Guide

Welcome to the central documentation hub for **GramSaarthi AI**, submitted for **MSU Hack-A-Throne 2026 (Problem Statement P11: AI-Powered Rural Business Feasibility & Concessional Credit Appraisal Framework)**.

---

## 🎯 Purpose of This Documentation Suite

This folder contains the complete technical, architectural, operational, and presentation resources for evaluating **GramSaarthi AI**. Each document serves a dedicated purpose tailored to specific judging criteria:

| Document | Purpose of Creation | Target Audience | Primary Focus Areas |
| :--- | :--- | :--- | :--- |
| **[`MANUAL_TEST_REPORT.md`](./MANUAL_TEST_REPORT.md)** | **Validation & Proof of Correctness**: Comprehensive step-by-step verification log of every module, multi-business portfolio switching, direct 1-click PDF download, trilingual UI, and domain guardrails. | Quality Assurance, Hackathon Judges, Evaluators | Test Matrix, Multi-Business Sync, Step-by-Step Self-Testing Walkthrough |
| **[`DEMO_SCRIPT.md`](./DEMO_SCRIPT.md)** | **Demonstration Walkthrough**: Word-for-word 3-to-5 minute live video recording and demo guide highlighting the complete user journey from onboarding to multi-report export. | Presenters, Video Reviewers, Jury Members | Script, Screen-by-Screen Action Cues, Multilingual & Guardrail Proof |
| **[`FEATURES.md`](./FEATURES.md)** | **Functional Specification**: Complete technical inventory of every platform capability, mathematical formula, statutory rule, and UI component. | Product Evaluators, Jury, Business Analysts | Statutory Loan Sizing, 8 Enterprise Trades, Catchment Geofencing, PDF Engine |
| **[`ARCHITECTURE.md`](./ARCHITECTURE.md)** | **System Engineering Blueprint**: Detailed layer separation, ASCII diagrams, data-flow pipelines, and algorithmic formulation of the scoring engine. | Technical Evaluators, Architects, Developers | Client/Edge/DB Architecture, Dynamic Scoring Algorithm, Canvas2D Proxy |
| **[`TECH_STACK.md`](./TECH_STACK.md)** | **Engineering Justification**: Deep-dive rationale behind our technology choices, trade-offs, and performance benchmarks. | Engineering Reviewers, Full-Stack Evaluators | Next.js 16, TypeScript, Tailwind CSS, Prisma/SQLite, jsPDF/html2canvas |
| **[`DEPLOYMENT_CASE_STUDY.md`](./DEPLOYMENT_CASE_STUDY.md)** | **Production DevOps Case Study**: Comprehensive production log detailing dual-cloud deployment across Vercel (Edge) and AWS EC2 (Docker + Caddy Reverse Proxy). | Cloud Engineers, DevOps Assessors, Interviewers | Dual-Cloud Topology, Docker Multi-Stage Builds, Caddy Auto-TLS, 200 OK Logs |
| **[`TERRAFORM.md`](./TERRAFORM.md)** | **Infrastructure as Code (IaC) Master Guide**: HCL code breakdowns, cloud-init automated provisioning scripts, and teaching notes for reproducible AWS setups. | Cloud Evaluators, SREs, Students | AWS Provider, VPC/EIP/SG Definitions, Cloud-Init, AI Learning Prompt |
| **[`terraform-deployment-log.md`](./terraform-deployment-log.md)** | **Raw Deployment Evidence**: Uncut CLI execution transcript of `terraform init`, `plan`, `apply`, and AWS resource provisioning. | DevOps Auditors, Technical Verifiers | Real CLI Execution Logs, Resource IDs, Elastic IP Bindings |
| **[`LIMITATIONS_AND_ROADMAP.md`](./LIMITATIONS_AND_ROADMAP.md)** | **Strategic Vision & Transparency**: Honest prototype boundaries, statutory disclaimers, and 12-month production scaling roadmap. | Grand Jury, Policy Experts, Investors | Regulatory Safeguards, Banking API Roadmaps, IoT Agri-Integration |
| **[`HACKATHON_SUBMISSION_GUIDE.md`](./HACKATHON_SUBMISSION_GUIDE.md)** | **Submission Checklist**: Form fields, project metadata, links, slide deck notes, and presentation guidelines for submission day. | Team Members, Hackathon Secretariat | Submission Form Copy-Paste Fields, Repository Links, Slide Cues |
| **[`GramSaarthi_AI_Hackathon_Presentation.pptx`](./GramSaarthi_AI_Hackathon_Presentation.pptx)** | **Official 6-Slide Template Deck**: Master PowerPoint presentation built directly on the official MSU Hack-A-Throne Elimination template with institutional-grade content. | Live Hackathon Pitch, Evaluators, Organizers | Official 6-Slide Template, Business Case, System Demo, Architecture |
| **[`GramSaarthi_AI_Hackathon_Presentation.pdf`](./GramSaarthi_AI_Hackathon_Presentation.pdf)** | **Official 6-Page Pitch Deck PDF**: High-resolution, vector-accurate 6-page PDF export strictly adhering to the 6-slide elimination round rule for portal submission. | Judges, Portal Uploads, Offline Review | Official 6-Page Elimination Submission Document |

---

## 🌐 Live Application Endpoints

- **AWS Cloud Production:** [https://gramsaarthi-ai.chiragvasava.me](https://gramsaarthi-ai.chiragvasava.me)  
  *(Powered by AWS EC2 ap-south-1, Docker Container, Caddy Reverse Proxy with HTTP/2 & Auto-TLS)*
- **Vercel Serverless Production:** [https://gramsaarthi.chiragvasava.me](https://gramsaarthi.chiragvasava.me)  
  *(Powered by Vercel Edge Network)*
- **GitHub Repository:** [https://github.com/ChiragVasava/gramsaarthi-ai](https://github.com/ChiragVasava/gramsaarthi-ai)

---

## ⚡ Quick Evaluation Pathway (For Judges with 5 Minutes)

1. **Watch Demo Video / Follow Script:** Read [`DEMO_SCRIPT.md`](./DEMO_SCRIPT.md) for the exact 3-minute video flow.
2. **Review Functional Capabilities:** Open [`FEATURES.md`](./FEATURES.md) to inspect the 8 enterprise trades and statutory credit formulas.
3. **Verify Implementation & Correctness:** Inspect [`MANUAL_TEST_REPORT.md`](./MANUAL_TEST_REPORT.md) to see real test results including dynamic multi-report portfolio switching, 1-click direct PDF downloads, and domain-restricted multilingual chat.
4. **Inspect Cloud Infrastructure:** View [`DEPLOYMENT_CASE_STUDY.md`](./DEPLOYMENT_CASE_STUDY.md) and [`TERRAFORM.md`](./TERRAFORM.md) for full AWS IaC and containerization evidence.

---
*Built with ❤️ for Bharat's Rural Micro-Entrepreneurs — MSU Hack-A-Throne 2026*
