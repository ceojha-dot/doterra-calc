export interface ToolCardItem {
  id: string;
  keyLabel: string;
  keySubLabel: string;
  title: string;
  category: '영상' | '도구';
  desc: string;
  youtubeId?: string; // YouTube video ID for inline embedded player
  actionUrl: string;
  actionText: string;
}

export const TOOL_ITEMS: ToolCardItem[] = [
  {
    id: 'tool_calc_guide',
    keyLabel: '계산기사용법',
    keySubLabel: '1분 마스터',
    title: '도테라 만능 계산기 1분 실전 활용 가이드',
    category: '영상',
    desc: '내 주문 125 PV 공짜오일 계산부터 3명 추천 주급 12.8만 원 환급, 엘리트/프리미어 수당 시뮬레이션까지 1분에 끝내는 브리핑 비법.',
    youtubeId: 'kJQP7kiw5Fk', // Despacito / placeholder or official educational video
    actionUrl: 'https://www.youtube.com',
    actionText: '계산기 1분 영상 시청',
  },
  {
    id: 'tool_compensation',
    keyLabel: '보상플랜',
    keySubLabel: '5분 총정리',
    title: '5분 완성 도테라 보상플랜 완벽 총정리',
    category: '영상',
    desc: '신규 60일 패스트스타트 주급 20%부터 파워오브3 팀보너스, 7레벨 7% 역삼각형 유니레벨 연금소득까지 한눈에 이해하는 핵심 강의.',
    youtubeId: 'L_LUpnjgPso', // Example embed video
    actionUrl: 'https://www.youtube.com/results?search_query=%EB%8F%84%ED%85%8C%EB%9D%BC+%EB%B3%B4%EC%83%81%ED%94%8C%EB%9E%9C+%EC%B4%88%EB%B3%B4%EC%9E%90',
    actionText: '보상플랜 강의 시청',
  },
  {
    id: 'tool_oil_basic',
    keyLabel: '오일기초',
    keySubLabel: '입문 가이드',
    title: '초보자를 위한 에센셜 오일 기초 사용법',
    category: '영상',
    desc: '레몬, 라벤더, 페퍼민트, 프랑킨센스 등 필수 10대 오일의 안전한 음용, 도포, 디퓨징 방법과 캐리어 오일 희석 비율 마스터.',
    youtubeId: 'fJ9rUzIMcZQ',
    actionUrl: 'https://www.youtube.com/results?search_query=%EB%8F%84%ED%85%8C%EB%9D%BC+%EC%97%90%EC%84%BC%EC%85%9C%EC%98%A4%EC%9D%BC+%EA%B8%B0%EC%B4%88+%EC%82%AC%EC%9A%A9%EB%B2%95',
    actionText: '오일기초 강의 시청',
  },
  {
    id: 'tool_oil_box',
    keyLabel: '오일박스',
    keySubLabel: '보관함·파우치',
    title: '에센셜 오일 전용 원목 보관함 & 휴대용 파우치',
    category: '도구',
    desc: '직사광선을 차단하여 오일의 테라피 등급을 영구 보존하는 천연 원목 25구 보관 박스 및 언제 어디서나 상담 가능한 10구 휴대 파우치.',
    actionUrl: 'https://search.shopping.naver.com/search/all?query=%EB%8F%84%ED%85%8C%EB%9D%BC+%EC%98%A4%EC%9D%BC+%EB%B3%B4%EA%B4%80%ED%95%A8',
    actionText: '오일박스 최저가 구매처',
  },
  {
    id: 'tool_rollon_bottle',
    keyLabel: '공병·부자재',
    keySubLabel: '롤온·캐리어오일',
    title: 'DIY 롤온 유리 공병 & 코코넛 분획 캐리어 오일',
    category: '도구',
    desc: '10ml 앰버/코발트 유리 롤온 볼 공병 및 오일 블렌딩을 위한 고순도 코코넛 캐리어 오일 최저가 구매 링크.',
    actionUrl: 'https://search.shopping.naver.com/search/all?query=%EB%8F%84%ED%85%8C%EB%9D%BC+%EB%A1%A4%EC%98%A8+%EA%B3%B5%EB%B3%91',
    actionText: '롤온 공병 최저가 보기',
  },
  {
    id: 'tool_drops_guide',
    keyLabel: '방울가이드',
    keySubLabel: '최저조합표',
    title: '💧 골라담기 물방울 프로모션 & 최저가 추천 조합표',
    category: '도구',
    desc: '레몬(0.5방울, 1.7만), 라벤더/페퍼민트(1.5방울) 등 실속 오일로 6방울(약 125 PV, 약 16만 원대, 립밤 증정) 및 12방울(약 200 PV, 약 27만 원대, 이오메가 정품 증정)을 맞추는 최적 조합 가이드.',
    actionUrl: 'https://www.doterra.com/KR/ko_KR',
    actionText: '도테라 골라담기 안내',
  },
];
