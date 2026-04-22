# ──────────────────────────────────────────────────────────────
# Terraform Configuration — ShopSmart DevOps Project
# ──────────────────────────────────────────────────────────────

terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Remote state in S3 — initialized after the bucket is created
  # On first run, comment this block out, run `terraform apply` to create
  # the S3 bucket, then uncomment and run `terraform init -migrate-state`
  backend "s3" {
    bucket = "s3-shopsmart-devops-project"
    key    = "terraform/state.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "ShopSmart"
      ManagedBy   = "Terraform"
      Environment = "production"
    }
  }
}
