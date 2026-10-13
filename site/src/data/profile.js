// 프로필 정보: GitHub 프로필 README와 같은 내용을 유지합니다.
export const profile = {
  name: '김석현',
  title: 'Cloud Engineer / MLOps · Backend Developer',
  tagline: '백엔드를 직접 구현하고 인프라를 코드로 구축해, 서비스와 AI 모델을 운영 가능한 상태로 배포하는 엔지니어입니다.',
  intro: [
    '경기대학교 컴퓨터공학과 (2027.02 졸업예정) · 학부연구생 1년 (AI/ML/DL)',
    '멋쟁이사자처럼 클라우드 엔지니어링 부트캠프 (2026.11 수료예정)',
    '팀장으로 파트 사이의 소통 구조를 정리하며 프론트엔드, 백엔드 API, AI(비전·사운드), 엣지 서버, 클라우드 배포를 두루 경험했습니다.',
    '부트캠프 3차 프로젝트에서 팀장·백엔드를 유지하며 인프라 파트에도 참여합니다.',
  ],
  interests: ['클라우드 인프라', 'MLOps', '백엔드 (Java Spring Boot, Python FastAPI)'],
  photo: '/profile.jpg',
  email: 'albe38488171@gmail.com',
  github: 'https://github.com/alberione1110',
  siteRepo: 'https://github.com/alberione1110/portfolio',
}

// 여러 파트를 경험하며 쌓은 강점 (자기소개서와 같은 내용)
export const strengths = [
  {
    title: '여러 파트를 직접 경험',
    body: '프론트엔드, 백엔드, AI 비전·사운드, 라즈베리파이 로컬 서버, 클라우드 서버, AWS 인프라까지 맡으며 한 파트의 결정이 다음 파트에 주는 부담을 알게 되었습니다.',
  },
  {
    title: '팀원이 막힌 곳을 함께 파고듦',
    body: '참여가 어려운 팀원에게 할 수 있는 임무를 맡기고, 담당 파트 밖의 문제도 논문을 찾아 방향을 제안하고, 파트 사이의 문제를 체크리스트와 문서로 미리 막았습니다.',
  },
  {
    title: '부족한 곳을 스스로 채움',
    body: '학기 중에도 주 5회 연구실에서 공부하고 매주 세미나에 참여했으며, 인프라를 직접 구축해 보고 싶어 Terraform으로 배포 구조를 만들었습니다.',
  },
]

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
      '인프라 파트가 올리는 PR을 직접 리뷰·논의하며 운영에 기여했고, 3차 프로젝트에서는 인프라 파트로도 참여합니다(확정).',
    ],
    ref: 'devflow',
  },
  {
    period: '2025.03 ~ 2026.02 (약 1년)',
    title: '경기대학교 네트워크 연구실',
    role: '학부연구생 (AI/ML/DL)',
    points: [
      '암호화 이미지의 훼손 정도에 따른 학습 성능을 6가지 조건으로 비교해 ResNet18 ROC-AUC 원본 0.918, XOR 0.861, 픽셀 셔플 0.583을 확인했습니다.',
      '교수님과 주제 선정에서 의견이 달랐지만 세미나에서 논의해 타협했고, 암호화 상태 학습이 막혔을 때도 세미나로 주제를 조정했습니다.',
      '입실부터 퇴실까지 매주 세미나에 참여했고, 학기 중에도 주 5회 하루 6시간 이상 연구실에서 연구했습니다.',
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
