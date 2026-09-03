# Terraform Deployment Log

## Project

**Project:** `gramsaarthi-ai`  
**Infrastructure Directory:** `terraform`  
**Platform:** Windows PowerShell  
**Cloud Provider:** AWS  
**Deployment Tool:** Terraform

This document records the Terraform deployment commands, their purpose, and the important output produced during deployment. The log is based on the captured deployment session.

---

## 1. Navigate to the Terraform Directory

### Command

```powershell
cd gramsaarthi-ai
cd terraform
```

### Description

These commands move from the project root into the `terraform` directory. Terraform commands are executed from this directory because it contains the Terraform configuration files for the AWS infrastructure.

### Output

```text
PS ...\MSU Hack-A-Throne 2026\gramsaarthi-ai>
PS ...\MSU Hack-A-Throne 2026\gramsaarthi-ai\terraform>
```

### Result

The terminal is now working inside the project's Terraform directory.

---

## 2. Refresh the Windows PATH

### Command

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

### Description

This PowerShell command rebuilds the current session's `PATH` environment variable using the machine-level and user-level PATH values.

It ensures that installed command-line programs such as Terraform and AWS CLI can be found from the current terminal session.

### Output

No output was produced.

### Result

The current PowerShell session was refreshed with the machine and user PATH entries.

---

## 3. Check Terraform Version

### Command

```powershell
terraform -version
```

### Description

Displays the installed Terraform version and the platform for which Terraform is running. It also reports the selected AWS provider version.

### Output

```text
Terraform v1.15.8
on windows_amd64
+ provider registry.terraform.io/hashicorp/aws v5.100.0
```

Terraform also reported that a newer version was available:

```text
Your version of Terraform is out of date! The latest version
is 1.16.1.
```

### Result

Terraform was installed and working correctly.

**Installed Terraform:** `v1.15.8`  
**Platform:** `windows_amd64`  
**AWS Provider:** `hashicorp/aws v5.100.0`

> Note: The deployment proceeded successfully even though Terraform reported that an update was available.

---

## 4. Check AWS CLI Version

### Command

```powershell
aws --version
```

### Description

Checks whether the AWS Command Line Interface (AWS CLI) is installed and available in the terminal.

### Output

```text
aws-cli/2.36.38 Python/3.14.6 Windows/11 exe/AMD64
```

### Result

AWS CLI was installed and available on the Windows system.

**AWS CLI:** `2.36.38`  
**Python:** `3.14.6`  
**Operating System:** Windows 11  
**Architecture:** AMD64

---

## 5. Initialize Terraform

### Command

```powershell
terraform init
```

### Description

`terraform init` initializes the current Terraform working directory.

It prepares Terraform to work with the configured backend and downloads or reuses the required provider plugins. In this deployment, Terraform reused the AWS provider version recorded in the dependency lock file.

### Important Output

```text
Initializing the backend...

Initializing provider plugins...
- Reusing previous version of hashicorp/aws from the dependency lock file
- Using previously-installed hashicorp/aws v5.100.0
```

The initialization completed successfully:

```text
Terraform has been successfully initialized!
```

Terraform then indicated that commands such as `terraform plan` could be used.

### Result

Terraform was successfully initialized and the AWS provider was ready.

---

## 6. Generate the Terraform Plan

### Command

```powershell
terraform plan
```

### Description

`terraform plan` compares the desired infrastructure described by the Terraform configuration with the current infrastructure state.

It shows what Terraform intends to create, modify, or destroy **without actually applying those changes**.

In this deployment, Terraform detected four resources that needed to be created.

### AMI Lookup

Terraform first looked up the Ubuntu AMI:

```text
data.aws_ami.ubuntu: Reading...
data.aws_ami.ubuntu: Read complete after 0s [id=ami-050c78efa486a0196]
```

The selected AMI was:

```text
ami-050c78efa486a0196
```

---

## 7. Resources Planned for Creation

Terraform displayed the `+ create` action for the following four resources.

### 7.1 Default VPC

```text
aws_default_vpc.default
```

### Purpose

Creates/manages the default VPC used by the application.

Important configuration shown in the plan:

```text
enable_dns_hostnames = true
enable_dns_support   = true
Name                 = "gramsaarthi-ai-vpc"
```

### Result

Terraform planned to create the VPC with the name:

```text
gramsaarthi-ai-vpc
```

---

### 7.2 Elastic IP

```text
aws_eip.app_ip
```

### Purpose

Creates an AWS Elastic IP address for the application server.

The plan showed:

```text
domain = "vpc"
Name   = "gramsaarthi-ai-eip"
```

### Result

Terraform planned to create a persistent public IP address for the application.

---

### 7.3 EC2 Application Server

```text
aws_instance.app_server
```

### Purpose

Creates the EC2 virtual machine that hosts the application.

Important values shown in the plan:

```text
AMI           = "ami-050c78efa486a0196"
Instance type = "t3.micro"
```

The instance was tagged as:

```text
Environment = "production"
ManagedBy   = "terraform"
Name        = "gramsaarthi-ai-server"
```

The root disk configuration shown in the plan was:

```text
volume_size = 20
volume_type = "gp3"
delete_on_termination = true
```

The configuration also included EC2 user data, which Terraform represented using a hash:

```text
user_data = "58ae6050cebff8b16036f339e5dbffb52ae7e1ec"
```

### Result

Terraform planned to create a `t3.micro` EC2 instance for the application.

---

### 7.4 Web Security Group

```text
aws_security_group.web_sg
```

### Purpose

Creates the security group controlling inbound and outbound traffic for the application server.

The description in the plan was:

```text
Allow HTTP, HTTPS, and SSH inbound traffic
```

### Inbound Rules

#### HTTP

```text
Protocol = tcp
Port     = 80
Source   = 0.0.0.0/0
```

Allows HTTP traffic from anywhere.

#### HTTPS

```text
Protocol = tcp
Port     = 443
Source   = 0.0.0.0/0
```

Allows HTTPS traffic from anywhere.

#### SSH

```text
Protocol = tcp
Port     = 22
Source   = 0.0.0.0/0
```

Allows SSH administration from anywhere.

### Outbound Rule

```text
Protocol = -1
Port     = all
Source   = 0.0.0.0/0
```

Allows all outbound traffic.

### Security Group Name

```text
gramsaarthi-ai-sg
```

> **Security note:** The captured Terraform plan allows SSH from `0.0.0.0/0`, meaning the SSH port is publicly accessible. For production environments, restricting SSH to a trusted IP range is generally safer.

---

## 8. Terraform Plan Summary

### Output

```text
Plan: 4 to add, 0 to change, 0 to destroy.
```

### Meaning

| Action | Count | Meaning |
|---|---:|---|
| Add | 4 | Four AWS resources will be created |
| Change | 0 | No existing resources will be modified |
| Destroy | 0 | No resources will be deleted |

The planned outputs included:

```text
app_url                   = "https://aws.chiragvasava.me"
instance_id               = (known after apply)
namecheap_dns_instruction = (known after apply)
public_ip                 = (known after apply)
```

Terraform also reported:

```text
Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take
exactly these actions if you run "terraform apply" now.
```

### Meaning of the `-out` Note

Because the plan was not saved using something such as:

```powershell
terraform plan -out=tfplan
```

the later `terraform apply` generated a fresh plan rather than applying a previously saved plan file.

---

# 9. First Terraform Apply

### Command

```powershell
terraform apply
```

### Description

`terraform apply` executes the infrastructure changes proposed by Terraform.

Unlike `terraform plan`, this command actually creates or modifies AWS resources.

Terraform first generated and displayed the execution plan again.

The same four resources were planned:

```text
aws_default_vpc.default
aws_eip.app_ip
aws_instance.app_server
aws_security_group.web_sg
```

The plan summary was:

```text
Plan: 4 to add, 0 to change, 0 to destroy.
```

---

## 10. EC2 Instance Creation

During the apply operation, Terraform created the EC2 instance.

### Output

```text
aws_instance.app_server: Creation complete after 12s [id=i-03f0117fc63136563]
```

### Result

The EC2 instance ID was:

```text
i-03f0117fc63136563
```

---

## 11. Elastic IP Creation

Terraform then created the Elastic IP.

### Output

```text
aws_eip.app_ip: Creating...
aws_eip.app_ip: Creation complete after 2s [id=eipalloc-0acbfd156ad00d14c]
```

### Result

The Elastic IP allocation ID was:

```text
eipalloc-0acbfd156ad00d14c
```

The public IP assigned to the application was later reported as:

```text
13.126.176.46
```

---

## 12. First Deployment Completed

### Output

```text
Apply complete! Resources: 4 added, 0 changed, 0 destroyed.
```

### Meaning

The first deployment successfully:

- Added 4 AWS resources.
- Changed 0 existing resources.
- Destroyed 0 resources.

This indicates that the initial infrastructure deployment completed successfully.

---

# 13. First Deployment Outputs

Terraform printed the following outputs:

```text
app_url = "https://aws.chiragvasava.me"
instance_id = "i-03f0117fc63136563"
namecheap_dns_instruction = "In Namecheap Advanced DNS, add an 'A Record' with Host: 'aws' and Value: '13.126.176.46'"
public_ip = "13.126.176.46"
```

### Output Explanation

#### `app_url`

```text
https://aws.chiragvasava.me
```

This was the application URL configured by the Terraform outputs at the time of the first deployment.

#### `instance_id`

```text
i-03f0117fc63136563
```

This is the AWS EC2 instance identifier created during deployment.

#### `public_ip`

```text
13.126.176.46
```

This is the public Elastic IP assigned to the application server.

#### `namecheap_dns_instruction`

```text
In Namecheap Advanced DNS, add an 'A Record' with Host: 'aws' and Value: '13.126.176.46'
```

This output provides the DNS configuration instruction for connecting the Namecheap domain/subdomain to the AWS public IP.

---

# 14. Second Terraform Apply

### Command

```powershell
terraform apply
```

### Description

The `terraform apply` command was run a second time after the initial infrastructure had already been created.

Terraform refreshed the current state of the existing resources before determining whether any changes were required.

### State Refresh Output

```text
aws_default_vpc.default: Refreshing state... [id=vpc-05127c530203ff573]
aws_security_group.web_sg: Refreshing state... [id=sg-0375a16fa18ba3538]
aws_instance.app_server: Refreshing state... [id=i-03f0117fc63136563]
aws_eip.app_ip: Refreshing state... [id=eipalloc-0acbfd156ad00d14c]
```

### Meaning

Terraform found that the infrastructure already existed and loaded the current state of each resource.

---

# 15. Second Apply Detected an In-Place Update

Terraform detected one resource that needed modification:

```text
~ update in-place
```

The resource was:

```text
aws_instance.app_server
```

The plan summary changed to:

```text
Plan: 0 to add, 1 to change, 0 to destroy.
```

### Important Change

The EC2 `user_data` hash changed:

```text
"58ae6050cebff8b16036f339e5dbffb52ae7e1ec"
    ->
"f75ec7072cdf198371a716b95775014dfbdbe4c7"
```

This indicates that Terraform detected a change in the instance's configured user data.

Terraform also showed the public DNS and public IP as values that would be recalculated:

```text
public_dns = "ec2-13-126-176-46.ap-south-1.compute.amazonaws.com" -> (known after apply)
public_ip  = "13.126.176.46" -> (known after apply)
```

---

# 16. Application URL Changed

The second plan showed an output change:

```text
app_url = "https://aws.chiragvasava.me"
       -> "https://gramsaarthi-ai.chiragvasava.me"
```

### Meaning

The Terraform output for the application URL was changed from:

```text
https://aws.chiragvasava.me
```

to:

```text
https://gramsaarthi-ai.chiragvasava.me
```

This output change was associated with the Terraform configuration update.

---

# 17. Approve the Second Apply

Terraform asked for confirmation:

```text
Do you want to perform these actions?
Terraform will perform the actions described above.
Only 'yes' will be accepted to approve.

Enter a value: yes
```

The command/session entered:

```text
yes
```

### Meaning

Terraform received explicit confirmation to execute the planned change.

---

# 18. Update the EC2 Instance

Terraform then modified the existing EC2 instance.

### Output

```text
aws_instance.app_server: Modifying... [id=i-03f0117fc63136563]
aws_instance.app_server: Still modifying... [id=i-03f0117fc63136563, 00m10s elapsed]
aws_instance.app_server: Still modifying... [id=i-03f0117fc63136563, 00m20s elapsed]
aws_instance.app_server: Still modifying... [id=i-03f0117fc63136563, 00m30s elapsed]
aws_instance.app_server: Still modifying... [id=i-03f0117fc63136563, 00m40s elapsed]
aws_instance.app_server: Modifications complete after 46s [id=i-03f0117fc63136563]
```

### Result

The existing EC2 instance was updated successfully.

The instance ID remained:

```text
i-03f0117fc63136563
```

---

# 19. Final Deployment Result

### Output

```text
Apply complete! Resources: 0 added, 1 changed, 0 destroyed.
```

### Meaning

The second deployment:

- Added **0** resources.
- Changed **1** existing resource.
- Destroyed **0** resources.

This demonstrates Terraform's infrastructure-as-code behavior: after the initial deployment, Terraform detected only the configuration difference and changed the existing infrastructure instead of recreating everything.

---

# 20. Final Terraform Outputs

The final deployment produced:

```text
app_url = "https://gramsaarthi-ai.chiragvasava.me"
instance_id = "i-03f0117fc63136563"
namecheap_dns_instruction = "In Namecheap Advanced DNS, add an 'A Record' with Host: 'aws' and Value: '13.126.176.46'"
public_ip = "13.126.176.46"
```

## Final Values

| Output | Final Value |
|---|---|
| Application URL | `https://gramsaarthi-ai.chiragvasava.me` |
| EC2 Instance ID | `i-03f0117fc63136563` |
| Public IP | `13.126.176.46` |
| Elastic IP Allocation ID | `eipalloc-0acbfd156ad00d14c` |
| DNS Host | `aws` |
| DNS Record Type | `A` |
| DNS Target | `13.126.176.46` |

---

# 21. Deployment Timeline

| Step | Command | Purpose | Result |
|---|---|---|---|
| 1 | `cd gramsaarthi-ai` | Enter project directory | Successful |
| 2 | `cd terraform` | Enter Terraform directory | Successful |
| 3 | PATH refresh | Refresh command PATH | Successful |
| 4 | `terraform -version` | Check Terraform | v1.15.8 |
| 5 | `aws --version` | Check AWS CLI | v2.36.38 |
| 6 | `terraform init` | Initialize Terraform | Successful |
| 7 | `terraform plan` | Preview infrastructure changes | 4 resources to add |
| 8 | `terraform apply` | Deploy infrastructure | 4 resources added |
| 9 | `terraform apply` | Apply subsequent configuration change | 1 resource changed |

---

# 22. Final Infrastructure State

Based on the deployment output, the Terraform configuration resulted in the following main AWS resources:

```text
AWS
└── Default VPC
    ├── Security Group: gramsaarthi-ai-sg
    │   ├── HTTP  : TCP/80
    │   ├── HTTPS : TCP/443
    │   └── SSH   : TCP/22
    │
    ├── EC2 Instance
    │   ├── Name: gramsaarthi-ai-server
    │   ├── Type: t3.micro
    │   └── ID: i-03f0117fc63136563
    │
    └── Elastic IP
        └── Public IP: 13.126.176.46
```

The application URL reported by the final Terraform output is:

```text
https://gramsaarthi-ai.chiragvasava.me
```

---

# 23. Overall Deployment Status

## Initial Deployment

```text
4 to add
0 to change
0 to destroy
```

**Status:** Successfully deployed.

## Subsequent Deployment

```text
0 to add
1 to change
0 to destroy
```

**Status:** Successfully updated the existing EC2 configuration.

## Final Application Endpoint

```text
https://gramsaarthi-ai.chiragvasava.me
```

## Final Server

```text
EC2 Instance: i-03f0117fc63136563
Public IP:    13.126.176.46
```

---

# 24. Important Notes

1. Terraform was successfully initialized with AWS provider version `5.100.0`.
2. Terraform version `1.15.8` was used. The captured output reported `1.16.1` as the latest version at that time.
3. The first `terraform apply` created four AWS resources.
4. The second `terraform apply` detected a change to the EC2 instance's `user_data` and updated the existing instance.
5. No resources were destroyed during either deployment.
6. The final application URL was changed to `https://gramsaarthi-ai.chiragvasava.me`.
7. The captured security group permits SSH access from `0.0.0.0/0`; this should be reviewed before treating the configuration as hardened production infrastructure.
8. The captured DNS instruction says to create a Namecheap `A` record with host `aws` pointing to `13.126.176.46`. The final Terraform `app_url` uses the `gramsaarthi-ai` hostname, so the DNS configuration should be verified against the current Terraform configuration before use.

---

## Conclusion

The Terraform deployment successfully provisioned the AWS infrastructure for the `gramsaarthi-ai` project. The initial deployment created the VPC, Elastic IP, EC2 application server, and security group. A subsequent `terraform apply` detected a configuration change, updated the existing EC2 instance, and changed the application URL output.

The final recorded application endpoint is:

```text
https://gramsaarthi-ai.chiragvasava.me
```

with the application server using:

```text
EC2 Instance ID: i-03f0117fc63136563
Public IP:       13.126.176.46
```
