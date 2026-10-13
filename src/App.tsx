import React, { useState } from 'react';
import { CalculatorMode, CurrencyUnit, OrderBenefitState, SimState } from './types';
import { soundManager } from './utils/audio';
import { CalculatorChassis } from './components/CalculatorChassis';
import { LcdScreen } from './components/LcdScreen';
import { TopFunctionBar } from './components/TopFunctionBar';
import { HardwareKeypad } from './components/HardwareKeypad';
import { BusinessGuideModal } from './components/BusinessGuideModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { PixelOrgChartModal } from './components/PixelOrgChartModal';
import { OilPvRankingModal } from './components/OilPvRankingModal';
import { DropCostCalculatorModal } from './components/DropCostCalculatorModal';
import { ToolCardItem } from './data/toolData';

export default function App() {
  const [mode, setMode] = useState<CalculatorMode>('CALC');
  const [currency, setCurrency] = useState<CurrencyUnit>('KRW');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isOrgChartOpen, setIsOrgChartOpen] = useState<boolean>(false);
  const [isOilRankingOpen, setIsOilRankingOpen] = useState<boolean>(false);
  const [isDropCostOpen, setIsDropCostOpen] = useState<boolean>(false);

  // 1. Standard Calculator State
  const [calcDisplay, setCalcDisplay] = useState<string>('0');
  const [calcEquation, setCalcEquation] = useState<string>('');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [activeOp, setActiveOp] = useState<'+' | '-' | '×' | '÷' | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  // 2. My Order Benefit State (실전 내 구매 혜택 & 5% 할인 계산기)
  const [orderState, setOrderState] = useState<OrderBenefitState>({
    pv: 106, // 기본 106 PV 안전선으로 시작!
    newReferrals: 0,
    isBusinessDiscount: true, // 사업자 5% 즉시 할인 기본 적용
  });
  const [isPvJustSet, setIsPvJustSet] = useState<boolean>(true);

  // 3. Active Metric for Info Modes
  const [activeMetric, setActiveMetric] = useState<{
    keyId?: string;
    label: string;
    value: string;
    detail: string;
  } | null>(null);

  // 4. Simulator State (0원에서 시작해 벽돌 쌓는 로직!)
  const [simState, setSimState] = useState<SimState>({
    rank: '선택없음',
    newEnrollees: 0,
    p3Stage: 0,
    boostActive: false,
    historyStack: [],
  });

  // 5. Tool/Video Mode State
  const [activeToolId, setActiveToolId] = useState<string>('tool_calc_guide');
  const [selectedVideo, setSelectedVideo] = useState<ToolCardItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  const handleToggleSound = () => {
    const updated = soundManager.toggleSound();
    setSoundEnabled(updated);
  };

  const handleChangeCurrency = (newCurrency: CurrencyUnit) => {
    soundManager.playClick('func');
    setCurrency(newCurrency);
  };

  const handleOpenVideoModal = (tool: ToolCardItem) => {
    soundManager.playClick('accent');
    setSelectedVideo(tool);
    setIsVideoModalOpen(true);
  };

  const handleSelectMode = (newMode: CalculatorMode) => {
    setMode(newMode);

    if (newMode === 'STARTER') {
      setActiveMetric({
        keyId: 'st_500',
        label: '매니저',
        value: currency === 'USD' ? '$40 / mo' : '월 약 3만 ~ 5만 원',
        detail: '★ 팀 총 매출 500 OV 달성 (본인 100 PV 필수 / 혼자 주문해도 달성 가능)',
      });
    } else if (newMode === 'LEADER') {
      setActiveMetric({
        keyId: 'ld_premier',
        label: '프리미어',
        value: currency === 'USD' ? '$800 / mo' : '월 약 80만 ~ 100만 원',
        detail: '★ 달성: 팀 5,000 OV + 이그젝 2개 레그 육성 (임파워풀 25만)',
      });
    } else if (newMode === 'P3') {
      setActiveMetric({
        keyId: 'p3_st1',
        label: '1단계',
        value: currency === 'USD' ? '$50 / mo (부스트 $100)' : '매월 50,000원 (부스트 10만)',
        detail: '★ 1단계: 나 + 1대 3명(각 150PV) 팀 600점 완성 (매월 5만/부스트 10만)',
      });
    } else if (newMode === 'FAST') {
      setActiveMetric({
        keyId: 'fst_1st',
        label: '1대 20%',
        value: currency === 'USD' ? '20% ($20 / 100PV)' : '1대 20% 주급 (약 2.6만원)',
        detail: '★ 신규 첫 60일 구매 실적 20% 지급 (100 PV 시 약 2.6만 원)',
      });
    } else {
      setActiveMetric(null);
    }
  };

  // --- Calculator & PV Input Logic ---
  const handleDigit = (digit: string) => {
    if (mode === 'PV') {
      setOrderState((prev) => {
        let newStr = digit;
        if (!isPvJustSet && prev.pv > 0) {
          const currentStr = String(prev.pv);
          if (currentStr.length < 5) {
            newStr = currentStr + digit;
          }
        }
        setIsPvJustSet(false);
        return {
          ...prev,
          pv: parseInt(newStr, 10) || 0,
        };
      });
      return;
    }

    if (waitingForOperand) {
      setCalcDisplay(digit);
      setWaitingForOperand(false);
    } else {
      if (calcDisplay === '0' && digit !== '.') {
        setCalcDisplay(digit);
      } else {
        if (calcDisplay.length < 13) {
          setCalcDisplay(calcDisplay + digit);
        }
      }
    }
  };

  const handleDecimal = () => {
    if (mode === 'PV' || mode === 'TOOL') return;

    if (waitingForOperand) {
      setCalcDisplay('0.');
      setWaitingForOperand(false);
    } else if (!calcDisplay.includes('.')) {
      setCalcDisplay(calcDisplay + '.');
    }
  };

  const computeResult = (a: number, b: number, op: '+' | '-' | '×' | '÷'): number => {
    let res = 0;
    switch (op) {
      case '+': res = a + b; break;
      case '-': res = a - b; break;
      case '×': res = a * b; break;
      case '÷': res = b !== 0 ? a / b : 0; break;
    }
    return Math.round(res * 1000000) / 1000000;
  };

  const handleOperator = (op: '+' | '-' | '×' | '÷') => {
    const currentNum = parseFloat(calcDisplay);
    if (prevValue === null) {
      setPrevValue(currentNum);
      setCalcEquation(`${calcDisplay} ${op}`);
    } else if (activeOp && !waitingForOperand) {
      const result = computeResult(prevValue, currentNum, activeOp);
      setPrevValue(result);
      setCalcDisplay(String(result));
      setCalcEquation(`${result} ${op}`);
    } else {
      setCalcEquation(`${prevValue} ${op}`);
    }
    setActiveOp(op);
    setWaitingForOperand(true);
  };

  const handleEquals = () => {
    if (prevValue !== null && activeOp) {
      const currentNum = parseFloat(calcDisplay);
      const result = computeResult(prevValue, currentNum, activeOp);
      setCalcEquation(`${prevValue} ${activeOp} ${calcDisplay} =`);
      setCalcDisplay(String(result));
      setPrevValue(null);
      setActiveOp(null);
      setWaitingForOperand(true);
    }
  };

  // DEL Handler (한 글자 지우기 / ◀ 이전 단계로 취소)
  const handleClear = () => {
    if (mode === 'CALC') {
      if (calcDisplay.length > 1 && !waitingForOperand) {
        setCalcDisplay(calcDisplay.slice(0, -1));
      } else {
        setCalcDisplay('0');
      }
    } else if (mode === 'PV') {
      setIsPvJustSet(false);
      setOrderState((prev) => {
        const str = String(prev.pv);
        const sliced = str.length > 1 ? str.slice(0, -1) : '0';
        return {
          ...prev,
          pv: parseInt(sliced, 10) || 0,
        };
      });
    } else if (mode === 'SIMULATOR') {
      // Undo last step in Simulator!
      setSimState((prev) => {
        if (prev.newEnrollees > 0) {
          return { ...prev, newEnrollees: prev.newEnrollees - 1 };
        }
        if (prev.boostActive) {
          return { ...prev, boostActive: false };
        }
        if (prev.p3Stage > 0) {
          return { ...prev, p3Stage: 0 };
        }
        if (prev.rank !== '선택없음') {
          return { ...prev, rank: '선택없음' };
        }
        return prev;
      });
    } else {
      setActiveMetric(null);
    }
  };

  // AC Handler (처음으로 / 0 완전 리셋)
  const handleClearAll = () => {
    if (mode === 'CALC') {
      setCalcDisplay('0');
      setCalcEquation('');
      setPrevValue(null);
      setActiveOp(null);
      setWaitingForOperand(false);
    } else if (mode === 'PV') {
      setIsPvJustSet(false);
      setOrderState({
        pv: 0,
        newReferrals: 0,
        isBusinessDiscount: true,
      });
    } else if (mode === 'SIMULATOR') {
      setSimState({
        rank: '선택없음',
        newEnrollees: 0,
        p3Stage: 0,
        boostActive: false,
        historyStack: [],
      });
    } else {
      setActiveMetric(null);
    }
  };

  const handlePercent = () => {
    const currentNum = parseFloat(calcDisplay);
    setCalcDisplay(String(currentNum / 100));
  };

  // Metric Selection
  const handleSelectMetric = (keyId: string, label: string, value: string, detail: string) => {
    setActiveMetric({ keyId, label, value, detail });
  };

  const handleQuickPvAdd = (pv: number, label: string) => {
    setOrderState((prev) => ({ ...prev, pv: prev.pv + pv }));
  };

  // Order Actions (PV Mode)
  const handleOrderAction = (action: string) => {
    switch (action) {
      case 'set_106':
        setOrderState((prev) => ({ ...prev, pv: 106 }));
        setIsPvJustSet(true);
        break;
      case 'set_drop6':
        // 6방울 기준 (약 125 PV, 도테라 스파 립밤 정품 증정)
        setOrderState((prev) => ({ ...prev, pv: 125 }));
        setIsPvJustSet(true);
        break;
      case 'set_drop12':
        // 12방울 기준 (약 200 PV, 이오메가 정품 증정)
        setOrderState((prev) => ({ ...prev, pv: 200 }));
        setIsPvJustSet(true);
        break;
      case 'ref_add_1':
        setOrderState((prev) => ({ ...prev, newReferrals: prev.newReferrals + 1 }));
        break;
      case 'ref_sub_1':
        setOrderState((prev) => ({ ...prev, newReferrals: Math.max(0, prev.newReferrals - 1) }));
        break;
      case 'toggle_discount':
        setOrderState((prev) => ({ ...prev, isBusinessDiscount: !prev.isBusinessDiscount }));
        break;
    }
  };

  // Simulator Actions (0-based accumulator!)
  const handleSimAction = (action: string) => {
    switch (action) {
      case 'rank_매니저':
        setSimState((prev) => {
          const nextRank = prev.rank === '매니저' ? '선택없음' : '매니저';
          // 매니저는 최대 1단계까지만 허용 (2/3단계 세팅되어 있었다면 자동 1단계로 하향 조정)
          const nextP3 = nextRank === '매니저' && prev.p3Stage > 1 ? 1 : prev.p3Stage;
          return { ...prev, rank: nextRank, p3Stage: nextP3 };
        });
        break;
      case 'rank_디렉터':
        setSimState((prev) => {
          const nextRank = prev.rank === '디렉터' ? '선택없음' : '디렉터';
          // 디렉터는 최대 1단계 허용
          const nextP3 = nextRank === '디렉터' && prev.p3Stage > 1 ? 1 : prev.p3Stage;
          return { ...prev, rank: nextRank, p3Stage: nextP3 };
        });
        break;
      case 'rank_이그제큐티브':
        setSimState((prev) => {
          const nextRank = prev.rank === '이그제큐티브' ? '선택없음' : '이그제큐티브';
          // 이그제큐티브는 최대 2단계 허용 (3단계 세팅되어 있었다면 2단계로 조정)
          const nextP3 = nextRank === '이그제큐티브' && prev.p3Stage > 2 ? 2 : prev.p3Stage;
          return { ...prev, rank: nextRank, p3Stage: nextP3 };
        });
        break;
      case 'rank_엘리트':
        setSimState((prev) => ({ ...prev, rank: prev.rank === '엘리트' ? '선택없음' : '엘리트' }));
        break;
      case 'rank_프리미어':
        setSimState((prev) => ({ ...prev, rank: prev.rank === '프리미어' ? '선택없음' : '프리미어' }));
        break;
      case 'rank_실버':
        setSimState((prev) => ({ ...prev, rank: prev.rank === '실버' ? '선택없음' : '실버' }));
        break;
      case 'rank_골드':
        setSimState((prev) => ({ ...prev, rank: prev.rank === '골드' ? '선택없음' : '골드' }));
        break;
      case 'enr_add_1':
        setSimState((prev) => ({ ...prev, newEnrollees: prev.newEnrollees + 1 }));
        break;
      case 'enr_sub_1':
        setSimState((prev) => ({ ...prev, newEnrollees: Math.max(0, prev.newEnrollees - 1) }));
        break;
      case 'p3_1':
        setSimState((prev) => ({ ...prev, p3Stage: prev.p3Stage === 1 ? 0 : 1 }));
        break;
      case 'p3_2':
        setSimState((prev) => {
          // 매니저나 디렉터는 2단계 선택 불가
          if (prev.rank === '매니저' || prev.rank === '디렉터') return prev;
          return { ...prev, p3Stage: prev.p3Stage === 2 ? 0 : 2 };
        });
        break;
      case 'p3_3':
        setSimState((prev) => {
          // 매니저, 디렉터, 이그젝은 3단계 선택 불가
          if (prev.rank === '매니저' || prev.rank === '디렉터' || prev.rank === '이그제큐티브') return prev;
          return { ...prev, p3Stage: prev.p3Stage === 3 ? 0 : 3 };
        });
        break;
      case 'toggle_boost':
        setSimState((prev) => ({ ...prev, boostActive: !prev.boostActive }));
        break;
    }
  };

  return (
    <main className="min-h-[100dvh] w-full flex flex-col justify-center items-center py-2 sm:py-3 px-1 sm:px-2 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-[#e6dced] via-[#ded1e8] to-[#d6c4e3]">
      {/* Full-Screen Video Player Modal */}
      <VideoPlayerModal
        isOpen={isVideoModalOpen}
        title={selectedVideo?.title || ''}
        youtubeId={selectedVideo?.youtubeId}
        fallbackUrl={selectedVideo?.actionUrl || 'https://www.youtube.com'}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <CalculatorChassis
        currency={currency}
        onChangeCurrency={handleChangeCurrency}
        onOpenGuide={() => setIsGuideOpen(true)}
      >
        {/* Full-Screen Business Guide Modal with VIP Secret E-Book & Org Chart Launcher */}
        <BusinessGuideModal
          isOpen={isGuideOpen}
          onClose={() => setIsGuideOpen(false)}
          onOpenOrgChart={() => {
            soundManager.playClick('accent');
            setIsOrgChartOpen(true);
          }}
        />

        {/* Full-Screen Pixel Org Chart Modal */}
        <PixelOrgChartModal
          isOpen={isOrgChartOpen}
          onClose={() => setIsOrgChartOpen(false)}
        />

        {/* Full-Screen 1 PV Cost Oil Ranking Modal */}
        <OilPvRankingModal
          isOpen={isOilRankingOpen}
          onClose={() => setIsOilRankingOpen(false)}
          onApplyPvToCalculator={(pv) => {
            setOrderState((prev) => ({ ...prev, pv }));
          }}
        />

        {/* Full-Screen Sharing & DIY Drop Cost Calculator Modal */}
        <DropCostCalculatorModal
          isOpen={isDropCostOpen}
          onClose={() => setIsDropCostOpen(false)}
          onApplyCostToCalc={(cost) => {
            soundManager.playClick('accent');
            setMode('CALC');
            setCalcDisplay(String(cost));
            setCalcEquation(`나눔 원가 ${cost.toLocaleString()}원`);
            setIsDropCostOpen(false);
          }}
        />

        {/* LCD Screen Display */}
        <LcdScreen
          mode={mode}
          currency={currency}
          calcDisplay={calcDisplay}
          calcEquation={calcEquation}
          orderState={orderState}
          activeMetric={activeMetric}
          simState={simState}
          activeToolId={activeToolId}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onOpenVideoModal={handleOpenVideoModal}
          onOpenOilRanking={() => {
            soundManager.playClick('accent');
            setIsOilRankingOpen(true);
          }}
          onOpenDropCalc={() => {
            soundManager.playClick('accent');
            setIsDropCostOpen(true);
          }}
        />

        {/* Top 8 Mode Function Keys */}
        <TopFunctionBar
          currentMode={mode}
          onSelectMode={handleSelectMode}
        />

        {/* Unified 4x5 Fixed Position Keypad */}
        <HardwareKeypad
          mode={mode}
          activeKeyId={activeMetric?.keyId}
          orderState={orderState}
          simState={simState}
          activeToolId={activeToolId}
          onDigit={handleDigit}
          onOperator={handleOperator}
          onEquals={handleEquals}
          onClear={handleClear}
          onClearAll={handleClearAll}
          onPercent={handlePercent}
          onDecimal={handleDecimal}
          onSelectMetric={handleSelectMetric}
          onQuickPvAdd={handleQuickPvAdd}
          onSimAction={handleSimAction}
          onOrderAction={handleOrderAction}
          onSelectTool={(id) => {
            setActiveToolId(id);
            if (id === 'tool_oil_ranking') {
              soundManager.playClick('accent');
              setIsOilRankingOpen(true);
            } else if (id === 'tool_drop_calc') {
              soundManager.playClick('accent');
              setIsDropCostOpen(true);
            }
          }}
          onOpenGuide={() => setIsGuideOpen(true)}
        />
      </CalculatorChassis>
    </main>
  );
}
