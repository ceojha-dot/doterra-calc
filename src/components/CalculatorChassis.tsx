import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { CurrencyUnit } from '../types';

interface CalculatorChassisProps {
  children: React.ReactNode;
  currency: CurrencyUnit;
  onChangeCurrency: (curr: CurrencyUnit) => void;
  onOpenGuide: () => void;
}

export const CalculatorChassis: React.FC<CalculatorChassisProps> = ({
  children,
  currency,
  onChangeCurrency,
  onOpenGuide,
}) => {
  const currencyList: CurrencyUnit[] = ['KRW', 'PV', 'USD'];

  const cycleCurrency = () => {
    const nextIndex = (currencyList.indexOf(currency) + 1) % currencyList.length;
    onChangeCurrency(currencyList[nextIndex]);
  };

  return (
    <div className="relative w-full max-w-[430px] mx-auto flex flex-col items-center">
      {/* Outer Real Hardware Body: Thick molded ABS plastic casing with 3D drop shadow & bevels */}
      <div className="relative w-full rounded-[28px] sm:rounded-[34px] chassis-plastic-surface p-2.5 sm:p-3.5 transition-all">
        
        {/* Top Hardware Faceplate: Solar Cell Panel + Silk Logo + Physical Sliders */}
        <div className="flex items-center justify-between px-1.5 pt-0.5 pb-2 mb-1.5 border-b border-[#a88bc9]/40">
          
          {/* Left: Brand Identity Silkscreened on Plastic */}
          <div className="flex flex-col text-left">
            <span className="text-[17px] sm:text-[19px] font-black tracking-tight text-[#331154] font-sans drop-shadow-[0_1px_0_rgba(255,255,255,0.85)]">
              dōTERRA
            </span>
            <span className="text-[8px] sm:text-[8.5px] font-extrabold text-[#5c2b8c] tracking-[0.22em] uppercase -mt-0.5">
              ELECTRONIC CALCULATOR
            </span>
          </div>

          {/* Center: Authentic 4-Cell Solar Panel (태양광 집광판 스트립 - 실물 계산기의 정체성) */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="solar-panel-grid h-4 sm:h-4.5 w-24 sm:w-28 rounded-[4px] px-1 py-0.5 flex items-center justify-between">
              <div className="w-[22%] h-full bg-[#1c0f03] border-r border-[#4a2e10]/60" />
              <div className="w-[22%] h-full bg-[#1c0f03] border-r border-[#4a2e10]/60" />
              <div className="w-[22%] h-full bg-[#1c0f03] border-r border-[#4a2e10]/60" />
              <div className="w-[22%] h-full bg-[#1c0f03]" />
            </div>
            <span className="text-[7.5px] font-bold text-[#623a8e] tracking-widest uppercase">
              TWO WAY POWER
            </span>
          </div>

          {/* Right: Currency Slide Switch & Guide Key */}
          <div className="flex items-center gap-1.5">
            {/* Physical Hardware Unit Switcher */}
            <button
              type="button"
              onClick={cycleCurrency}
              className="calc-btn-base px-2 py-0.5 rounded-full bg-[#f3ecfa] hover:bg-white text-[#3f166b] border border-[#b99dd9] text-[9.5px] font-black cursor-pointer shadow-sm flex items-center gap-1"
              title="통화 단위 전환 (₩ 원화 / PV 포인트 / $ 달러)"
            >
              <span className="text-[8.5px] text-[#71449f]">단위:</span>
              <span className="font-extrabold text-[#3b1263]">
                {currency === 'KRW' && '₩ 원화'}
                {currency === 'PV' && 'PV 포인트'}
                {currency === 'USD' && '$ 달러'}
              </span>
            </button>

            {/* Guide Key */}
            <button
              type="button"
              onClick={onOpenGuide}
              className="calc-btn-base px-2 py-0.5 rounded-full bg-[#f3ecfa] hover:bg-white text-[#3f166b] border border-[#b99dd9] text-[9.5px] font-black flex items-center gap-1 cursor-pointer shadow-sm"
              title="도테라 비즈니스 실전 가이드 열기"
            >
              <BookOpen size={11} className="text-amber-600" />
              <span className="hidden sm:inline">가이드</span>
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
