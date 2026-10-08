output "site_url" {
  value = "https://${var.domain_name}"
}

output "cloudfront_domain" {
  value = aws_cloudfront_distribution.site.domain_name
}

# 아래 3개는 GitHub 레포 Settings → Secrets and variables → Actions → Variables 에 등록
output "AWS_DEPLOY_ROLE_ARN" {
  value = aws_iam_role.deploy.arn
}

output "S3_BUCKET" {
  value = aws_s3_bucket.site.bucket
}

output "CLOUDFRONT_DISTRIBUTION_ID" {
  value = aws_cloudfront_distribution.site.id
}
