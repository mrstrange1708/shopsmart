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
echo "To plan or apply, run:"
echo "terraform plan -var=\"s3_bucket_name=$BUCKET\""
echo "terraform apply -var=\"s3_bucket_name=$BUCKET\""
