terraform {
  required_version = ">= 1.10"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # 버킷 이름은 backend.hcl 로 주입: terraform init -backend-config=backend.hcl
  # use_lockfile: DynamoDB 없이 S3 자체 잠금 사용 (Terraform 1.10+)
  backend "s3" {
    key          = "portfolio/live.tfstate"
    region       = "ap-northeast-2"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = var.region
  default_tags {
    tags = { Project = "portfolio", ManagedBy = "terraform" }
  }
}

# CloudFront에 붙이는 ACM 인증서는 반드시 us-east-1에 있어야 함
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
  default_tags {
    tags = { Project = "portfolio", ManagedBy = "terraform" }
  }
}
