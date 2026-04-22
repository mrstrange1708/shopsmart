# ──────────────────────────────────────────────────────────────
# IAM — Use existing AWS Academy LabRole
# AWS Academy Learner Lab does NOT allow iam:CreateRole
# Instead, we reference the pre-existing "LabRole"
# ──────────────────────────────────────────────────────────────

# Look up the existing LabRole (pre-created by AWS Academy)
data "aws_iam_role" "lab_role" {
  name = "LabRole"
}

# No policy attachments needed — LabRole already has:
# - AmazonEKSClusterPolicy
# - AmazonEKSWorkerNodePolicy
# - AmazonEKS_CNI_Policy
# - AmazonEC2ContainerRegistryReadOnly
# - And more (managed by AWS Academy)
