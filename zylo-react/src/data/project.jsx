export const dummyProjects = [
  {
    id: 1,
    title: "AI 기반 이미지 분석 시스템",
    subtitle: "사진 속 정보를 한눈에",
    startDate: "2024-12-31",
    endDate: "2025-12-31",
    team: 4,
    totalWork: 30,
    progressWork: 15,
  },
  {
    id: 2,
    title: "실시간 번역 챗봇",
    subtitle: "언어 장벽 없는 소통의 시작",
    startDate: "2024-12-31",
    endDate: "2025-12-31",
    team: 12,
    totalWork: 20,
    progressWork: 15,
  },
  {
    id: 3,
    title: "영화 리뷰 웹앱",
    subtitle: "사용자 참여형 영화 평점 커뮤니티",
    startDate: "2024-12-31",
    endDate: "2025-12-31",
    team: 50,
    totalWork: 50,
    progressWork: 20,
  },
  {
    id: 4,
    title: "RESTful API 서버 구축",
    subtitle: "효율적 데이터 관리를 위한 백엔드 설계",
    startDate: "2024-12-31",
    endDate: "2025-12-31",
    team: 50,
    totalWork: 15,
    progressWork: 2,
  },
  {
    id: 5,
    title: "이커머스 주문 관리 API",
    subtitle: "주문부터 결제까지, 통합 백엔드 솔루션",
    startDate: "2024-12-31",
    endDate: "2025-12-31",
    team: 50,
    totalWork: 30,
    progressWork: 2,
  },
];

export const dummyMembers = [
  {
    id: 1,
    name: "홍길동",
    role: "프론트엔드 개발자",
  },
  {
    id: 2,
    name: "김영희",
    role: "백엔드 개발자",
  },
  {
    id: 3,
    name: "이철수",
    role: "디자이너",
  },
  {
    id: 4,
    name: "가나다",
    role: "기획자",
  },
  {
    id: 5,
    name: "홍길동",
    role: "기획자",
  },
  {
    id: 6,
    name: "이수민",
    role: "기획자",
  },
];

export const dummyProjectMember = [
  { id: 1, projectId: 1, memberId: 1 },
  { id: 2, projectId: 2, memberId: 2 },
  { id: 3, projectId: 3, memberId: 3 },
  { id: 4, projectId: 4, memberId: 4 },
  { id: 5, projectId: 5, memberId: 5 },
  { id: 5, projectId: 5, memberId: 6 },
];

export const initialBoardData = {
  ready: [
    { title: "RQ-101 랜딩 페이지 구현", desc: "" },
    { title: "RQ-202 약관", desc: "" },
    { title: "RQ-203 회원가입", desc: "" },
    { title: "RQ-300 메인 대시보드 구현", desc: "" },
    { title: "RQ-009 캘린더 화면 구현", desc: "" },
    { title: "RQ-301 페이지 생성", desc: "" },
    { title: "RQ-302 페이지 작성", desc: "" },
  ],
  todo: [],
  inProgress: [
    { title: "RQ-011 게시판 화면 구현", desc: "" },
    { title: "RQ-004 데이터베이스 설계", desc: "" },
    { title: "RQ-012 프로젝트 화면 구현", desc: "" },
    { title: "RQ-201 로그인/로그아웃", desc: "" },
  ],
  inReview: [
    { title: "RQ-010 메시지 화면 구현", desc: "" },
    { title: "RQ-014 설정 화면 구현", desc: "" },
  ],
  done: [
    { title: "RQ-008 페이지 화면 구현", desc: "" },
    { title: "RQ-007 메인 대시보드 구현", desc: "" },
    { title: "RQ-002 화면 설계", desc: "" },
    { title: "RQ-003 프로젝트 아키텍처 설계", desc: "" },
    { title: "RQ-005 메인 화면 구현", desc: "" },
    { title: "RQ-006 회원 화면 구현", desc: "" },
    { title: "RQ-013 드라이브 화면 구현", desc: "" },
  ],
};
