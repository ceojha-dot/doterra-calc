export interface OilItem {
  id: string;
  name: string;
  category: '단일(싱글)' | '블렌드' | '롤온(터치)' | '스페셜키트' | '뷰티/스킨케어' | '건강기능식품';
  volume: string;
  pv: number;
  priceKrw: number;
  costPerPv: number; // 1 PV당 원화 금액 (가성비 지표: 낮을수록 최고 가성비!)
  rank: number; // 전체 가성비 순위
  note?: string;
  drops?: number; // 골라담기 방울 수량 (해당하는 경우)
  totalDrops: number; // 한 병당 총 방울 수 (15ml=250방울, 5ml=85방울 등)
  costPerDrop: number; // 1방울당 원가 (원)
}

// 4장 가격 안내서에서 추출한 에센셜 오일 및 주요 제품 데이터 (1 PV당 최저가 순으로 정렬)
export const RAW_OIL_DATABASE: Omit<OilItem, 'costPerPv' | 'rank' | 'totalDrops' | 'costPerDrop'>[] = [
  // --- 1. 단일 에센셜 오일 (SINGLES) ---
  { id: 's_orange_15', name: '오렌지', category: '단일(싱글)', volume: '15ml', pv: 13.5, priceKrw: 17000, drops: 1, note: '과일향, 기분전환, 가성비 1등 라인' },
  { id: 's_peppermint_15', name: '페퍼민트', category: '단일(싱글)', volume: '15ml', pv: 28.5, priceKrw: 36000, drops: 1.5, note: '★ 대표님 추천 최강 가성비! 쿨링, 호흡, 활력' },
  { id: 's_lemon_15', name: '레몬', category: '단일(싱글)', volume: '15ml', pv: 15.75, priceKrw: 20000, drops: 0.5, note: '디톡스, 활력, 음용 최고 인기' },
  { id: 's_lemongrass_15', name: '레몬그라스', category: '단일(싱글)', volume: '15ml', pv: 15.75, priceKrw: 21000, drops: 0.5, note: '근육 이완, 청량감' },
  { id: 's_grapefruit_15', name: '자몽(그레이프프룻)', category: '단일(싱글)', volume: '15ml', pv: 23.75, priceKrw: 30000, drops: 1, note: '식욕 조절, 림프 순환, 상큼한 시트러스' },
  { id: 's_lime_15', name: '라임', category: '단일(싱글)', volume: '15ml', pv: 19, priceKrw: 24000, drops: 0.5, note: '상큼한 에너지' },
  { id: 's_eucalyptus_15', name: '유칼립투스', category: '단일(싱글)', volume: '15ml', pv: 19, priceKrw: 24000, drops: 1, note: '맑은 호흡, 청정' },
  { id: 's_teatree_15', name: '티트리(멜라루카)', category: '단일(싱글)', volume: '15ml', pv: 28.5, priceKrw: 36000, drops: 1.5, note: '피부 진정, 청결의 대명사' },
  { id: 's_clove_15', name: '클로브', category: '단일(싱글)', volume: '15ml', pv: 23, priceKrw: 29000, drops: 1, note: '항산화, 구강 건강' },
  { id: 's_rosemary_15', name: '로즈마리', category: '단일(싱글)', volume: '15ml', pv: 23, priceKrw: 29000, drops: 1, note: '기억력, 두피 활력' },
  { id: 's_lavender_15', name: '라벤더', category: '단일(싱글)', volume: '15ml', pv: 31.5, priceKrw: 40000, drops: 1.5, note: '숙면, 진정, 만능 오일의 왕' },
  { id: 's_cedarwood_15', name: '시더우드', category: '단일(싱글)', volume: '15ml', pv: 19, priceKrw: 25000, drops: 0.5, note: '그라운딩, 두피 진정' },
  { id: 's_oregano_15', name: '오레가노', category: '단일(싱글)', volume: '15ml', pv: 32.5, priceKrw: 41000, drops: 1, note: '천연 면역 보호막' },
  { id: 's_wintergreen_15', name: '윈터그린', category: '단일(싱글)', volume: '15ml', pv: 27.75, priceKrw: 35000, drops: 1, note: '시원한 쿨링감, 근육 진정' },
  { id: 's_siberianfir_15', name: '시베리안 퍼', category: '단일(싱글)', volume: '15ml', pv: 25.25, priceKrw: 32000, drops: 1, note: '깊은 숲속 피톤치드' },
  { id: 's_cypress_15', name: '사이프레스', category: '단일(싱글)', volume: '15ml', pv: 23, priceKrw: 29000, drops: 1, note: '순환, 에너지 흐름' },
  { id: 's_green_mandarin_15', name: '그린만다린', category: '단일(싱글)', volume: '15ml', pv: 36.25, priceKrw: 46000, note: '풋풋한 시트러스' },
  { id: 's_spearmint_15', name: '스피어민트', category: '단일(싱글)', volume: '15ml', pv: 35.5, priceKrw: 45000, drops: 1.5, note: '부드러운 민트' },
  { id: 's_cinnamon_5', name: '시나몬 바크', category: '단일(싱글)', volume: '5ml', pv: 34.75, priceKrw: 44000, drops: 1.5, note: '따뜻한 온기, 신진대사' },
  { id: 's_basil_15', name: '바질', category: '단일(싱글)', volume: '15ml', pv: 34, priceKrw: 43000, drops: 1.5, note: '집중력, 근육 피로' },
  { id: 's_copaiba_15', name: '코파이바', category: '단일(싱글)', volume: '15ml', pv: 46.75, priceKrw: 59000, drops: 2, note: '신경계 안정, 천연 카나비노이드' },
  { id: 's_marjoram_15', name: '마조람', category: '단일(싱글)', volume: '15ml', pv: 27.75, priceKrw: 35000, drops: 1, note: '근육 이완, 편안한 릴랙스' },
  { id: 's_frankincense_15', name: '프랑킨센스', category: '단일(싱글)', volume: '15ml', pv: 84.5, priceKrw: 112000, drops: 3.5, note: '오일의 왕! 세포 재생, 피부 영양' },
  { id: 's_vetiver_15', name: '베티버', category: '단일(싱글)', volume: '15ml', pv: 62, priceKrw: 79000, drops: 2.5, note: '깊은 흙내음, 수면 안정' },
  { id: 's_myrrh_15', name: '미르(몰약)', category: '단일(싱글)', volume: '15ml', pv: 81, priceKrw: 103000, drops: 3, note: '점막, 피부 회복' },
  { id: 's_helichrysum_5', name: '헬리크리섬', category: '단일(싱글)', volume: '5ml', pv: 92, priceKrw: 117000, drops: 3.5, note: '영원한 꽃, 피부 치유' },
  { id: 's_melissa_5', name: '멜리사', category: '단일(싱글)', volume: '5ml', pv: 103.5, priceKrw: 146000, drops: 4.5, note: '최고급 진정 허브' },
  { id: 's_rose_5', name: '로즈', category: '단일(싱글)', volume: '5ml', pv: 352, priceKrw: 450000, drops: 10, note: '최고귀 오일의 여왕' },

  // --- 2. 블렌드 에센셜 오일 (BLENDS) ---
  { id: 'b_onguard_15', name: '온가드', category: '블렌드', volume: '15ml', pv: 44.25, priceKrw: 56000, drops: 1.5, note: '★ 블렌드 가성비 1등! 도테라 면역 필수 대표작' },
  { id: 'b_aromatouch_15', name: '아로마터치', category: '블렌드', volume: '15ml', pv: 38.75, priceKrw: 49000, drops: 1.5, note: '8단계 마사지 테크닉 전용 블렌드' },
  { id: 'b_digestzen_15', name: '다이제스트젠', category: '블렌드', volume: '15ml', pv: 42.75, priceKrw: 54000, drops: 1.5, note: '편안한 속, 소화기 건강' },
  { id: 'b_deepblue_5', name: '딥블루', category: '블렌드', volume: '5ml', pv: 43.5, priceKrw: 55000, drops: 1.5, note: '시원한 쿨링 수딩 마사지' },
  { id: 'b_purify_15', name: '퓨리파이', category: '블렌드', volume: '15ml', pv: 27, priceKrw: 34000, drops: 0.5, note: '공기 정화, 불쾌한 냄새 탈취' },
  { id: 'b_citrusbliss_15', name: '시트러스 블리스', category: '블렌드', volume: '15ml', pv: 25.25, priceKrw: 32000, drops: 1, note: '행복 호르몬, 상큼 활력' },
  { id: 'b_balance_15', name: '밸런스(그라운딩)', category: '블렌드', volume: '15ml', pv: 26, priceKrw: 33000, drops: 1, note: '심신 안정, 차분한 그라운딩' },
  { id: 'b_smartnsassy_15', name: '스마트앤새시', category: '블렌드', volume: '15ml', pv: 35.5, priceKrw: 45000, drops: 1.5, note: '대사 활력, 체중 관리 블렌드' },
  { id: 'b_serenity_15', name: '세레니티', category: '블렌드', volume: '15ml', pv: 44.25, priceKrw: 56000, drops: 1.5, note: '숙면과 깊은 휴식 블렌드' },
  { id: 'b_intune_10', name: '인튠', category: '블렌드', volume: '10ml', pv: 46.25, priceKrw: 59000, drops: 1.5, note: '수험생 집중력 포커스 롤온' },
  { id: 'b_clarycalm_10', name: '클라리캄', category: '블렌드', volume: '10ml', pv: 36.25, priceKrw: 46000, drops: 1.5, note: '여성 주기 밸런스 케어' },
  { id: 'b_whisper_5', name: '위스퍼', category: '블렌드', volume: '5ml', pv: 33, priceKrw: 42000, drops: 1.5, note: '우아한 천연 향수 블렌드' },

  // --- 3. 롤온 터치 시리즈 (TOUCH ROLL-ON) ---
  { id: 't_peppermint_touch_10', name: '페퍼민트 터치', category: '롤온(터치)', volume: '10ml', pv: 21.25, priceKrw: 27000, drops: 0.5, note: '휴대용 즉각 쿨링' },
  { id: 't_lavender_touch_10', name: '라벤더 터치', category: '롤온(터치)', volume: '10ml', pv: 21.25, priceKrw: 27000, drops: 0.5, note: '피부 진정, 힐링' },
  { id: 't_teatree_touch_10', name: '티트리 터치', category: '롤온(터치)', volume: '10ml', pv: 21.25, priceKrw: 27000, drops: 0.5, note: '스팟 트러블 케어' },
  { id: 't_onguard_touch_10', name: '온가드 터치', category: '롤온(터치)', volume: '10ml', pv: 28.5, priceKrw: 36000, drops: 1, note: '목, 가슴 안심 터치' },
  { id: 't_frankincense_touch_10', name: '프랑킨센스 터치', category: '롤온(터치)', volume: '10ml', pv: 60.75, priceKrw: 77000, drops: 2.5, note: '눈가, 이마 프리미엄 안티에이징' },
  { id: 't_rose_touch_10', name: '로즈 터치', category: '롤온(터치)', volume: '10ml', pv: 86.5, priceKrw: 109000, drops: 3.5, note: '럭셔리 플로럴 테라피' },
  { id: 't_neroli_touch_10', name: '네롤리 터치', category: '롤온(터치)', volume: '10ml', pv: 61.75, priceKrw: 78000, drops: 2.5, note: '오렌지꽃의 깊은 위로' },

  // --- 4. 코코넛 캐리어 오일 & 필수 부자재 ---
  { id: 'c_coconut_115', name: '코코넛 오일(분획)', category: '단일(싱글)', volume: '115ml', pv: 12.25, priceKrw: 19000, drops: 0.5, note: '모든 오일 블렌딩 & 희석 필수 베이스' },
];

export function getVolumeDrops(volume: string): number {
  if (volume.includes('15ml')) return 250;
  if (volume.includes('5ml')) return 85;
  if (volume.includes('10ml')) return 200;
  if (volume.includes('115ml')) return 1900;
  return 250;
}

// 가성비 계산 (원화 / PV) 및 랭킹 정렬 완료된 정규 목록
export const OIL_DATABASE: OilItem[] = [...RAW_OIL_DATABASE]
  .map((item) => {
    const totalDrops = getVolumeDrops(item.volume);
    const costPerDrop = Math.round(item.priceKrw / totalDrops);
    return {
      ...item,
      totalDrops,
      costPerDrop,
      costPerPv: Math.round(item.priceKrw / item.pv),
      rank: 0,
    };
  })
  .sort((a, b) => a.costPerPv - b.costPerPv)
  .map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

export interface DiyPresetRecipe {
  id: string;
  name: string;
  desc: string;
  targetVolume: string; // '10ml 롤온' | '30ml 미스트'
  bottleCost: number; // 공병 가격 (예: 800원)
  carrierCost: number; // 코코넛 오일 가격 (예: 300원)
  items: { oilId: string; drops: number }[];
}

export const DIY_PRESET_RECIPES: DiyPresetRecipe[] = [
  {
    id: 'preset_energy',
    name: '🌿 활력 & 집중 롤온',
    desc: '운전, 공부, 피로할 때 관자놀이와 목뒤에 쓱쓱 바르는 국민 롤온',
    targetVolume: '10ml 롤온',
    bottleCost: 800,
    carrierCost: 300,
    items: [
      { oilId: 's_peppermint_15', drops: 5 },
      { oilId: 's_lemon_15', drops: 5 },
    ],
  },
  {
    id: 'preset_sleep',
    name: '🌙 꿀잠 & 릴랙스 롤온',
    desc: '하루의 긴장을 풀고 편안한 수면으로 안내하는 베개 & 손목 힐링 롤온',
    targetVolume: '10ml 롤온',
    bottleCost: 800,
    carrierCost: 300,
    items: [
      { oilId: 's_lavender_15', drops: 6 },
      { oilId: 's_orange_15', drops: 4 },
    ],
  },
  {
    id: 'preset_immune',
    name: '🛡️ 온가드 면역 보호 롤온',
    desc: '환절기 목, 가슴, 발바닥에 발라 온 가족 면역력을 지키는 필수 롤온',
    targetVolume: '10ml 롤온',
    bottleCost: 800,
    carrierCost: 300,
    items: [
      { oilId: 'b_onguard_15', drops: 5 },
      { oilId: 's_teatree_15', drops: 3 },
      { oilId: 's_frankincense_15', drops: 1 },
    ],
  },
  {
    id: 'preset_soothing',
    name: '💆 목·어깨 수딩 마사지 롤온',
    desc: '뻐근한 목과 어깨, 뭉친 근육을 부드럽고 시원하게 풀어주는 마사지 롤온',
    targetVolume: '10ml 롤온',
    bottleCost: 800,
    carrierCost: 300,
    items: [
      { oilId: 'b_aromatouch_15', drops: 6 },
      { oilId: 's_peppermint_15', drops: 3 },
    ],
  },
  {
    id: 'preset_calm',
    name: '🌸 여성 밸런스 이너피스 롤온',
    desc: '마음의 평온과 여성 호르몬 리듬을 부드럽게 지켜주는 아로마 테라피',
    targetVolume: '10ml 롤온',
    bottleCost: 800,
    carrierCost: 300,
    items: [
      { oilId: 'b_clarycalm_10', drops: 5 },
      { oilId: 's_lavender_15', drops: 3 },
      { oilId: 's_frankincense_15', drops: 1 },
    ],
  },
  {
    id: 'preset_breathe_mist',
    name: '🍃 맑은 호흡 청정 스프레이',
    desc: '답답한 공간, 마스크 속 맑은 숨결을 찾아주는 상쾌한 룸&패브릭 미스트',
    targetVolume: '30ml 미스트',
    bottleCost: 1000,
    carrierCost: 0,
    items: [
      { oilId: 's_peppermint_15', drops: 5 },
      { oilId: 's_eucalyptus_15', drops: 5 },
      { oilId: 's_teatree_15', drops: 3 },
    ],
  },
];
