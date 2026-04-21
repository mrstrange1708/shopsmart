# ──────────────────────────────────────────────────────────────
# ECR — Docker Image Repositories
# ──────────────────────────────────────────────────────────────

resource "aws_ecr_repository" "server" {
  name                 = "shopsmart-server"
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "shopsmart-server"
  }
}

resource "aws_ecr_repository" "client" {
  name                 = "shopsmart-client"
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "shopsmart-client"
  }
}
