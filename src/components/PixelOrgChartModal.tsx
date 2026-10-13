import React, { useState, useEffect } from 'react';
import { X, Users, Sparkles, Check, Edit3, RotateCcw, Award } from 'lucide-react';
import { soundManager } from '../utils/audio';

export interface PartnerNode {
  id: string;
  role: 'YOU' | 'P1' | 'P2' | 'P3' | 'SUB';
  level: number;
  parentId?: string;
  defaultName: string;
  name: string;
  pv: number;
  status: 'ACTIVE' | 'BUILDER' | 'CONSUMER';
  color: string;
}

const DEFAULT_MEMBERS: PartnerNode[] = [
  // 0레벨: 본인
  { id: 'you', role: 'YOU', level: 0, defaultName: '박정하 대표님 (YOU)', name: '박정하 대표님 (YOU)', pv: 150, status: 'BUILDER', color: '#8a2be2' },
  
  // 1레벨: 파워 오브 쓰리 1단계 핵심 파트너 3명
  { id: 'p1', role: 'P1', level: 1, parentId: 'you', defaultName: '1호 빌더 파트너', name: '1호 빌더 파트너', pv: 150, status: 'BUILDER', color: '#4361ee' },
  { id: 'p2', role: 'P2', level: 1, parentId: 'you', defaultName: '2호 빌더 파트너', name: '2호 빌더 파트너', pv: 150, status: 'BUILDER', color: '#4361ee' },
  { id: 'p3', role: 'P3', level: 1, parentId: 'you', defaultName: '3호 쉐어러 파트너', name: '3호 쉐어러 파트너', pv: 150, status: 'BUILDER', color: '#4361ee' },

  // 2레벨: 각 파트너 하위 3명씩 (총 9명)
  { id: 'p1_1', role: 'SUB', level: 2, parentId: 'p1', defaultName: '파트너 1-A', name: '파트너 1-A', pv: 100, status: 'CONSUMER', color: '#06d6a0' },
  { id: 'p1_2', role: 'SUB', level: 2, parentId: 'p1', defaultName: '파트너 1-B', name: '파트너 1-B', pv: 100, status: 'CONSUMER', color: '#06d6a0' },
  { id: 'p1_3', role: 'SUB', level: 2, parentId: 'p1', defaultName: '파트너 1-C', name: '파트너 1-C', pv: 100, status: 'CONSUMER', color: '#06d6a0' },

  { id: 'p2_1', role: 'SUB', level: 2, parentId: 'p2', defaultName: '파트너 2-A', name: '파트너 2-A', pv: 100, status: 'CONSUMER', color: '#06d6a0' },
  { id: 'p2_2', role: 'SUB', level: 2, parentId: 'p2', defaultName: '파트너 2-B', name: '파트너 2-B', pv: 100, status: 'CONSUMER', color: '#06d6a0' },
  { id: 'p2_3', role: 'SUB', level: 2, parentId: 'p2', defaultName: '파트너 2-C', name: '파트너 2-C', pv: 100, status: 'CONSUMER', color: '#06d6a0' },

  { id: 'p3_1', role: 'SUB', level: 2, parentId: 'p3', defaultName: '파트너 3-A', name: '파트너 3-A', pv: 100, status: 'CONSUMER', color: '#06d6a0' },
  { id: 'p3_2', role: 'SUB', level: 2, parentId: 'p3', defaultName: '파트너 3-B', name: '파트너 3-B', pv: 100, status: 'CONSUMER', color: '#06d6a0' },
  { id: 'p3_3', role: 'SUB', level: 2, parentId: 'p3', defaultName: '파트너 3-C', name: '파트너 3-C', pv: 100, status: 'CONSUMER', color: '#06d6a0' },
];

interface PixelOrgChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PixelOrgChartModal: React.FC<PixelOrgChartModalProps> = ({ isOpen, onClose }) => {
  const [members, setMembers] = useState<PartnerNode[]>(() => {
    try {
      const saved = localStorage.getItem('doterra_pixel_org_members');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_MEMBERS;
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempName, setTempName] = useState<string>('');
  const [tempPv, setTempPv] = useState<number>(100);

  useEffect(() => {
    try {
      localStorage.setItem('doterra_pixel_org_members', JSON.stringify(members));
    } catch {
      // storage full or blocked
    }
  }, [members]);

  if (!isOpen) return null;

  const handleStartEdit = (node: PartnerNode) => {
    soundManager.playClick('func');
    setEditingId(node.id);
    setTempName(node.name);
    setTempPv(node.pv);
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    soundManager.playClick('accent');
    setMembers((prev) =>
      prev.map((m) => (m.id === editingId ? { ...m, name: tempName.trim() || m.defaultName, pv: tempPv } : m))
    );
    setEditingId(null);
  };

  const handleReset = () => {
    soundManager.playClick('func');
    if (window.confirm('조직도 파트너 명단을 기본 상태로 초기화할까요?')) {
      setMembers(DEFAULT_MEMBERS);
    }
  };

  // 계산 통계
  const level0 = members.find((m) => m.level === 0);
  const level1 = members.filter((m) => m.level === 1);
  const level2 = members.filter((m) => m.level === 2);

  const team1Volume = (level0?.pv || 0) + level1.reduce((acc, m) => acc + m.pv, 0);
  const isP3Step1Met = (level0?.pv || 0) >= 100 && level1.every((m) => m.pv >= 100) && team1Volume >= 600;

  return (
    <div className="absolute inset-0 z-50 bg-[#141a17] text-[#e8f5e9] rounded-[22px] sm:rounded-[26px] p-3 sm:p-4 flex flex-col font-mono shadow-2xl animate-in fade-in duration-200 border-2 border-[#3d5a45] overflow-hidden">
      
      {/* Top Retro Pixel Header */}
      <div className="flex items-center justify-between pb-2 border-b-2 border-dashed border-[#2f4f38]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#223829] border border-[#4ade80] flex items-center justify-center text-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.3)]">
            <Users size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-[#4ade80] tracking-wider uppercase">
                [PIXEL ORG] 도테라 파트너 조직도
              </span>
              <span className="text-[10px] bg-[#1d3525] text-[#86efac] px-1.5 py-0.5 rounded border border-[#3b6348]">
                L1 600PV 달성표
              </span>
            </div>
            <p className="text-[10px] text-[#94a3b8] font-sans">
              블록을 터치하면 파트너 이름과 주문 PV를 직접 작성/수정할 수 있습니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleReset}
            type="button"
            className="p-1.5 text-slate-400 hover:text-white rounded bg-[#1e2922] border border-[#334b3a] text-[10px] flex items-center gap-1 cursor-pointer"
            title="초기화"
          >
            <RotateCcw size={12} />
          </button>
          <button
            onClick={() => {
              soundManager.playClick('func');
              onClose();
            }}
            type="button"
            className="w-8 h-8 rounded-lg bg-[#223829] border border-[#4ade80]/40 text-[#4ade80] hover:bg-[#2d4d38] flex items-center justify-center cursor-pointer transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="my-2 py-1.5 px-3 bg-[#1a251e] rounded-lg border border-[#2e4735] flex items-center justify-between text-xs font-sans">
        <div className="flex items-center gap-2">
          <span className="text-[#86efac] font-bold">1대 팀 볼륨:</span>
          <span className="text-amber-300 font-extrabold text-sm">{team1Volume} PV</span>
          <span className="text-slate-400 text-[11px]">(목표 600 PV)</span>
        </div>
        <div className="flex items-center gap-1">
          {isP3Step1Met ? (
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500 font-black text-[11px] flex items-center gap-1">
              <Check size={12} /> 1단계 5만원(부스트 10만) 달성!
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-600 font-bold text-[11px]">
              필요: {Math.max(0, 600 - team1Volume)} PV 추가
            </span>
          )}
        </div>
      </div>

      {/* Main Pixel Tree Interactive Canvas */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col items-center gap-3 py-1 custom-scrollbar">
        
        {/* Level 0: YOU */}
        {level0 && (
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleStartEdit(level0)}
              type="button"
              className="relative group px-4 py-2 rounded-xl bg-gradient-to-b from-[#6b21a8] to-[#4c1d95] border-2 border-[#c084fc] shadow-[0_0_12px_rgba(192,132,252,0.4)] text-center cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-center gap-1.5">
                <Award size={14} className="text-amber-300 animate-pulse" />
                <span className="font-black text-amber-300 text-xs sm:text-sm">{level0.name}</span>
                <Edit3 size={11} className="text-purple-300 opacity-70 group-hover:opacity-100" />
              </div>
              <div className="text-[11px] text-purple-200 mt-0.5 font-bold">
                본인 LRP: <span className="text-white font-extrabold">{level0.pv} PV</span>
              </div>
            </button>
            <div className="w-0.5 h-4 bg-[#4ade80]/60 my-0.5" />
          </div>
        )}

        {/* Level 1: 3 Direct Partners */}
        <div className="w-full">
          <div className="text-center text-[10px] text-[#4ade80] font-bold tracking-widest mb-1 uppercase">
            ▼ Level 1 (비즈니스 핵심 파트너 3명) ▼
          </div>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {level1.map((p, idx) => (
              <div key={p.id} className="flex flex-col items-center">
                <button
                  onClick={() => handleStartEdit(p)}
                  type="button"
                  className="w-full p-2 rounded-lg bg-[#1e3a2b] hover:bg-[#254936] border-2 border-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.2)] text-left cursor-pointer transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between text-[10.5px] font-black text-[#86efac]">
                    <span>#{idx + 1} 레그</span>
                    <Edit3 size={10} className="text-[#86efac] opacity-70" />
                  </div>
                  <div className="text-xs font-extrabold text-white truncate mt-0.5">
                    {p.name}
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px]">
                    <span className="text-slate-300">실적:</span>
                    <span className={`font-black ${p.pv >= 100 ? 'text-[#4ade80]' : 'text-amber-400'}`}>
                      {p.pv} PV
                    </span>
                  </div>
                </button>
                <div className="w-0.5 h-3 bg-[#4ade80]/40 my-0.5" />
              </div>
            ))}
          </div>
        </div>

        {/* Level 2: 9 Sub Builders/Consumers */}
        <div className="w-full">
          <div className="text-center text-[10px] text-slate-400 font-bold tracking-widest mb-1 uppercase">
            ▼ Level 2 (빌더 / 쉐어러 / 소비자 파트너 각 3명씩) ▼
          </div>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {/* Leg 1 Subs */}
            <div className="flex flex-col gap-1 bg-[#14231b] p-1.5 rounded-lg border border-[#233f2e]">
              <span className="text-[9px] text-[#86efac] font-bold text-center border-b border-[#233f2e] pb-0.5">1호 하위</span>
              {level2.slice(0, 3).map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleStartEdit(sub)}
                  type="button"
                  className="p-1 rounded bg-[#1b2f24] hover:bg-[#233c2e] border border-[#3b5f47] text-left cursor-pointer text-[10px]"
                >
                  <div className="text-slate-200 font-bold truncate">{sub.name}</div>
                  <div className="text-[#86efac] font-semibold text-[9.5px]">{sub.pv} PV</div>
                </button>
              ))}
            </div>

            {/* Leg 2 Subs */}
            <div className="flex flex-col gap-1 bg-[#14231b] p-1.5 rounded-lg border border-[#233f2e]">
              <span className="text-[9px] text-[#86efac] font-bold text-center border-b border-[#233f2e] pb-0.5">2호 하위</span>
              {level2.slice(3, 6).map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleStartEdit(sub)}
                  type="button"
                  className="p-1 rounded bg-[#1b2f24] hover:bg-[#233c2e] border border-[#3b5f47] text-left cursor-pointer text-[10px]"
                >
                  <div className="text-slate-200 font-bold truncate">{sub.name}</div>
                  <div className="text-[#86efac] font-semibold text-[9.5px]">{sub.pv} PV</div>
                </button>
              ))}
            </div>

            {/* Leg 3 Subs */}
            <div className="flex flex-col gap-1 bg-[#14231b] p-1.5 rounded-lg border border-[#233f2e]">
              <span className="text-[9px] text-[#86efac] font-bold text-center border-b border-[#233f2e] pb-0.5">3호 하위</span>
              {level2.slice(6, 9).map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleStartEdit(sub)}
                  type="button"
                  className="p-1 rounded bg-[#1b2f24] hover:bg-[#233c2e] border border-[#3b5f47] text-left cursor-pointer text-[10px]"
                >
                  <div className="text-slate-200 font-bold truncate">{sub.name}</div>
                  <div className="text-[#86efac] font-semibold text-[9.5px]">{sub.pv} PV</div>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Edit Overlay Modal inside Org Chart */}
      {editingId && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-xs z-50 flex items-center justify-center p-3 animate-in fade-in">
          <div className="w-full max-w-[320px] bg-[#1a2b20] border-2 border-[#4ade80] rounded-xl p-3.5 shadow-2xl flex flex-col gap-3 font-sans">
            <div className="flex items-center justify-between border-b border-[#2d4d38] pb-1.5">
              <span className="text-xs font-bold text-[#86efac]">파트너 정보 수정</span>
              <button
                onClick={() => setEditingId(null)}
                type="button"
                className="text-slate-400 hover:text-white"
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex flex-col gap-1 text-xs">
              <label className="text-slate-300 font-semibold">파트너 이름</label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="이름 입력 (예: 김은희 리더)"
                className="bg-[#0f1a14] border border-[#3d664c] rounded px-2.5 py-1.5 text-white font-bold focus:outline-none focus:border-[#4ade80]"
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-1 text-xs">
              <label className="text-slate-300 font-semibold">주문 PV 설정</label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={tempPv}
                  onChange={(e) => setTempPv(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  className="w-24 bg-[#0f1a14] border border-[#3d664c] rounded px-2.5 py-1.5 text-[#4ade80] font-black focus:outline-none focus:border-[#4ade80]"
                />
                <span className="text-slate-400 text-xs">PV</span>
                <div className="flex items-center gap-1 ml-auto">
                  <button
                    type="button"
                    onClick={() => setTempPv(100)}
                    className="px-1.5 py-1 rounded bg-[#233c2e] hover:bg-[#2d4e3b] text-[10px] text-white"
                  >
                    100
                  </button>
                  <button
                    type="button"
                    onClick={() => setTempPv(150)}
                    className="px-1.5 py-1 rounded bg-[#233c2e] hover:bg-[#2d4e3b] text-[10px] text-[#86efac] font-bold"
                  >
                    150
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="flex-1 py-1.5 rounded bg-[#223528] text-slate-300 text-xs font-semibold"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="flex-1 py-1.5 rounded bg-[#4ade80] hover:bg-[#22c55e] text-slate-950 font-black text-xs flex items-center justify-center gap-1 shadow-md"
              >
                <Check size={13} /> 저장 완료
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Tip Bar */}
      <div className="pt-2 border-t border-[#23382b] flex items-center justify-between text-[10px] text-slate-400 font-sans">
        <span className="flex items-center gap-1 text-[#86efac]">
          <Sparkles size={11} /> 작성된 이름은 브라우저에 안전하게 보관됩니다.
        </span>
        <button
          onClick={() => {
            soundManager.playClick('func');
            onClose();
          }}
          type="button"
          className="text-[#4ade80] hover:underline font-bold"
        >
          계산기로 돌아가기 ➔
        </button>
      </div>

    </div>
  );
};
