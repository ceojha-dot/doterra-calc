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
    id: 'tool_oil_basic',
    keyLabel: '오일기초',
    keySubLabel: '황근영 사이트',
    title: '황근영 대표님의 에센셜 오일 기초 아로마테라피 가이드',
    category: '도구',
    desc: '황근영 아로마 공식 웹사이트에서 제공하는 에센셜 오일 입문, 기초 활용법 및 라이프스타일 힐링 가이드.',
    actionUrl: 'https://hkyaroma.com/',
    actionText: '황근영 사이트 바로가기',
  },
  {
    id: 'tool_oil_ranking',
    keyLabel: '가성비PV',
    keySubLabel: '1PV 랭킹',
    title: '1 PV 기준 최강 가성비 오일 랭킹 순위표',
    category: '도구',
    desc: '페퍼민트, 오렌지, 자몽(23.75PV) 등 적은 금액으로 최대 PV를 채울 수 있는 도테라 전수조사 가성비 순위표.',
    actionUrl: '#open_oil_ranking',
    actionText: '가성비 순위표 열기',
  },
  {
    id: 'tool_drop_calc',
    keyLabel: '나눔원가',
    keySubLabel: '방울단가계산',
    title: '나눔 & DIY 롤온·스프레이 오일 방울 원가 계산기',
    category: '도구',
    desc: '도테라 전 오일 1방울 단가표(15ml 250방울 기준) 및 나눔 롤온·스프레이 공병+코코넛 포함 실시간 원가 계산기.',
    actionUrl: '#open_drop_calc',
    actionText: '나눔 원가 계산기 열기',
  },
  {
    id: 'tool_oil_box',
    keyLabel: '오일보관함',
    keySubLabel: '온라인 오일박스',
    title: '도테라 온라인 오일박스 (마이 오일박스)',
    category: '도구',
    desc: '직사광선을 차단하여 오일의 테라피 등급을 보존하고 편리하게 정리하는 온라인 오일박스 웹앱 바로가기.',
    actionUrl: 'https://myoilboxnew.vercel.app/',
    actionText: '온라인 오일박스 열기',
  },
  {
    id: 'tool_compensation',
    keyLabel: '보상플랜',
    keySubLabel: '준비중',
    title: '도테라 8대 보상플랜 실전 핵심 마스터 [준비중]',
    category: '영상',
    desc: '현재 최신 2026 개정 보상플랜 공식 영상 및 해설 자료가 업데이트 준비 중입니다. 곧 정식 오픈됩니다.',
    actionUrl: '#preparing',
    actionText: '보상플랜 [준비중]',
  },
  {
    id: 'tool_rollon_bottle',
    keyLabel: '공병·부자재',
    keySubLabel: '준비중',
    title: 'DIY 롤온 유리 공병 & 코코넛 분획 캐리어 오일 [준비중]',
    category: '도구',
    desc: '고품질 유리 롤온 볼 공병 및 오일 블렌딩 부자재 전용몰이 현재 준비 중입니다. 곧 오픈 예정입니다.',
    actionUrl: '#preparing',
    actionText: '공병 부자재몰 [준비중]',
  },
];
