# ──────────────────────────────────────────────────────────────
# EKS Cluster + Managed Node Group
# Uses AWS Academy LabRole (cannot create custom IAM roles)
# ──────────────────────────────────────────────────────────────

# ─── EKS Cluster ─────────────────────────────────────────────
resource "aws_eks_cluster" "main" {
  name     = var.cluster_name
  role_arn = data.aws_iam_role.lab_role.arn
  version  = var.cluster_version

  vpc_config {
    subnet_ids = [
      aws_subnet.public_1.id,
      aws_subnet.public_2.id
    ]
    endpoint_public_access  = true
    endpoint_private_access = false
  }

  tags = {
    Name = var.cluster_name
  }
}

# ─── Managed Node Group ─────────────────────────────────────
resource "aws_eks_node_group" "workers" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "${var.cluster_name}-workers"
  node_role_arn   = data.aws_iam_role.lab_role.arn
  subnet_ids = [
    aws_subnet.public_1.id,
    aws_subnet.public_2.id
  ]

  instance_types = [var.node_instance_type]

  scaling_config {
    desired_size = var.node_desired_size
    min_size     = var.node_min_size
    max_size     = var.node_max_size
  }

  update_config {
    max_unavailable = 1
  }

  tags = {
    Name = "${var.cluster_name}-workers"
  }
}
