# ──────────────────────────────────────────────────────────────
# Default Variable Values
# ──────────────────────────────────────────────────────────────

aws_region         = "us-east-1"
cluster_name       = "shopsmart-devops"
cluster_version    = "1.31"
node_instance_type = "t3.medium"
node_desired_size  = 2
node_min_size      = 2
node_max_size      = 3
vpc_cidr           = "10.0.0.0/16"
s3_bucket_name     = "s3-shopsmart-devops-project"
