output "public_ip" {
  description = "Fixed Elastic Public IP address of the EC2 instance"
  value       = aws_eip.app_ip.public_ip
}

output "instance_id" {
  description = "AWS EC2 instance ID"
  value       = aws_instance.app_server.id
}

output "namecheap_dns_instruction" {
  description = "DNS record instructions to configure in Namecheap Advanced DNS"
  value       = "In Namecheap Advanced DNS, add an 'A Record' with Host: 'aws' and Value: '${aws_eip.app_ip.public_ip}'"
}

output "app_url" {
  description = "Live application URL once DNS is configured"
  value       = "https://${var.domain_name}"
}
