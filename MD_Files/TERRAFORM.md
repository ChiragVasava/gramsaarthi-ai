# 🌍 Complete Terraform (IaC) Master Guide & Live Project Blueprint

> **Purpose:** This document is designed as a complete reference manual and AI teaching prompt for **Terraform Infrastructure as Code (IaC)**.  
> You can feed this entire document into any Generative AI model or use it as a study guide to learn Terraform through a **real-world, end-to-end production deployment on AWS**.

---

## 📑 Curriculum & Structure
1. [Core Terraform Fundamentals (Concepts Every Engineer Must Know)](#1-core-terraform-fundamentals)
2. [Terraform CLI Workflow & Commands](#2-terraform-cli-workflow--commands)
3. [The Live Project Codebase Architecture](#3-the-live-project-codebase-architecture)
4. [Anatomy of our `main.tf` (Line-by-Line Breakdown)](#4-anatomy-of-our-maintf-line-by-line-breakdown)
5. [Variables, State Files, and Outputs](#5-variables-state-files-and-outputs)
6. [Cloud-Init & Automated Instance Bootstrapping (`user_data.sh`)](#6-cloud-init--automated-instance-bootstrapping-user_datash)
7. [Production Best Practices & Gotchas](#7-production-best-practices--gotchas)
8. [Advanced Terraform Concepts for Cloud Engineers](#8-advanced-terraform-concepts-for-cloud-engineers)
9. [Prompt for Teaching AI (How to use this file with ChatGPT/Claude)](#9-prompt-for-teaching-ai)

---

## 1. Core Terraform Fundamentals

### What is Infrastructure as Code (IaC)?
Infrastructure as Code is the practice of managing and provisioning computing infrastructure (networks, virtual machines, load balancers, database instances) through machine-readable definition files, rather than through physical hardware configuration or interactive web consoles (ClickOps).

### Key Architectural Tenets of Terraform:
* **Declarative Language (HCL - HashiCorp Configuration Language):**
  * You describe **what** you want the end result to look like.
  * *Imperative (Scripting):* "Create a VPC, then create a subnet, then attach a gateway."
  * *Declarative (Terraform):* "I want a VPC with this CIDR block, and an EC2 instance inside it." Terraform figures out the dependency graph and API sequence.
* **Idempotency:**
  * Running `terraform apply` once creates the infrastructure.
  * Running `terraform apply` a second time with no code changes does **nothing**.
  * Terraform ensures the real infrastructure always matches the code state without duplicating resources.
* **Provider Ecosystem:**
  * Providers are plugins that bridge Terraform with cloud APIs (AWS, Azure, GCP, Cloudflare, Kubernetes).
  * Example: The `hashicorp/aws` provider translates HCL blocks into AWS REST API calls.

---

## 2. Terraform CLI Workflow & Commands

The core lifecycle of any Terraform project follows four primary commands:

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│ terraform init  │ ────► │ terraform plan  │ ────► │ terraform apply │ ────► │terraform destroy│
│ (Plugin & State)│       │ (Dry-run Diff)  │       │ (Real Execution)│       │ (Clean Teardown)│
└─────────────────┘       └─────────────────┘       └─────────────────┘       └─────────────────┘
```

| Command | What it does | Real Output from our Project |
| :--- | :--- | :--- |
| `terraform init` | Scans `.tf` files, downloads provider plugins (e.g. `aws v5.100.0`), and configures the backend. | `Terraform has been successfully initialized!` |
| `terraform plan` | Compares current cloud state with code; displays the exact diff (additions, modifications, deletions). | `Plan: 4 to add, 0 to change, 0 to destroy.` |
| `terraform apply` | Prompts for confirmation (`yes`), executes API calls, and provisions real cloud resources. | `Apply complete! Resources: 4 added, 0 changed, 0 destroyed.` |
| `terraform destroy` | Safely removes all managed resources in reverse dependency order, preventing cloud billing leaks. | `Destroy complete! Resources: 4 destroyed.` |
| `terraform fmt` | Automatically formats HCL code according to canonical HashiCorp style conventions. | Clean indentation and spacing. |
| `terraform validate` | Checks syntax and attribute correctness without contacting cloud APIs. | `Success! The configuration is valid.` |

---

## 3. The Live Project Codebase Architecture

Our project lives in `gramsaarthi-ai/terraform/` with the following clean modular layout:

```
terraform/
├── main.tf          # Core infrastructure declarations (VPC, Security Group, EC2, EIP)
├── variables.tf     # Configurable input parameters with defaults and types
├── outputs.tf       # Values returned to the terminal after successful execution
├── user_data.sh     # Cloud-init bash script executed inside the virtual machine on boot
└── .terraform.lock.hcl # Dependency lock file pinning exact provider versions
```

---

## 4. Anatomy of our `main.tf` (Line-by-Line Breakdown)

Here is the exact code that provisioned our live AWS infrastructure:

```hcl
# 1. Terraform Block & Provider Requirements
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# 2. Provider Configuration
provider "aws" {
  region = var.aws_region # Defaults to ap-south-1 (Mumbai)
}

# 3. Dynamic Data Source: Fetching the latest Ubuntu 24.04 AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
  owners = ["099720109477"] # Canonical's official AWS account ID
}

# 4. Default VPC Resource
resource "aws_default_vpc" "default" {
  tags = {
    Name = "${var.app_name}-vpc"
  }
}

# 5. Security Group (Virtual Firewall)
resource "aws_security_group" "web_sg" {
  name        = "${var.app_name}-sg"
  description = "Allow HTTP, HTTPS, and SSH inbound traffic"
  vpc_id      = aws_default_vpc.default.id

  # Port 443 for Secure Web Traffic
  ingress {
    description = "Allow HTTPS from anywhere"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Port 80 for HTTP & ACME Certificate Validation
  ingress {
    description = "Allow HTTP from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Port 22 for Secure Shell Administration
  ingress {
    description = "Allow SSH administration"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Unrestricted Outbound Traffic for Package Updates & Docker Registry Pulling
  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.app_name}-sg"
  }
}

# 6. Virtual Machine (EC2 Instance)
resource "aws_instance" "app_server" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type # t3.micro (Free Tier eligible)
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  root_block_device {
    volume_size           = 20
    volume_type           = "gp3"
    delete_on_termination = true
  }

  user_data = file("${path.module}/user_data.sh")

  tags = {
    Name        = "${var.app_name}-server"
    Environment = "production"
    ManagedBy   = "terraform"
  }
}

# 7. Static Public Elastic IP (EIP)
resource "aws_eip" "app_ip" {
  instance = aws_instance.app_server.id
  domain   = "vpc"

  tags = {
    Name = "${var.app_name}-eip"
  }
}
```

---

## 5. Variables, State Files, and Outputs

### Input Variables (`variables.tf`):
Variables allow your infrastructure code to be **reusable across different environments** (e.g. dev, staging, prod) without modifying the core logic:
```hcl
variable "aws_region" {
  type    = string
  default = "ap-south-1"
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "domain_name" {
  type    = string
  default = "gramsaarthi-ai.chiragvasava.me"
}
```

### Outputs (`outputs.tf`):
Outputs extract values from the provisioned state and display them to the user:
```hcl
output "public_ip" {
  value = aws_eip.app_ip.public_ip
}

output "app_url" {
  value = "https://${var.domain_name}"
}
```

### The State File (`terraform.tfstate`):
* **What it is:** A JSON file where Terraform stores the real-world IDs, IP addresses, and metadata of everything it manages.
* **Why it matters:** Terraform uses this file to calculate what needs to be updated during `terraform plan`.
* ⚠️ **Security Rule:** Never commit `terraform.tfstate` to public Git repositories! In enterprise environments, state is stored remotely in **AWS S3 with DynamoDB state locking** to prevent concurrent modifications by multiple team members.

---

## 6. Cloud-Init & Automated Instance Bootstrapping (`user_data.sh`)

Terraform provisions the virtual hardware, while `user_data.sh` installs and configures the software stack at first boot:

```bash
#!/bin/bash
set -e

# 1. Allocate 2GB Swap Memory (Crucial for 1GB t3.micro instances during Node.js compilation)
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

# 2. Install Docker & Git
apt-get update -y
apt-get install -y docker.io docker-compose-plugin git

# 3. Install Caddy Web Server (Zero-Touch Automated HTTPS)
apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt-get update -y
apt-get install -y caddy

# 4. Clone and Launch Container
mkdir -p /opt/app && cd /opt/app
git clone https://github.com/ChiragVasava/gramsaarthi-ai.git .
docker compose up -d --build

# 5. Configure Reverse Proxy with Domain
cat <<EOF > /etc/caddy/Caddyfile
gramsaarthi-ai.chiragvasava.me {
    reverse_proxy localhost:3000
}
EOF

systemctl restart caddy
systemctl enable caddy
```

---

## 7. Production Best Practices & Gotchas

| Practice | Why It Matters in Real Life |
| :--- | :--- |
| **Pin Provider Versions** (`~> 5.0`) | Prevents unexpected breaking changes when HashiCorp releases a new major provider version. |
| **Use Elastic IP over Public IP** | Standard EC2 public IPs change every time an instance stops or reboots. An Elastic IP remains fixed forever. |
| **Dynamic AMI Lookups (`data "aws_ami"`)** | Hardcoding AMI IDs (e.g. `ami-050c...`) breaks if you change AWS regions. Dynamic lookups always fetch the latest official OS image in any region. |
| **Egress Rules Must Be Open (`0.0.0.0/0`)** | If outbound traffic is blocked, your EC2 instance cannot download security updates, install packages, or pull Docker images. |
| **Add Swap Space on Small VMs** | Single-core/1GB VMs will crash (OOM) when compiling TypeScript or Webpack bundles. 2GB swap prevents downtime at zero hardware cost. |

---

## 8. Advanced Terraform Concepts for Cloud Engineers

When interviewing for DevOps / Cloud roles, be prepared to discuss these next-level topics:
1. **Terraform Modules:** Packaging reusable infrastructure chunks (e.g. a standard VPC module reused across 20 applications).
2. **Remote Backends:** Storing `terraform.tfstate` in an encrypted **AWS S3 bucket** with **DynamoDB state locking** to avoid race conditions in team environments.
3. **Terraform Workspaces:** Managing multiple environments (e.g., `dev`, `staging`, `prod`) from the same codebase with distinct state files.
4. **Terraform Drift Detection:** Detecting when someone manually alters a security group in the AWS Console, and restoring it to code with `terraform apply`.

---

## 9. Prompt for Teaching AI

Copy and paste this snippet into any AI chat (ChatGPT, Claude, etc.) along with this file:

```text
"Act as a Senior Cloud Architect & DevOps Instructor. I am providing you with the complete real-world Terraform IaC and deployment documentation from my project 'GramSaarthi AI'. 

Please review this file and use it as the foundation for our lessons. Test my understanding by asking conceptual questions, walking through advanced scenarios (like adding an RDS database or an Application Load Balancer), and quizzing me on real-world troubleshooting patterns."
```
