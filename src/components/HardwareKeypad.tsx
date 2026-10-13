import React from 'react';
import { CalculatorMode, OrderBenefitState, SimState } from '../types';
import { soundManager } from '../utils/audio';

interface HardwareKeypadProps {
  mode: CalculatorMode;
  orderState: OrderBenefitState;
  simState: SimState;
  activeToolId: string;
  activeKeyId?: string;
  // Standard Calc Handlers
  onDigit: (digit: string) => void;
  onOperator: (op: '+' | '-' | '×' | '÷') => void;
  onEquals: () => void;
  onClear: () => void;
  onClearAll: () => void;
  onPercent: () => void;
  onDecimal: () => void;
  // Metric Selection
  onSelectMetric: (keyId: string, label: string, value: string, detail: string) => void;
  onQuickPvAdd: (pv: number, label: string) => void;
  onSimAction: (action: string) => void;
  onOrderAction: (action: string, value?: number) => void;
  onSelectTool: (id: string) => void;
  onOpenGuide?: () => void;
}

interface KeyDefinition {
  id: string;
  label: string;
  subLabel?: string;
  type: 'calc-digit' | 'calc-op' | 'calc-action' | 'metric' | 'quick-pv' | 'sim-action' | 'order-action' | 'tool-action' | 'blank';
  value?: string | number;
  detail?: string;
  variant?: 'standard' | 'func' | 'accent' | 'clear' | 'blank';
}

export const HardwareKeypad: React.FC<HardwareKeypadProps> = ({
  mode,
  orderState,
  simState,
  activeToolId,
  activeKeyId,
  onDigit,
  onOperator,
  onEquals,
  onClear,
  onClearAll,
  onPercent,
  onDecimal,
  onSelectMetric,
  onQuickPvAdd,
  onSimAction,
  onOrderAction,
  onSelectTool,
  onOpenGuide,
}) => {
  const getKeysForMode = (): KeyDefinition[] => {
    switch (mode) {
      // 1. CALC Mode (표준 사칙연산 계산기 - 한글 부연설명 없이 깔끔하고 큼직한 아이콘)
      case 'CALC':
        return [
          { id: 'ac', label: 'AC', type: 'calc-action', variant: 'clear' },
          { id: 'del', label: 'DEL', type: 'calc-action', variant: 'func' },
          { id: 'pct', label: '%', type: 'calc-action', variant: 'func' },
          { id: 'div', label: '÷', type: 'calc-op', value: '÷', variant: 'func' },

          { id: '7', label: '7', type: 'calc-digit', value: '7', variant: 'standard' },
          { id: '8', label: '8', type: 'calc-digit', value: '8', variant: 'standard' },
          { id: '9', label: '9', type: 'calc-digit', value: '9', variant: 'standard' },
          { id: 'mul', label: '×', type: 'calc-op', value: '×', variant: 'func' },

          { id: '4', label: '4', type: 'calc-digit', value: '4', variant: 'standard' },
          { id: '5', label: '5', type: 'calc-digit', value: '5', variant: 'standard' },
          { id: '6', label: '6', type: 'calc-digit', value: '6', variant: 'standard' },
          { id: 'sub', label: '-', type: 'calc-op', value: '-', variant: 'func' },

          { id: '1', label: '1', type: 'calc-digit', value: '1', variant: 'standard' },
          { id: '2', label: '2', type: 'calc-digit', value: '2', variant: 'standard' },
          { id: '3', label: '3', type: 'calc-digit', value: '3', variant: 'standard' },
          { id: 'add', label: '+', type: 'calc-op', value: '+', variant: 'func' },

          { id: '0', label: '0', type: 'calc-digit', value: '0', variant: 'standard' },
          { id: '00', label: '00', type: 'calc-digit', value: '00', variant: 'standard' },
          { id: 'dot', label: '.', type: 'calc-action', variant: 'standard' },
          { id: 'eq', label: '=', type: 'calc-action', variant: 'accent' },
        ];

      // 2. PV Mode: 실전 내 구매 혜택 & 💧 방울 프로모션 & 5% 할인
      case 'PV':
        return [
          { id: 'pv_ac', label: 'AC', subLabel: '처음으로', type: 'calc-action', variant: 'clear' },
          { id: 'pv_del', label: 'DEL', subLabel: '◀ 지움', type: 'calc-action', variant: 'func' },
          { id: 'pv_106', label: '106 PV', subLabel: '안전선 (약 14만)', type: 'order-action', value: 'set_106', variant: 'func' },
          { id: 'pv_drop6', label: '💧 6방울', subLabel: '약 125PV(립밤증정)', type: 'order-action', value: 'set_drop6', variant: 'accent' },

          { id: '7', label: '7', type: 'calc-digit', value: '7', variant: 'standard' },
          { id: '8', label: '8', type: 'calc-digit', value: '8', variant: 'standard' },
          { id: '9', label: '9', type: 'calc-digit', value: '9', variant: 'standard' },
          { id: 'pv_drop12', label: '💧 12방울', subLabel: '약 200PV(이오메가)', type: 'order-action', value: 'set_drop12', variant: 'accent' },

          { id: '4', label: '4', type: 'calc-digit', value: '4', variant: 'standard' },
          { id: '5', label: '5', type: 'calc-digit', value: '5', variant: 'standard' },
          { id: '6', label: '6', type: 'calc-digit', value: '6', variant: 'standard' },
          { id: 'ref_add', label: '+1명(100PV)', subLabel: '패스트스타트 (+2.6만)', type: 'order-action', value: 'ref_add_1', variant: 'accent' },

          { id: '1', label: '1', type: 'calc-digit', value: '1', variant: 'standard' },
          { id: '2', label: '2', type: 'calc-digit', value: '2', variant: 'standard' },
          { id: '3', label: '3', type: 'calc-digit', value: '3', variant: 'standard' },
          { id: 'ref_sub', label: '-1명 취소', subLabel: '추천 인원 차감', type: 'order-action', value: 'ref_sub_1', variant: 'func' },

          { id: '0', label: '0', type: 'calc-digit', value: '0', variant: 'standard' },
          { id: '00', label: '00', type: 'calc-digit', value: '00', variant: 'standard' },
          { id: 'toggle_5pct', label: '5% 할인', subLabel: orderState.isBusinessDiscount ? '적용중 (-5%)' : '사업자 할인', type: 'order-action', value: 'toggle_discount', variant: orderState.isBusinessDiscount ? 'accent' : 'func' },
          { id: 'b_pv_empty', label: '', type: 'blank', variant: 'blank' },
        ];

      // 3. STARTER Mode (스타터: 매니저, 디렉터, 이그젝, 엘리트 - 잡다한 설명 제거, 글씨 하나씩 깔끔 배치)
      case 'STARTER':
        return [
          { id: 'st_500', label: '매니저', type: 'metric', value: '월 약 3만 ~ 5만 원', detail: '★ 팀 총 매출 500 OV 달성 (본인 100 PV 필수 / 혼자 주문해도 달성 가능)', variant: 'accent' },
          { id: 'st_1000', label: '디렉터', type: 'metric', value: '월 약 5만 ~ 10만 원', detail: '★ 팀 총 매출 1,000 OV 달성 (본인 100 PV 필수 / 3단계 5%까지 수당 오픈)', variant: 'accent' },
          { id: 'st_2000', label: '이그젝', type: 'metric', value: '월 약 5만 ~ 25만 원', detail: '★ 팀 총 매출 2,000 OV 달성 (본인 100 PV 필수 / 4단계 5% 오픈, 프리미어의 기둥)', variant: 'accent' },
          { id: 'st_3000', label: '엘리트', type: 'metric', value: '월 약 30만 ~ 50만 원', detail: '★ 팀 총 매출 3,000 OV 달성 (본인 100 PV 필수 / 5단계 6% 오픈, 실버의 기둥)', variant: 'accent' },

          { id: 'st_pv106', label: '106 PV', type: 'metric', value: '106 PV (약 14만 원)', detail: '★ 106 PV 안전선: 사업자 5% 할인을 받아도 수당 자격(100 PV)을 지키는 기준선', variant: 'func' },
          { id: 'st_lv1', label: '1대 2%', type: 'metric', value: '2% (1단계)', detail: '1레벨 재구매: 직접 등록한 1대 회원 주문의 2% 유니레벨 보너스', variant: 'standard' },
          { id: 'st_lv2', label: '2대 3%', type: 'metric', value: '3% (2단계)', detail: '2레벨 재구매: 2대 회원 주문의 3% 보너스 (매니저부터 수령 가능)', variant: 'standard' },
          { id: 'st_lv3', label: '3대 5%', type: 'metric', value: '5% (3단계)', detail: '3레벨 재구매: 3대 회원 주문의 5% 보너스 (디렉터부터 수령 가능)', variant: 'standard' },

          { id: 'st_lv4', label: '4대 5%', type: 'metric', value: '5% (4단계)', detail: '4레벨 재구매: 4대 회원 주문의 5% 보너스 (이그제큐티브부터 수령 가능)', variant: 'standard' },
          { id: 'st_lv5', label: '5대 6%', type: 'metric', value: '6% (5단계)', detail: '5레벨 재구매: 5대 회원 주문의 6% 보너스 (엘리트부터 수령 가능)', variant: 'standard' },
          { id: 'st_leg_tip', label: '3+1 레그', type: 'metric', value: '3+1 레그 배치 전략', detail: '★ 3+1 레그: 1대에 3명 + 예비 1명을 배치하여 파워오브쓰리와 팀 볼륨을 함께 챙기는 구조', variant: 'func' },
          { id: 'st_100pv', label: '100 PV', type: 'metric', value: '개인 100 PV 필수', detail: '★ 본인 LRP 100 PV 주문 완료 시에만 모든 유니레벨 및 팀 보너스 수당 수령 자격 활성화', variant: 'func' },

          { id: 'st_open_guide', label: '가이드', type: 'metric', value: '동적 압축 & 직급 로드맵', detail: '동적 압축 원리와 직급별 로드맵은 상단 [가이드] 버튼에서 확인하세요.', variant: 'func' },
          { id: 'b1', label: '', type: 'blank', variant: 'blank' },
          { id: 'b2', label: '', type: 'blank', variant: 'blank' },
          { id: 'b2_extra', label: '', type: 'blank', variant: 'blank' },

          { id: 'b3', label: '', type: 'blank', variant: 'blank' },
          { id: 'b4', label: '', type: 'blank', variant: 'blank' },
          { id: 'b5', label: '', type: 'blank', variant: 'blank' },
          { id: 'b6', label: '', type: 'blank', variant: 'blank' },
        ];

      // 4. LEADER Mode (리더: 프리미어, 실버, 골드, 플래티넘)
      case 'LEADER':
        return [
          { id: 'ld_premier', label: '프리미어', type: 'metric', value: '월 약 80만 ~ 100만 원', detail: '★ 달성: 팀 5,000 OV + 이그젝 2개 레그 육성 (임파워풀 25만)', variant: 'accent' },
          { id: 'ld_silver', label: '실버', type: 'metric', value: '월 약 200만 ~ 250만 원', detail: '★ 달성: 엘리트 3개 독립 레그 육성 (리더십풀 1구좌 배당)', variant: 'accent' },
          { id: 'ld_gold', label: '골드', type: 'metric', value: '월 약 450만 ~ 550만 원', detail: '★ 달성: 프리미어 3개 독립 레그 육성 (리더십풀 5구좌 + 임파워)', variant: 'accent' },
          { id: 'ld_plat', label: '플래티넘', type: 'metric', value: '월 약 800만 ~ 900만 원', detail: '★ 달성: 실버 3개 독립 레그 육성 (리더십풀 10구좌 배당)', variant: 'accent' },

          { id: 'ld_2leg', label: '2개 레그', type: 'metric', value: '이그젝 2개 레그', detail: '프리미어 필수: 1대에 이그제큐티브(2,000 OV) 2개 라인 필수', variant: 'func' },
          { id: 'ld_3leg', label: '3개 레그', type: 'metric', value: '독립 레그 3개 육성', detail: '실버(3 엘리트) 및 골드(3 프리미어)는 독립 3개 라인 필수', variant: 'func' },
          { id: 'ld_emp_bonus', label: '임파워풀', type: 'metric', value: '약 25만 ~ 50만 원 / 월', detail: '★ 임파워풀: 프리미어/골드가 당월 신규 1명(100PV) 추천 시 지급', variant: 'func' },
          { id: 'ld_pool', label: '리더십풀', type: 'metric', value: '전 세계 글로벌 PV 배당', detail: '리더십풀: 실버(1구좌)/골드(5구좌)/플래티넘(10구좌) 매월 현금 배당', variant: 'func' },

          { id: 'ld_lv6', label: '6대 6%', type: 'metric', value: '6% (6단계)', detail: '프리미어 직급부터 6단계 유니레벨(6%)까지 보너스가 열립니다.', variant: 'standard' },
          { id: 'ld_lv7', label: '7대 7%', type: 'metric', value: '7% (최고 7단계)', detail: '실버부터 가장 큰 7단계 유니레벨(7%)이 전부 열립니다.', variant: 'standard' },
          { id: 'ld_tip', label: '누락방지', type: 'metric', value: '임파워풀 누락 방지', detail: '프리미어 달성 월에는 신규 1명(100PV)을 등록해야 25만원 수령!', variant: 'func' },
          { id: 'ld_diamond', label: '다이아', type: 'metric', value: '월 약 1,500만 원 이상', detail: '★ 달성: 실버 4개 독립 레그 육성 (다이아몬드 풀 배당)', variant: 'accent' },

          { id: 'ld_guide', label: '가이드', type: 'metric', value: '직급 8단계 로드맵', detail: '매니저부터 다이아몬드까지 직급 계단은 상단 [가이드]에서 확인하세요!', variant: 'func' },
          { id: 'b7', label: '', type: 'blank', variant: 'blank' },
          { id: 'b8', label: '', type: 'blank', variant: 'blank' },
          { id: 'b8_extra', label: '', type: 'blank', variant: 'blank' },

          { id: 'b9', label: '', type: 'blank', variant: 'blank' },
          { id: 'b10', label: '', type: 'blank', variant: 'blank' },
          { id: 'b11', label: '', type: 'blank', variant: 'blank' },
          { id: 'b12', label: '', type: 'blank', variant: 'blank' },
        ];

      // 5. P3 Mode (파워 오브 쓰리 팀보너스)
      case 'P3':
        return [
          { id: 'p3_st1', label: '1단계', type: 'metric', value: '매월 50,000원 (부스트 10만)', detail: '★ 1단계: 나 + 1대 3명(각 150PV) 팀 600점 완성 (매월 5만/부스트 10만)', variant: 'accent' },
          { id: 'p3_st2', label: '2단계', type: 'metric', value: '매월 250,000원 (부스트 37.5만)', detail: '★ 2단계: 1대 파트너 3명이 1단계 복제 달성 (매월 25만/부스트 37.5만)', variant: 'accent' },
          { id: 'p3_st3', label: '3단계', type: 'metric', value: '매월 1,250,000원 (부스트 150만)', detail: '★ 3단계: 2대 파트너 9명이 1단계 복제 달성 (매월 125만/부스트 150만)', variant: 'accent' },
          { id: 'p3_boost', label: '부스트', type: 'metric', value: '최대 2배 수당 인상', detail: '★ 부스트: PGV 충족 시 1단계 10만, 2단계 37.5만, 3단계 150만 상향', variant: 'accent' },

          { id: 'p3_600tv', label: '팀 600점', type: 'metric', value: '팀 합계 600점 달성', detail: '★ 팀 600점: 나(150 PV) + 1대 3명(각 150 PV) = 600점 완성 시 확정', variant: 'func' },
          { id: 'p3_100pv', label: '100 PV', type: 'metric', value: '개인 100 PV 필수', detail: '★ 전원 LRP 100 PV 이상(안전선 106 PV) 완료 필수', variant: 'func' },
          { id: 'p3_leg3', label: '3+1 레그', type: 'metric', value: '1:3:9:27 복제 원리', detail: '★ 3명씩 정석 복제 시 매월 5만 ➔ 25만 ➔ 150만 완성', variant: 'func' },
          { id: 'p3_guide', label: '가이드', type: 'metric', value: 'P3 보너스 팁', detail: '파워오브쓰리 실전 노하우는 상단 [가이드] 버튼에서 확인하세요.', variant: 'func' },

          { id: 'b14_extra', label: '', type: 'blank', variant: 'blank' },
          { id: 'b15', label: '', type: 'blank', variant: 'blank' },
          { id: 'b16', label: '', type: 'blank', variant: 'blank' },
          { id: 'b17', label: '', type: 'blank', variant: 'blank' },

          { id: 'b19', label: '', type: 'blank', variant: 'blank' },
          { id: 'b20', label: '', type: 'blank', variant: 'blank' },
          { id: 'b21', label: '', type: 'blank', variant: 'blank' },
          { id: 'b22', label: '', type: 'blank', variant: 'blank' },

          { id: 'b23', label: '', type: 'blank', variant: 'blank' },
          { id: 'b24', label: '', type: 'blank', variant: 'blank' },
          { id: 'b25', label: '', type: 'blank', variant: 'blank' },
          { id: 'b26', label: '', type: 'blank', variant: 'blank' },
        ];

      // 6. FAST Mode: 패스트 스타트 (추천 주급 20% vs 61일후 역삼각형 유니레벨)
      case 'FAST':
        return [
          { id: 'fst_1st', label: '1대 20%', type: 'metric', value: '20% (1대 직접추천)', detail: '★ 신규 첫 60일 구매 실적 20% 지급 (100 PV 시 약 2.6만원)', variant: 'accent' },
          { id: 'fst_2nd', label: '2대 10%', type: 'metric', value: '10% (2대 파트너)', detail: '★ 2대 파트너의 신규 첫 60일 구매 10% 지급 (100 PV 시 약 1.3만원)', variant: 'func' },
          { id: 'fst_3rd', label: '3대 5%', type: 'metric', value: '5% (3대 파트너)', detail: '★ 3대 파트너의 신규 첫 60일 구매 5% 지급 (100 PV 시 약 6,500원)', variant: 'func' },
          { id: 'fst_compare', label: '60일vs유니', type: 'metric', value: '1대 20% vs 61일후 역삼각형', detail: '★ 첫 60일 1대 20%(주급) ➔ 61일 이후 7대 7% 역삼각형(월급) 전환', variant: 'accent' },

          { id: 'fst_pay', label: '매주 목요일', type: 'metric', value: '매주 목요일 주급 입금', detail: '★ 패스트스타트는 매주 목요일 현금 주급으로 계좌에 즉시 입금됩니다.', variant: 'func' },
          { id: 'fst_pvreq', label: '106 PV', type: 'metric', value: '내 LRP 106 PV 필수', detail: '★ 장바구니에 100 PV(안전선 106 PV)가 세팅되어 있어야 주급이 입금됩니다.', variant: 'func' },
          { id: 'fst_tip', label: '수당계산법', type: 'metric', value: '100 PV당 약 26,000원', detail: '★ 신규 실적 PV × 해당 % × 1,320원으로 매주 목요일 입금됩니다.', variant: 'func' },
          { id: 'fst_guide_btn', label: '가이드', type: 'metric', value: '패스트스타트 실전팁', detail: '첫 60일 집중 케어 전략은 상단 [가이드] 버튼에서 확인하세요.', variant: 'func' },

          { id: 'b27_extra', label: '', type: 'blank', variant: 'blank' },
          { id: 'b28', label: '', type: 'blank', variant: 'blank' },
          { id: 'b29', label: '', type: 'blank', variant: 'blank' },
          { id: 'b30', label: '', type: 'blank', variant: 'blank' },

          { id: 'b31', label: '', type: 'blank', variant: 'blank' },
          { id: 'b32', label: '', type: 'blank', variant: 'blank' },
          { id: 'b33', label: '', type: 'blank', variant: 'blank' },
          { id: 'b34', label: '', type: 'blank', variant: 'blank' },

          { id: 'b35', label: '', type: 'blank', variant: 'blank' },
          { id: 'b36', label: '', type: 'blank', variant: 'blank' },
          { id: 'b37', label: '', type: 'blank', variant: 'blank' },
          { id: 'b38', label: '', type: 'blank', variant: 'blank' },
        ];

      // 7. SIMULATOR Mode: 0원부터 벽돌 쌓는 실전 통장 수당 계산기!
      case 'SIMULATOR': {
        const isManager = simState.rank === '매니저';
        const isDirector = simState.rank === '디렉터';
        const isExecutive = simState.rank === '이그제큐티브';
        const canP3_2 = !isManager && !isDirector;
        const canP3_3 = !isManager && !isDirector && !isExecutive;

        return [
          { id: 'sim_ac', label: 'AC', type: 'calc-action', variant: 'clear' },
          { id: 'sim_del', label: 'DEL', type: 'calc-action', variant: 'func' },
          { id: 'sim_en_add', label: '+1명(100PV)', type: 'sim-action', value: 'enr_add_1', variant: 'accent' },
          { id: 'sim_en_sub', label: '-1명 취소', type: 'sim-action', value: 'enr_sub_1', variant: 'func' },

          { id: 'sim_m', label: '매니저', type: 'sim-action', value: 'rank_매니저', variant: simState.rank === '매니저' ? 'accent' : 'standard' },
          { id: 'sim_d', label: '디렉터', type: 'sim-action', value: 'rank_디렉터', variant: simState.rank === '디렉터' ? 'accent' : 'standard' },
          { id: 'sim_exec', label: '이그젝', type: 'sim-action', value: 'rank_이그제큐티브', variant: simState.rank === '이그제큐티브' ? 'accent' : 'standard' },
          { id: 'sim_e', label: '엘리트', type: 'sim-action', value: 'rank_엘리트', variant: simState.rank === '엘리트' ? 'accent' : 'standard' },

          { id: 'sim_p', label: '프리미어', type: 'sim-action', value: 'rank_프리미어', variant: simState.rank === '프리미어' ? 'accent' : 'func' },
          { id: 'sim_s', label: '실버', type: 'sim-action', value: 'rank_실버', variant: simState.rank === '실버' ? 'accent' : 'func' },
          { id: 'sim_g', label: '골드', type: 'sim-action', value: 'rank_골드', variant: simState.rank === '골드' ? 'accent' : 'func' },
          { id: 'sim_boost', label: '부스트', type: 'sim-action', value: 'toggle_boost', variant: simState.boostActive ? 'accent' : 'func' },

          { 
            id: 'sim_p3_1', 
            label: 'P3 1단계', 
            type: 'sim-action', 
            value: 'p3_1', 
            variant: simState.p3Stage === 1 ? 'accent' : 'standard' 
          },
          { 
            id: 'sim_p3_2', 
            label: canP3_2 ? 'P3 2단계' : '2단계(잠금)', 
            type: canP3_2 ? 'sim-action' : 'blank', 
            value: 'p3_2', 
            variant: simState.p3Stage === 2 ? 'accent' : 'standard' 
          },
          { 
            id: 'sim_p3_3', 
            label: canP3_3 ? 'P3 3단계' : '3단계(잠금)', 
            type: canP3_3 ? 'sim-action' : 'blank', 
            value: 'p3_3', 
            variant: simState.p3Stage === 3 ? 'accent' : 'standard' 
          },
          { id: 'b40', label: '', type: 'blank', variant: 'blank' },

          { id: 'b41', label: '', type: 'blank', variant: 'blank' },
          { id: 'b42', label: '', type: 'blank', variant: 'blank' },
          { id: 'b43', label: '', type: 'blank', variant: 'blank' },
          { id: 'b44', label: '', type: 'blank', variant: 'blank' },
        ];
      }

      // 8. TOOL Mode: 핵심 도구 & 추천 바로가기 버튼
      case 'TOOL':
        return [
          { id: 'k_oil', label: '오일기초', subLabel: '황근영 사이트', type: 'tool-action', value: 'tool_oil_basic', variant: activeToolId === 'tool_oil_basic' ? 'accent' : 'standard' },
          { id: 'k_oil_rank', label: '가성비PV', subLabel: '1PV 랭킹', type: 'tool-action', value: 'tool_oil_ranking', variant: activeToolId === 'tool_oil_ranking' ? 'accent' : 'standard' },
          { id: 'k_drop_calc', label: '나눔원가', subLabel: '방울단가·DIY', type: 'tool-action', value: 'tool_drop_calc', variant: activeToolId === 'tool_drop_calc' ? 'accent' : 'func' },
          { id: 'k_box', label: '오일보관함', subLabel: '온라인오일박스', type: 'tool-action', value: 'tool_oil_box', variant: activeToolId === 'tool_oil_box' ? 'accent' : 'standard' },

          { id: 'k_comp', label: '보상플랜', subLabel: '준비중', type: 'tool-action', value: 'tool_compensation', variant: activeToolId === 'tool_compensation' ? 'accent' : 'standard' },
          { id: 'k_roll', label: '공병·부자재', subLabel: '준비중', type: 'tool-action', value: 'tool_rollon_bottle', variant: activeToolId === 'tool_rollon_bottle' ? 'accent' : 'standard' },
          { id: 'b45', label: '', type: 'blank', variant: 'blank' },
          { id: 'b46', label: '', type: 'blank', variant: 'blank' },
          { id: 'b47', label: '', type: 'blank', variant: 'blank' },

          { id: 'b48', label: '', type: 'blank', variant: 'blank' },
          { id: 'b49', label: '', type: 'blank', variant: 'blank' },
          { id: 'b50', label: '', type: 'blank', variant: 'blank' },
          { id: 'b51', label: '', type: 'blank', variant: 'blank' },

          { id: 'b52', label: '', type: 'blank', variant: 'blank' },
          { id: 'b53', label: '', type: 'blank', variant: 'blank' },
          { id: 'b54', label: '', type: 'blank', variant: 'blank' },
          { id: 'b55', label: '', type: 'blank', variant: 'blank' },

          { id: 'b56', label: '', type: 'blank', variant: 'blank' },
          { id: 'b57', label: '', type: 'blank', variant: 'blank' },
          { id: 'b58', label: '', type: 'blank', variant: 'blank' },
          { id: 'b59', label: '', type: 'blank', variant: 'blank' },
        ];

      default:
        return [];
    }
  };

  const keys = getKeysForMode();

  const handleKeyClick = (key: KeyDefinition) => {
    switch (key.type) {
      case 'calc-digit':
        soundManager.playClick('standard');
        onDigit(String(key.value !== undefined ? key.value : key.label));
        break;

      case 'calc-op':
        soundManager.playClick('func');
        if (key.value) {
          onOperator(key.value as '+' | '-' | '×' | '÷');
        }
        break;

      case 'calc-action':
        if (key.id === 'ac' || key.id.endsWith('_ac') || key.id.includes('clear')) {
          soundManager.playClick('func');
          onClearAll();
        } else if (key.id === 'del' || key.id === 'c' || key.id.endsWith('_del') || key.id.endsWith('_reset') || key.id.includes('del')) {
          soundManager.playClick('func');
          onClear();
        } else if (key.id === 'pct') {
          soundManager.playClick('func');
          onPercent();
        } else if (key.id === 'dot') {
          soundManager.playClick('standard');
          onDecimal();
        } else if (key.id === 'eq') {
          soundManager.playClick('accent');
          onEquals();
        }
        break;

      case 'order-action':
        soundManager.playClick('accent');
        if (key.value) {
          onOrderAction(String(key.value));
        }
        break;

      case 'sim-action':
        soundManager.playClick(key.variant === 'accent' ? 'accent' : 'func');
        if (key.value) {
          onSimAction(String(key.value));
        }
        break;

      case 'metric':
        soundManager.playClick('func');
        if (key.id.includes('guide')) {
          if (onOpenGuide) onOpenGuide();
        } else {
          onSelectMetric(key.id, key.label, key.value ? String(key.value) : key.label, key.detail || '');
        }
        break;

      case 'quick-pv':
        soundManager.playClick('accent');
        if (key.value) {
          onQuickPvAdd(Number(key.value), key.label);
        }
        break;

      case 'tool-action':
        soundManager.playClick('accent');
        if (key.value) {
          onSelectTool(String(key.value));
        }
        break;

      case 'blank':
      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-4 gap-1.5 sm:gap-2 p-1.5 sm:p-2.5 rounded-2xl bg-gradient-to-b from-[#240c38] to-[#160624] border border-purple-900/60 shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
      {keys.map((key) => {
        if (key.type === 'blank') {
          return (
            <div
              key={key.id}
              className="h-[52px] sm:h-[58px] rounded-xl sm:rounded-2xl bg-purple-950/20 border border-purple-900/10 pointer-events-none"
            />
          );
        }

        // Determine if key is actively selected
        const isSelected =
          (activeKeyId && key.id === activeKeyId) ||
          (mode === 'PV' && (
            (key.value === 'set_106' && orderState.pv === 106) ||
            (key.value === 'set_drop6' && orderState.pv >= 120 && orderState.pv < 190) ||
            (key.value === 'set_drop12' && orderState.pv >= 190) ||
            (key.value === 'toggle_discount' && orderState.isBusinessDiscount)
          )) ||
          (mode === 'SIMULATOR' && (
            (key.value === `rank_${simState.rank}`) ||
            (key.value === 'toggle_boost' && simState.boostActive) ||
            (key.value === 'p3_1' && simState.p3Stage === 1) ||
            (key.value === 'p3_2' && simState.p3Stage === 2) ||
            (key.value === 'p3_3' && simState.p3Stage === 3)
          )) ||
          (mode === 'TOOL' && key.value === activeToolId);

        let colorClasses = '';

        if (isSelected) {
          // Pure white active highlight - No green light, elegant and crisp!
          colorClasses = 'keycap-plastic-selected';
        } else {
          switch (key.variant) {
            case 'clear':
              // Warm pastel coral/rose 3D pebble (AC)
              colorClasses = 'keycap-plastic-clear';
              break;
            case 'accent':
              // Warm golden yellow 3D pebble (÷, ×, -, +, =, 주요 동작키)
              colorClasses = 'keycap-plastic-accent';
              break;
            case 'func':
              // Soft pastel lilac 3D pebble (DEL, %, 보조 기능키)
              colorClasses = 'keycap-plastic-func';
              break;
            case 'standard':
            default:
              // Milk white chunky 3D pebble (0~9, 00, .)
              colorClasses = 'keycap-plastic-standard';
              break;
          }
        }

        return (
          <button
            key={key.id}
            type="button"
            onClick={() => handleKeyClick(key)}
            className={`calc-btn-base relative h-[52px] sm:h-[58px] rounded-xl sm:rounded-2xl flex flex-col items-center justify-center p-1 cursor-pointer transition-all ${colorClasses}`}
          >
            {/* Top Main Label (아이콘 및 한글 라벨 큼직하고 시원하게 표시 - 60대 가독성 최적화) */}
            <span
              className={`leading-none tracking-tight flex items-center justify-center text-center ${
                ['÷', '×', '-', '+', '%', '='].includes(key.label)
                  ? 'text-2xl sm:text-3xl font-medium pb-0.5'
                  : key.label === 'AC' || key.label === 'DEL'
                  ? 'text-sm sm:text-base font-black tracking-wider'
                  : !isNaN(Number(key.label)) || key.label === '.' || key.label === '00'
                  ? 'text-xl sm:text-2xl font-bold font-mono'
                  : key.label.length >= 7
                  ? 'text-xs sm:text-[13px] font-bold font-sans'
                  : key.label.length >= 4
                  ? 'text-sm sm:text-[15px] font-bold font-sans'
                  : 'text-base sm:text-lg font-bold font-sans'
              }`}
            >
              {key.label}
            </span>

            {/* Bottom Sub-label / Explanation */}
            {key.subLabel && (
              <span
                className={`mt-0.5 text-[8px] sm:text-[9px] leading-tight truncate max-w-full px-0.5 ${
                  isSelected
                    ? 'text-[#4a1288] font-black'
                    : (key.variant === 'func' || key.variant === 'accent' || key.variant === 'clear')
                    ? 'text-white/95 font-medium'
                    : 'text-[#581c87]/80 font-medium'
                }`}
              >
                {key.subLabel}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
