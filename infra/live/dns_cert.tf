locals {
  aliases = [var.domain_name, "www.${var.domain_name}"]
}

# Route 53에서 도메인을 구매하면 호스팅 영역이 자동으로 만들어짐 → 조회만 함
data "aws_route53_zone" "this" {
  name         = var.domain_name
  private_zone = false
}

# ---------- ACM 인증서 (us-east-1, DNS 검증) ----------
resource "aws_acm_certificate" "site" {
  provider                  = aws.us_east_1
  domain_name               = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.site.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }

  zone_id         = data.aws_route53_zone.this.zone_id
  name            = each.value.name
  type            = each.value.type
  records         = [each.value.record]
  ttl             = 300
  allow_overwrite = true
}

resource "aws_acm_certificate_validation" "site" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.site.arn
  validation_record_fqdns = [for r in aws_route53_record.cert_validation : r.fqdn]
}

# ---------- 도메인 → CloudFront (IPv4 / IPv6 Alias) ----------
resource "aws_route53_record" "site" {
  for_each = toset(flatten([for name in local.aliases : [
    "${name}|A", "${name}|AAAA"
  ]]))

  zone_id = data.aws_route53_zone.this.zone_id
  name    = split("|", each.value)[0]
  type    = split("|", each.value)[1]

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}
