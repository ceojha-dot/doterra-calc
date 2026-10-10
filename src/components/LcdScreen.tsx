import React from 'react';
import { CalculatorMode, CurrencyUnit, OrderBenefitState, SimState } from '../types';
import { Volume2, VolumeX, Sparkles, Gift, Play, ShoppingBag } from 'lucide-react';
import { TOOL_ITEMS, ToolCardItem } from '../data/toolData';

interface ActiveMetricInfo {
  label: string;
  value: string;
  detail: string;
}

interface LcdScreenProps {
  mode: CalculatorMode;
  currency: CurrencyUnit;
  calcDisplay: string;
  calcEquation: string;
  orderState: OrderBenefitState;
  activeMetric: ActiveMetricInfo | null;
  simState: SimState;
  activeToolId: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenVideoModal: (tool: ToolCardItem) => void;
}

export const LcdScreen: React.FC<LcdScreenProps> = ({
  mode,
  currency,
  calcDisplay,
  calcEquation,
  orderState,
  activeMetric,
  simState,
  activeToolId,
  soundEnabled,
  onToggleSound,
  onOpenVideoModal,
}) => {
  // Format numbers by CurrencyUnit
  const formatMoney = (krwAmount: number) => {
    if (currency === 'PV') {
      const pv = Math.round(krwAmount / 1320);
      return `${pv.toLocaleString()} PV`;
    }
    if (currency === 'USD') {
      const usd = Math.round(krwAmount / 1320);
      return `$${usd.toLocaleString()}`;
    }
    return `${krwAmount.toLocaleString()}원`;
  };

  // 1. My Order Benefit Calculation with 6/12 Drops Promotion!
  const calcOrderBenefit = () => {
    const pv = orderState.pv;
    const baseKrw = Math.round(pv * 1320);
    const discount5 = orderState.isBusinessDiscount ? Math.round(baseKrw * 0.05) : 0;
    const actualPayKrw = baseKrw - discount5;

    // 💧 방울 프로모션: 6방울(립밤 약 1.2만 원, 약 125 PV 기준), 12방울(이오메가 정품 약 7.5만 원, 약 200 PV 기준)
    const hasDrop6 = pv >= 120;
    const drop6Value = hasDrop6 ? 12000 : 0;
    const hasDrop12 = pv >= 190;
    const drop12Value = hasDrop12 ? 75000 : 0;

    const referralCash = orderState.newReferrals * 26000;
    const p3Bonus = orderState.newReferrals >= 3 ? 50000 : 0;

    const totalBenefitValue = discount5 + drop6Value + drop12Value + referralCash + p3Bonus;
    const netCost = Math.max(0, actualPayKrw - totalBenefitValue);
    const savingsPercent = baseKrw > 0 ? Math.min(100, Math.round((totalBenefitValue / baseKrw) * 100)) : 0;

    return {
      baseKrw,
      discount5,
      actualPayKrw,
      hasDrop6,
      drop6Value,
      hasDrop12,
      drop12Value,
      referralCash,
      p3Bonus,
      totalBenefitValue,
      netCost,
      savingsPercent,
    };
  };

  // 2. Simulator Calculations (0-Based Step-by-Step!)
  const calcSimEarnings = () => {
    let baseUnilevel = 0;
    if (simState.rank === '매니저') baseUnilevel = 40000;       // 월 약 3만~5만 중간치
    else if (simState.rank === '디렉터') baseUnilevel = 80000;   // 월 약 5만~10만 중간치
    else if (simState.rank === '이그제큐티브') baseUnilevel = 150000; // 월 약 5만~25만 중간치
    else if (simState.rank === '엘리트') baseUnilevel = 350000;   // 월 약 30만~50만 중간치
    else if (simState.rank === '프리미어') baseUnilevel = 750000; // 월 약 80만~100만
    else if (simState.rank === '실버') baseUnilevel = 2200000;   // 월 약 200만~250만
    else if (simState.rank === '골드') baseUnilevel = 4500000;   // 월 약 450만~550만

    const fastStart = simState.newEnrollees * 26000;

    let p3 = 0;
    if (simState.p3Stage === 1) p3 = simState.boostActive ? 100000 : 50000;
    else if (simState.p3Stage === 2) p3 = simState.boostActive ? 375000 : 250000;
    else if (simState.p3Stage === 3) p3 = simState.boostActive ? 1500000 : 1250000;

    let empPool = 0;
    if (simState.rank === '프리미어' && simState.newEnrollees >= 1) {
      empPool = 250000; // 프리미어 임파워풀 (약 25만 원)
    } else if (simState.rank === '골드' && simState.newEnrollees >= 1) {
      empPool = 500000; // 골드 임파워풀 2구좌 (약 50만 원)
    }

    const total = baseUnilevel + fastStart + p3 + empPool;
    return { total, baseUnilevel, fastStart, p3, empPool };
  };

  const orderBenefit = calcOrderBenefit();
  const simEarnings = calcSimEarnings();
  const currentTool = TOOL_ITEMS.find((t) => t.id === activeToolId) || TOOL_ITEMS[0];

  return (
    <div className="relative rounded-2xl p-1 lcd-bezel-frame">
      {/* High-contrast retro STN liquid-crystal display (Stable height & senior-friendly typography) */}
      <div className="relative overflow-hidden rounded-[14px] lcd-screen-surface text-[#111713] border border-[#a6ada7] p-2.5 sm:p-3 h-[184px] sm:h-[192px] flex flex-col justify-between shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)]">
        
        {/* Subtle diagonal glass glare */}
        <div className="absolute inset-0 lcd-glare pointer-events-none" />

        {/* Top Status Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#b8bfb9] pb-1 text-xs font-lcd font-bold tracking-wider text-[#262f28]">
          <div className="flex items-center gap-1.5">
            <span className="bg-[#242c27] text-[#eef3ef] px-1.5 py-0.5 rounded text-[10px] tracking-wider uppercase font-sans font-extrabold">
              {mode}
            </span>
            <span className="text-[#262f28] font-bold text-xs sm:text-[13px]">
              {mode === 'CALC' && '사칙연산 계산기'}
              {mode === 'PV' && '내 주문 혜택 & 5% 할인 계산기'}
              {mode === 'STARTER' && '스타터 (매니저~엘리트)'}
              {mode === 'LEADER' && '리더 직급 (프리미어~골드)'}
              {mode === 'P3' && '파워오브3 팀보너스 (5만~150만원)'}
              {mode === 'FAST' && '패스트스타트 추천 20% 주급'}
              {mode === 'SIMULATOR' && '실전 예상 수당 시뮬레이션'}
              {mode === 'TOOL' && '사업 도구 & 추천 교육 영상'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSound}
              type="button"
              className="flex items-center gap-1 hover:text-black transition-colors px-1 py-0.5 rounded cursor-pointer"
              title="효과음 켜기/끄기"
            >
              {soundEnabled ? (
                <span className="flex items-center gap-0.5 text-[#262f28]">
                  <Volume2 size={13} />
                  <span className="text-[9.5px] font-bold">SND</span>
                </span>
              ) : (
                <span className="flex items-center gap-0.5 text-slate-500 opacity-60">
                  <VolumeX size={13} />
                  <span className="text-[9.5px]">MUTE</span>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Screen Main Display Area */}
        <div className="relative z-10 py-1 flex-1 flex flex-col justify-center">
          
          {/* 1. CALC Mode */}
          {mode === 'CALC' && (
            <div className="flex flex-col justify-between h-full text-right px-0.5">
              <div className="h-4 text-xs sm:text-sm font-lcd text-[#4b554e] truncate font-medium">
                {calcEquation || ' '}
              </div>
              <div className="font-lcd text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111713] overflow-x-auto whitespace-nowrap">
                {calcDisplay}
              </div>
              <div className="text-xs font-lcd text-[#353e38] text-left font-bold">
                💡 1 PV ≈ 약 1,320원 (안전선 106 PV = 약 14만원)
              </div>
            </div>
          )}

          {/* 2. PV Mode: 실전 내 구매 혜택 & 5% 할인 계산기 */}
          {mode === 'PV' && (
            <div className="flex flex-col justify-between h-full font-lcd">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[#353e38] font-bold font-sans">
                      {orderState.pv === 106 ? '안전선 주문' : '주문 실적'}
                    </span>
                    <span className="text-[10.5px] bg-[#c3cac4] text-[#161c17] px-1.5 py-0.2 rounded font-mono font-bold">
                      {orderState.pv} PV
                    </span>
                    {orderState.pv < 100 ? (
                      <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-bold font-sans animate-pulse">
                        ⚠️ 100PV 미만 (수당 0원)
                      </span>
                    ) : (
                      <span className="text-[10px] bg-purple-700 text-white px-1.5 py-0.2 rounded font-bold font-sans">
                        ✓ 수당자격 충족
                      </span>
                    )}
                    {orderState.isBusinessDiscount && (
                      <span className="text-[10px] bg-amber-300 text-amber-950 px-1 py-0.2 rounded font-bold font-sans">
                        5% 할인
                      </span>
                    )}
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#111713] leading-tight flex items-baseline mt-0.5">
                    <span className="text-sm font-sans font-normal text-[#38423c] mr-1">약</span>
                    <span>{formatMoney(orderBenefit.actualPayKrw)}</span>
                    {orderState.isBusinessDiscount && (
                      <span className="text-xs sm:text-sm text-[#525d56] ml-2 font-normal line-through">
                        약 {formatMoney(orderBenefit.baseKrw)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right flex flex-col items-end">
                  <span className="text-[11px] font-bold text-[#353e38] font-sans">
                    {orderState.newReferrals > 0 ? `신규 +${orderState.newReferrals}명 추천` : '혜택 총 환급액'}
                  </span>
                  <div className="text-sm sm:text-base font-black text-purple-950 bg-purple-200/90 px-2 py-0.5 rounded flex items-center gap-1 font-sans">
                    <Gift size={13} className="text-purple-900" />
                    <span>+{formatMoney(orderBenefit.totalBenefitValue)}</span>
                  </div>
                </div>
              </div>

              {/* Badges: 6/12 Drops Promotion + 5% Discount + Fast Start */}
              <div className="grid grid-cols-4 gap-1 text-[10px] sm:text-[11px] my-1 font-sans">
                <div className={`p-1 rounded flex items-center justify-between ${
                  orderBenefit.hasDrop6 ? 'bg-[#ede2f7] text-[#4d1f7d] font-bold' : 'bg-[#c3cac4]/70 text-[#4c554e]'
                }`}>
                  <span>💧6방울</span>
                  <span>{orderBenefit.hasDrop6 ? '✓ 1.2만' : '미달성'}</span>
                </div>

                <div className={`p-1 rounded flex items-center justify-between ${
                  orderBenefit.hasDrop12 ? 'bg-amber-300 text-amber-950 font-black' : 'bg-[#c3cac4]/70 text-[#4c554e]'
                }`}>
                  <span>💧12방울</span>
                  <span>{orderBenefit.hasDrop12 ? '✓ 7.5만' : '미달성'}</span>
                </div>

                <div className="p-1 rounded bg-[#c3cac4] text-[#161c17] flex items-center justify-between font-bold">
                  <span>5%할인</span>
                  <span>{orderState.isBusinessDiscount ? `-${formatMoney(orderBenefit.discount5)}` : '미적용'}</span>
                </div>

                <div className={`p-1 rounded flex items-center justify-between ${
                  orderState.newReferrals > 0 ? 'bg-purple-200 text-purple-950 font-bold' : 'bg-[#c3cac4]/70 text-[#4c554e]'
                }`}>
                  <span>패스트</span>
                  <span>+{formatMoney(orderBenefit.referralCash + orderBenefit.p3Bonus)}</span>
                </div>
              </div>

              {/* Bottom Result */}
              <div className="pt-1 border-t border-[#b8bfb9] flex items-center justify-between text-xs sm:text-[13px] font-sans">
                <div className="text-[#1c241e] font-bold flex items-center gap-1.5">
                  <span>실질 체감 부담금:</span>
                  <strong className="text-[#111713] font-black text-sm sm:text-base">
                    {orderBenefit.netCost === 0 ? '0원 (100% 회수)' : formatMoney(orderBenefit.netCost)}
                  </strong>
                </div>

                <div className="text-purple-950 font-black bg-purple-200/90 px-1.5 py-0.5 rounded text-[10.5px]">
                  {orderBenefit.netCost === 0 ? '★ 100% 전액 회수' : `실질 ${orderBenefit.savingsPercent}% 절감`}
                </div>
              </div>
            </div>
          )}

          {/* 3-A. FAST Mode: 패스트스타트 20% vs 61일후 역삼각형 유니레벨 명쾌한 비교 화면 */}
          {mode === 'FAST' && (
            <div className="flex flex-col justify-between h-full font-sans">
              <div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-[#353e38] font-bold">
                      {activeMetric ? activeMetric.label : '패스트스타트 추천 주급'}
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold font-lcd text-[#111713] leading-tight">
                      {activeMetric ? activeMetric.value : (currency === 'USD' ? '20% ($20 / 100PV)' : '1대 20% 주급 (약 2.6만원)')}
                    </div>
                  </div>

                  <span className="text-[10.5px] font-bold bg-[#242c27] text-[#eef3ef] px-2 py-0.5 rounded font-sans">
                    매주 목요일 현금 입금
                  </span>
                </div>

                {/* 60일 패스트 vs 61일 유니레벨 핵심 비교 박스 */}
                <div className="my-1 p-1.5 rounded-lg bg-[#c8cfc9] border border-[#aab2ac] text-[11px] sm:text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#111713]">
                    <span className="bg-amber-300 text-amber-950 px-1.5 py-0.2 rounded font-black text-[10px] shrink-0">
                      첫 60일 (패스트)
                    </span>
                    <span className="break-keep">1대 20% (가장 많이 지급!) ➔ 2대 10% ➔ 3대 5% (주급)</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-[#111713]">
                    <span className="bg-[#242c27] text-white px-1.5 py-0.2 rounded font-black text-[10px] shrink-0">
                      61일 이후 (유니레벨)
                    </span>
                    <span className="break-keep">1대 2% ➔ 깊을수록 최고 7대 7% (역삼각형 월급)</span>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-[#1c241e] leading-snug font-bold mt-0.5 break-keep">
                  {activeMetric ? activeMetric.detail : '💡 첫 60일은 20% 주급으로 빠른 정착을 돕고, 61일 이후부터는 깊은 조직 7대 7% 역삼각형 보상으로 전환됩니다.'}
                </p>
              </div>

              {/* Bottom Condition Line */}
              <div className="border-t border-[#b8bfb9] pt-1 flex items-center justify-between text-[10.5px] sm:text-[11px] font-bold text-[#262f28]">
                <span className="text-rose-950 bg-rose-200/80 px-1 py-0.2 rounded">
                  ⚠️ 내 카트에 100 PV(안전선 106 PV) 세팅 시 매주 목요일 주급 자동 입금
                </span>
                <span className="text-purple-950 font-black">신규 60일간</span>
              </div>
            </div>
          )}

          {/* 3-B. P3 Mode: 파워 오브 쓰리 팀보너스 (단어 배열 교정 및 하단 글잘림 완벽 해결) */}
          {mode === 'P3' && (() => {
            const isStep2 = activeMetric?.label?.includes('2단계');
            const isStep3 = activeMetric?.label?.includes('3단계');
            const isBoost = activeMetric?.label?.includes('부스트');
            const isTeam600 = activeMetric?.label?.includes('600');

            let stepBadge = '1단계 공식';
            let stepFormulaText = '나(150 PV) + 1대 3명(각 150 PV) = 팀 600 PV';
            let stepPayoutText = '매월 5만 원 (부스트 시 10만 원)';

            if (isStep2) {
              stepBadge = '2단계 공식';
              stepFormulaText = '1대 파트너 3명이 각자 1단계 달성 시';
              stepPayoutText = '매월 25만 원 (부스트 시 37.5만 원)';
            } else if (isStep3) {
              stepBadge = '3단계 공식';
              stepFormulaText = '2대 파트너 9명이 각자 1단계 달성 시';
              stepPayoutText = '매월 125만 원 (부스트 시 150만 원)';
            } else if (isBoost) {
              stepBadge = '부스트 공식';
              stepFormulaText = 'PGV 요건 충족 시 단계별 수당 최대 2배 증액';
              stepPayoutText = '1단계 10만 / 2단계 37.5만 / 3단계 150만 원';
            } else if (isTeam600) {
              stepBadge = '팀 600 PV';
              stepFormulaText = '나 + 1대 파트너 3명 합계 600 PV 완성';
              stepPayoutText = '1단계 5만원(부스트 10만원) 확정 조건';
            }

            return (
              <div className="flex flex-col justify-between h-full font-sans">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs sm:text-[13px] text-[#353e38] font-bold shrink-0">
                      {activeMetric ? activeMetric.label : '파워 오브 쓰리 팀 보너스'}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-[#1f2821] whitespace-nowrap shrink-0">
                      매월 15일 현금 입금
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-lcd text-[#111713] leading-tight whitespace-nowrap overflow-x-auto tracking-tight">
                    {activeMetric ? activeMetric.value : '매월 5만 ~ 150만 원'}
                  </div>

                  {/* 단어 배열이 깔끔하고 줄바꿈 어색함 없는 2줄 공식 박스 */}
                  <div className="my-1.5 p-1.5 rounded-lg bg-[#c8cfc9] border border-[#aab2ac] text-[11px] sm:text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#111713]">
                      <span className="bg-amber-300 text-amber-950 px-1.5 py-0.2 rounded font-black text-[10px] shrink-0">
                        {stepBadge}
                      </span>
                      <span className="break-keep">{stepFormulaText}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-[#1f2821]">
                      <span className="bg-[#242c27] text-white px-1.5 py-0.2 rounded font-black text-[10px] shrink-0">
                        지급 수당
                      </span>
                      <span className="break-keep">{stepPayoutText}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-[13px] text-[#1c241e] leading-snug font-bold break-keep">
                    {activeMetric ? activeMetric.detail : '👉 아래 단계 버튼을 누르면 각 단계별 달성 요건과 지급액이 표시됩니다.'}
                  </p>
                </div>

                {/* Bottom Condition Line - 글잘림 방지 */}
                <div className="border-t border-[#b8bfb9] pt-1 flex items-center justify-between text-[10.5px] sm:text-[11px] font-bold text-[#262f28]">
                  <span className="break-keep">[필수요건] 전원 LRP 100 PV 이상 + 나와 1대 합계 600 PV</span>
                  <span className="text-purple-950 font-black shrink-0">
                    부스트 시 최대 2배 증액
                  </span>
                </div>
              </div>
            );
          })()}

          {/* 3-C. STARTER & LEADER Metric Modes (중복 강조 제거, 가로 확장, 60대 가독성 최적화) */}
          {(mode === 'STARTER' || mode === 'LEADER') && (
            <div className="flex flex-col justify-between h-full font-sans">
              {activeMetric ? (
                <div className="space-y-1">
                  {/* 상단 라인: 왼쪽 제목, 오른쪽 맨 윗줄에 필수 정보가 가로로 길게 쭉 늘어남 */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-[13px] text-[#353e38] font-bold shrink-0">
                      {activeMetric.label.includes('106') ? '개인 주문 안전선' : '내 통장 실수령 예상 수당'}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-[#1e2721] whitespace-nowrap shrink-0">
                      {mode === 'STARTER' ? '매월 15일 입금 (유니레벨)' : '매월 15일 입금 (직급·리더십풀)'}
                    </span>
                  </div>

                  {/* 금액 표시: 가로 전체 폭을 온전히 사용하여 큼직하게 한 줄 표시 */}
                  <div className="text-2xl sm:text-3xl font-extrabold font-lcd text-[#111713] leading-tight whitespace-nowrap overflow-x-auto tracking-tight">
                    {activeMetric.value}
                  </div>

                  {/* 달성 내용: 중복 사족/네모 배지 완전 제거, 줄간격 넉넉하고 시원한 텍스트로 가로 펼침 */}
                  <div className="p-2 sm:p-2.5 rounded-lg bg-[#c8cfc9]/90 border border-[#aab2ac]">
                    <p className="text-xs sm:text-[13.5px] text-[#111713] leading-relaxed font-bold break-keep">
                      {activeMetric.detail}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs text-[#353e38] font-bold shrink-0">
                      {mode === 'STARTER' ? '스타터 예상 월 소득' : '리더십 예상 월 소득'}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-[#1e2721] whitespace-nowrap shrink-0">
                      매월 15일 입금
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-lcd text-[#111713] leading-tight">
                    {mode === 'STARTER' && (currency === 'USD' ? '$40 ~ $280 / mo' : '월 약 5만 ~ 35만 원')}
                    {mode === 'LEADER' && (currency === 'USD' ? '$800 ~ $4,400 / mo' : '월 약 100만 ~ 550만 원')}
                  </div>

                  <p className="text-xs sm:text-[13px] text-[#202923] mt-2 leading-relaxed font-bold break-keep">
                    👉 아래 직급 버튼을 누르면 직급별 정확한 월 수당과 달성 조건이 표시됩니다.
                  </p>
                </div>
              )}

              {/* Bottom Concise Info: 필수 개념만 한 줄로 깔끔하게 표시 */}
              <div className="border-t border-[#b8bfb9] pt-1 flex items-center justify-between text-[10.5px] sm:text-xs font-bold text-[#262f28]">
                {mode === 'STARTER' && (
                  <>
                    {activeMetric?.label?.includes('106') || activeMetric?.label?.includes('100') ? (
                      <span className="break-keep">[PV 뜻] 보너스 수령을 위한 내 개인 최소 주문 실적 점수</span>
                    ) : activeMetric?.label?.includes('레그') ? (
                      <span className="break-keep">[레그(Leg) 뜻] 내 1대 파트너 밑으로 뻗어나가는 조직의 한 줄기 (독립 라인)</span>
                    ) : activeMetric?.label?.includes('대') ? (
                      <span className="break-keep">[유니레벨 뜻] 조직 깊이에 따라 매월 15일 입금되는 평생 연금성 재구매 수당</span>
                    ) : (
                      <span className="break-keep">[OV 뜻] 팀 전체 실적 합계 (나와 파트너들의 모든 주문 실적 합산 점수)</span>
                    )}
                  </>
                )}
                {mode === 'LEADER' && (
                  <>
                    {activeMetric?.label?.includes('레그') ? (
                      <span className="break-keep">[독립 레그 요건] 서로 다른 1대 파트너 산하의 분리된 실적 라인</span>
                    ) : activeMetric?.label?.includes('임파워') ? (
                      <span className="text-purple-950 font-bold break-keep">[임파워풀] 프리미어/골드가 신규 1명(100 PV) 추천 시 추가 배당</span>
                    ) : activeMetric?.label?.includes('풀') || activeMetric?.label?.includes('배당') ? (
                      <span className="text-purple-950 font-bold break-keep">[리더십풀] 전 세계 도테라 글로벌 매출의 일정 지분을 매월 현금 배당</span>
                    ) : (
                      <span className="break-keep text-[#2d3830]">
                        [독립 레그] 1대 추천 파트너의 분리된 라인 기준
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* 4. SIMULATOR Mode: 0원부터 벽돌 쌓듯 누적되는 실전 통장 수당 계산기! */}
          {mode === 'SIMULATOR' && (
            <div className="flex flex-col justify-between h-full font-lcd">
              <div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-[#353e38] font-sans font-bold">
                      {simState.rank === '선택없음' ? '직급을 선택해 보세요' : `${simState.rank} 직급 · 이번 달 예상 총 수당`}
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#111713] leading-tight">
                      {formatMoney(simEarnings.total)}
                    </div>
                  </div>

                  <span className="text-[10.5px] font-bold bg-[#242c27] text-[#eef3ef] px-2 py-0.5 rounded font-sans">
                    {simState.newEnrollees > 0 ? `신규 +${simState.newEnrollees}명` : '추천 0명'} · P3 {simState.p3Stage}단계
                  </span>
                </div>

                {/* Sub-breakdown */}
                <div className="mt-1 grid grid-cols-3 gap-1 text-[11px] sm:text-xs text-[#202923] font-sans font-semibold">
                  <div className="bg-[#c8cfc9] px-1.5 py-0.5 rounded">
                    직급: <strong>{formatMoney(simEarnings.baseUnilevel)}</strong>
                  </div>
                  <div className="bg-[#c8cfc9] px-1.5 py-0.5 rounded">
                    패스트: <strong>{formatMoney(simEarnings.fastStart)}</strong>
                  </div>
                  <div className="bg-[#c8cfc9] px-1.5 py-0.5 rounded">
                    P3+임파워: <strong>{formatMoney(simEarnings.p3 + simEarnings.empPool)}</strong>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#b8bfb9] pt-1 flex items-center justify-between text-[10px] sm:text-[11px] font-sans text-[#262f28] font-bold">
                <span>0원에서 시작해 벽돌 쌓듯 직급별 수당 + 추천주급 + P3를 합산합니다</span>
                <span>DEL = ◀ 이전 취소 / AC = 0원 리셋</span>
              </div>
            </div>
          )}

          {/* 5. TOOL Mode: 공식 교육 및 사업 도구 */}
          {mode === 'TOOL' && (
            <div className="flex flex-col justify-between h-full font-sans">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-[#242c27] text-white px-1.5 py-0.2 rounded font-bold">
                    {currentTool.category} · {currentTool.keyLabel}
                  </span>
                  <span className="text-[9px] text-[#353e38] font-bold">
                    아래 키패드 버튼으로 선택
                  </span>
                </div>

                <div className="text-sm sm:text-base font-black text-[#111713] mt-0.5 truncate">
                  {currentTool.title}
                </div>

                <p className="text-[10.5px] text-[#202923] mt-0.5 leading-snug line-clamp-2 font-medium">
                  {currentTool.desc}
                </p>
              </div>

              <div className="pt-1 border-t border-[#b8bfb9] flex items-center justify-between">
                {currentTool.category === '영상' ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onOpenVideoModal(currentTool)}
                      className="calc-btn-base px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[10.5px] font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Play size={12} className="fill-white" />
                      <span>▶ 영상 시청하기 (전체화면)</span>
                    </button>
                  </div>
                ) : (
                  <a
                    href={currentTool.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="calc-btn-base px-2.5 py-1 rounded-lg bg-[#7a41bb] hover:bg-[#6830a6] text-white text-[10px] font-bold flex items-center gap-1 shadow-sm"
                  >
                    <ShoppingBag size={11} />
                    <span>구매처 바로가기 ↗</span>
                  </a>
                )}

                <span className="text-[9.5px] text-[#48534c] font-semibold">
                  {currentTool.category === '영상' ? '유튜브 전체화면 플레이어' : '최저가 링크 연결'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
