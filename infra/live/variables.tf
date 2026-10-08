variable "region" {
  description = "S3 버킷 등 기본 리소스 리전"
  type        = string
  default     = "ap-northeast-2"
}

variable "domain_name" {
  description = "Route 53에서 구매한 도메인 (예: seokhyeon.dev). 호스팅 영역이 이미 있어야 함"
  type        = string
}

variable "github_repo" {
  description = "배포를 허용할 GitHub 레포 (owner/name)"
  type        = string
  default     = "alberione1110/portfolio"
}

variable "github_branch" {
  description = "배포를 허용할 브랜치"
  type        = string
  default     = "main"
}

variable "create_github_oidc_provider" {
  description = "계정에 GitHub OIDC 공급자가 아직 없으면 true (계정당 1개만 존재 가능)"
  type        = bool
  default     = true
}

variable "budget_alert_email" {
  description = "월 예산 초과 알림을 받을 이메일"
  type        = string
}

variable "monthly_budget_usd" {
  description = "월 예산 한도 (USD)"
  type        = string
  default     = "5"
}
