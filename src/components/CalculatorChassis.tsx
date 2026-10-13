import React, { useState, useEffect } from 'react';
import { BookOpen, Zap } from 'lucide-react';
import { CurrencyUnit } from '../types';
import { soundManager } from '../utils/audio';

interface CalculatorChassisProps {
  children: React.ReactNode;
  currency: CurrencyUnit;
  onChangeCurrency: (curr: CurrencyUnit) => void;
  onOpenGuide: () => void;
  onOpenOrgChart?: () => void;
  onOpenOilRanking?: () => void;
}

export const CalculatorChassis: React.FC<CalculatorChassisProps> = ({
  children,
  currency,
  onChangeCurrency,
  onOpenGuide,
}) => {
  const currencyList: CurrencyUnit[] = ['KRW', 'USD', 'PV'];
  
  // 투웨이 파워 패널: 전원 점등 & 웰컴 문구 인터랙션
  const [isSolarActive, setIsSolarActive] = useState<boolean>(true);

  useEffect(() => {
    // 최초 실행 시 5.5초간 전원 불켜짐 + 웰컴 문구 흐름
    const timer = setTimeout(() => {
      setIsSolarActive(false);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  const handleSolarClick = () => {
    soundManager.playClick('accent');
    setIsSolarActive(true);
    // 재터치 시 5.5초 후 다시 차분한 솔라 패널로 복귀
    setTimeout(() => {
      setIsSolarActive(false);
    }, 5500);
  };

  const cycleCurrency = () => {
    soundManager.playClick('func');
    const nextIndex = (currencyList.indexOf(currency) + 1) % currencyList.length;
    onChangeCurrency(currencyList[nextIndex]);
  };

  return (
    <div className="relative w-full max-w-[430px] mx-auto flex flex-col items-center">
      {/* Outer Real Hardware Body: Thick molded ABS plastic casing with 3D drop shadow & bevels */}
      <div className="relative w-full rounded-[28px] sm:rounded-[34px] chassis-plastic-surface p-2.5 sm:p-3.5 transition-all">
        
        {/* Top Hardware Faceplate: Solar Cell Panel + Silk Logo + Physical Sliders */}
        <div className="flex items-center justify-between px-1.5 pt-1 pb-2 mb-1.5 border-b border-[#a88bc9]/35 min-h-[40px]">
          
          {/* Left: Brand Identity Silkscreened on Plastic */}
          <div className="flex flex-col justify-center items-start">
            <span className="text-[16px] sm:text-[17px] font-black tracking-tight text-[#2d0e4e] font-sans leading-none drop-shadow-[0_1px_0_rgba(255,255,255,0.85)]">
              dōTERRA
            </span>
            <span className="text-[6.5px] sm:text-[7px] font-extrabold text-[#633292] tracking-[0.18em] uppercase leading-none mt-1">
              ELECTRONIC CALCULATOR
            </span>
          </div>

          {/* Center: Interactive Solar Cell Panel (불 켜지는 투웨이 파워 & 웰컴 알림) */}
          <button
            type="button"
            onClick={handleSolarClick}
            className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none"
            title="투웨이 솔라 파워: 클릭 시 전원 켜짐 & 웰컴 메시지 점등"
          >
            <div 
              className={`h-[18px] sm:h-[20px] w-28 sm:w-32 rounded-[4px] px-1 flex items-center justify-center overflow-hidden transition-all duration-300 relative ${
                isSolarActive 
                  ? 'bg-amber-950/95 border border-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' 
                  : 'solar-panel-grid border border-[#4a2e10] group-hover:border-amber-600/70'
              }`}
            >
              {isSolarActive ? (
                /* 점등된 상태: 우측에서 좌측으로 흐르는 웰컴 LED 텍스트 */
                <div className="w-full whitespace-nowrap overflow-hidden flex items-center">
                  <span className="inline-block animate-marquee text-[10px] sm:text-[10.5px] font-lcd font-black text-amber-300 tracking-wider">
                    ✨ WELCOME 박정하 대표님! doTERRA 만능 계산기 ✨
                  </span>
                </div>
              ) : (
                /* 기본 실물 4-Cell 태양광 패널 */
                <div className="w-full h-full flex items-center justify-between pointer-events-none opacity-90 group-hover:opacity-100">
                  <div className="w-[22%] h-full bg-[#1c0f03] border-r border-[#4a2e10]/60" />
                  <div className="w-[22%] h-full bg-[#1c0f03] border-r border-[#4a2e10]/60" />
                  <div className="w-[22%] h-full bg-[#1c0f03] border-r border-[#4a2e10]/60" />
                  <div className="w-[22%] h-full bg-[#1c0f03]" />
                </div>
              )}
            </div>
            <span className={`text-[6.5px] sm:text-[7px] font-bold tracking-widest uppercase transition-colors flex items-center gap-0.5 mt-0.5 leading-none ${
              isSolarActive ? 'text-amber-700 font-extrabold' : 'text-[#623a8e] group-hover:text-[#421d6b]'
            }`}>
              <Zap size={6.5} className={isSolarActive ? 'text-amber-500 fill-amber-500' : 'text-[#8553bb]'} />
              TWO WAY POWER
            </span>
          </button>

          {/* Right: Clean Single-Line Controls (₩/$/PV 토글 + 가이드북) */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* 단일 아이콘 순환 토글 버튼: 다른 설명 없이 ₩, $, PV 로 간결 변환 */}
            <button
              type="button"
              onClick={cycleCurrency}
              className="calc-btn-base h-7 w-8 sm:w-8.5 rounded-full bg-[#f3ecfa] hover:bg-white text-[#3f166b] border border-[#b99dd9] font-black cursor-pointer shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              title="누르면 통화 단위 변환 (₩ 원화 ➔ $ 달러 ➔ PV 포인트)"
            >
              <span className="text-[12px] sm:text-[13px] font-black text-[#441775] leading-none">
                {currency === 'KRW' && '₩'}
                {currency === 'USD' && '$'}
                {currency === 'PV' && 'PV'}
              </span>
            </button>

            {/* Guide Key (비즈니스 레드창고 & 지식가이드) */}
            <button
              type="button"
              onClick={onOpenGuide}
              className="calc-btn-base h-7 px-2.5 rounded-full bg-[#ede4f7] hover:bg-white text-[#3f166b] border border-[#b99dd9] text-[10px] sm:text-[10.5px] font-black flex items-center gap-1 cursor-pointer shadow-sm transition-all hover:scale-105 active:scale-95"
              title="도테라 비즈니스 실전 가이드 & 파트너 조직도 열기"
            >
              <BookOpen size={11} className="text-amber-600 shrink-0" />
              <span className="leading-none">가이드</span>
            </button>
          </div>
        </div>

        {/* Inner Molded Keybed: Deep recessed tray where the screen and keys reside */}
        <div className="rounded-[22px] sm:rounded-[26px] chassis-inner-bezel p-2 sm:p-2.5 flex flex-col gap-2">
          {children}
        </div>
      </div>
    </div>
  );
};
