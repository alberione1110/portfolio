// 프로필 정보: GitHub 프로필 README와 같은 내용을 유지합니다.
export const profile = {
  name: '김석현',
  title: 'Cloud Engineer / MLOps · Backend Developer',
  tagline: '백엔드를 직접 구현하고 인프라를 코드로 구축해, 서비스와 AI 모델을 운영 가능한 상태로 배포하는 엔지니어입니다.',
  intro: [
    '경기대학교 컴퓨터공학과 (2027.02 졸업예정) · 학부연구생 1년 (AI/ML/DL)',
    '멋쟁이사자처럼 클라우드 엔지니어링 부트캠프 (2026.11 수료예정)',
    '팀장으로 파트 사이의 소통 구조를 정리하며 백엔드 API, 엣지 AI 서버, 배포 환경을 담당했습니다.',
  ],
  interests: ['클라우드 인프라', 'MLOps', '백엔드 (Java Spring Boot, Python FastAPI)'],
  email: 'albe38488171@gmail.com',
  github: 'https://github.com/alberione1110',
  siteRepo: 'https://github.com/alberione1110/portfolio',
}

export const skills = {
  // 잘하는 것부터 앞에 둡니다. (이력서 기술 스택과 같은 순서)
  main: [
    'Java (Spring Boot, Spring Security, JPA)',
    'Python (FastAPI, Flask)',
    'PostgreSQL',
    'MySQL',
    'JavaScript (React)',
    'Docker / Docker Compose',
    'PyTorch · YOLOv8',
    'Git',
    'C / C++ (강의 · 정보올림피아드 지도)',
  ],
  built: ['AWS (S3, CloudFront, Route 53, ACM, IAM)', 'Terraform', 'GitHub Actions (OIDC 배포)'],
  collab: ['Amazon EKS · VPC · RDS', 'Kubernetes', 'GitLab CI/CD', 'Prometheus · Grafana'],
}

// 경력 및 활동 (이력서와 같은 내용)
export const experience = [
  {
    period: '2026.06 ~ 2026.11 (수료예정)',
    title: '멋쟁이사자처럼 클라우드 엔지니어링 부트캠프',
    role: '프로젝트 팀장 / 실습 팀장',
    points: [
      '4인 팀(Backend · Frontend · AWS/K8s · CI/CD·모니터링)의 일정과 역할을 조율하고 2차 프로젝트를 3차 고도화로 이어서 진행했습니다.',
      '백엔드 REST API 13개를 단독 구현하고, 인프라 팀원이 바로 연결할 수 있도록 Probe·Metrics 엔드포인트를 먼저 제공했습니다.',
    ],
    ref: 'devflow',
  },
  {
    period: '2025.03 ~ 2026.02 (약 1년)',
    title: '경기대학교 네트워크 연구실',
    role: '학부연구생 (AI/ML/DL)',
    points: [
      '암호화된 흉부 X-ray 6가지 변형 조건 비교에서 ResNet18 ROC-AUC 원본 0.918, XOR 단독 0.861을 확인했습니다.',
    ],
    ref: 'rsna',
  },
  {
    period: '2025.01 ~ 2025.12 (약 1년)',
    title: 'TEdI 코딩학원 (수내점 · 광교점)',
    role: 'IT 학원 강사 (프리랜서)',
    points: [
      'C, C++(정보올림피아드), Python, Java를 강의했습니다.',
      '초등학생부터 대학생까지 전 연령 수강생을 지도했습니다.',
    ],
  },
]

export const paper = {
  title: '실시간 소리 인식 및 방향 추정을 활용한 청각장애인 생활 보조 시스템 설계 및 구현',
  venue: '한국정보기술학회',
  year: 2026,
  note: '공동 1저자',
}

export const certificates = [
  { name: 'SW테스트전문가 (CSTS)', status: '취득', date: '2025.05.10' },
]
