#!/bin/bash
set -e

echo "Fetching AWS Account ID..."
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
BUCKET="s3-shopsmart-devops-project-${ACCOUNT_ID}"
echo "Using bucket: $BUCKET"

echo "Ensuring S3 bucket exists..."
if aws s3api head-bucket --bucket "$BUCKET" 2>/dev/null; then
  echo "✅ S3 bucket already exists"
else
  echo "🔨 Creating S3 bucket for Terraform state..."
  aws s3api create-bucket --bucket "$BUCKET" --region us-east-1
fi

echo "Initializing Terraform..."
terraform init -reconfigure -backend-config="bucket=$BUCKET"

echo ""
echo "✅ Local initialization complete!"
echo ""
echo "To make local commands easy, copy and paste this command into your terminal to export the variable:"
echo "export TF_VAR_s3_bucket_name=$BUCKET"
echo ""
echo "Then you can just run:"
echo "terraform plan"
echo "terraform apply"
