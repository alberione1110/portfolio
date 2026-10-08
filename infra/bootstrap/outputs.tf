output "state_bucket" {
  description = "live/backend.hcl 의 bucket 값으로 사용"
  value       = aws_s3_bucket.tfstate.bucket
}
