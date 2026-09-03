# 🚀 AWS EC2 Deployment via Terraform (IaC) — GramSaarthi AI

This directory contains the production Infrastructure as Code (IaC) configuration for deploying **GramSaarthi AI** on **AWS EC2** with automated Docker containerization and HTTPS via Caddy.

---

## 🏗️ Architecture Components

1. **Virtual Private Cloud (VPC) & Security Group (`aws_security_group.web_sg`)**:
   - Inbound **Port 443** (HTTPS) & **Port 80** (HTTP for ACME challenge).
   - Inbound **Port 22** (SSH for system administration).
   - Outbound unrestricted for package updates & container pulling.
2. **EC2 Instance (`aws_instance.app_server`)**:
   - OS: **Ubuntu 24.04 LTS (Noble Numbat)** (Dynamically queried via Canonical AMI).
   - Instance Type: **`t3.micro`** (AWS Free Tier eligible: 1 vCPU, 1 GB RAM).
   - Storage: 20 GB gp3 SSD.
3. **Elastic IP (`aws_eip.app_ip`)**:
   - Fixed static IPv4 address that does not change when restarting or terminating instances.
4. **Cloud-Init Automation (`user_data.sh`)**:
   - Automatically installs Docker & Docker Compose plugin.
   - Installs Caddy Web Server (auto-manages Let's Encrypt TLS certificates).
   - Clones repository, builds multi-stage Docker container, and binds reverse proxy to `aws.chiragvasava.me`.

---

## 🛠️ Step-by-Step Execution Guide

### 1. Configure AWS Credentials
Ensure your AWS CLI is authenticated:
```bash
aws configure
```
Enter your AWS Access Key ID, Secret Access Key, Region (`ap-south-1`), and output (`json`).

### 2. Preview Infrastructure (`terraform plan`)
```bash
cd terraform
terraform plan
```
Terraform will display the exact 5 resources it will create in AWS.

### 3. Deploy Infrastructure (`terraform apply`)
```bash
terraform apply
```
Type `yes` when prompted. Within ~90 seconds, Terraform will output:
* `public_ip`: The static Elastic IP of your EC2 server.
* `app_url`: `https://aws.chiragvasava.me`
* `namecheap_dns_instruction`: The exact A-record to add in Namecheap.

### 4. Connect Domain in Namecheap
In your Namecheap Advanced DNS:
* **Type**: `A Record`
* **Host**: `aws`
* **Value**: `[Your Terraform Public IP]`
* **TTL**: `Automatic`

Once DNS propagates (typically 1–2 minutes), your AWS deployment will be live at:
**`https://aws.chiragvasava.me`**

### 5. Teardown / Cleanup (When Free Tier Ends or Not in Use)
To avoid any unexpected cloud costs:
```bash
terraform destroy
```
Type `yes`. Terraform will cleanly delete all AWS resources.
