import React from 'react';
import { CalculatorMode } from '../types';
import { soundManager } from '../utils/audio';

interface TopFunctionBarProps {
  currentMode: CalculatorMode;
  onSelectMode: (mode: CalculatorMode) => void;
}

interface NavButtonConfig {
  mode: CalculatorMode;
  label: string;
  subLabel: string;
}

const BUTTON_CONFIGS: NavButtonConfig[] = [
  { mode: 'CALC', label: 'CALC', subLabel: '사칙연산' },
  { mode: 'PV', label: '내주문', subLabel: '5%할인·선물' },
  { mode: 'STARTER', label: 'STARTER', subLabel: '매니저~엘리트' },
  { mode: 'LEADER', label: 'LEADER', subLabel: '프리미어~골드' },
  { mode: 'P3', label: 'P3보너스', subLabel: '5만~150만' },
  { mode: 'FAST', label: 'FAST', subLabel: '추천 20% 주급' },
  { mode: 'SIMULATOR', label: '통장계산', subLabel: '0원부터 누적' },
  { mode: 'TOOL', label: '도구·영상', subLabel: '공병·보상강의' },
];

export const TopFunctionBar: React.FC<TopFunctionBarProps> = ({
  currentMode,
  onSelectMode,
}) => {
  const handleClick = (mode: CalculatorMode) => {
    soundManager.playClick('func');
    onSelectMode(mode);
  };

  return (
    <div className="w-full">
      {/* Grid of 8 tactile mode keys: 4 columns x 2 rows */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {BUTTON_CONFIGS.map(({ mode, label, subLabel }) => {
          const isActive = currentMode === mode;

          return (
            <button
              key={mode}
              type="button"
              onClick={() => handleClick(mode)}
              className={`calc-btn-base flex flex-col items-center justify-center py-1 sm:py-1.5 px-0.5 rounded-xl border text-center transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-[#4a148c] border-white shadow-[0_2.5px_0_#7e57a6,0_4px_8px_rgba(60,25,95,0.25),inset_0_2px_3px_#ffffff] translate-y-[2px]'
                  : 'bg-gradient-to-b from-[#f3e9fd] to-[#e4d3f5] hover:from-white hover:to-[#efe5fa] text-[#2c1348] border-[#c0a4dd] shadow-[0_3.5px_0_#9173b2,0_4px_7px_rgba(65,25,100,0.18),inset_0_1.5px_1px_rgba(255,255,255,0.9)] translate-y-0'
              }`}
            >
              {/* Mode Label with larger, clearer font */}
              <span className="text-[12px] sm:text-[13px] font-black tracking-tight leading-tight font-lcd-display">
                {label}
              </span>

              {/* Sub-label clearly legible */}
              <span className="text-[9px] sm:text-[9.5px] font-bold text-[#562584] tracking-tighter leading-tight mt-0.5">
                {subLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
