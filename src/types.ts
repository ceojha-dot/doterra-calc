export type CalculatorMode = 
  | 'CALC'       // 일반 사칙연산 계산기
  | 'PV'         // 내 주문 혜택 (구매액 vs 선물/5%할인/추천 환급 혜택)
  | 'STARTER'    // 초기 직급 (매니저 500, 디렉터 1000, 이그젝 2000, 엘리트 3000)
  | 'LEADER'     // 리더 직급 (프리미어 5000, 실버 3Elite, 골드 3Premier, 리더십풀)
  | 'P3'         // 파워 오브 쓰리 팀보너스 (5만~125만 + 부스트 최대 150만원)
  | 'FAST'       // 패스트스타트 신규 추천 수당 (1대 20%, 2대 10%, 3대 5%)
  | 'SIMULATOR'  // 실전 통장 수당 계산기 (0원에서 시작해 벽돌 쌓듯 계산)
  | 'TOOL';      // 필수 사업 도구 & 추천 교육 영상

export type CurrencyUnit = 'KRW' | 'PV' | 'USD';

export type RankType = 'ELITE' | 'PREMIER' | 'SILVER' | 'GOLD';

export interface RankSubMenuItem {
  id: string;
  label: string;
  badge?: string;
  title: string;
  summary: string;
  criteriaList: {
    label: string;
    value: string;
    note?: string;
  }[];
  guideTips: string[];
}

export type BonusType = 
  | 'new_enrollment' 
  | 'fast_start' 
  | 'power_of_3' 
  | 'unilevel' 
  | 'rank_bonus';

export interface BonusItem {
  id: BonusType;
  title: string;
  shortLabel: string;
  subtitle: string;
  description: string;
  structurePoints: string[];
  note: string;
}

export interface ActiveMetricInfo {
  keyId: string;
  label: string;
  value: string;
  detail: string;
}

export interface KeyItem {
  id: string;
  label: string;
  subLabel?: string;
  type: 'calc-digit' | 'calc-op' | 'calc-action' | 'metric' | 'quick-pv' | 'sim-action' | 'order-action' | 'tool-action' | 'blank';
  value?: string | number;
  detail?: string;
  variant?: 'standard' | 'func' | 'accent' | 'clear' | 'blank';
}

export interface PvEntry {
  id: string;
  name: string;
  pv: number;
  quantity: number;
}

export interface OrderBenefitState {
  pv: number;               // 입력한 주문 PV (예: 125 또는 106)
  newReferrals: number;     // 신규 추천 인원 (0, 1, 2, 3명)
  isBusinessDiscount: boolean; // 사업자 5% 추가 할인 적용 여부
}

export interface SimState {
  rank: '선택없음' | '매니저' | '디렉터' | '이그제큐티브' | '엘리트' | '프리미어' | '실버' | '골드';
  newEnrollees: number;     // 신규 추천 인원 (0, 1, 2, 3...)
  p3Stage: 0 | 1 | 2 | 3;   // 파워오브3 단계 (0 = 미달성)
  boostActive: boolean;     // P3 부스트 (2배) 적용 여부
  historyStack: string[];   // DEL 실행 취소를 위한 히스토리
}

export interface BusinessToolItem {
  id: string;
  num: number;
  name: string;
  category: '도구' | '영상';
  desc: string;
  url: string;
  youtubeId?: string;
}
