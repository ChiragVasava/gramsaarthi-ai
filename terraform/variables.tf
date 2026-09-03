variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "ap-south-1" # Mumbai region (lowest latency for India)
}

variable "instance_type" {
  description = "EC2 instance size (t3.micro is AWS Free Tier eligible)"
  type        = string
  default     = "t3.micro"
}

variable "domain_name" {
  description = "Domain name for this deployment"
  type        = string
  default     = "gramsaarthi-ai.chiragvasava.me"
}

variable "app_name" {
  description = "Application identifier"
  type        = string
  default     = "gramsaarthi-ai"
}
