# 🛠️ Technology Stack Deep Dive — GramSaarthi AI

### Hack-A-Throne 2026 · Problem Statement P11

---

## 1. Stack Architecture Summary

| Layer | Selected Technology | Version | Justification & Architectural Trade-off |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | 16.3.4 | Server-side rendering, lightning-fast static page generation, and zero-config Turbopack bundling for immediate hackathon demo reliability. |
| **Language** | TypeScript | 5.0+ | Strict type-safety across financial engines, eliminating floating-point errors and schema regressions. |
| **UI Styling** | Tailwind CSS & PostCSS | 4.0 | Modern utility-first styling with zero runtime CSS overhead, supporting responsive mobile layouts and custom print styles. |
| **Icons & UI** | Lucide React | Latest | Clean, accessible iconography with minimal bundle footprint. |
| **PDF Generation** | jsPDF + html2canvas | 4.0 / 1.4 | Client-side vector and canvas rendering enabling 1-click official feasibility dossier downloads without server-side headless browsers. |
| **Database & ORM** | SQLite + Prisma ORM | 5.22.0 | Zero-dependency, portable local database allowing any evaluator to clone and run the repository without configuring external cloud services. |
| **Auth** | Session LocalStorage & Prisma | Custom | Lightweight, zero-latency authentication enabling 1-click evaluation access without external OAuth barriers. |
| **AI Intelligence** | Gemini API & Fallback | 1.5-Flash | Fast, low-latency reasoning with an autonomous deterministic fallback engine to guarantee zero demo crashes. |
| **Speech Engine** | Web Speech API | Native | In-browser speech synthesis and recognition supporting Hindi, Gujarati, and English without API quotas. |
| **Cloud Infrastructure** | AWS EC2 via Terraform IaC | HashiCorp v1.15 | Fully automated cloud provisioning with static Elastic IP, security group ingress, swapfile optimization, and automated Caddy reverse proxy. |
| **Containerization** | Docker & Docker Compose | Multi-Stage | Lean Alpine multi-stage production container compiling Turbopack bundle with low memory footprint. |

---

## 2. Deterministic Financial Logic vs. Generative LLMs

A key architectural highlight of GramSaarthi AI is the strict separation between **deterministic mathematical modeling** and **generative advisory context**:

```
┌────────────────────────────────────────────────────────┐
│               GramSaarthi Architecture                 │
├───────────────────────────┬────────────────────────────┤
│ Deterministic Engine (TS) │ Generative Intelligence    │
├───────────────────────────┼────────────────────────────┤
│ • Project Cost (Margin/10%)│ • Qualitative SWOT Context │
│ • Loan Eligibility (90%)  │ • Pricing Strategy Nuances │
│ • Statutory Scheme Routing│ • Operational Risk Advice  │
│ • Quarterly Amortization  │ • Multilingual Q&A (HI/GU) │
│ • Working Capital Buffers │                            │
└───────────────────────────┴────────────────────────────┘
```

By decoupling debt calculations from the LLM, GramSaarthi AI achieves **100% mathematical auditability** while retaining the empathetic conversational power of modern AI.
