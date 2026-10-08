# 설정 가이드 (하루 1시간 × 5일)

명령은 Windows PowerShell 기준이며 **한 줄씩** 실행합니다. AWS 키, 비밀번호, `terraform.tfvars`, `backend.hcl`은 저장소에 커밋하지 않습니다(`.gitignore`에 등록됨).

---

## Day 1. 계정 보안과 도구 설치

### 1-1. AWS 계정 보안 (콘솔)
1. 루트 계정으로 로그인 → 오른쪽 위 계정 이름 → **Security credentials** → **MFA 등록**
2. **IAM Identity Center** → Enable → Users에서 본인 사용자 생성 → Permission sets에서 `AdministratorAccess` 생성 → AWS accounts에서 내 계정에 사용자와 권한 세트 할당
3. 이후 작업은 루트가 아닌 이 사용자로 합니다. 메일로 온 AWS access portal 주소를 저장해 두세요.

### 1-2. 도구 설치
```powershell
winget install Amazon.AWSCLI
winget install Hashicorp.Terraform
winget install OpenJS.NodeJS.LTS
```
설치 후 PowerShell을 다시 열고 버전을 확인합니다. Terraform은 **1.10 이상**이어야 합니다.
```powershell
aws --version
terraform -version
node -v
```

### 1-3. 로컬 자격 증명 (SSO, Access Key 없음)
```powershell
aws configure sso
# SSO start URL: 1-1에서 받은 access portal 주소 / region: ap-northeast-2 / profile name: portfolio
aws sso login --profile portfolio
$env:AWS_PROFILE = "portfolio"
aws sts get-caller-identity
```
PowerShell을 새로 열 때마다 `$env:AWS_PROFILE = "portfolio"`를 다시 입력합니다. 세션이 만료되면 `aws sso login --profile portfolio`를 다시 실행합니다.

### 1-4. GitHub 레포 만들고 코드 올리기
GitHub에서 **Public, 빈 레포 `portfolio`**를 만든 뒤:
```powershell
cd D:\GitHub\portfolio
git init
git add .
git status
git commit -m "feat: 포트폴리오 사이트, Terraform 인프라, 배포 워크플로 초기 구성"
git branch -M main
git remote add origin https://github.com/alberione1110/portfolio.git
git push -u origin main
```
이 시점에는 `CI` 워크플로만 통과하면 됩니다. `Deploy site`는 Day 4에 변수를 넣은 뒤 동작합니다.

---

## Day 2. 도메인 구매와 사이트 내용 확인

### 2-1. Route 53에서 도메인 구매 (콘솔)
1. **Route 53 → Registered domains → Register domains**에서 도메인 검색, 구매
2. 연락처 정보 입력 (**Privacy protection**이 켜져 있는지 확인)
3. 등록 메일의 확인 링크 클릭. 등록 완료까지 수 분 ~ 수 시간 걸릴 수 있습니다.
4. 완료되면 **Hosted zones**에 같은 이름의 호스팅 영역이 자동으로 생깁니다. Terraform은 이것을 조회만 합니다.

### 2-2. 사이트 내용 확인
```powershell
cd D:\GitHub\portfolio\site
npm install
npm run dev
```
`http://localhost:5173`에서 확인합니다. 내용은 `site/src/data/profile.js`와 `projects.js`만 고치면 됩니다.

---

## Day 3. Terraform으로 인프라 생성

### 3-1. state 버킷 (최초 1회)
```powershell
cd D:\GitHub\portfolio\infra\bootstrap
terraform init
terraform apply
```
출력된 `state_bucket` 값을 복사합니다.

### 3-2. 본 인프라
```powershell
cd ..\live
copy backend.hcl.example backend.hcl
copy terraform.tfvars.example terraform.tfvars
# backend.hcl: bucket = 3-1의 state_bucket
# terraform.tfvars: domain_name, budget_alert_email 입력
terraform init -backend-config="backend.hcl"
terraform plan
terraform apply
```
- `plan` 결과에서 **생성(add)만 있고 삭제(destroy)가 없는지** 확인한 뒤 `yes`를 입력합니다.
- ACM 인증서 검증과 CloudFront 생성 때문에 **10~20분** 걸릴 수 있습니다.
- 완료되면 출력값 `AWS_DEPLOY_ROLE_ARN`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`를 복사합니다.
- `.terraform.lock.hcl`이 생기면 **커밋합니다.** provider 버전을 고정하는 파일입니다.

---

## Day 4. 자동 배포 연결

1. GitHub 레포 → **Settings → Secrets and variables → Actions → Variables 탭 → New repository variable**
2. 아래 3개를 등록합니다. 비밀값이 아니라서 Secrets가 아닌 **Variables**에 넣습니다.

| Name | Value |
|---|---|
| `AWS_DEPLOY_ROLE_ARN` | terraform 출력값 |
| `S3_BUCKET` | terraform 출력값 |
| `CLOUDFRONT_DISTRIBUTION_ID` | terraform 출력값 |

3. **Actions → Deploy site → Run workflow**로 첫 배포를 실행합니다.
4. 확인합니다.
```powershell
curl.exe -I https://(도메인)
curl.exe -I https://(도메인)/projects/visgap
```
- 둘 다 `HTTP/1.1 200` 또는 `HTTP/2 200`이면 성공입니다.
- `strict-transport-security`, `x-content-type-options` 헤더가 보이면 보안 헤더 정책도 적용된 것입니다.
- 브라우저에서 상세 페이지 주소로 직접 들어가 **새로고침해도** 화면이 나오는지 확인합니다.

---

## Day 5. 마무리

- 이 레포 README의 사이트 주소 칸을 채웁니다.
- 프로필 README Contact에 한 줄을 추가합니다: `- Portfolio: https://(도메인)`
- 레포 About의 Website에 도메인을 넣고, 핀 고정 교체를 검토합니다.
- 면접 대비: README의 "설계 선택과 이유" 표를 직접 설명할 수 있는지 확인합니다.

---

## 자주 나오는 오류

| 증상 | 원인과 해결 |
|---|---|
| `EntityAlreadyExists: Provider with url https://token.actions.githubusercontent.com already exists` | 계정에 GitHub OIDC 공급자가 이미 있음 → `terraform.tfvars`에 `create_github_oidc_provider = false` |
| ACM 인증서가 계속 `Pending validation` | 도메인의 네임서버와 호스팅 영역의 NS 레코드가 다름 → Registered domains의 네임서버를 호스팅 영역 NS 값으로 맞춤 |
| `no matching Route 53 Hosted Zone found` | 도메인 등록이 아직 끝나지 않았거나 `domain_name` 오타 |
| 배포 워크플로의 `Not authorized to perform sts:AssumeRoleWithWebIdentity` | 레포 이름·브랜치가 신뢰 정책과 다름 (`github_repo`, `github_branch` 변수 확인) |
| 사이트에서 `AccessDenied` XML | 버킷이 비어 있거나(첫 배포 전) 버킷 정책 미적용 → 배포 워크플로 실행 후 재확인 |
| 배포했는데 이전 화면이 보임 | 무효화 완료 전 → 1~2분 후 강력 새로고침 (Ctrl + F5) |

## 전부 삭제할 때

```powershell
cd D:\GitHub\portfolio\infra\live
terraform destroy
```
state 버킷(bootstrap)은 실수 방지를 위해 `prevent_destroy`가 걸려 있어, 콘솔에서 직접 비우고 삭제합니다. 도메인은 Route 53 콘솔에서 자동 갱신을 끄면 만료일에 해지됩니다.
