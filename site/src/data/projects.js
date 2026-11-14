// 번호(no)는 이력서·포트폴리오 문서의 P1~P6와 같습니다.
// 프로젝트 데이터: 각 레포 README에서 확인된 사실만 담습니다.
// mine = 내가 한 일, team = 팀원이 한 일 (반드시 분리)

const allProjects = [
  {
    slug: 'portfolio',
    no: 6,
    diagrams: [{ src: '/diagrams/infra_arch.png', caption: '서비스 경로와 배포 파이프라인' }],
    troubleshooting: {
      title: 'GitHub Actions OIDC 인증 실패',
      diagram: { src: '/diagrams/oidc_ts.png', caption: '원인 추적 과정' },
      rows: [
        ['문제', '첫 배포가 sts:AssumeRoleWithWebIdentity 권한 오류로 실패했습니다.'],
        ['원인', '정책을 넓히지 않고 CloudTrail에서 거절된 요청을 조회해 GitHub이 실제로 보낸 토큰의 sub 값을 확인했습니다. 신뢰 정책은 repo:<계정>/<레포> 형식을 기다렸지만 실제 토큰은 이름 뒤에 고유 ID가 붙은 형식이었습니다.'],
        ['해결', '와일드카드 대신 고유 ID 형식을 정확히 일치하도록 Terraform을 수정해 재배포에 성공했습니다.'],
        ['배운 점', '인증 오류는 정책을 느슨하게 하지 않고 로그로 실제 값을 확인해 필요한 만큼만 고칩니다. 고유 ID 형식은 계정·레포 이름이 재사용돼도 역할을 쓸 수 없어 오히려 더 안전합니다.'],
      ],
    },
    name: 'Portfolio Infra',
    summary: '이 사이트를 S3 · CloudFront · Route 53 위에 Terraform으로 구성하고 GitHub Actions로 자동 배포',
    period: '2026.10',
    type: '개인 프로젝트',
    team: '1명',
    role: '설계 · 구축 전체',
    stack: ['Terraform', 'S3', 'CloudFront', 'Route 53', 'ACM', 'IAM OIDC', 'GitHub Actions', 'React'],
    links: [
      { label: 'GitHub', url: 'https://github.com/alberione1110/portfolio' },
    ],
    problem:
      '정적 사이트를 공개 버킷 없이 안전하게 서비스하고, 장기 Access Key 없이 push만으로 배포되는 구조를 코드(IaC)로 재현 가능하게 만드는 것이 목표였습니다.',
    flow: ['git push', 'GitHub Actions', 'OIDC → IAM 역할', 'S3 (퍼블릭 차단)', 'CloudFront (OAC · HTTPS)', 'Route 53'],
    features: [
      'S3 퍼블릭 접근 차단, CloudFront OAC 서명 요청만 허용 (AWS:SourceArn 조건)',
      'ACM 인증서(us-east-1) DNS 자동 검증, HTTPS 강제와 보안 헤더 정책',
      'SPA 라우팅: S3에 없는 경로는 CloudFront 오류 응답으로 index.html 반환',
      'GitHub Actions OIDC + 최소 권한 역할로 빌드 → 업로드 → 캐시 무효화',
      'Terraform state를 버전 관리·암호화된 S3에 저장, 월 예산 알림',
    ],
    mine: [
      'Terraform으로 S3, CloudFront, OAC, ACM, Route 53, IAM OIDC 역할, Budgets 구성',
      'IAM Identity Center(SSO)로 로컬 작업, 루트 계정은 MFA 후 사용 중지',
      '배포 실패 시 CloudTrail로 거절된 토큰의 sub 클레임을 확인해 원인 파악 (GitHub 고유 ID 형식)',
      '신뢰 정책을 와일드카드로 넓히지 않고 고유 ID 형식을 정확히 일치로 허용하도록 수정',
    ],
    teamWork: [],
    metrics: null,
    extra: null,
  },
  {
    slug: 'devflow',
    no: 1,
    diagrams: [{ src: '/diagrams/devflow_arch_team.png', caption: '팀 공동 아키텍처 (2차 MVP) — EKS · ALB · RDS · GitLab CI/CD · Prometheus/Grafana는 인프라 팀원 설계' },{ src: '/diagrams/devflow_flow.png', caption: '내가 구현한 백엔드 요청 흐름과 인프라 연결 지점' },{ src: '/diagrams/devflow_erd.png', caption: '데이터 모델과 권한 규칙' }],
    name: 'DevFlow',
    summary: '프로젝트·업무 관리에 CI/CD·Kubernetes·모니터링·장애 상태 연동까지 더한 DevOps 통합 프로젝트 관리 시스템 (2차 REST API 13개 → 3차 50개)',
    period: '2026.08 (2차) · 2026.10 ~ 2026.11.13 (3차 고도화, 완료)',
    type: '멋쟁이사자처럼 부트캠프 팀 프로젝트',
    team: '4명',
    role: '팀장 · Backend 전담',
    stack: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'JPA', 'PostgreSQL', 'Flyway', 'OAuth2', 'Redis', 'Docker', 'Swagger'],
    links: [
      { label: '2차', url: 'https://github.com/Team-likelion-2nd-Project/likelion-devops-7th-team02' },
      { label: '3차', url: 'https://github.com/Team-likelion-3rd-Project/likelion-devops-7th-3rd-team02' },
    ],
    problem:
      '업무 관리 서비스를 만드는 데서 끝내지 않고, 그 서비스가 빌드·배포·모니터링되는 DevOps 흐름까지 하나의 프로젝트로 연결하는 것이 목표였습니다.',
    flow: ['Client', 'JWT 인증 필터', 'Controller', 'Service (권한 검증)', 'JPA', 'PostgreSQL'],
    features: [
      'JWT 기반 Stateless 인증 (회원가입 · 로그인 · 내 정보)',
      '프로젝트 생성 시 생성자를 OWNER로 자동 등록, 팀원 등록은 OWNER만 가능',
      'Task 생성·조회·상태 변경·담당자 지정 (프로젝트 멤버만 접근)',
      'Health · Liveness · Readiness · Prometheus 엔드포인트 노출',
      '(3차) 업무 화면에서 CI/CD · Kubernetes · 모니터링 · 장애 상태를 함께 보는 연동 계층',
      '(3차) GitHub · Google OAuth2 로그인, S3 첨부파일(Presigned URL), Redis 캐시',
    ],
    mine: [
      'backend/ 전체 설계·구현 (Java 파일 전부 본인 커밋)',
      'Spring Security + JWT 필터, 전역 예외 처리와 공통 응답 포맷',
      'users · projects · project_members · tasks 모델링, 유니크 제약 설계',
      'local / dev / prod 프로필 분리, 비밀값은 환경변수로 주입',
      'Docker 멀티스테이지 빌드, Actuator로 K8s Probe·Prometheus 수집 엔드포인트 구성',
      'Postman Collection 기반 API 통합 테스트',
      '인프라 파트가 올리는 PR을 직접 리뷰·논의해 배포 구조와 운영 방식에 기여하고, 배포 환경 요구사항을 백엔드에 반영',
      '파트 간 API 불일치를 회의로 조율하고 설계 문서(API 명세)를 지속 갱신, 진행 상황 공유',
      '(3차) API 13 → 50개 확장: Flyway V1~V8, 업무 검색·페이지·수정·삭제, 배포 기록·장애(Incident) API',
      '(3차) 연동 계층: GitHub Actions 파이프라인, Prometheus(Pod·Node·HPA·p95), AWS RDS·ALB 상태, Argo CD 배포 Webhook, Alertmanager 장애 Webhook·자동 해결',
      '(3차) 프로젝트별 클라우드 연결: AssumeRole + ExternalId(Access Key 저장 없음), 토큰 AES-GCM 암호화, Webhook 토큰 SHA-256 해시, SSRF 차단',
      '(3차) 단위 테스트 104개, WireMock 통합 테스트 22단계, k6 부하 테스트 4종 + CI smoke, Trivy 조치 (Spring Boot 3.5.4 → 3.5.16, CRITICAL 10 → 6건)',
      '(3차) 인프라 참여: AWS Helm values · IRSA 설정, 시크릿 입력, 배포 후 API 점검 스크립트(AWS 첫 실행 48개 중 46개 통과, 남은 2건은 원인과 담당을 정리해 공유), 온프렘 배포 설정 · DB 권한 · Redis 테스트',
      '(3차) 배포 단계가 Job 단위로 묶여 실행되지 않은 배포가 성공으로 표시되던 문제를 Step 단위 배정으로 수정(#88), 이미지 게시가 멈춘 원인(워크플로 tags 키 중복)을 찾아 수정(#75)',
    ],
    teamWork: [
      'Frontend: React UI, 파이프라인·배포·장애·클라우드 연결 화면',
      'AWS: Terraform(VPC · EKS · RDS Multi-AZ · CloudFront+S3), Helm + Argo CD GitOps, ExternalDNS · ACM',
      '온프렘: kubeadm 3노드 VM 클러스터, Tailscale, 백업·복구',
      'CI/CD · Monitoring: GitHub Actions · 이미지 게시, Prometheus · Grafana · Alertmanager',
    ],
    metrics: {
      caption: '3차 고도화 결과 (2026.10.05 ~ 11.13) · 머지 PR은 팀 전체 55건 중 본인 21건',
      items: [
        { label: 'API (2차 13개에서 확장)', value: '50개' },
        { label: '머지 PR (팀 전체 55건)', value: '21건' },
        { label: '단위 테스트 + 통합 22단계', value: '104개' },
        { label: 'AWS 배포 후 API 점검', value: '46/48' },
      ],
    },
    extra: {
      title: '3차 고도화 (2026.10.05 ~ 2026.11.13, 완료)',
      body: '목표는 "DevFlow 안에서 DevOps 상태가 보이는 것"이었습니다. 업무 화면에서 CI/CD · Kubernetes · 모니터링 · 장애 상태를 함께 보도록 확장하고, 온프렘(kubeadm)과 AWS(EKS) 두 환경에 배포했습니다. 역할은 팀장 · Backend를 유지하며 백엔드 연동 계층을 설계·구현하고 배포 설정과 검증에 직접 참여했습니다. 팀 결과로 온프렘에서 낸 장애를 AWS의 DevFlow가 감지하기까지 5분 39초를 검증했고 백업·복구 검증과 devflowlab.net 운영까지 마쳤습니다. 2026.11.13 최종 발표(녹화 시연)로 마무리했습니다.',
    },
  },
  {
    slug: 'hearing-assistant',
    no: 2,
    diagrams: [{ src: '/diagrams/hearing_pipeline.png', caption: '엣지 AI 파이프라인(Raspberry Pi)과 클라우드 백엔드 분리' }],
    troubleshooting: {
      title: '추론 루프가 연결 처리를 막던 문제',
      diagram: { src: '/diagrams/hearing_ts.png', caption: '추론/연결 처리 분리 전후' },
      rows: [
        ['문제', '단일 스크립트로 검증한 추론 코드를 WebSocket 서버로 감싸자, 추론 루프가 서버와 같은 흐름에서 돌아 앱의 시작·중지 요청과 결과 전송이 막혔습니다.'],
        ['원인', 'CPU를 쓰는 추론이 이벤트 루프를 점유했습니다.'],
        ['해결', '추론을 별도 스레드로 분리하고 결과를 큐로 전달했습니다. 라즈베리파이 자원 한도에 맞춰 서버와 모델을 경량화했습니다.'],
        ['배운 점', '엣지에서는 기능 추가보다 경량화·안정성이 먼저이고, 실시간 처리(엣지)와 데이터 저장(클라우드)은 서비스 단위로 나눠야 합니다.'],
      ],
    },
    name: 'Hearing Assistant',
    summary: '소리의 종류와 방향을 실시간으로 판별해 알려주는 청각장애인 생활 보조 시스템',
    period: '2026.03 ~ 2026.06',
    type: '심화 캡스톤디자인',
    team: '5명',
    role: '팀장 · 서버 구조 설계 · 배포 · 엣지 AI 서버',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Alembic', 'Docker Compose', 'WebSocket', 'PyTorch', 'Raspberry Pi'],
    links: [
      { label: '백엔드', url: 'https://github.com/alberione1110/hearing-assistant' },
      { label: 'AI 서버', url: 'https://github.com/alberione1110/deafassist_ai_server' },
    ],
    problem:
      '주변의 위험 소리를 놓치기 쉬운 청각장애인을 위해, 엣지 디바이스가 소리를 분류하고 방향을 추정해 모바일·AR 글래스·워치로 알려줍니다.',
    flow: ['ReSpeaker 4-Mic', 'KWS 소리 분류', 'GCC-PHAT 방향 추정', 'WebSocket', '모바일 앱', 'FastAPI + PostgreSQL'],
    features: [
      '8종 소리 분류(KWS)와 마이크 4쌍 GCC-PHAT 기반 8방향 추정',
      'WebSocket으로 추론 결과를 앱에 실시간 전송 (start / stop 제어)',
      'JWT 인증, 방향 감지 이력 저장·조회 (페이지네이션, 방향·날짜 필터)',
      '사용자 설정: 자막 글자 크기, 워치 진동 패턴, AR 글래스 자동 전환',
    ],
    mine: [
      '팀장: PR 기반 협업 운영, PR 28건 리뷰·머지',
      '백엔드 / AI 서비스 모노레포 골격 설계 후 AI 서버를 엣지 레포로 분리',
      'Dockerfile · Docker Compose 로컬 환경, Render Blueprint로 웹 서비스 + PostgreSQL 배포',
      '마이크 스트림 → KWS → GCC-PHAT → WebSocket 추론 파이프라인 구현',
      '추론은 별도 스레드, 결과는 Queue로 넘겨 이벤트 루프가 막히지 않게 구성',
      'Windows에서 개발한 코드를 그대로 라즈베리파이에 배포해 엣지에서 실행',
      '실시간성이 필요한 소리는 백엔드를 거치지 않고 라즈베리파이 로컬 서버에서 프론트와 WebSocket으로 직접 통신, 로그만 API로 백엔드에 송신',
      '파트 사이의 중간 다리 역할: 회의 내용을 각 파트에 연결하고 API·이벤트 규격 문서를 고도화',
      'Keyword Spotting 모델 파인튜닝 (팀원과 공동)',
    ],
    teamWork: [
      '백엔드 API: JWT 인증, 방향 이력·설정 API, Alembic 마이그레이션',
      '모바일 앱, AR 글래스 클라이언트',
    ],
    metrics: null,
    extra: {
      title: '논문',
      body: '「실시간 소리 인식 및 방향 추정을 활용한 청각장애인 생활 보조 시스템 설계 및 구현」, 한국정보기술학회, 2026 (공동 1저자)',
    },
  },
  {
    slug: 'kseb',
    no: 4,
    diagrams: [{ src: '/diagrams/kseb_arch.png', caption: '사용자 흐름과 풀스택 구성' }],
    name: 'KSEB_Proj',
    summary: '서울 상권 데이터 기반 창업 업종 · 입지 추천 웹 서비스',
    period: '2025.06 ~ 2025.08',
    type: 'KSEB 부트캠프',
    team: '4명',
    role: '팀장 · 풀스택 (Frontend + Backend)',
    stack: ['React', 'Axios', 'ECharts', 'Flask', 'Python', 'MySQL'],
    links: [{ label: 'GitHub', url: 'https://github.com/alberione1110/KSEB_Proj' }],
    problem:
      '예비 창업자가 지역을 고르면 유망 업종을, 업종을 고르면 지역 인구 분포와 시장 발전 가능성을 종합적으로 고려한 유망 지역(동)을 추천받고, 동일 업종 매출 데이터와 지역 인구 지표를 차트 리포트와 AI 상담으로 확인합니다.',
    flow: ['React', 'REST /api', 'Flask Blueprint', 'AI 모듈 (팀원)', 'MySQL'],
    features: [
      '지역 → 업종 추천, 업종 → 지역(동) 추천',
      '연령·성별 매출 등 상권 리포트를 ECharts로 시각화',
      '상권 관련 질문에 답하는 AI 상담',
    ],
    mine: [
      'React 화면 전체: 지역·업종 선택 홈, 추천 결과, 리포트 페이지',
      'ECharts 차트 구현, Axios로 API 연동',
      'Flask Blueprint 기반 API 4종, CORS · 공통 에러 처리 · 헬스 체크',
      '프론트 – 백엔드 – AI 모듈 통합과 저장소 관리',
      '팀장으로서 AI 파트가 막힌 학습·데이터 문제에 논문 기반 RAG LLM 활용을 제안',
    ],
    teamWork: ['업종·입지 추천 알고리즘, 추천 이유 생성, 리포트 생성', 'RAG 기반 상담 챗봇'],
    metrics: null,
    extra: null,
  },
  {
    slug: 'visgap',
    no: 3,
    diagrams: [{ src: '/diagrams/visgap_pipeline.png', caption: '파이프라인과 검증 지표 (검증셋 39장 기준)' }],
    name: 'VisGAP',
    summary: 'YOLOv8 기반 스마트폰 후면 카메라 미세 부품 간격(gap) 자동 측정 · 논문 제1저자',
    period: '2025.03 ~ 2025.06',
    type: '기초 캡스톤디자인 (기업 연계)',
    team: '5명',
    role: '팀장 · AI',
    stack: ['YOLOv8', 'PyTorch', 'OpenCV', 'FastAPI', 'React', 'Vite'],
    links: [{ label: 'GitHub', url: 'https://github.com/alberione1110/VisGAP' }],
    problem:
      '사람이 눈으로 확인하던 부품 간격 검사를, 이미지를 올리면 frame · magnetic · gap을 검출하고 gap 높이(px)를 자동으로 측정하도록 바꿨습니다.',
    flow: ['React', 'FastAPI 업로드 API', 'YOLOv8m 검출', 'OpenCV 후처리', '결과 이미지 · gap 값'],
    features: [
      'frame · magnetic · gap 3개 클래스 검출',
      'gap 박스 높이를 px 단위로 측정해 표시',
      '단일 이미지는 결과와 gap 값, 다중 이미지는 ZIP으로 반환',
    ],
    mine: [
      '고전 영상처리(RMBG, OTSU, Contour) 실험 후 YOLO 기반 검출로 방향 결정',
      'Roboflow로 데이터셋 구축, 라벨링 클래스 정의 (train 140 / valid 39 / test 21)',
      'YOLOv8m 학습·재학습과 최종 모델 선정',
      '추론과 gap 측정 로직, AI 추론 서버 구현',
    ],
    teamWork: ['프론트엔드: 업로드·설명·결과 페이지', '백엔드: 업로드 API, 프론트–백–AI 연동'],
    metrics: {
      caption: '최종 모델(best.pt, epoch 26) · 검증셋 39장 기준',
      items: [
        { label: 'Precision', value: '0.980' },
        { label: 'Recall', value: '0.920' },
        { label: 'mAP50', value: '0.980' },
        { label: 'mAP50-95', value: '0.829' },
      ],
    },
    extra: {
      title: '논문',
      body: '「비전 기반 부품 세그멘테이션 및 GAP 측정 시스템」, 한국데이터사이언스학회 춘계 종합학술대회 논문집 게재, 2025.06 (제1저자). 지표는 높게 나왔지만 검증셋이 39장으로 작아, 모델 성능을 높이는 것과 실제 검사 환경에서 안정적으로 동작시키는 것은 다른 문제임을 인식했습니다. 이후 모델을 서비스 구조 안에서 운영하는 데 관심을 두게 되었습니다.',
    },
  },
  {
    slug: 'rsna',
    research: true,
    diagrams: [],
    name: 'RSNA',
    summary: '암호화 이미지의 훼손 정도에 따른 학습 성능을 비교한 연구실 연구',
    period: '연구실 활동 2025.03 ~ 2026.02',
    type: '연구실 연구 (경기대 네트워크 연구실)',
    team: '1명 (교수님과 매주 세미나)',
    role: '실험 설계 · 구현 · 평가 전체 (학부연구생)',
    stack: ['PyTorch', 'ResNet18', 'scikit-learn', 'pydicom', 'Grad-CAM'],
    links: [{ label: 'GitHub', url: 'https://github.com/alberione1110/RSNA' }],
    problem:
      '민감한 의료 영상을 암호화해 탈취되어도 알아보기 어렵게 하면서 암호화된 상태로 학습시키는 것이 처음 목표였습니다. 암호화하면 이미지가 훼손되어 학습이 되지 않는다는 문제를 만난 뒤, 훼손 정도에 따라 학습 성능이 어떻게 변하는지로 연구 질문을 바꿔 6가지 조건으로 비교했습니다.',
    flow: ['DICOM (VOI LUT)', '암호화·변형 6조건', 'ResNet18 학습', 'AUC · AP 평가', 'Grad-CAM'],
    features: [
      'Chaotic XOR(값만 변형), 8×8 블록 셔플(구조 부분 훼손), 픽셀 셔플(구조 전면 훼손)과 그 조합을 같은 모델·같은 분할로 비교',
      '클래스 불균형(양성 23%)을 고려해 Accuracy 대신 ROC-AUC · AP를 주요 지표로 사용 (셔플 조건의 Accuracy 0.768은 전부 "정상"으로 예측한 값과 같음)',
      '학습 → 평가 → Grad-CAM → 비교 그래프까지 스크립트로 자동화',
    ],
    mine: [
      '암호화 기법 구현 (Logistic map 기반 XOR, 픽셀·블록 셔플)',
      '환자 ID 기준 8:2 분할, 학습·평가·시각화 파이프라인 전체',
      '결과 해석: 공간 구조가 보존되는 XOR은 성능이 유지되고, 구조가 훼손될수록 학습이 어려워짐',
      '한계 명시: 별도 test set 없이 검증셋만 사용, XOR 키 고정(학습 가능성 비교이며 보안 강도 검증은 아님), 클래스 가중치 미적용',
      '입실부터 퇴실까지 매주 세미나에서 공부 내용·사례·연구 진행을 공유, 학기 중에도 주 5회 하루 6시간 이상 연구실에서 연구',
    ],
    teamWork: [],
    metrics: {
      caption: 'ROC-AUC · 검증셋 5,337장 (모델 선택에도 사용한 검증셋 기준)',
      items: [
        { label: '원본', value: '0.918' },
        { label: 'XOR 단독', value: '0.861' },
        { label: '블록 셔플', value: '0.683' },
        { label: '픽셀 셔플', value: '0.583' },
      ],
    },
    extra: {
      title: '교수님과의 협업',
      body: '연구 주제를 정할 때 교수님은 비전 기반 이미지 학습을 권하셨고, 저는 클라우드 관리에 보안이 빠질 수 없다고 생각해 여러 클라우드를 활용한 분산 학습 기반 보안 연구로 네트워크·보안 기초를 다지고 싶었습니다. 세미나에서 논의해 이미지 학습을 클라우드 분산 학습으로 수행하는 방향으로 타협해 시작했고, 다양한 암호화 기법을 알게 되며 주제를 암호화 이미지 학습으로 좁혔습니다. 이후 암호화 상태 학습이 막혔을 때도 세미나에서 그대로 공유해 교수님과 주제를 조정했습니다. 처음 6개월은 AI/ML/DL 기초를 쌓고 기초 캡스톤에서 활용·고도화한 뒤, 방학부터 개인 연구를 준비했습니다.',
    },
  },
  {
    slug: 'reconnect',
    no: 5,
    diagrams: [{ src: '/diagrams/reconnect_flow.png', caption: '사용자 흐름과 구성' }],
    name: 'ReConnect',
    summary: '연인과 함께 쓰는 감정 다이어리 서비스의 웹 프론트엔드',
    period: '2025.09 ~ 2025.12',
    type: 'AI-Powered 상상기업 · 약 4개월 장기 프로젝트',
    team: '4명',
    role: '웹 프론트엔드 전담',
    stack: ['React 19', 'React Router', 'Axios'],
    links: [{ label: 'GitHub', url: 'https://github.com/alberione1110/ReConnect' }],
    problem:
      '연인이 같은 질문에 각자 답하고 서로의 답변을 확인하며, 답변을 바탕으로 한 관계 분석 리포트를 보는 서비스입니다.',
    flow: ['React Web', 'services 계층 (Axios)', 'Backend API (팀원)'],
    features: [
      '회원가입 · 로그인, 커플 코드로 상대방 연결',
      '36개 질문에 차례로 답하고 상대 답변·완료 상태 확인',
      '파트별 · 최종 관계 분석 리포트 화면 (데모용 샘플 데이터로 렌더링)',
    ],
    mine: [
      '웹 화면 전체 구현 (랜딩, 인증, 설문, 질문, 답변 보기, 커플 연결, 리포트)',
      'Axios 인스턴스·인터셉터와 API 서비스 계층 구성',
      '백엔드와 AI 사이에서 생길 수 있는 문제를 체크리스트로 만들어 제공, 실제 API 연동성 문제 해결에 기여',
    ],
    teamWork: ['모바일 앱, 백엔드 API'],
    metrics: null,
    extra: null,
  },
]


const ts = {
  devflow: [{
    title: '파트 간 API 불일치 (팀 협업)',
    rows: [
      ['문제', '회원가입 API에서 개인 정보 데이터의 형식(전화번호 하이픈 포함 여부, 생년월일 날짜 형식)이 프론트엔드가 보내는 값과 백엔드가 기대하는 값 사이에 맞지 않았습니다.'],
      ['원인', '각 파트가 API 명세를 각자 해석해 구현했고, 변경 사항이 팀 전체에 즉시 공유되는 구조가 아니었습니다.'],
      ['해결', '회의를 열어 어느 쪽 기준에 맞출지 먼저 합의하고 그 결과를 설계 문서(API 명세)에 바로 반영했습니다. 이후에도 이슈가 생길 때마다 문서를 갱신하고 Swagger로 코드와 문서를 일치시키며 변경 사항과 남은 이슈를 팀에 계속 공유했습니다.'],
      ['배운 점', '통합 시점에 한꺼번에 맞추기보다 문서를 기준으로 작은 단위로 일찍 맞추는 방식이 효과적입니다. 인프라 담당과도 API 명세·배포 구조를 정기 리뷰하며 Probe·Metrics를 백엔드에서 먼저 준비했고, 2차에서 직접 다루지 못한 인프라 경험은 P6와 3차의 배포 검증 참여로 이어졌습니다.'],
    ],
  },
  {
    title: 'Redis 장애 시 모니터링 요약 10초 지연 (3차, #44 · #47)',
    rows: [
      ['문제', 'Redis가 내려가면 모니터링 요약 API 응답이 약 10.3초까지 늘어나 대시보드 전체가 느려졌습니다.'],
      ['원인', '캐시 조회마다 Redis 연결 타임아웃을 기다린 뒤에야 원본(Prometheus · GitHub)을 조회하는 구조였습니다.'],
      ['해결', 'Redis 실패를 감지하면 캐시를 우회하고 30초 메모리 캐시로 대체했습니다. 동시 요청에서도 우회 전환과 WARN 로그가 한 번만 일어나도록 고쳐 응답이 약 1초가 되었습니다.'],
      ['배운 점', '외부 연동이 많은 서비스일수록 캐시 같은 보조 구성요소의 장애가 본 기능을 막지 않게 격리해야 합니다. 장애를 일부러 내서 확인하는 테스트를 통합 테스트에 포함했습니다.'],
    ],
  }],
  'hearing-assistant': [
    {
      title: '① 다채널 마이크 입력 편차와 파트 간 통신 (팀 협업)',
      rows: [
        ['문제', '다채널 마이크가 항상 4개 채널로 소리를 받는 것이 아니라, 소리가 한쪽으로 치우치면 3개 채널만 들어오는 경우가 있어 입력 형태가 일정하지 않았습니다. 이 때문에 프론트엔드와 주고받는 데이터에서 문제가 발생했습니다.'],
        ['원인', '입력 채널 수가 달라질 수 있다는 조건이 파트 간 명세에 반영되어 있지 않았습니다.'],
        ['해결', '팀장으로서 파트 사이의 중간 다리가 되어 회의 내용을 각 파트에 연결하고 적극적으로 소통했습니다. 채널 수 변동 같은 예외 조건을 포함하도록 설계 문서를 고도화했습니다.'],
        ['배운 점', '입력이 이상적이지 않은 센서·엣지 환경에서는 예외 조건을 문서에 먼저 명시해야 파트 간 오해가 줄어듭니다.'],
      ],
    },
    {
      title: '② 실시간 소리 전달 지연 (구조 설계)',
      rows: [
        ['문제', '로그 송신은 API로 충분했지만, 소리처럼 즉시 받아야 하는 데이터를 백엔드 서버를 거쳐 전달하면 지연이 커질 수 있었습니다.'],
        ['원인', '마이크 → 백엔드 → 프론트로 이어지는 경로가 실시간 처리에 불리한 구조였습니다.'],
        ['해결', '백엔드를 거치지 않고 라즈베리파이에 경량화한 AI 모델과 자동화 알고리즘을 올려 자체 로컬 서버를 구성했습니다. 프론트와 WebSocket으로 직접 통신해 실시간으로 처리하고, 로그는 기존대로 API로 백엔드에 송신했습니다.'],
        ['배운 점', '데이터 성격에 따라 경로를 나눕니다. 실시간성이 필요한 것은 엣지에서 직접, 기록·저장은 API와 클라우드로 처리합니다.'],
      ],
    },
    {
      title: '③ 추론 루프가 연결 처리를 막던 문제',
      diagram: { src: '/diagrams/hearing_ts.png', caption: '추론/연결 처리 분리 전후' },
      rows: [
        ['문제', '단일 스크립트로 검증한 추론 코드를 WebSocket 서버로 감싸자, 추론 루프가 서버와 같은 흐름에서 돌아 앱의 시작·중지 요청과 결과 전송이 막혔습니다.'],
        ['원인', 'CPU를 쓰는 추론이 이벤트 루프를 점유했습니다.'],
        ['해결', '추론을 별도 스레드로 분리하고 결과를 큐로 전달했습니다. 라즈베리파이 자원 한도에 맞춰 서버와 모델을 경량화했습니다.'],
        ['배운 점', '엣지에서는 기능 추가보다 경량화·안정성이 먼저이고, 실시간 처리(엣지)와 데이터 저장(클라우드)은 서비스 단위로 나눠야 합니다.'],
      ],
    },
  ],
  visgap: [{
    title: '참여가 어려운 AI 파트 팀원 (팀 협업)',
    rows: [
      ['문제', '같은 AI 파트 팀원이 프로젝트에 거의 참여하지 못하고 관련 지식도 부족해, 혼자 해결하기 어려운 문제가 발생했습니다.'],
      ['원인', '팀원의 경험·지식 격차와, 맡을 수 있는 구체적인 역할이 정해지지 않은 상태였습니다.'],
      ['해결', '소외된 팀원을 그냥 두지 않고, 사소한 내용이라도 설명해 주고 자료 조사처럼 할 수 있는 임무를 구체적으로 부여했습니다. 맡은 일이 있으니 참여가 이어졌고 팀원 간 분쟁도 생기지 않았습니다.'],
      ['배운 점', '참여가 적은 팀원은 탓하기보다 수준에 맞는 역할을 만들어 주는 것이 팀 전체의 결과와 분위기를 지킵니다.'],
    ],
  }],
  kseb: [{
    title: '학습 난이도와 폐쇄적인 상권 데이터 (팀 협업)',
    rows: [
      ['문제', 'AI 파트 팀원들이 AI 모델 학습 문제를 어려워했고, 상권 데이터는 폐쇄적이라 학생 신분으로 확보하기 어려운 것이 많았습니다.'],
      ['원인', '모델을 직접 학습시키기에는 확보 가능한 데이터가 제한적이었습니다.'],
      ['해결', '팀장으로서 풀스택 담당이었지만 해결책을 제안했습니다. 여러 논문을 근거로 RAG 방식의 LLM을 활용해, 학습 데이터에 의존하지 않고 AI 상담을 구현하는 방향으로 전환했습니다.'],
      ['배운 점', '데이터 품질과 확보 가능성이 결과의 신뢰도를 좌우합니다. 담당 파트 밖의 문제도 논문·사례 조사로 방향을 제시할 수 있고, 설계 단계부터 데이터 정합성을 검증하는 습관이 생겼습니다.'],
    ],
  }],
  reconnect: [{
    title: '백엔드·AI 간 연동 문제 사전 점검 (팀 협업)',
    rows: [
      ['문제', '큰 장애는 없었지만, 앱·웹이 같은 REST API를 공유하는 구조라 백엔드와 AI 사이에서 연동 문제가 생길 가능성이 있었습니다.'],
      ['원인', '백엔드와 AI 파트가 각자 개발해 API 연동 지점이 늦게 드러날 수 있었습니다.'],
      ['해결', '프론트 담당이면서 백엔드·AI를 모두 이해하는 팀원으로서, 두 파트 사이에서 발생할 수 있는 문제를 체크리스트로 만들어 제공했습니다. 이 체크리스트가 실제로 발견하지 못했던 API 연동성 문제를 찾아 해결하는 데 도움이 되었습니다.'],
      ['배운 점', '역할이 프론트엔드여도 인접 파트의 지식이 있으면 통합 단계의 문제를 예방할 수 있습니다.'],
    ],
  }],
  rsna: [{
    title: '주제 전환 — 암호화 상태에서 학습이 되지 않던 문제',
    rows: [
      ['처음 목표', '민감한 의료 이미지를 암호화해, 전송 중 탈취되어도 비밀키 없이는 구분하기 어렵게 하고 암호화된 상태에서 그대로 학습시키는 것.'],
      ['부딪힌 문제', '이미지를 암호화하면 원본 내용이 훼손되어 모델이 전혀 학습되지 않았습니다.'],
      ['질문 전환', '"학습이 되게 만들 수 있는가"에서 "이미지가 얼마나 훼손되면 학습 성능이 어떻게 변하는가"로 질문을 바꿨습니다. 막힌 상태를 세미나에서 그대로 공유하고 교수님과 논의해 결정했습니다.'],
      ['결과', '같은 모델·같은 분할에서 변환 조건만 바꿔 비교한 결과, 공간 구조가 보존되는 XOR은 ROC-AUC 0.861(원본 0.918), 구조가 크게 훼손되는 픽셀 셔플은 0.583이었습니다.'],
    ],
  }],
}

const withTs = allProjects.map((p) => ({ ...p, troubleshootings: ts[p.slug] ?? (p.troubleshooting ? [p.troubleshooting] : []) }))
export const projects = withTs.filter((p) => !p.research).sort((a, b) => a.no - b.no)
export const research = withTs.filter((p) => p.research)
export const getProject = (slug) => withTs.find((p) => p.slug === slug)
