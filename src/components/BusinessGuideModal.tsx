import React, { useState } from 'react';
import { X, BookOpen, AlertTriangle, CheckCircle2, Droplets, Layers, Award, Unlock, Lock, KeyRound } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface BusinessGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type GuideTab = 'roadmap' | 'drops_promo' | 'checklist' | 'glossary' | 'vip_ebook';

export const BusinessGuideModal: React.FC<BusinessGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<GuideTab>('roadmap');
  const [passcode, setPasscode] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [unlockError, setUnlockError] = useState<string>('');

  if (!isOpen) return null;

  const handleTabClick = (tab: GuideTab) => {
    soundManager.playClick('func');
    setActiveTab(tab);
  };

  const handleClose = () => {
    soundManager.playClick('func');
    onClose();
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === '1004' || passcode.trim().toLowerCase() === 'doterra') {
      soundManager.playClick('accent');
      setIsUnlocked(true);
      setUnlockError('');
    } else {
      soundManager.playClick('func');
      setUnlockError('암호가 올바르지 않습니다. (멘토에게 문의하세요)');
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#faf7f2] rounded-[22px] sm:rounded-[26px] p-3 sm:p-4 flex flex-col text-[#2c1d3b] shadow-2xl animate-in fade-in duration-200 border-2 border-[#cfbde2]">
      {/* Top Header: Warm Ivory + Rich doTERRA Deep Violet */}
      <div className="flex items-center justify-between pb-2 border-b border-[#ddceec]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#522180] text-amber-300 flex items-center justify-center font-bold shadow-xs">
            <BookOpen size={17} />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-[#331154] font-sans leading-tight">
              도테라 비즈니스 실전 지식창고 & 시크릿 가이드
            </h2>
            <p className="text-[10.5px] text-[#6b3c94] font-semibold">
              8대 직급 로드맵 · 방울 프로모션 · 동적압축 원리 총정리
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="calc-btn-base px-2.5 py-1 rounded-full bg-[#ede4f7] hover:bg-white text-[#4a1c77] text-xs font-black flex items-center gap-1 border border-[#c4abdf] cursor-pointer shadow-xs"
        >
          <span>닫기</span>
          <X size={14} />
        </button>
      </div>

      {/* Navigation Tabs (5 Tabs) */}
      <div className="grid grid-cols-5 gap-1 my-2">
        <button
          type="button"
          onClick={() => handleTabClick('roadmap')}
          className={`py-1.5 px-0.5 rounded-lg text-[9.5px] sm:text-xs font-bold transition-all cursor-pointer text-center ${
            activeTab === 'roadmap'
              ? 'bg-[#522180] text-white shadow-sm font-black ring-1 ring-[#3a135e]'
              : 'bg-[#ede5f7] text-[#4d2475] hover:bg-white border border-[#d6c5eb]'
          }`}
        >
          8대 직급 순서
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('drops_promo')}
          className={`py-1.5 px-0.5 rounded-lg text-[9.5px] sm:text-xs font-bold transition-all cursor-pointer text-center ${
            activeTab === 'drops_promo'
              ? 'bg-[#522180] text-white shadow-sm font-black ring-1 ring-[#3a135e]'
              : 'bg-[#ede5f7] text-[#4d2475] hover:bg-white border border-[#d6c5eb]'
          }`}
        >
          💧 방울 프로모
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('checklist')}
          className={`py-1.5 px-0.5 rounded-lg text-[9.5px] sm:text-xs font-bold transition-all cursor-pointer text-center ${
            activeTab === 'checklist'
              ? 'bg-[#522180] text-white shadow-sm font-black ring-1 ring-[#3a135e]'
              : 'bg-[#ede5f7] text-[#4d2475] hover:bg-white border border-[#d6c5eb]'
          }`}
        >
          수당누락방지
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('glossary')}
          className={`py-1.5 px-0.5 rounded-lg text-[9.5px] sm:text-xs font-bold transition-all cursor-pointer text-center ${
            activeTab === 'glossary'
              ? 'bg-[#522180] text-white shadow-sm font-black ring-1 ring-[#3a135e]'
              : 'bg-[#ede5f7] text-[#4d2475] hover:bg-white border border-[#d6c5eb]'
          }`}
        >
          동적압축 & 용어
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('vip_ebook')}
          className={`py-1.5 px-0.5 rounded-lg text-[9.5px] sm:text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-0.5 ${
            activeTab === 'vip_ebook'
              ? 'bg-amber-500 text-slate-950 shadow-sm font-black ring-1 ring-amber-600'
              : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
          }`}
        >
          {isUnlocked ? <Unlock size={10} /> : <Lock size={10} />}
          <span>VIP 전자책</span>
        </button>
      </div>

      {/* Tab Contents: Clean White/Cream Cards with Superb Readability */}
      <div className="flex-1 overflow-y-auto custom-scroll pr-1 space-y-2 text-xs">
        
        {/* 1. 도테라 8대 직급 로드맵 & 레그 기준 */}
        {activeTab === 'roadmap' && (
          <div className="space-y-2 animate-in fade-in duration-150">
            <div className="p-2.5 rounded-xl bg-white border border-[#e0d4ec] shadow-xs">
              <div className="flex items-center gap-1.5 text-[#501f7c] font-black mb-1">
                <Award size={16} className="text-amber-500" />
                <span>도테라 직급 순서 & 필수 레그 조건 (한눈에 보는 로드맵)</span>
              </div>
              <p className="text-[11px] text-[#423352] leading-snug font-medium">
                엘리트까지는 레그 조건 없이 팀 매출 점수로 달성하고, 프리미어부터는 하부 파트너의 직급(독립 레그)이 필수 조건이 됩니다!
              </p>
            </div>

            {/* 초기 직급 (스타터 4형제) */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-black text-[#4d2276] flex items-center gap-1">
                <span>🌱 초기 직급 (스타터 4형제)</span>
                <span className="text-[10px] text-[#714d95] font-bold">별도 레그 조건 없음!</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <div className="p-2 rounded-xl bg-white border border-[#e2d6ee] shadow-xs">
                  <div className="flex items-center justify-between font-black text-[11px] text-[#2c1348]">
                    <span>1. 매니저 (500 OV)</span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1 py-0.2 rounded font-bold">월 약 3만~5만</span>
                  </div>
                  <p className="text-[10px] text-[#4d3a60] mt-1 leading-snug">
                    팀매출 약 66만 원. 혼자 구매해도 달성 가능! 유니레벨 2단계(3%)까지 오픈.
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-white border border-[#e2d6ee] shadow-xs">
                  <div className="flex items-center justify-between font-black text-[11px] text-[#2c1348]">
                    <span>2. 디렉터 (1,000 OV)</span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1 py-0.2 rounded font-bold">월 약 5만~10만</span>
                  </div>
                  <p className="text-[10px] text-[#4d3a60] mt-1 leading-snug">
                    팀매출 약 132만 원. 유니레벨 3단계(5%)까지 오픈.
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-white border border-[#e2d6ee] shadow-xs">
                  <div className="flex items-center justify-between font-black text-[11px] text-[#2c1348]">
                    <span>3. 이그젝 (2,000 OV)</span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1 py-0.2 rounded font-bold">월 약 5만~25만</span>
                  </div>
                  <p className="text-[10px] text-[#4d3a60] mt-1 leading-snug">
                    팀매출 약 264만 원. 4대까지 깊어지면 25만 원! (프리미어의 필수 2개 기둥 레그)
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-[#f7f0fc] border border-purple-300 shadow-xs">
                  <div className="flex items-center justify-between font-black text-[11px] text-[#4a1c77]">
                    <span>4. 엘리트 (3,000 OV)</span>
                    <span className="text-[10px] text-emerald-900 bg-emerald-200 px-1 py-0.2 rounded font-black">월 약 30만~50만</span>
                  </div>
                  <p className="text-[10px] text-[#3d185e] mt-1 leading-snug font-bold">
                    ★ 레그 조건 없음! 팀 합산 3,000 OV면 무조건 달성. 5단계(6%) 오픈.
                  </p>
                </div>
              </div>
            </div>

            {/* 리더 직급 (필수 레그 조건 발생!) */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-black text-[#4d2276] flex items-center gap-1">
                <span>👑 리더 직급 (필수 파트너 레그 조건!)</span>
              </div>

              <div className="space-y-1.5">
                <div className="p-2.5 rounded-xl bg-white border border-[#dfd2ec] shadow-xs">
                  <div className="flex items-center justify-between font-black text-[#2e1347]">
                    <span className="text-xs">5. 프리미어 (5,000 OV)</span>
                    <span className="text-emerald-800 font-black bg-emerald-100 px-1.5 py-0.2 rounded">월 약 80만 ~ 100만 원</span>
                  </div>
                  <div className="text-[10.5px] text-[#463259] mt-1 leading-snug font-medium">
                    👉 <strong className="text-[#2e1347]">필수 조건</strong>: 이그제큐티브(2,000 OV) <strong className="text-purple-900 underline">2명(2레그)</strong> 필수 + ⚠️당월 신규 1명(100PV) 직접 추천 시 임파워먼트 풀(약 25만 원) 합산!
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-[#dfd2ec] shadow-xs">
                  <div className="flex items-center justify-between font-black text-[#2e1347]">
                    <span className="text-xs">6. 실버 (Silver)</span>
                    <span className="text-emerald-800 font-black bg-emerald-100 px-1.5 py-0.2 rounded">월 약 200만 ~ 250만 원</span>
                  </div>
                  <div className="text-[10.5px] text-[#463259] mt-1 leading-snug font-medium">
                    👉 <strong className="text-[#2e1347]">필수 조건</strong>: 엘리트(3,000 OV) <strong className="text-purple-900 underline">3명(3레그)</strong> 필수 (전체 매출 무관). 7대 유니레벨 전액 오픈 + 글로벌 리더십 풀 1구좌 배당 시작!
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-[#dfd2ec] shadow-xs">
                  <div className="flex items-center justify-between font-black text-[#2e1347]">
                    <span className="text-xs">7. 골드 (Gold)</span>
                    <span className="text-emerald-800 font-black bg-emerald-100 px-1.5 py-0.2 rounded">월 약 450만 ~ 550만 원</span>
                  </div>
                  <div className="text-[10.5px] text-[#463259] mt-1 leading-snug font-medium">
                    👉 <strong className="text-[#2e1347]">필수 조건</strong>: 프리미어 <strong className="text-purple-900 underline">3명(3레그)</strong> 필수. 글로벌 리더십 풀 5구좌 + 임파워먼트 풀 2구좌(약 50만 원) 배당!
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-[#dfd2ec] shadow-xs">
                  <div className="flex items-center justify-between font-black text-[#2e1347]">
                    <span className="text-xs">8. 플래티넘 ➔ 다이아몬드</span>
                    <span className="text-emerald-800 font-black bg-emerald-100 px-1.5 py-0.2 rounded">월 약 800만 ~ 1,500만 원+</span>
                  </div>
                  <div className="text-[10.5px] text-[#463259] mt-1 leading-snug font-medium">
                    - 플래티넘: 실버 3레그 필수 | 다이아몬드: 실버 4레그 필수 (월 1,500만 원 이상 글로벌 지분 배당)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. 💧 방울 프로모션 & 100 PV 안전선 */}
        {activeTab === 'drops_promo' && (
          <div className="space-y-2 animate-in fade-in duration-150">
            <div className="p-2.5 rounded-xl bg-white border border-blue-200 shadow-xs">
              <div className="flex items-center gap-1.5 text-blue-900 font-black mb-1">
                <Droplets size={16} className="text-blue-600" />
                <span>도테라 코리아 💧 방울 프로모션 (물방울 모아서 선물 받기!)</span>
              </div>
              <p className="text-[11px] text-[#3e344d] leading-snug font-medium">
                도테라 제품이나 키트마다 매겨진 <strong>'오일 방울 수'</strong>를 모으면 푸짐한 정품 선물을 증정합니다.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-white border border-blue-200 shadow-xs">
                <div className="text-blue-900 font-bold text-xs flex items-center justify-between">
                  <span>💧 6방울 달성 시</span>
                  <span className="text-[9.5px] bg-blue-100 text-blue-950 px-1.5 py-0.2 rounded font-bold">1.2만 상당</span>
                </div>
                <div className="text-sm font-black text-[#251538] mt-1">도테라 스파 립밤 증정</div>
                <p className="text-[10px] text-[#4d3d63] mt-0.5 leading-tight font-medium">
                  부담 없는 소액 주문으로도 입술 보습 최고의 인기 스파 립밤을 100% 증정합니다.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-300 shadow-xs">
                <div className="text-amber-900 font-bold text-xs flex items-center justify-between">
                  <span>💧 12방울 달성 시</span>
                  <span className="text-[9.5px] bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded font-black">7.5만 상당!</span>
                </div>
                <div className="text-sm font-black text-amber-950 mt-1">이오메가 (xEO Mega) 정품</div>
                <p className="text-[10px] text-amber-900 mt-0.5 leading-tight font-medium">
                  대박 선물! 최고급 오메가3 영양제(정품 약 7.5만 원 상당)를 무료 증정합니다.
                </p>
              </div>
            </div>

            {/* 골라담기 물방울 수량 & 최저가 조합 안내표 */}
            <div className="p-2.5 rounded-xl bg-white border border-[#dfd2ec] shadow-xs mt-1">
              <div className="text-[#3c1564] font-black text-xs mb-1 flex items-center justify-between">
                <span>📊 공식 '골라담기 물방울' 최저 금액 달성 조합</span>
                <span className="text-[9.5px] bg-purple-100 text-[#4c2175] px-1.5 py-0.2 rounded font-bold">실전 가이드</span>
              </div>
              <div className="text-[10.5px] text-[#403152] space-y-1 leading-relaxed">
                <p>
                  도테라의 물방울은 제품마다 정해져 있습니다. (예: 레몬 15ml = 0.5방울 / 페퍼민트 = 1.5방울 / 프랑킨센스 = 3.5방울)
                </p>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <div className="p-2 rounded-lg bg-[#f8f5fc] border border-[#d8c7ea]">
                    <div className="font-black text-blue-900">💧 6방울 조합 (약 125 PV)</div>
                    <div className="text-emerald-800 font-black text-xs mt-0.5">약 16만 ~ 17만 원대</div>
                    <div className="text-[9.5px] text-[#4e3c63] mt-0.5">➔ <strong>스파 립밤</strong> (약 1.2만 원) 100% 무료 증정!</div>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="font-black text-amber-900">💧 12방울 조합 (약 200 PV)</div>
                    <div className="text-emerald-800 font-black text-xs mt-0.5">약 26만 ~ 28만 원대</div>
                    <div className="text-[9.5px] text-[#4e3c63] mt-0.5">➔ <strong>이오메가 정품</strong> (약 7.5만 원) 100% 무료 증정!</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 100 PV 안전선 안내 */}
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-300 shadow-xs mt-1">
              <div className="flex items-center justify-between text-rose-900 font-black mb-1">
                <span className="text-xs">⚠️ 100 PV(안전선 106 PV)의 결정적 차이</span>
                <span className="text-[9.5px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-bold">절대 수칙</span>
              </div>
              <ul className="text-[10.5px] text-rose-950 space-y-1 list-disc pl-4 font-medium">
                <li><strong>100 PV 미만 구매 시</strong>: 하부에서 수백만 원 매출이 나도 **현금 수당은 0원**입니다!</li>
                <li><strong>106 PV 안전선 결제 시</strong>: 사업자 5% 할인을 받아도 100 PV가 안전하게 채워져 **모든 현금 수당이 완벽하게 입금**됩니다!</li>
              </ul>
            </div>
          </div>
        )}

        {/* 3. 수당 누락 방지 체크리스트 */}
        {activeTab === 'checklist' && (
          <div className="space-y-2 animate-in fade-in duration-150">
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-300 shadow-xs">
              <div className="flex items-center gap-1.5 text-rose-900 font-black mb-1">
                <AlertTriangle size={16} className="text-rose-600" />
                <span>"프리미어인데 왜 100만 원이 안 들어오죠?"의 진실</span>
              </div>
              <p className="text-[11px] text-rose-950 leading-relaxed font-medium">
                공식 안내서의 '프리미어 평균 월소득 약 100만 원'은 모든 보너스를 다 챙겼을 때의 합계입니다. 
                아래 조건 중 하나라도 놓치면 수십만 원이 그대로 증발합니다!
              </p>
            </div>

            {/* 100 PV 미구매 시 4단계 비교 */}
            <div className="p-2.5 rounded-xl bg-white border border-[#dfd2ec] shadow-xs">
              <div className="flex items-center justify-between text-[#38135e] font-black mb-1.5">
                <span className="text-xs">⚠️ 100 PV를 안 사면 어떻게 되나요? (핵심 4단계 비교)</span>
                <span className="text-[9.5px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-bold">필독 룰</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-800 font-black">0 PV (미구매)</div>
                  <div className="text-rose-600 font-bold mt-0.5">수당 0원 / 포인트 소멸 위험</div>
                  <div className="text-slate-500 text-[9px] mt-0.5">장바구니 LRP 취소 시 누적 포인트 삭제</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
                  <div className="text-amber-900 font-black">1 ~ 49 PV</div>
                  <div className="text-amber-800 font-bold mt-0.5">기존 포인트 '보존'만 가능</div>
                  <div className="text-rose-600 text-[9px] mt-0.5 font-bold">수당은 0원 (수당 자격 없음)</div>
                </div>
                <div className="p-2 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="text-[#3c1466] font-black">50 ~ 99 PV</div>
                  <div className="text-[#512384] font-bold mt-0.5">LRP 포인트 적립 (10~30%) O</div>
                  <div className="text-rose-600 text-[9px] mt-0.5 font-bold">수당은 여전히 0원 (현금 미지급)</div>
                </div>
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-300">
                  <div className="text-emerald-900 font-black">100 PV+ (안전선 106 PV)</div>
                  <div className="text-emerald-800 font-bold mt-0.5">모든 현금 수당 100% 정상 입금!</div>
                  <div className="text-emerald-700 text-[9px] mt-0.5 font-bold">주급 20% + 파워3 + 유니레벨 전액 수령</div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="p-2.5 rounded-xl bg-white border border-[#dfd2ec] shadow-xs">
                <div className="flex items-center justify-between text-[#2e1347] font-black mb-0.5">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-amber-500" />
                    1. 당월 신규 1명(100PV) 직접 추천 필수!
                  </span>
                  <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-bold">
                    25만 원 증발 방지
                  </span>
                </div>
                <p className="text-[10.5px] text-[#47345b] leading-snug font-medium">
                  프리미어 직급자는 당월에 본인이 직접 신규 1명(100 PV)을 추천해야만 <strong>임파워먼트 풀 보너스(약 250,000원)</strong>가 나옵니다. 
                  미추천 시 이 25만 원이 통째로 누락됩니다.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#dfd2ec] shadow-xs">
                <div className="flex items-center justify-between text-[#2e1347] font-black mb-0.5">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    2. LRP 카트에 100 PV 항시 세팅 룰
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                    주급 자격 기준
                  </span>
                </div>
                <p className="text-[10.5px] text-[#47345b] leading-snug font-medium">
                  도테라 전산은 매주 목요일 주급(추천 20%)을 정산할 때 추천인의 LRP 장바구니에 100 PV 이상이 담겨 있는지 검사합니다. 
                  당월 결제가 아직 안 일어났어도 <strong>카트에 100 PV 이상이 세팅되어 있으면 주급이 정상 입금</strong>됩니다.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#dfd2ec] shadow-xs">
                <div className="flex items-center justify-between text-[#2e1347] font-black mb-0.5">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-purple-600" />
                    3. 패스트 스타트 (신규가 소량 구매해도 20% 입금!)
                  </span>
                  <span className="text-[10px] bg-purple-100 text-purple-900 px-1.5 py-0.2 rounded font-bold">
                    매주 목요일
                  </span>
                </div>
                <p className="text-[10.5px] text-[#47345b] leading-snug font-medium">
                  신규 회원이 100 PV를 다 안 채우고 오일 딱 1개(예: 15 PV)만 구매해도, 내가 추천인이면 <strong>구매액의 20%는 단돈 몇천 원이라도 매주 목요일 통장에 입금</strong>됩니다!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. 동적 압축 원리 & 필수 용어사전 */}
        {activeTab === 'glossary' && (
          <div className="space-y-2 animate-in fade-in duration-150">
            <div className="p-2.5 rounded-xl bg-white border border-purple-300 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#461972] font-black mb-1">
                <Layers size={16} className="text-purple-600" />
                <span>도테라의 축복: "동적 압축(Dynamic Compression)" 룰이란?</span>
              </div>
              <p className="text-[11px] text-[#3e2e50] leading-relaxed font-medium">
                일반 다단계는 내 하부의 3대 회원이 물건을 안 사면 3대 수당이 그대로 회사로 귀속(증발)됩니다.
                <br /><br />
                하지만 도테라는 **"동적 압축"**이 적용되어, 중간에 100 PV를 안 산 회원은 전산에서 없는 사람처럼 투명 처리하고, 
                그 아래 4대, 5대, 6대에서 구매한 회원을 **위로 당겨 올려서(압축)** 내 유니레벨 7단계 수당을 꽉 채워줍니다!
                <br /><br />
                👉 <strong>결론</strong>: 하부에 소비하지 않는 유령 회원이 아무리 많아도, 실제로 구매하는 사람 기준으로 깊은 조직까지 수당을 1원도 버리지 않고 알뜰하게 다 챙겨 받습니다.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <div className="p-2 rounded-xl bg-white border border-[#dfd2ec] shadow-xs">
                <span className="font-black text-[#2e1347] text-xs">PV (개인 구매 실적)</span>
                <p className="text-[10px] text-[#4f3d64] mt-0.5 leading-snug font-medium">
                  1 PV ≈ 약 1,320원. 내 수당 자격을 위한 필수 기준은 100 PV(안전선 106 PV)입니다.
                </p>
              </div>

              <div className="p-2 rounded-xl bg-white border border-[#dfd2ec] shadow-xs">
                <span className="font-black text-[#2e1347] text-xs">OV (조직 총 매출 점수)</span>
                <p className="text-[10px] text-[#4f3d64] mt-0.5 leading-snug font-medium">
                  나와 하부 전체의 당월 주문 PV 합계입니다. 매니저 500, 엘리트 3,000, 프리미어 5,000 OV 등 직급 기준.
                </p>
              </div>

              <div className="p-2 rounded-xl bg-white border border-[#dfd2ec] shadow-xs">
                <span className="font-black text-[#2e1347] text-xs">레그 (Leg / 하부 라인)</span>
                <p className="text-[10px] text-[#4f3d64] mt-0.5 leading-snug font-medium">
                  내 1대 파트너와 그 아래로 뻗은 라인 한 줄입니다. 프리미어 2레그, 실버/골드 3레그 필수!
                </p>
              </div>

              <div className="p-2 rounded-xl bg-white border border-[#dfd2ec] shadow-xs">
                <span className="font-black text-[#2e1347] text-xs">3+1 황금 레그 배치</span>
                <p className="text-[10px] text-[#4f3d64] mt-0.5 leading-snug font-medium">
                  1대에 딱 3명만 두지 않고 예비 1명을 두어 파워3 탈락을 방어하고 극강의 수익을 만드는 배치법.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5. [🔒 VIP 파트너 전용 시크릿 전략 전자책] */}
        {activeTab === 'vip_ebook' && (
          <div className="space-y-2 animate-in fade-in duration-150">
            {!isUnlocked ? (
              <div className="p-4 rounded-xl bg-white border border-amber-300 text-center space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
                  <Lock size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#2c1348]">
                    [🔒 VIP 파트너 전용 시크릿 전략 비법서]
                  </h3>
                  <p className="text-[10.5px] text-[#55436a] mt-1 leading-relaxed font-medium">
                    이 전자책은 대표님의 직속 파트너에게만 제공되는 비공개 핵심 자료입니다. 
                    스폰서 멘토에게 암호 코드를 요청하세요.
                    <br />
                    <span className="text-amber-700 font-bold">(테스트 암호: 1004)</span>
                  </p>
                </div>

                <form onSubmit={handleUnlock} className="flex flex-col items-center gap-2 max-w-[220px] mx-auto">
                  <div className="flex items-center gap-1.5 w-full bg-[#f8f5fc] border border-[#cfbde2] rounded-lg px-2 py-1.5">
                    <KeyRound size={14} className="text-amber-600" />
                    <input
                      type="text"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="VIP 암호 입력"
                      className="bg-transparent text-[#2c1348] text-xs w-full focus:outline-hidden font-bold"
                    />
                  </div>

                  {unlockError && (
                    <span className="text-[10px] text-rose-600 font-bold">{unlockError}</span>
                  )}

                  <button
                    type="submit"
                    className="calc-btn-base w-full py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer shadow-md"
                  >
                    시크릿 비법서 열기
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                    <Unlock size={14} />
                    VIP 비즈니스 시크릿 전자책 인증 완료
                  </span>
                  <span className="text-[9.5px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-bold">
                    대표님 전용 자료
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-[#dfd2ec] space-y-1 shadow-xs">
                  <h4 className="font-black text-[#3b1263] text-xs">
                    제1장. 신규 가입자 125 PV 당일 클로징 3단계 화법
                  </h4>
                  <p className="text-[10.5px] text-[#4f3d64] leading-relaxed font-medium">
                    "오늘 125 PV를 결제하시면 5% 즉시 할인에 💧 12방울 달성 시 고가의 이오메가 정품까지 100% 공짜로 함께 배송됩니다. 
                    실질적으로 10만 원대에 풀 세트를 가져가시는 날이니 무조건 오늘 하시는 게 가장 이득입니다."
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-[#dfd2ec] space-y-1 shadow-xs">
                  <h4 className="font-black text-[#3b1263] text-xs">
                    제2장. 거절 3대 질문 극복법 ("다단계 아닌가요?")
                  </h4>
                  <p className="text-[10.5px] text-[#4f3d64] leading-relaxed font-medium">
                    "맞습니다. 유통 구조는 네트워크지만, 도테라는 재구매율이 65%가 넘는 제품력 중심 회사입니다. 
                    물건 사재기나 의무 판매가 전혀 없고, 나와 내 가족이 쓸 오일만 안전선(106 PV)으로 쓰면서 3명에게 알리면 오일 값이 전액 공짜가 되는 혜택 시스템입니다."
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-[#dfd2ec] space-y-1 shadow-xs">
                  <h4 className="font-black text-[#3b1263] text-xs">
                    제3장. 컨트롤 계정 2개 운영을 통한 월 100만 원 압축 로드맵
                  </h4>
                  <p className="text-[10.5px] text-[#4f3d64] leading-relaxed font-medium">
                    가족 명의 계정 2개를 1대와 2대에 전략 배치하여, 매월 발생하는 패스트스타트 주급 20%와 10%를 우리 집 통장으로 2중 회수하고 P3 1~2단계 볼륨 누락을 방어하는 실전 배치 설계도.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Return Button */}
      <div className="pt-2 border-t border-[#ddceec] mt-1 text-center">
        <button
          type="button"
          onClick={handleClose}
          className="calc-btn-base w-full py-2 rounded-xl bg-[#522180] hover:bg-[#43196a] text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
        >
          <span>계산기로 돌아가기</span>
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
