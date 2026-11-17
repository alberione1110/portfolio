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
        ['판단 근거', '고유 ID 형식은 같은 이름의 계정이나 레포가 다시 만들어져도 이 역할을 쓸 수 없어, 와일드카드로 넓히는 것보다 안전합니다.'],
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
    diagrams: [{ src: '/diagrams/devflow_arch_team.png', caption: '팀 공동 아키텍처 (2차 MVP). EKS, ALB, RDS, GitLab CI/CD, Prometheus/Grafana는 인프라 팀원 설계' },{ src: '/diagrams/devflow_flow.png', caption: '내가 구현한 백엔드 요청 흐름과 인프라 연결 지점' },{ src: '/diagrams/devflow_erd.png', caption: '데이터 모델과 권한 규칙' }],
    name: 'DevFlow',
    summary: '프로젝트·업무 관리에 CI/CD·Kubernetes·모니터링·장애 상태 연동까지 더한 DevOps 통합 프로젝트 관리 시스템 (2차 REST API 13개 → 3차 50개)',
    period: '2026.08 (2차) · 2026.10 ~ 2026.11.13 (3차 고도화, 완료)',
    type: '멋쟁이사자처럼 부트캠프 팀 프로젝트',
    team: '4명',
    role: '팀장, Backend 전담',
    stack: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'OAuth2', 'JPA', 'Flyway', 'PostgreSQL', 'Redis', 'AWS SDK', 'Docker', 'Helm', 'Swagger', 'WireMock', 'k6', 'Trivy'],
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
      'backend/ 설계·구현 전담 (첨부파일 스트리밍 다운로드 일부는 팀원 기여)',
      'Spring Security + JWT 필터, 전역 예외 처리와 공통 응답 포맷',
      'users · projects · project_members · tasks 모델링, 유니크 제약 설계',
      'local / dev / prod 프로필 분리, 비밀값은 환경변수로 주입',
      'Docker 멀티스테이지 빌드, Actuator로 K8s Probe·Prometheus 수집 엔드포인트 구성',
      'Postman Collection 기반 API 통합 테스트',
      '클라우드·CI/CD 구조를 팀 전체가 함께 설계하고 전 파트 PR 리뷰에 참여, 배포 환경 요구사항을 백엔드에 반영',
      '파트 간 API 불일치를 회의로 조율하고 API 명세와 Swagger를 계속 갱신',
      '(3차) API 13 → 50개 확장: Flyway V1~V8, 업무 검색·페이지·수정·삭제, 배포 기록·장애(Incident) API',
      '(3차) 연동 계층: GitHub Actions 파이프라인, Prometheus(Pod·Node·HPA·p95), AWS RDS·ALB 상태, Argo CD 배포 Webhook, Alertmanager 장애 Webhook·자동 해결',
      '(3차) 프로젝트별 클라우드 연결: AssumeRole + ExternalId(Access Key 저장 없음), 토큰 AES-GCM 암호화, Webhook 토큰 SHA-256 해시, SSRF 차단',
      '(3차) 단위 테스트 104개, WireMock 통합 테스트 22단계, k6 시나리오 4종 작성(CI에서 smoke 실행), Trivy 조치 (Spring Boot 3.5.4 → 3.5.16, CRITICAL 10 → 6건)',
      '(3차) 인프라·CI/CD 참여: AWS Helm values와 IRSA 설정, 시크릿 입력, GitHub Actions 워크플로 수정, 배포 후 API 점검 스크립트(AWS 첫 실행 48개 중 46개 통과, 실패 2건은 GitOps 값 수정 후 해결), 온프렘 배포 설정, DB 권한, Redis 테스트',
      '(3차) 사전 검사 Job이 배포 성공으로 보이던 파이프라인 단계 배정을 Step 단위로 수정(#88), 이미지 게시가 멈춘 원인(워크플로 tags 키 중복)을 찾아 수정(#75)',
    ],
    teamWork: [
      'Frontend: React UI, 파이프라인·배포·장애·클라우드 연결 화면',
      'AWS: Terraform(VPC · EKS · RDS Multi-AZ · CloudFront+S3), Helm + Argo CD GitOps, ExternalDNS · ACM',
      '온프렘: kubeadm 3노드 VM 클러스터, Tailscale, 백업·복구',
      'CI/CD · Monitoring: GitHub Actions · 이미지 게시, Prometheus · Grafana · Alertmanager (클라우드·CI/CD 구조는 팀 공동 설계)',
    ],
    metrics: {
      caption: '3차 고도화 결과 (2026.10.05 ~ 11.13) · 머지 PR은 팀 전체 55건 중 본인 21건',
      items: [
        { label: 'API (2차 13개에서 확장)', value: '50개' },
        { label: '단위 테스트 + 통합 22단계', value: '104개' },
        { label: 'Redis 장애 시 응답 p95 (기존 10.3초)', value: '1초' },
        { label: 'AWS 배포 후 API 점검', value: '46/48' },
      ],
    },
    extra: {
      title: '3차 고도화 (2026.10.05 ~ 2026.11.13, 완료)',
      body: '업무 화면에서 CI/CD, Kubernetes, 모니터링, 장애 상태를 함께 보도록 DevFlow를 확장하고, 온프렘(kubeadm)과 AWS(EKS) 두 환경에 배포했습니다. 저는 팀장과 Backend를 유지하며 백엔드 연동 계층을 설계하고 구현했고, 배포 설정과 검증에 참여했습니다. 팀 결과로 온프렘 장애 주입부터 AWS DevFlow의 장애 생성과 복구 확인까지 5분 39초, EKS HPA 확장·축소(2 → 4 → 2), 백업과 복구를 검증했습니다. devflowlab.net으로 2026.11.13 최종 발표(녹화 시연)를 마쳤고, 현재 AWS 환경은 종료했습니다.',
    },
  },
  {
    slug: 'hearing-assistant',
    no: 2,
    diagrams: [{ src: '/diagrams/hearing_pipeline.png', caption: '엣지 AI 파이프라인(Raspberry Pi 5)과 클라우드 백엔드 분리' }],
    name: 'Hearing Assistant',
    summary: '소리의 종류와 방향을 실시간으로 판별해 알려주는 청각장애인 생활 보조 시스템',
    period: '2026.03 ~ 2026.06',
    type: '심화 캡스톤디자인',
    team: '6명',
    role: '팀장, 서버 구조 설계와 배포, 엣지 AI 서버',
    stack: ['Python', 'FastAPI', 'WebSocket', 'Docker Compose', 'Render', 'PyTorch', 'Wav2Vec2', 'GCC-PHAT', 'Raspberry Pi 5'],
    links: [
      { label: '백엔드', url: 'https://github.com/alberione1110/hearing-assistant' },
      { label: 'AI 서버', url: 'https://github.com/alberione1110/deafassist_ai_server' },
    ],
    problem:
      '주변의 위험 소리를 놓치기 쉬운 청각장애인을 위해, 엣지 디바이스가 소리를 분류하고 방향을 추정해 모바일·AR 글래스·워치로 알려줍니다.',
    flow: ['ReSpeaker 4-Mic', 'KWS 소리 분류', 'GCC-PHAT 방향 추정', 'WebSocket', '모바일 앱', 'FastAPI + PostgreSQL'],
    features: [
      '8종 소리 분류(Wav2Vec2 KWS), 키워드로 판정된 소리만 마이크 6쌍 GCC-PHAT로 8방향 추정',
      'WebSocket으로 추론 결과를 앱에 실시간 전송 (start / stop 제어)',
      'JWT 인증, 방향 감지 이력 저장·조회 (페이지네이션, 방향·날짜 필터)',
      '사용자 설정: 자막 글자 크기, 워치 진동 패턴, AR 글래스 자동 전환',
    ],
    mine: [
      '팀장: PR 기반 협업 운영, PR 28건 리뷰·머지',
      '백엔드 / AI 서비스 모노레포 골격 설계 후 AI 서버를 엣지 레포로 분리',
      'Dockerfile · Docker Compose 로컬 환경, Render Blueprint로 웹 서비스 + PostgreSQL 배포',
      '16kHz 오디오를 0.1초 단위로 받아 1초 윈도우로 KWS 추론 → 키워드일 때만 GCC-PHAT 방향 추정 → WebSocket 전송 파이프라인 구현',
      '추론은 별도 스레드, 결과는 Queue로 넘겨 이벤트 루프가 막히지 않게 구성',
      'REST polling의 반복 요청 지연을 피해 실시간 소리는 라즈베리파이 로컬 서버가 앱과 WebSocket으로 직접 통신, 기록만 API로 백엔드에 송신',
      '파트 간 JSON 이벤트 규격 조율, 마이크 채널이 누락되면 빠진 방향에 0을 넣어 API 형식 유지',
      'Wav2Vec2 기반 KWS 모델 파인튜닝 (팀원과 공동)',
    ],
    teamWork: [
      '백엔드 API: JWT 인증, 감지 이력·설정 API, PostgreSQL, Alembic 마이그레이션',
      '모바일 앱(React Native, Expo), AR 글래스·워치 클라이언트',
    ],
    metrics: null,
    extra: {
      title: '논문',
      body: '「실시간 소리 인식 및 방향 추정을 활용한 청각장애인 생활 보조 시스템 설계 및 구현」, 한국정보기술학회 하계 종합학술대회 논문집 게재, 2026.06 (공동 1저자)',
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
    role: '팀장, 풀스택 (Frontend와 Backend)',
    stack: ['React', 'Axios', 'ECharts', 'Flask', 'Python', 'MySQL'],
    links: [{ label: 'GitHub', url: 'https://github.com/alberione1110/KSEB_Proj' }],
    problem:
      '예비 창업자가 지역을 고르면 유망 업종을, 업종을 고르면 인구 분포와 상권 성장 가능성을 바탕으로 유망 지역(동)을 추천하는 웹 서비스입니다. 같은 업종의 매출 데이터와 지역 인구 지표는 차트 리포트와 AI 상담으로 보여줍니다.',
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
      '팀장으로서 AI 파트가 막힌 학습·데이터 문제에 논문을 근거로 RAG LLM 활용을 제안 (챗봇 구현은 팀원)',
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
    type: '기초 캡스톤디자인 (산학협력 기업 아이엠)',
    team: '6명',
    role: '팀장, AI',
    stack: ['YOLOv8m', 'PyTorch', 'OpenCV', 'NumPy', 'Roboflow', 'FastAPI', 'React', 'Vite'],
    links: [{ label: 'GitHub', url: 'https://github.com/alberione1110/VisGAP' }],
    problem:
      '사람이 눈으로 확인하던 부품 간격 검사를, 이미지를 올리면 frame, magnetic, gap을 객체 검출하고 gap 높이(px)를 자동으로 측정하도록 바꿨습니다. 학습 데이터는 협력 기업 아이엠(IAM)에서 제공받았습니다.',
    flow: ['React', 'FastAPI 업로드 API', 'YOLOv8m 검출', 'OpenCV 후처리', '결과 이미지 · gap 값'],
    features: [
      'frame, magnetic, gap 3개 클래스 객체 검출, frame과 magnetic은 검출 박스 영역에 반투명 색을 입혀 표시',
      'gap 박스 높이를 px 단위로 측정해 표시',
      '단일 이미지는 결과와 gap 값, 다중 이미지는 결과 이미지와 GAP 로그를 ZIP으로 반환',
    ],
    mine: [
      '고전 영상처리(RMBG, OTSU, Contour) 실험 후 YOLO 기반 검출로 방향 결정',
      'Roboflow로 데이터셋 구축, 라벨링 클래스 정의 (총 200장: train 140 / valid 39 / test 21)',
      'YOLOv8m 학습·재학습(imgsz 1024, conf 0.1, IoU 0.3)과 최종 모델 선정, MacBook CPU와 Windows GPU에서 속도·메모리 비교',
      '추론과 gap 측정 로직, AI 추론 서버 구현',
    ],
    teamWork: ['프론트엔드 2명: 업로드·설명·결과 페이지', '백엔드 1명: 업로드 API(단일·다중), 결과 이미지 저장'],
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
  devflow: [
    {
      title: '사전 검사 Job이 배포 성공으로 보이던 문제 (3차, #88)',
      rows: [
        ['문제', 'DevFlow 파이프라인 화면에서 실제로 실행되지 않은 배포 단계가 성공으로 표시되었습니다.'],
        ['원인', 'Job 이름의 키워드로 단계를 나눠 한 Job이 여러 단계에 반영되었고, 사전 검사 Job(Verify branch and deployment settings)이 "deployment"에 걸려 DEPLOY 성공으로 표시되었습니다.'],
        ['해결', 'Step 정보가 있으면 Step 이름으로 단계를 배정하고 키워드는 단어 단위로 비교(deployment ≠ deploy)하도록 고쳤습니다. 실제 Frontend 배포 실행 기준 BUILD 성공, VERIFY 성공, DEPLOY 실패로 정확히 표시됩니다.'],
      ],
    },
    {
      title: 'Redis 장애 시 모니터링 요약 10초 지연 (3차, #44 · #47)',
      rows: [
        ['문제', 'Redis가 내려가면 모니터링 요약 API 응답이 p95 약 10.3초까지 늘어나 대시보드 전체가 느려졌습니다.'],
        ['원인', '캐시 조회마다 Redis 연결 타임아웃을 기다린 뒤에야 원본(Prometheus, GitHub)을 조회하는 구조였습니다.'],
        ['해결', 'Redis 실패를 감지하면 캐시를 우회하고 30초 메모리 캐시로 대체했습니다. 동시 요청에서도 우회 전환과 WARN 로그가 한 번만 일어나도록 고쳐 p95가 약 1초(전환 직후), 반복 요청 시 약 0.4초가 되었습니다.'],
        ['검증', 'Redis를 일부러 내리는 장애 주입 테스트를 통합 테스트에 넣어 같은 문제가 다시 생기지 않는지 확인합니다.'],
      ],
    },
  ],
  'hearing-assistant': [
    {
      title: '방향이 결과에 반영되지 않던 도달 시점 추정',
      rows: [
        ['문제', '처음에는 채널마다 진폭이 임계값을 처음 넘는 시점을 도달 시점으로 잡았지만, 채널 간 시점 차이가 거의 나지 않아 방향이 결과에 잘 반영되지 않았습니다.'],
        ['원인', '소형 4채널 마이크 배열이라 마이크 간격이 좁아 채널 간 시간차가 매우 작고, 임계값 방식은 잡음에도 흔들렸습니다.'],
        ['해결', '논문 시점에는 시간차를 입력으로 방향 클래스를 내는 MLP로 보정했습니다. 최종 코드에서는 더 단순하게 구현할 수 있는 GCC-PHAT로 교체해, 마이크 6쌍의 상호상관으로 시간차를 구하고 8방향으로 변환합니다.'],
      ],
    },
    {
      title: '실시간 소리 전달 경로 설계',
      rows: [
        ['문제', '소리 이벤트는 바로 전달돼야 하는데, 백엔드 서버를 거치거나 REST polling으로 받으면 반복 요청 때문에 지연이 생겼습니다.'],
        ['원인', '마이크 → 백엔드 → 앱으로 이어지는 경로와 요청을 반복하는 polling 방식 모두 실시간 전달에 불리한 구조였습니다.'],
        ['해결', '백엔드를 거치지 않도록 라즈베리파이에 경량화한 KWS 모델과 방향 추정 로직을 올려 로컬 서버를 구성했습니다. 앱과 WebSocket으로 직접 통신하고, 기록은 기존대로 API로 백엔드에 송신합니다.'],
      ],
    },
    {
      title: '추론 루프가 연결 처리를 막던 문제',
      diagram: { src: '/diagrams/hearing_ts.png', caption: '추론/연결 처리 분리 전후' },
      rows: [
        ['문제', '단일 스크립트로 검증한 추론 코드를 WebSocket 서버로 감싸자, 추론 루프가 서버와 같은 흐름에서 돌아 앱의 시작·중지 요청과 결과 전송이 막혔습니다.'],
        ['원인', 'CPU를 쓰는 추론이 이벤트 루프를 점유했습니다.'],
        ['해결', '추론을 별도 스레드로 분리하고 결과를 큐로 전달했습니다. 라즈베리파이 자원 한도에 맞춰 서버와 모델을 경량화했습니다.'],
      ],
    },
  ],
  visgap: [{
    title: '적은 데이터로 낮았던 초기 모델 성능',
    rows: [
      ['문제', '첫 학습 모델의 검출 성능이 낮아 gap 위치를 안정적으로 잡지 못했습니다.'],
      ['원인', '학습 이미지가 200장뿐이고, 이미지 해상도와 라벨 품질이 고르지 않았습니다.'],
      ['해결', '입력 해상도를 1024로 올리고 conf 0.1, IoU 0.3, epoch를 바꿔 가며 반복 실험했습니다. 최종 모델은 검증셋 기준 mAP50 0.980, Recall 0.920입니다. 검증셋이 작아 현장 일반화는 따로 검증해야 한다고 판단했습니다.'],
    ],
  }],
  rsna: [{
    title: '주제 전환: 암호화 상태에서 학습이 되지 않던 문제',
    rows: [
      ['처음 목표', '민감한 의료 이미지를 암호화해, 전송 중 탈취되어도 비밀키 없이는 구분하기 어렵게 하고 암호화된 상태에서 그대로 학습시키는 것.'],
      ['부딪힌 문제', '이미지를 암호화하면 원본 내용이 훼손되어 모델이 전혀 학습되지 않았습니다.'],
      ['질문 전환', '"학습이 되게 만들 수 있는가"에서 "이미지가 얼마나 훼손되면 학습 성능이 어떻게 변하는가"로 질문을 바꿨습니다. 막힌 상태를 세미나에서 그대로 공유하고 교수님과 논의해 결정했습니다.'],
      ['결과', '같은 모델·같은 분할에서 변환 조건만 바꿔 비교한 결과, 공간 구조가 보존되는 XOR은 ROC-AUC 0.861(원본 0.918), 구조가 크게 훼손되는 픽셀 셔플은 0.583이었습니다.'],
    ],
  }],
}

// 협업에서 한 일 (트러블슈팅과 분리)
const collab = {
  devflow: [{
    title: 'API 명세를 기준으로 파트 맞추기',
    body: '2차 통합 중 회원가입 API에서 전화번호의 하이픈 포함 여부와 생년월일 형식이 프론트엔드와 백엔드 사이에 서로 달랐습니다. 각 파트가 명세를 따로 해석한 것이 원인이었습니다. 회의에서 기준을 먼저 정해 API 명세와 Swagger에 바로 반영했고, 이후 변경 사항도 같은 문서로 공유했습니다. 인프라 담당과도 명세와 배포 구조를 함께 검토하면서 Probe와 메트릭 엔드포인트를 미리 준비했습니다.',
  }],
  'hearing-assistant': [{
    title: '마이크 채널 누락을 API 형식에 반영',
    body: '4채널 마이크였지만, 한쪽 채널의 소리가 지나치게 약하면 그 채널이 0으로 오지 않고 아예 빠진 채 3개 채널만 전달됐습니다. 이 경우가 파트 간 명세에 없어 앱과 주고받는 데이터에서 문제가 났습니다. 팀장으로서 파트별 회의 내용을 서로 전달하고, API 형식을 채널 수에 맞게 유동적으로 바꿨습니다. 3개 채널만 들어오면 빠진 방향에 0을 넣어 앱이 항상 같은 형태로 받도록 했고, 이 예외 조건을 설계 문서에도 추가했습니다.',
  }],
  visgap: [{
    title: '참여가 어려운 팀원에게 맡을 일 만들기',
    body: 'AI 파트는 3명이었지만 다른 두 팀원이 프로젝트에 거의 참여하지 못했고 관련 지식도 부족했습니다. 맡을 일이 정해지지 않은 것이 더 큰 문제라고 보고, 필요한 내용을 하나씩 설명하면서 자료 조사처럼 할 수 있는 일을 구체적으로 나눠 맡겼습니다. 맡은 일이 생기자 참여가 이어졌고 팀 안에서 갈등 없이 마무리했습니다.',
  }],
  kseb: [{
    title: '학습 데이터가 부족할 때 RAG 도입 제안',
    body: 'AI 파트 팀원들이 모델 학습을 어려워했고, 상권 데이터는 공개된 것이 적어 학생 신분으로 확보하기 어려웠습니다. 저는 풀스택 담당이었지만 관련 논문을 찾아, 학습 데이터에 덜 의존하는 RAG 기반 LLM 상담으로 방향을 바꾸자고 제안했습니다. 챗봇 구현은 팀원이 맡았고, 저는 완성된 모듈을 Flask API에 통합했습니다.',
  }],
  reconnect: [{
    title: '백엔드와 AI 사이 연동 체크리스트',
    body: '앱과 웹이 같은 REST API를 쓰는 구조여서, 백엔드와 AI 파트가 따로 개발하면 연동 문제가 통합 직전에야 드러날 수 있었습니다. 두 파트 사이에서 확인할 항목을 체크리스트로 만들어 공유했고, 이 체크리스트로 실제 연동 문제를 찾아 해결했습니다.',
  }],
}

const withTs = allProjects.map((p) => ({ ...p, troubleshootings: ts[p.slug] ?? (p.troubleshooting ? [p.troubleshooting] : []), collab: collab[p.slug] ?? [] }))
export const projects = withTs.filter((p) => !p.research).sort((a, b) => a.no - b.no)
export const research = withTs.filter((p) => p.research)
export const getProject = (slug) => withTs.find((p) => p.slug === slug)
