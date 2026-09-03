# 🚀 Comprehensive Production Deployment Case Study & Interview Guide

> **Project Name:** GramSaarthi AI  
> **Repository:** `https://github.com/ChiragVasava/gramsaarthi-ai.git`  
> **Dual Production Deployments:**  
> 1. **Vercel Edge (Zero-Cost Serverless):** [https://gramsaarthi.chiragvasava.me/](https://gramsaarthi.chiragvasava.me/)  
> 2. **AWS EC2 via Terraform IaC (Containerized):** [https://gramsaarthi-ai.chiragvasava.me/](https://gramsaarthi-ai.chiragvasava.me/)  
> **Custom Domain Root:** `chiragvasava.me` managed on Namecheap  

---

## 📑 Table of Contents
1. [Architectural Overview: Dual Deployment Strategy](#1-architectural-overview-dual-deployment-strategy)
2. [Phase 1: Vercel Edge Serverless Deployment](#2-phase-1-vercel-edge-serverless-deployment)
3. [Phase 2: Docker Multi-Stage Containerization](#3-phase-2-docker-multi-stage-containerization)
4. [Phase 3: AWS EC2 Provisioning via Terraform IaC](#4-phase-3-aws-ec2-provisioning-via-terraform-iac)
5. [Real-World Production Troubleshooting Log (Interview Goldmine)](#5-real-world-production-troubleshooting-log-interview-goldmine)
6. [DNS & SSL Architecture (Namecheap + Let's Encrypt + Caddy)](#6-dns--ssl-architecture-namecheap--lets-encrypt--caddy)
7. [Cost Management & Teardown Protocol](#7-cost-management--teardown-protocol)
8. [Common DevOps Interview Questions from this Journey](#8-common-devops-interview-questions-from-this-journey)

---

## 1. Architectural Overview: Dual Deployment Strategy

In high-reliability system engineering, a **dual-deployment pattern** eliminates single-point-of-failure (SPOF) risks:

```
                                [ User / Client ]
                                        │
                         ┌──────────────┴──────────────┐
                         ▼                             ▼
       [ https://gramsaarthi.chiragvasava.me ]    [ https://gramsaarthi-ai.chiragvasava.me ]
                         │                             │
                   (CNAME Record)                 (A Record)
                         │                             │
                         ▼                             ▼
                ┌──────────────────┐          ┌──────────────────┐
                │ Vercel Serverless│          │ AWS Cloud (EC2)  │
                │ Edge Network     │          │ t3.micro (Mumbai)│
                │ 100% Free Forever│          │ Provisioned via  │
                │ Global CDN Cache │          │ Terraform IaC    │
                └──────────────────┘          └────────┬─────────┘
                                                       │
                                              ┌────────▼─────────┐
                                              │ Caddy Web Server │
                                              │ Auto-SSL (ACME)  │
                                              └────────┬─────────┘
                                                       │ (Reverse Proxy :3000)
                                              ┌────────▼─────────┐
                                              │ Docker Container │
                                              │ Next.js 16 +     │
                                              │ SQLite Volume    │
                                              └──────────────────┘
```

### Why Both?
* **Vercel** guarantees the app stays online 24/7/365 with **zero cloud maintenance cost**, even after the AWS 12-month free tier expires.
* **AWS + Terraform** provides full infrastructure ownership, demonstrates Infrastructure as Code (IaC) proficiency, and runs on an isolated virtual private server with dedicated resources.

---

## 2. Phase 1: Vercel Edge Serverless Deployment

### Actions Performed:
1. Linked GitHub repo `ChiragVasava/gramsaarthi-ai` to Vercel.
2. Configured production environment variables:
   * `NEXTAUTH_SECRET`: `gramsaarthi-ai-hackathon-2026-secret`
   * `DATABASE_URL`: `file:./dev.db`
3. Tested production build locally with `npm run build`:
   * Removed deprecated `eslint` options from `next.config.ts` to ensure clean execution.
4. Bound custom domain subdomain in Namecheap Advanced DNS:
   * **Type:** `CNAME Record`
   * **Host:** `gramsaarthi`
   * **Value:** `cname.vercel-dns.com.`
   * **TTL:** `Automatic`

### Verification Result:
* Application went live instantly at **`https://gramsaarthi.chiragvasava.me/`**.

---

## 3. Phase 2: Docker Multi-Stage Containerization

### The Technical Challenge:
A standard Next.js application directory includes `node_modules`, dev-dependencies, cache directories, and test files totaling **~1.2 GB**. Deploying this directly onto a small cloud VM exhausts memory and takes 15+ minutes to build.

### The Solution: Multi-Stage Build (`Dockerfile`)
```dockerfile
# Stage 1: Install production dependencies only
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci

# Stage 2: Compile application & Prisma client
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npx prisma generate
RUN npm run build

# Stage 3: Minimal runner image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
RUN apk add --no-cache openssl sqlite
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# Copy only the compiled output
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma
USER nextjs
EXPOSE 3000
CMD ["npm", "run", "start"]
```

### Key Architectural Benefits:
1. **Immutable Container:** Runs identically on any OS (local Windows, developer Mac, AWS Ubuntu EC2).
2. **Reduced Footprint:** Container image size shrunk from ~1.2 GB to ~180 MB.
3. **Least Privilege Security:** Container runs under non-root user `nextjs` (UID 1001), preventing host compromise if the app has a vulnerability.
4. **Data Persistence (`docker-compose.yml`):**
   ```yaml
   volumes:
     - ./data:/app/prisma
   ```
   Mounts the SQLite database folder to the host's EBS SSD. Even if the container is rebuilt or destroyed, all user accounts and reports remain intact!

---

## 4. Phase 3: AWS EC2 Provisioning via Terraform IaC

### Infrastructure as Code Files:
* **`variables.tf`:** Region (`ap-south-1` Mumbai), Instance Type (`t3.micro`), Domain (`gramsaarthi-ai.chiragvasava.me`).
* **`main.tf`:** Declares the AWS Provider, VPC, Security Group (Ports 80, 443, 22), EC2 instance, and Elastic IP.
* **`outputs.tf`:** Returns the public Elastic IP and DNS setup instructions.
* **`user_data.sh`:** Cloud-Init shell script executed automatically when the server boots.

### Terraform Execution Lifecycle:
```bash
# 1. Initialize AWS provider plugin
terraform init

# 2. Dry-run plan (calculates Delta between code and real cloud state)
terraform plan

# 3. Apply changes (provisions real cloud infrastructure)
terraform apply
```

### Resources Provisioned in AWS:
| AWS Resource | Resource ID | Role |
| :--- | :--- | :--- |
| **VPC** | `vpc-05127c530203ff573` | Isolated virtual network container in Mumbai (`ap-south-1`). |
| **Security Group** | `sg-0375a16fa18ba3538` | Virtual firewall allowing inbound Ports 80 (HTTP), 443 (HTTPS), and 22 (SSH). |
| **EC2 Instance** | `i-03f0117fc63136563` | Ubuntu 24.04 LTS `t3.micro` instance with 20GB gp3 SSD. |
| **Elastic IP (EIP)** | `13.126.176.46` | Permanent, static public IPv4 address that does not change on reboot. |

---

## 5. Real-World Production Troubleshooting Log (Interview Goldmine)

Every real-world deployment faces environmental obstacles. Here are the exact errors encountered, the root causes discovered, and how they were systematically resolved:

### ❌ Issue 1: `terraform : The term 'terraform' is not recognized`
* **Symptom:** Running `terraform -version` in PowerShell returned command not found.
* **Root Cause:** `winget` installed the binaries and updated Windows System Environment Variables in the registry, but the currently active PowerShell session had cached the old environment `PATH`.
* **Resolution:** Refreshed session environment variable without restarting the computer:
  ```powershell
  $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
  ```

---

### ❌ Issue 2: Next.js Container Build Hang / OOM on `t3.micro`
* **Symptom:** Website was not loading on port 3000 after EC2 launched.
* **Diagnosis:**
  * Connected to EC2 via AWS EC2 Instance Connect.
  * Checked system memory using `free -m`: `t3.micro` has **909 MB physical RAM**.
  * The Next.js 16 + Turbopack + Tailwind 4 TypeScript compiler peak memory footprint reached ~1.3 GB during `next build`, triggering the Linux Out-Of-Memory (OOM) killer.
* **Root Cause:** Zero swap memory was allocated on the default Ubuntu AMI (`Swap: 0 MB`).
* **Resolution:** Created a **2 GB Swapfile** backed by the high-speed gp3 SSD:
  ```bash
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
  ```
* **Result:** Build finished with 100% success across all 12 routes in 39.5 seconds!

---

### ❌ Issue 3: Caddy Serving Default Welcome Page Instead of App
* **Symptom:** Visiting `http://13.126.176.46/` rendered Caddy's default "Congratulations!" landing page instead of the GramSaarthi application.
* **Root Cause:** The default `/etc/caddy/Caddyfile` had not been overwritten with the reverse proxy configuration block.
* **Resolution:** Re-configured Caddyfile to reverse-proxy incoming domain traffic directly to the Next.js Docker container on port 3000:
  ```caddy
  gramsaarthi-ai.chiragvasava.me {
      reverse_proxy localhost:3000
  }
  ```
  Ran `sudo systemctl restart caddy`.

---

### ❌ Issue 4: SSL Handshake Failure on Port 443
* **Symptom:** Browser showed connection error on `https://`.
* **Root Cause:** Let's Encrypt automated TLS certificate generation (ACME protocol) requires public DNS to point to the server before it issues certificates.
* **Resolution:** Added the `A Record` for host `gramsaarthi-ai` pointing to `13.126.176.46` in Namecheap Advanced DNS. Within 3 seconds of DNS propagation, Caddy completed the ACME challenge and issued the valid SSL certificate!

---

## 6. DNS & SSL Architecture (Namecheap + Let's Encrypt + Caddy)

### DNS Records in Namecheap:
| Host | Record Type | Target Value | Purpose |
| :--- | :--- | :--- | :--- |
| `gramsaarthi` | `CNAME Record` | `cname.vercel-dns.com.` | Routes traffic to Vercel Serverless Edge. |
| `gramsaarthi-ai`| `A Record` | `13.126.176.46` | Routes traffic to AWS EC2 Elastic IP. |

### Why Caddy instead of Nginx?
* **Nginx** requires installing Certbot, configuring cron jobs for renewal, handling TLS challenge directories, and restarting services upon renewal.
* **Caddy** has **native automatic HTTPS**:
  1. It handles ACME challenges (HTTP-01 and TLS-ALPN-01) automatically in-memory.
  2. It auto-renews certificates 30 days before expiration.
  3. It automatically redirects all `http://` traffic to `https://` with zero extra configuration.

---

## 7. Cost Management & Teardown Protocol

### How Much Does this AWS Setup Cost?
* **`t3.micro` EC2:** 750 hours/month included in AWS Free Tier for 12 months ($0).
* **20 GB gp3 Storage:** 30 GB/month included in AWS Free Tier ($0).
* **Elastic IP:** **100% Free** as long as it remains attached to a running EC2 instance.

### Clean Cloud Teardown (Destruction in 30 Seconds):
When you are done testing or want to conserve Free Tier hours:
```powershell
cd terraform
terraform destroy
```
Type **`yes`**. Terraform will automatically delete the Elastic IP, EC2 instance, Security Group, and VPC.

### Spin it Back Up Tomorrow:
```powershell
terraform apply
```
Type **`yes`**. Everything will be recreated and live again in 60 seconds!

---

## 8. Common DevOps Interview Questions from this Journey

### Q1: What is the difference between Imperative and Declarative IaC?
> **Answer:** Imperative tools (like AWS CLI scripts) require you to specify the exact sequence of commands to execute (`create-vpc`, then `create-subnet`). If run twice, it errors out or creates duplicate resources. Declarative tools (like Terraform) declare the *desired end state* (`resource "aws_instance"`). Terraform inspects what currently exists, calculates the diff, and brings the infrastructure to match the code idempotently.

### Q2: Why use a Multi-Stage Dockerfile for Next.js?
> **Answer:** In Node.js projects, build tools like TypeScript, Tailwind, ESLint, and devDependencies are only needed to produce the `.next` bundle. By splitting the Dockerfile into `deps`, `builder`, and `runner` stages, we discard `devDependencies` and temporary source files, copying only compiled standalone production artifacts into the final Alpine Linux image. This shrinks image size by 80%+, improves download speed, and minimizes attack surface.

### Q3: How did you resolve an Out-Of-Memory (OOM) error during container build on a 1 GB RAM EC2 instance?
> **Answer:** When compiling large production bundles (e.g. Next.js App Router with TypeScript and CSS compilers), memory consumption temporarily spikes past 1 GB. By provisioning a 2 GB swapfile on the EBS SSD (`mkswap` / `swapon`), the Linux kernel swaps inactive pages to disk during peak compilation, preventing the OOM killer from terminating the Node process without needing to upgrade to a more expensive instance tier.

### Q4: How does Caddy achieve Zero-Touch SSL?
> **Answer:** Caddy embeds an ACME client directly inside the web server binary. When configured with a domain name, Caddy listens on port 80/443, completes the Let's Encrypt challenge, saves the certificate to `/var/lib/caddy`, binds it to the TLS listener, and schedules automated renewal without external cron jobs or Certbot scripts.
