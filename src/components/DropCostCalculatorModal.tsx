import React, { useState, useMemo } from 'react';
import { 
  X, 
  Sparkles, 
  Droplet, 
  Plus, 
  Minus, 
  Trash2, 
  Copy, 
  Calculator, 
  RotateCcw, 
  Search, 
  Check, 
  FlaskConical, 
  ShieldCheck, 
  Tag, 
  HeartHandshake
} from 'lucide-react';
import { OIL_DATABASE, DIY_PRESET_RECIPES, OilItem, DiyPresetRecipe } from '../data/oilData';
import { soundManager } from '../utils/audio';

interface DropCostCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCostToCalc?: (cost: number) => void;
}

interface RecipeItem {
  oil: OilItem;
  drops: number;
}

type BottlePackagingType = 'rollon_10' | 'rollon_5' | 'spray_30' | 'none';

export const DropCostCalculatorModal: React.FC<DropCostCalculatorModalProps> = ({
  isOpen,
  onClose,
  onApplyCostToCalc,
}) => {
  const [activeTab, setActiveTab] = useState<'calc' | 'list'>('calc');
  const [recipeItems, setRecipeItems] = useState<RecipeItem[]>([
    {
      oil: OIL_DATABASE.find((o) => o.id === 's_peppermint_15') || OIL_DATABASE[0],
      drops: 5,
    },
    {
      oil: OIL_DATABASE.find((o) => o.id === 's_lemon_15') || OIL_DATABASE[1],
      drops: 5,
    },
  ]);
  const [packagingType, setPackagingType] = useState<BottlePackagingType>('rollon_10');
  const [includeCarrier, setIncludeCarrier] = useState<boolean>(true);
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);
  const [selectedOilToAdd, setSelectedOilToAdd] = useState<string>('s_lavender_15');

  // List Tab States
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [sortBy, setSortBy] = useState<'dropPrice' | 'rank' | 'name'>('dropPrice');

  // Filtered oils for List Tab (must be called before early return for Rules of Hooks)
  const filteredOils = useMemo(() => {
    return OIL_DATABASE.filter((oil) => {
      const matchesSearch =
        oil.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (oil.note && oil.note.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCat = selectedCategory === '전체' || oil.category === selectedCategory;
      return matchesSearch && matchesCat;
    }).sort((a, b) => {
      if (sortBy === 'dropPrice') return a.costPerDrop - b.costPerDrop;
      if (sortBy === 'rank') return a.costPerPv - b.costPerPv;
      return a.name.localeCompare(b.name, 'ko');
    });
  }, [searchTerm, selectedCategory, sortBy]);

  if (!isOpen) return null;

  // Packaging costs
  const getPackagingCost = () => {
    switch (packagingType) {
      case 'rollon_10': return 800;
      case 'rollon_5': return 600;
      case 'spray_30': return 1000;
      case 'none': return 0;
    }
  };

  const getCarrierCost = () => {
    if (!includeCarrier || packagingType === 'none') return 0;
    if (packagingType === 'spray_30') return 0; // 스프레이는 정제수 베이스
    return 300; // 10ml/5ml 롤온 코코넛 오일 희석 분량 약 300원
  };

  // Calculations
  const totalDrops = recipeItems.reduce((acc, item) => acc + item.drops, 0);
  const oilOnlyCost = recipeItems.reduce((acc, item) => acc + (item.oil.costPerDrop * item.drops), 0);
  const packagingCost = getPackagingCost();
  const carrierCost = getCarrierCost();
  const totalCost = oilOnlyCost + packagingCost + carrierCost;

  // Estimated Market Value
  const estimatedMarketValue = Math.max(5000, Math.round(totalCost * 2.2 / 500) * 500);

  // Stepper handlers
  const handleUpdateDrops = (index: number, delta: number) => {
    soundManager.playClick('func');
    setRecipeItems((prev) => {
      const updated = [...prev];
      const newDrops = Math.max(1, updated[index].drops + delta);
      updated[index] = { ...updated[index], drops: newDrops };
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    soundManager.playClick('func');
    setRecipeItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddOil = (oilItem: OilItem, initialDrops: number = 2) => {
    soundManager.playClick('accent');
    setRecipeItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.oil.id === oilItem.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].drops += initialDrops;
        return updated;
      }
      return [...prev, { oil: oilItem, drops: initialDrops }];
    });
  };

  const handleLoadPreset = (preset: DiyPresetRecipe) => {
    soundManager.playClick('accent');
    const items: RecipeItem[] = [];
    preset.items.forEach((pItem) => {
      const oil = OIL_DATABASE.find((o) => o.id === pItem.oilId);
      if (oil) {
        items.push({ oil, drops: pItem.drops });
      }
    });
    setRecipeItems(items);
    if (preset.targetVolume.includes('30ml')) {
      setPackagingType('spray_30');
      setIncludeCarrier(false);
    } else {
      setPackagingType('rollon_10');
      setIncludeCarrier(true);
    }
  };

  const handleResetRecipe = () => {
    soundManager.playClick('func');
    setRecipeItems([]);
  };

  const handleCopyRecipe = () => {
    soundManager.playClick('accent');
    const packagingLabel = packagingType === 'rollon_10' 
      ? '10ml 유리 롤온' 
      : packagingType === 'rollon_5' 
      ? '5ml 롤온' 
      : packagingType === 'spray_30' 
      ? '30ml 미스트 스프레이' 
      : '오일 블렌딩';

    const oilListStr = recipeItems
      .map((it) => `- ${it.oil.name}: ${it.drops}방울 (${(it.oil.costPerDrop * it.drops).toLocaleString()}원)`)
      .join('\n');

    const copyText = `[도테라 나눔 & DIY 원가 계산서]
용기: ${packagingLabel} (총 ${totalDrops}방울)
${oilListStr}
- 공병 & 부자재: ${(packagingCost + carrierCost).toLocaleString()}원
-------------------------
★ 실 원가: ${totalCost.toLocaleString()}원
★ 선물/나눔 가치: 약 ${estimatedMarketValue.toLocaleString()}원 상당
(만든 날: ${new Date().toLocaleDateString('ko-KR')})`;

    navigator.clipboard.writeText(copyText).then(() => {
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 2500);
    });
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#faf8f5] text-[#2c1d3b] rounded-[22px] sm:rounded-[26px] p-2.5 sm:p-3.5 flex flex-col font-sans shadow-2xl animate-in fade-in duration-200 border-2 border-[#cfbde2] overflow-hidden">
      
      {/* Modal Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#ddceec]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#522180] text-amber-300 flex items-center justify-center font-bold shadow-xs">
            <FlaskConical size={18} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm sm:text-base font-black text-[#331154]">
                나눔 & DIY 방울 원가 계산기
              </h2>
              <span className="text-[10px] bg-purple-100 text-[#5c238b] font-extrabold px-1.5 py-0.5 rounded border border-purple-200">
                15ml = 250방울 기준
              </span>
            </div>
            <p className="text-[10px] sm:text-[10.5px] text-[#6b3c94] font-semibold">
              오일별 1방울 단가표 & 나눔 롤온·스프레이 공병 포함 실시간 원가 합산
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
          title="닫기"
        >
          <X size={17} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 my-1.5 border-b border-[#e5d8f0] pb-1.5">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick('func');
            setActiveTab('calc');
          }}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'calc'
              ? 'bg-[#522180] text-white shadow-sm'
              : 'bg-white hover:bg-purple-50 text-[#522180] border border-[#d6c5e8]'
          }`}
        >
          <FlaskConical size={13} />
          <span>🧪 DIY 롤온·스프레이 레시피 계산</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundManager.playClick('func');
            setActiveTab('list');
          }}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'list'
              ? 'bg-[#522180] text-white shadow-sm'
              : 'bg-white hover:bg-purple-50 text-[#522180] border border-[#d6c5e8]'
          }`}
        >
          <Droplet size={13} />
          <span>💧 전 오일 1방울 단가표 ({OIL_DATABASE.length}종)</span>
        </button>
      </div>

      {/* TAB 1: DIY RECIPE & COST CALCULATOR */}
      {activeTab === 'calc' && (
        <div className="flex-1 overflow-y-auto flex flex-col justify-between pr-0.5 space-y-2">
          
          {/* Quick Preset Buttons */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-[#441775] flex items-center gap-1">
                <Sparkles size={11} className="text-amber-600" />
                인기 나눔 레시피 불러오기
              </span>
              <button
                type="button"
                onClick={handleResetRecipe}
                className="text-[10px] text-slate-500 hover:text-rose-600 flex items-center gap-0.5 font-bold cursor-pointer"
              >
                <RotateCcw size={10} />
                <span>비우기</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1">
              {DIY_PRESET_RECIPES.slice(0, 6).map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleLoadPreset(preset)}
                  className="bg-white hover:bg-purple-50 border border-[#d5c3e6] rounded-lg p-1 text-left transition-all cursor-pointer group"
                >
                  <div className="text-[10.5px] font-black text-[#2e0e52] truncate group-hover:text-purple-900">
                    {preset.name}
                  </div>
                  <div className="text-[9px] text-[#6e4695] truncate">
                    {preset.targetVolume} · {preset.items.length}종 오일
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Packaging & Carrier Selector */}
          <div className="bg-purple-50/80 border border-purple-200/90 rounded-xl p-2">
            <div className="text-[11px] font-bold text-[#3d1368] mb-1.5 flex items-center justify-between">
              <span>용기 및 캐리어 오일 베이스 선택</span>
              <span className="text-[9.5px] text-[#6d3e9a] font-semibold">
                부자재 합계: {(packagingCost + carrierCost).toLocaleString()}원
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1 text-[10px] font-bold">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick('func');
                  setPackagingType('rollon_10');
                  setIncludeCarrier(true);
                }}
                className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                  packagingType === 'rollon_10'
                    ? 'bg-[#522180] text-white border-[#522180]'
                    : 'bg-white text-[#3f1965] border-[#d4c1e8]'
                }`}
              >
                10ml 롤온
                <div className="text-[8.5px] opacity-80">+800원</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick('func');
                  setPackagingType('rollon_5');
                  setIncludeCarrier(true);
                }}
                className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                  packagingType === 'rollon_5'
                    ? 'bg-[#522180] text-white border-[#522180]'
                    : 'bg-white text-[#3f1965] border-[#d4c1e8]'
                }`}
              >
                5ml 롤온
                <div className="text-[8.5px] opacity-80">+600원</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick('func');
                  setPackagingType('spray_30');
                  setIncludeCarrier(false);
                }}
                className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                  packagingType === 'spray_30'
                    ? 'bg-[#522180] text-white border-[#522180]'
                    : 'bg-white text-[#3f1965] border-[#d4c1e8]'
                }`}
              >
                30ml 미스트
                <div className="text-[8.5px] opacity-80">+1,000원</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick('func');
                  setPackagingType('none');
                  setIncludeCarrier(false);
                }}
                className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                  packagingType === 'none'
                    ? 'bg-[#522180] text-white border-[#522180]'
                    : 'bg-white text-[#3f1965] border-[#d4c1e8]'
                }`}
              >
                오일만 계산
                <div className="text-[8.5px] opacity-80">+0원</div>
              </button>
            </div>

            {packagingType !== 'none' && packagingType !== 'spray_30' && (
              <label className="mt-1.5 flex items-center gap-1.5 text-[10px] text-[#4a1f78] font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeCarrier}
                  onChange={(e) => {
                    soundManager.playClick('func');
                    setIncludeCarrier(e.target.checked);
                  }}
                  className="rounded text-purple-700 focus:ring-purple-500"
                />
                <span>코코넛 캐리어 오일 베이스 포함 (+300원)</span>
              </label>
            )}
          </div>

          {/* Active Recipe Ingredients List */}
          <div className="bg-white border border-[#d6c5e8] rounded-xl p-2 shadow-xs">
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
              <span className="text-[11px] font-black text-[#2f1052] flex items-center gap-1">
                <Droplet size={12} className="text-purple-600" />
                블렌딩 오일 구성 ({recipeItems.length}종 / 총 {totalDrops}방울)
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">
                오일 소계: {oilOnlyCost.toLocaleString()}원
              </span>
            </div>

            {recipeItems.length === 0 ? (
              <div className="py-4 text-center text-xs text-slate-400 font-semibold">
                담긴 오일이 없습니다. 아래에서 오일을 선택해 추가해 보세요!
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[145px] overflow-y-auto pr-0.5">
                {recipeItems.map((item, idx) => {
                  const itemSubtotal = item.oil.costPerDrop * item.drops;
                  return (
                    <div
                      key={item.oil.id}
                      className="flex items-center justify-between bg-slate-50 hover:bg-purple-50/50 p-1.5 rounded-lg border border-slate-200/80 transition-all text-xs"
                    >
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
                        <div className="truncate">
                          <span className="font-extrabold text-[#280c46] mr-1">
                            {item.oil.name}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            (1방울 {item.oil.costPerDrop.toLocaleString()}원)
                          </span>
                        </div>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <div className="flex items-center border border-[#cbbaee] rounded-md bg-white overflow-hidden shadow-2xs">
                          <button
                            type="button"
                            onClick={() => handleUpdateDrops(idx, -1)}
                            className="w-5 h-5 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="w-6 text-center text-[11px] font-extrabold text-[#2c0e4f]">
                            {item.drops}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateDrops(idx, 1)}
                            className="w-5 h-5 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
                          >
                            <Plus size={10} />
                          </button>
                        </div>

                        <span className="w-14 text-right text-[11px] font-black text-[#441673]">
                          {itemSubtotal.toLocaleString()}원
                        </span>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="text-slate-400 hover:text-rose-600 p-0.5 cursor-pointer transition-colors"
                          title="삭제"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quick Oil Adder Dropdown / Button */}
            <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center gap-1.5">
              <select
                value={selectedOilToAdd}
                onChange={(e) => setSelectedOilToAdd(e.target.value)}
                className="flex-1 bg-white border border-[#cbbaee] rounded-lg px-2 py-1 text-[11px] font-bold text-[#2a0e48] focus:outline-none focus:border-purple-600"
              >
                {OIL_DATABASE.map((oil) => (
                  <option key={oil.id} value={oil.id}>
                    {oil.name} ({oil.volume}) - 1방울 {oil.costPerDrop}원 [{oil.category}]
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => {
                  const target = OIL_DATABASE.find((o) => o.id === selectedOilToAdd);
                  if (target) handleAddOil(target, 2);
                }}
                className="calc-btn-base px-2.5 py-1 rounded-lg bg-[#522180] hover:bg-[#43176c] text-white text-[11px] font-black flex items-center gap-1 cursor-pointer shrink-0 shadow-xs"
              >
                <Plus size={12} />
                <span>+2방울 추가</span>
              </button>
            </div>
          </div>

          {/* Big Result Card & Calculation Transfer */}
          <div className="bg-gradient-to-br from-[#2f0e52] to-[#451877] text-white rounded-xl p-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-purple-200 font-bold block">
                  총 {totalDrops}방울 {packagingType !== 'none' ? '+ 공병/코코넛' : ''} 합산 원가
                </span>
                <div className="text-xl sm:text-2xl font-black text-amber-300 leading-tight flex items-baseline gap-1 mt-0.5">
                  <span>{totalCost.toLocaleString()}</span>
                  <span className="text-xs text-white font-normal">원</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[9.5px] text-purple-200 block">
                  권장 선물/나눔 가치
                </span>
                <span className="text-xs sm:text-sm font-black text-white bg-white/15 px-2 py-0.5 rounded-full inline-block mt-0.5">
                  약 {estimatedMarketValue.toLocaleString()}원 상당
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-2 pt-2 border-t border-white/20 flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopyRecipe}
                className="calc-btn-base flex-1 py-1.5 px-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[10.5px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                {copiedNotice ? (
                  <>
                    <Check size={12} className="text-amber-300" />
                    <span className="text-amber-300">복사 완료!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>레시피 복사</span>
                  </>
                )}
              </button>

              {onApplyCostToCalc && (
                <button
                  type="button"
                  onClick={() => onApplyCostToCalc(totalCost)}
                  className="calc-btn-base flex-1 py-1.5 px-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-purple-950 text-[10.5px] font-black flex items-center justify-center gap-1 cursor-pointer shadow-sm transition-transform active:scale-95"
                  title="이 금액을 일반 계산기로 보내서 사칙연산 진행"
                >
                  <Calculator size={12} />
                  <span>계산기로 전송 ➔</span>
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: FULL OIL DROP PRICE DIRECTORY */}
      {activeTab === 'list' && (
        <div className="flex-1 overflow-hidden flex flex-col justify-between space-y-1.5">
          
          {/* Search, Filter & Sort */}
          <div className="space-y-1.5">
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

            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
                {['전체', '단일(싱글)', '블렌드', '롤온(터치)'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      soundManager.playClick('func');
                      setSelectedCategory(cat);
                    }}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap cursor-pointer transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#522180] text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-1 shrink-0 text-[10px]">
                <button
                  type="button"
                  onClick={() => setSortBy('dropPrice')}
                  className={`px-1.5 py-0.5 rounded font-bold cursor-pointer ${
                    sortBy === 'dropPrice' ? 'bg-amber-300 text-purple-950 font-black' : 'text-slate-500'
                  }`}
                >
                  단가순
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('rank')}
                  className={`px-1.5 py-0.5 rounded font-bold cursor-pointer ${
                    sortBy === 'rank' ? 'bg-amber-300 text-purple-950 font-black' : 'text-slate-500'
                  }`}
                >
                  1PV가성비순
                </button>
              </div>
            </div>
          </div>

          {/* Oil Table */}
          <div className="flex-1 overflow-y-auto space-y-1 pr-0.5">
            {filteredOils.map((oil) => (
              <div
                key={oil.id}
                className="bg-white hover:bg-purple-50/60 p-2 rounded-xl border border-[#ded0ed] flex items-center justify-between text-xs transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-[#280c46]">
                      {oil.name}
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1 py-0.2 rounded font-medium">
                      {oil.volume}
                    </span>
                    <span className="text-[10px] text-purple-800 font-bold">
                      {oil.category}
                    </span>
                  </div>

                  <div className="text-[10.5px] text-slate-500 mt-0.5 flex items-center gap-2">
                    <span>회원가 {oil.priceKrw.toLocaleString()}원</span>
                    <span>•</span>
                    <span>{oil.pv} PV</span>
                    {oil.note && (
                      <span className="truncate text-slate-600 max-w-[130px]">
                        • {oil.note}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Drop Price & Add Button */}
                <div className="text-right shrink-0 flex items-center gap-2 ml-2">
                  <div>
                    <span className="text-[9.5px] text-slate-400 block">1방울 단가</span>
                    <span className="text-sm font-black text-[#522180]">
                      {oil.costPerDrop.toLocaleString()}원
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleAddOil(oil, 2);
                      setActiveTab('calc');
                    }}
                    className="calc-btn-base px-2 py-1 rounded-lg bg-purple-100 hover:bg-[#522180] text-[#522180] hover:text-white text-[10px] font-black flex items-center gap-0.5 cursor-pointer transition-colors"
                    title="DIY 계산기에 2방울 담기"
                  >
                    <Plus size={11} />
                    <span>담기</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-1 border-t border-[#ddceec] text-[10px] text-[#542878] font-bold text-center">
            💡 15ml 병은 약 250방울, 5ml 병은 약 85방울 기준 계산입니다.
          </div>
        </div>
      )}

    </div>
  );
};
