# ──────────────────────────────────────────────────────────────
# Outputs — Values exported after apply
# ──────────────────────────────────────────────────────────────

output "cluster_endpoint" {
  description = "EKS cluster API endpoint"
  value       = aws_eks_cluster.main.endpoint
}

output "cluster_name" {
  description = "EKS cluster name"
  value       = aws_eks_cluster.main.name
}

output "cluster_certificate_authority" {
  description = "EKS cluster CA certificate (base64)"
  value       = aws_eks_cluster.main.certificate_authority[0].data
  sensitive   = true
}

output "ecr_server_url" {
  description = "ECR repository URL for server image"
  value       = aws_ecr_repository.server.repository_url
}

output "ecr_client_url" {
  description = "ECR repository URL for client image"
  value       = aws_ecr_repository.client.repository_url
}

output "s3_bucket_name" {
  description = "S3 bucket name for Terraform state"
  value       = aws_s3_bucket.terraform_state.id
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "region" {
  description = "AWS region"
  value       = var.aws_region
}
