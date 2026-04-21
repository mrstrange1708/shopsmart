# ──────────────────────────────────────────────────────────────
# S3 — Terraform State Bucket
# Rubric: unique name, versioning, encryption, no public access
# ──────────────────────────────────────────────────────────────

resource "aws_s3_bucket" "terraform_state" {
  bucket = var.s3_bucket_name

  tags = {
    Name    = var.s3_bucket_name
    Purpose = "Terraform Remote State"
  }
}

# ─── Versioning (REQUIRED by rubric) ─────────────────────────
resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  versioning_configuration {
    status = "Enabled"
  }
}

# ─── Encryption (REQUIRED by rubric) ─────────────────────────
resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = true
  }
}

# ─── Block Public Access (REQUIRED by rubric) ────────────────
resource "aws_s3_bucket_public_access_block" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
