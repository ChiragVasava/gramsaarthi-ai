# 🏛️ System Architecture — GramSaarthi AI

> **MSU Hack-A-Throne 2026 · Problem Statement P11**  
> **Production Endpoints:**  
> - **AWS EC2 Production:** [https://gramsaarthi-ai.chiragvasava.me](https://gramsaarthi-ai.chiragvasava.me)  
> - **Vercel Edge:** [https://gramsaarthi.chiragvasava.me](https://gramsaarthi.chiragvasava.me)

---

## 🎯 Purpose of This Document

This document provides a **complete architectural specification** of **GramSaarthi AI** for technical evaluators, software architects, and engineering reviewers. It delineates:
1. **Tiered System Architecture**: Layered breakdown across presentation, business logic, multi-report state store, intelligence, and persistent storage.
2. **Deterministic Mathematical Formulas**: Institutional credit structuring rules and multi-quarter debt amortization engines.
3. **Client-Side Canvas2D Proxy Engine**: Novel browser rendering architecture solving CSS color space incompatibility in PDF generation.
4. **Cloud & Edge Infrastructure**: Dual-cloud deployment topology combining Vercel serverless edge with an AWS EC2 Dockerized container fronted by Caddy reverse proxy.

---

## 📐 1. Master System Topology

```
                   [ Rural Micro-Entrepreneur ]
                                │
                        (Web / Mobile PWA)
                                │
 ┌──────────────────────────────┴──────────────────────────────┐
 │               Dual-Cloud Edge Ingress Layer                 │
 │  • Vercel Edge Network (Global CDN / Serverless SSR)        │
 │  • AWS EC2 (Elastic IP 13.126.176.46 + Caddy HTTP/2 Auto-TLS)│
 └──────────────────────────────┬──────────────────────────────┘
                                │
 ┌──────────────────────────────▼──────────────────────────────┐
 │         Presentation Layer: Next.js 16 + React 19           │
 │  - Guided 4-Step Feasibility Wizard (/wizard)               │
 │  - Multi-Enterprise Portfolio Dashboard (/dashboard)        │
 │  - Hyper-Local Spatial Catchment Map (/map)                 │
 │  - Multilingual AI Business Advisor (/chat)                 │
 │  - Dynamic Parameterized Feasibility Dossier (/report?id=..)│
 │  - Saved Reports Registry & Portfolio Manager (/reports)    │
 └──────────────────────────────┬──────────────────────────────┘
                                │
 ┌──────────────────────────────▼──────────────────────────────┐
 │     Multi-Business State & Real-Time Sync Engine            │
 │     (lib/report-store.ts + gs_report_changed Event Bus)     │
 │  - Dossier ID Registry & Active Context Switcher            │
 │  - Dynamic Real-Time Scoring Synthesizer                    │
 │  - Cross-Component & Cross-Tab Reactive Synchronization    │
 └──────────────────────────────┬──────────────────────────────┘
                                │
 ┌──────────────────────────────▼──────────────────────────────┐
 │   Deterministic Financial Structuring & Statutory Engine    │
 │  - Project Cost Multiplier: Project = Margin / 0.10         │
 │  - Concessional Debt Sizing: Loan = Project × 0.90          │
 │  - Statutory Scheme Classification:                         │
 │      • Micro Finance Scheme (≤ ₹1.40L, 6.5% p.a., 3-Yr)     │
 │      • Term Loan Scheme (> ₹1.40L–₹50L, 8.0% p.a., 7-Yr)    │
 │  - Moratorium Grace Period & Amortization Engine            │
 │  - 3-Month Working Capital Reserve Modeling                 │
 └──────────────────────────────┬──────────────────────────────┘
                                │
 ┌──────────────────────────────▼──────────────────────────────┐
 │              Intelligence & Persistence Tier                │
 │  - Multilingual Language Processor (EN, HI, GU)             │
 │  - Strict Domain Guardrail Filter                           │
 │  - SQLite Relational DB via Prisma ORM                      │
 │  - Client-Side Offscreen Canvas2D Color Proxy for PDF       │
 └─────────────────────────────────────────────────────────────┘
```

---

## 🧮 2. Statutory Financial Structuring Engine

GramSaarthi AI enforces deterministic financial logic compliant with central and state concessional lending guidelines (e.g., SCA, Mudra, PMEGP, NABARD):

### 1. Statutory Equity & Loan Sizing
$$\text{Project Cost} = \frac{\text{Margin Capital Commitment}}{0.10}$$
$$\text{Concessional Loan Amount} = \text{Project Cost} \times 0.90$$

### 2. Statutory Scheme Routing
- **Micro Finance Scheme:**
  $$\text{Condition: } \text{Project Cost} \le \text{₹1,40,000}$$
  $$\text{Concessional Interest Rate: } 6.5\% \text{ p.a.}$$
  $$\text{Tenure: } 3 \text{ Years (12 Quarters)} \quad | \quad \text{Moratorium: } 3 \text{ Months (1 Quarter)}$$
- **Term Loan Scheme:**
  $$\text{Condition: } \text{₹1,40,000} < \text{Project Cost} \le \text{₹50,00,000}$$
  $$\text{Concessional Interest Rate: } 8.0\% \text{ p.a.}$$
  $$\text{Tenure: } 7 \text{ Years (28 Quarters)} \quad | \quad \text{Moratorium: } 6 \text{ Months (2 Quarters)}$$

### 3. Grace Period Moratorium Modeling
During the statutory moratorium period ($T_{\text{grace}}$):
$$\text{Principal Repayment} = 0$$
$$\text{Accrued Interest} = \text{Principal} \times \frac{r}{4}$$
Following the moratorium, principal amortizes evenly over remaining quarters ($N - T_{\text{grace}}$).

---

## 🎨 3. Client-Side Canvas2D Color Proxy for PDF Generation

### The Problem
Modern web browsers use advanced CSS Color Module Level 4 spaces (`lab(...)`, `oklch(...)`) in Tailwind CSS v4 and modern component libraries. Standard client-side PDF rendering engines (`html2canvas` + `jsPDF`) crash or fail when encountering these color spaces, logging:
```
Error: unsupported color function "lab"
```

### The Architectural Solution
GramSaarthi AI deploys an in-memory **Canvas2D Color Proxy**:
1. Before cloning the DOM tree for PDF rasterization, computed styles are recursively traversed.
2. For each element with non-standard color definitions, the token is written to an offscreen `1×1` HTML5 Canvas context:
   ```typescript
   ctx.fillStyle = originalColor;
   const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
   element.style[prop] = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
   ```
3. The cloned document renders cleanly via `html2canvas` without errors, yielding high-resolution, vector-accurate PDFs downloaded directly in under 2 seconds.

---

## ☁️ 4. Dual-Cloud Production Infrastructure

- **Vercel Edge Network:** Deployed with zero configuration, providing instant edge caching and global low-latency responses.
- **AWS Cloud Production:**
  - **EC2 Instance:** Ubuntu 24.04 LTS (`t3.medium`) located in `ap-south-1` (Mumbai, India).
  - **Static Elastic IP:** Dedicated public IP (`13.126.176.46`) ensuring zero downtime during DNS lookups.
  - **Docker Multi-Stage Container:** Next.js 16 standalone production bundle running on Node 20.
  - **Caddy Reverse Proxy:** Automatic Let's Encrypt TLS issuance, HTTP/2 and HTTP/3 support, and automatic port 80 ➡️ 443 redirection.
  - **Terraform IaC:** Complete cloud environment defined in declarative HCL scripts for repeatable, audit-ready deployments.

---
*Architectural Specifications for MSU Hack-A-Throne 2026*
