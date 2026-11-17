// 프로필 정보: GitHub 프로필 README와 같은 내용을 유지합니다.
export const profile = {
  name: '김석현',
  title: 'Cloud Engineer / MLOps · Backend Developer',
  tagline: '맡은 일은 끝까지, 모르는 건 배우는 개발자입니다.',
  intro: [
    '경기대학교 컴퓨터공학과 (2027.02 졸업예정) · 학부연구생 1년 (AI/ML/DL)',
    '멋쟁이사자처럼 클라우드 엔지니어링 부트캠프 (2026.11.13 수료)',
    '백엔드, AI, 프론트엔드, 인프라까지 여섯 개 프로젝트를 거치며 필요한 기술은 그때그때 배워서 썼습니다. 네 번 팀장을 맡아 파트 사이의 API 명세와 데이터 규격을 직접 맞추고 일정을 조율했습니다.',
    '부트캠프 3차 프로젝트(DevFlow)에서 팀장·백엔드를 유지하며 연동 계층 구현과 온프렘·AWS 배포 검증에 참여했습니다.',
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
    'Redis',
    'JavaScript (React)',
    'Docker / Docker Compose',
    'PyTorch · YOLOv8 · Wav2Vec2',
    'Git',
    'C / C++ (강의 · 정보올림피아드 지도)',
  ],
  built: ['AWS (S3, CloudFront, Route 53, ACM, IAM)', 'Terraform', 'GitHub Actions (OIDC 배포)'],
  collab: ['Amazon EKS · RDS', 'Kubernetes · Helm', 'Argo CD', 'GitLab CI/CD', 'Prometheus · Grafana'],
}

// 경력 및 활동 (이력서와 같은 내용)
export const experience = [
  {
    period: '2026.06 ~ 2026.11.13 (수료)',
    title: '멋쟁이사자처럼 클라우드 엔지니어링 부트캠프',
    role: '프로젝트 팀장 / 실습 팀장',
    points: [
      '4인 팀(Backend · Frontend · AWS/K8s · CI/CD·모니터링)의 일정과 역할을 조율하고 2차 프로젝트를 3차 고도화로 이어서 진행했습니다.',
      '실습 팀장으로 실습 중 팀원들에게 생긴 오류를 먼저 해결하고, 풀지 못한 문제만 강사님께 요청했습니다.',
      '백엔드 REST API 13개를 단독 구현하고, 인프라 팀원이 바로 연결할 수 있도록 Probe·Metrics 엔드포인트를 먼저 제공했습니다.',
      '3차에서 API를 50개로 확장하고 CI/CD·Kubernetes·Prometheus·AWS 상태를 보여주는 연동 계층을 구현했으며, 온프렘·AWS(EKS) 배포 검증에도 참여했습니다(팀 PR 55건 중 21건).',
      'Redis 장애 시 모니터링 요약 응답을 p95 10.3초에서 약 1초로 줄였고, 단위 테스트 104개와 WireMock 통합 테스트 22단계를 작성했습니다.',
      '클라우드·CI/CD 구조는 팀 전체가 함께 설계했고, 전 파트의 PR 리뷰에 참여했습니다.',
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
    title: 'TEdI 코딩학원',
    role: 'IT 학원 강사 (프리랜서)',
    points: [
      'C, C++(정보올림피아드), Python, Java를 강의했습니다.',
      '초등학생부터 대학생까지 전 연령 수강생을 지도했습니다.',
    ],
  },
]

export const papers = [
  {
    title: '실시간 소리 인식 및 방향 추정을 활용한 청각장애인 생활 보조 시스템 설계 및 구현',
    venue: '한국정보기술학회 하계 종합학술대회 논문집 게재',
    year: 2026,
    note: '공동 1저자',
    ref: 'hearing-assistant',
    refLabel: 'P2',
  },
  {
    title: '비전 기반 부품 세그멘테이션 및 GAP 측정 시스템',
    venue: '한국데이터사이언스학회 춘계 종합학술대회 논문집 게재',
    year: 2025,
    note: '제1저자',
    ref: 'visgap',
    refLabel: 'P3',
  },
]

export const certificates = [
  { name: 'SW테스트전문가 (CSTS)', status: '취득', date: '2025.05.10' },
]
