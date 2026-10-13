import React, { useState } from 'react';
import { X, Sparkles, TrendingUp, Search, Info, Check, Filter } from 'lucide-react';
import { OIL_DATABASE, OilItem } from '../data/oilData';
import { soundManager } from '../utils/audio';

interface OilPvRankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPvToCalculator?: (pv: number) => void;
}

export const OilPvRankingModal: React.FC<OilPvRankingModalProps> = ({
  isOpen,
  onClose,
  onApplyPvToCalculator,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  if (!isOpen) return null;

  const categories = ['전체', '단일(싱글)', '블렌드', '롤온(터치)'];

  const filteredOils = OIL_DATABASE.filter((oil) => {
    const matchesSearch =
      oil.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (oil.note && oil.note.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategory === '전체' || oil.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="absolute inset-0 z-50 bg-[#faf8f5] text-[#2c1d3b] rounded-[22px] sm:rounded-[26px] p-3 sm:p-4 flex flex-col font-sans shadow-2xl animate-in fade-in duration-200 border-2 border-[#cfbde2] overflow-hidden">
      
      {/* Modal Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#ddceec]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#522180] text-amber-300 flex items-center justify-center font-bold shadow-xs">
            <TrendingUp size={18} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm sm:text-base font-black text-[#331154]">
                1 PV 가성비 오일 랭킹 순위표
              </h2>
              <span className="text-[10px] bg-purple-100 text-[#5c238b] font-extrabold px-1.5 py-0.5 rounded border border-purple-200">
                실제 가격표 전수조사
              </span>
            </div>
            <p className="text-[10.5px] text-[#6b3c94] font-semibold">
              원화 금액 ÷ PV 계산 기준, 1 PV를 채울 때 가장 저렴한 순서
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playClick('func');
            onClose();
          }}
          type="button"
          className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X size={17} />
        </button>
      </div>

      {/* Insight Banner */}
      <div className="my-2 p-2 rounded-xl bg-purple-50 border border-purple-200 flex items-center gap-2 text-xs">
        <Sparkles size={16} className="text-purple-600 shrink-0" />
        <div className="text-[11px] text-[#421d60] leading-snug">
          <span className="font-extrabold text-[#5c1c8a]">💡 대표님 발견 공식 검증:</span>{' '}
          <strong>오렌지(1,259원/PV)</strong>, <strong>페퍼민트(1,263원/PV)</strong>, <strong>레몬(1,270원/PV)</strong>이 압도적 1등! 100~200 PV 맞출 때 가장 실속 있는 오일입니다.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-1.5 mb-2">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="오일명 또는 효능 검색 (예: 페퍼민트, 레몬, 숙면...)"
            className="w-full bg-white border border-[#cbb8df] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#2c1d3b] focus:outline-none focus:border-[#522180]"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                soundManager.playClick('func');
                setSelectedCategory(cat);
              }}
              className={`px-2.5 py-1 rounded-md text-[10.5px] font-bold whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#522180] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-[10px] text-slate-500 ml-auto font-medium">
            총 {filteredOils.length}개 품목
          </span>
        </div>
      </div>

      {/* Oil List Table */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-1.5 custom-scrollbar">
        {filteredOils.map((oil) => {
          const isTopTier = oil.rank <= 5;
          return (
            <div
              key={oil.id}
              className={`p-2 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                isTopTier
                  ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {/* Rank Badge */}
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                    oil.rank === 1
                      ? 'bg-amber-400 text-amber-950 shadow-xs'
                      : oil.rank <= 3
                      ? 'bg-purple-200 text-purple-900'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {oil.rank}
                </span>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xs sm:text-sm text-[#27103a] truncate">
                      {oil.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium shrink-0">
                      {oil.volume}
                    </span>
                    {oil.drops && (
                      <span className="text-[9.5px] bg-blue-50 text-blue-700 font-bold px-1 rounded border border-blue-200 shrink-0">
                        💧 {oil.drops}방울
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">
                    {oil.note}
                  </div>
                </div>
              </div>

              {/* Price & 1 PV Cost Display */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-[10px] text-purple-700 font-bold">1 PV당</span>
                  <span className="text-xs sm:text-sm font-black text-[#522180]">
                    ₩{oil.costPerPv.toLocaleString()}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500">
                  {oil.priceKrw.toLocaleString()}원 /{' '}
                  <span className="font-bold text-slate-700">{oil.pv} PV</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[#e2d5ed] flex items-center justify-between text-[10px] text-slate-500">
        <span>자료 출처: doTERRA 공인 소비자/회원 가격표</span>
        <button
          onClick={() => {
            soundManager.playClick('func');
            onClose();
          }}
          type="button"
          className="text-[#522180] font-black hover:underline"
        >
          닫기
        </button>
      </div>

    </div>
  );
};
