import { RankSubMenuItem, RankType } from '../types';

export const RANK_SUBMENUS: Record<RankType, RankSubMenuItem[]> = {
  ELITE: [
    {
      id: 'qualification',
      label: '자격조건',
      title: 'ELITE 직급 달성 요건',
      summary: '조직 총 볼륨(OV) 3,000을 바탕으로 리더십 기반을 다지는 핵심 기초 직급',
      criteriaList: [
        { label: '개인 실적 (PV)', value: '100 PV 이상 (LRP 권장)', note: '모든 수당 수령 필수 자격' },
        { label: '조직 총 볼륨 (OV)', value: '3,000 OV 이상', note: '본인 및 다운라인 전체 합산' },
        { label: '필수 레그 조건', value: '독립 레그 요건 없음', note: '단일 또는 다중 레그 자유' },
      ],
      guideTips: [
        '별도 독립 레그 조건 없이 조직 총 볼륨(OV) 3,000 달성 시 인정',
        '다음 직급(프리미어) 도약을 위해 2개 핵심 레그(각 1,000~1,500 OV) 분산 육성 권장'
      ]
    },
    {
      id: 'structure',
      label: '추천구조',
      title: 'ELITE 추천 조직 구조',
      summary: '안정적인 3,000 OV 유지를 위한 파트너 및 소비자 배치 가이드',
      criteriaList: [
        { label: '추천 레그 구조', value: '2~3개 활성 라인', note: '프리미어 승급 대비 분산' },
        { label: '레그별 분산 목표', value: '각 레그 1,000~1,500 OV', note: 'Executive 레그 성장 목표' },
        { label: '재구매 기반', value: 'LRP 100~125 PV 소비자', note: '매월 안정적인 기본 볼륨' }
      ],
      guideTips: [
        '100~125 PV LRP 정기구매 소비자 비율 극대화가 핵심',
        '핵심 파트너 2~3명을 중심으로 조직 분산 시 장기 유지 유리'
      ]
    },
    {
      id: 'p3',
      label: 'P3 연계',
      title: 'Power of 3 1단계 ($50)',
      summary: '엘리트 단계에서 동시에 완성하는 파워 오브 쓰리 1단계 기본 구조',
      criteriaList: [
        { label: 'P3 목표 단계', value: '1단계 ($50 / 약 6만원)', note: '매월 고정 팀 보너스' },
        { label: '팀 볼륨 (TV)', value: '600 TV 이상', note: '본인 + 1차 다운라인 합산' },
        { label: '1차 필수 파트너', value: '100 PV LRP 3명 이상', note: '본인 포함 총 600 TV' }
      ],
      guideTips: [
        'P3 1단계 600 TV는 Elite 3,000 OV의 20%를 탄탄하게 뒷받침',
        '파트너 3명에게도 동일한 1단계 복제를 교육하여 2단계($250) 준비'
      ]
    },
    {
      id: 'compensation',
      label: '수당체계',
      title: 'ELITE 수당 발생 요율',
      summary: '엘리트 직급에서 수령 가능한 패스트스타트 및 유니레벨 요율',
      criteriaList: [
        { label: '패스트 스타트', value: '1대 20% / 2대 10% / 3대 5%', note: '신규 가입 60일간 주급' },
        { label: '유니레벨 개방', value: '최대 5레벨까지 개방', note: '1대:2%, 2대:3%, 3~4대:5%, 5대:6%' },
        { label: '파워 오브 쓰리', value: '1단계 $50 달성 가능', note: '구조 완성 시 월급 지급' }
      ],
      guideTips: [
        '신규 60일 이후에는 5레벨(6%)까지 유니레벨 보너스가 월급으로 발생',
        'LRP 템플릿 100 PV 이상 상시 유지가 모든 수당 수령의 기본 전제'
      ]
    }
  ],
  PREMIER: [
    {
      id: 'qualification',
      label: '자격조건',
      title: 'PREMIER 직급 달성 요건',
      summary: '2개의 독립된 Executive 레그와 전체 5,000 OV를 충족하는 리더십 직급',
      criteriaList: [
        { label: '개인 실적 (PV)', value: '100 PV 이상 (LRP 주문)', note: '필수 유지' },
        { label: '조직 총 볼륨 (OV)', value: '5,000 OV 이상', note: '전체 그룹 실적 합산' },
        { label: '필수 독립 레그', value: '2개 독립 Executive 레그', note: '각 레그 2,000 OV 이상' }
      ],
      guideTips: [
        '각 2,000 OV 이상의 Executive 2개 레그 직접 후원(Personally Enrolled) 필수',
        '두 레그 합산(4,000 OV) 외에 사이드 볼륨 최소 1,000 OV 추가 필요'
      ]
    },
    {
      id: 'leg_structure',
      label: '레그구조',
      title: 'PREMIER 2 Executive 레그 구조',
      summary: '2개의 주력 레그 육성 및 사이드 볼륨 균형 관리',
      criteriaList: [
        { label: '레그 1', value: 'Executive (2,000 OV 이상)', note: '직접 후원 레그 리더' },
        { label: '레그 2', value: 'Executive (2,000 OV 이상)', note: '직접 후원 레그 리더' },
        { label: '사이드 볼륨', value: '1,000 OV 이상', note: '본인 및 기타 라인 볼륨' }
      ],
      guideTips: [
        '두 레그가 각 2,000 OV를 넘더라도 전체 5,000 OV 미달 시 프리미어 미인정',
        '사이드 볼륨 안정화를 위한 3번째 예비 레그 동시 육성 권장'
      ]
    },
    {
      id: 'p3_integration',
      label: 'P3 연계',
      title: 'Power of 3 2단계 ($250)',
      summary: '프리미어 조직 볼륨과 시너지를 이루는 P3 2단계 보너스 구조',
      criteriaList: [
        { label: 'P3 목표 단계', value: '2단계 ($250 / 약 30만원)', note: '파트너 3명의 1단계 복제' },
        { label: '필요 조직 규모', value: '총 12명 (3명 + 9명)', note: '모두 100 PV LRP 유지' },
        { label: '팀 볼륨 (TV)', value: '각 그룹 600 TV 충족', note: '총 1,800 TV 이상 형성' }
      ],
      guideTips: [
        'Premier 직급과 P3 2단계($250)는 구조적으로 완벽한 시너지 창출',
        '1차 파트너 3명이 각 1단계($50)를 수령하도록 지원하는 것이 핵심'
      ]
    },
    {
      id: 'bonus_benefits',
      label: '보너스풀',
      title: 'PREMIER 보너스 및 글로벌 풀',
      summary: '엠파워먼트 보너스 풀 및 유니레벨 6레벨 개방 혜택',
      criteriaList: [
        { label: '엠파워먼트 풀', value: '1지분 획득 가능 (1.25% 풀)', note: '해당 월 신규 직접 100 PV 후원 시' },
        { label: '유니레벨 6레벨', value: '6레벨(6%)까지 전면 개방', note: '하부 조직 볼륨 수당 극대화' },
        { label: '패스트 스타트', value: '1대 20% / 2대 10% / 3대 5%', note: '주급 지급 지속' }
      ],
      guideTips: [
        '당월 신규 1명 직접 후원(100 PV 이상) 시 엠파워먼트 풀 보너스 1지분 추가 수령',
        '하부 볼륨의 깊이에 따른 유니레벨 6단계(6%) 수당 본격 수혜'
      ]
    }
  ],
  SILVER: [
    {
      id: 'qualification',
      label: '자격조건',
      title: 'SILVER 직급 달성 요건',
      summary: '3개 독립 Elite 레그를 육성하여 완성하는 리더십 직급',
      criteriaList: [
        { label: '개인 실적 (PV)', value: '100 PV 이상 (LRP 주문)', note: '필수 유지' },
        { label: '필수 직급 레그', value: '3개 독립 Elite 레그', note: '각 레그 3,000 OV 이상' },
        { label: '직접 후원 조건', value: '3명의 Elite가 본인의 직접 후원자', note: '핵심 자격' }
      ],
      guideTips: [
        '조직 총 볼륨 최소 9,000 OV 이상 (각 3,000 OV × 3개 레그)',
        '별도 사이드 볼륨 규정 없이 3개 레그의 Elite 달성 여부가 핵심 기준'
      ]
    },
    {
      id: 'leg_structure',
      label: '레그구조',
      title: 'SILVER 3 Elite 레그 구조',
      summary: '각 3,000 OV를 달성하는 3개의 주력 라인 균형 관리',
      criteriaList: [
        { label: '레그 1', value: 'Elite (3,000 OV 이상)', note: '직접 후원 파트너' },
        { label: '레그 2', value: 'Elite (3,000 OV 이상)', note: '직접 후원 파트너' },
        { label: '레그 3', value: 'Elite (3,000 OV 이상)', note: '직접 후원 파트너' }
      ],
      guideTips: [
        '한 레그라도 2,999 OV 시 실버 인정 불가하므로 레그별 안전 마진(3,300 OV+) 관리',
        '각 레그 리더가 Premier 도약을 준비하도록 지원하여 골드로 연결'
      ]
    },
    {
      id: 'leadership_pool',
      label: '리더십풀',
      title: '리더십 퍼포먼스 풀 (1지분)',
      summary: '글로벌 전사 매출의 리더십 풀 공유 자격 본격 획득',
      criteriaList: [
        { label: '리더십 풀 지분', value: '실버 유지 시 1지분 (2% 풀)', note: '전 세계 총 매출 배당' },
        { label: '추가 지분 기회', value: '직접 후원 파트너 첫 Elite 승급 시', note: '+1지분 추가 부여' },
        { label: '엠파워먼트 풀', value: '신규 직접 100 PV 후원 시 1지분', note: '1.25% 풀 동시 참여 가능' }
      ],
      guideTips: [
        '실버 달성 시점부터 리더십 퍼포먼스 풀을 통한 고정적 사업 소득 증대',
        '직접 후원 파트너의 첫 Elite 승급을 도울 때마다 보너스 지분 추가 획득'
      ]
    },
    {
      id: 'p3_stage3',
      label: 'P3 3단계',
      title: 'Power of 3 3단계 ($1,500)',
      summary: '실버 조직과 일치하는 P3 최고 단계 보너스 구조',
      criteriaList: [
        { label: 'P3 목표 단계', value: '3단계 ($1,500 / 약 180만원)', note: '월 고정 팀 보너스' },
        { label: '필요 조직 인원', value: '총 39명 (3 + 9 + 27명)', note: '모두 100 PV LRP 유지' },
        { label: '레그 매칭', value: '3개 엘리트 레그에 분산 배치', note: '각 레그 2단계 완성 형태' }
      ],
      guideTips: [
        '3개 엘리트 레그에 P3 2단계가 복제되면 본인은 3단계 $1,500 보너스 수령',
        '안정적인 복제 시스템이 구축되는 최고 효율 구간'
      ]
    }
  ],
  GOLD: [
    {
      id: 'qualification',
      label: '자격조건',
      title: 'GOLD 직급 달성 요건',
      summary: '3개 독립 Premier 레그를 육성하여 완성하는 상위 리더십 직급',
      criteriaList: [
        { label: '개인 실적 (PV)', value: '100 PV 이상 (LRP 주문)', note: '필수 유지' },
        { label: '필수 직급 레그', value: '3개 독립 Premier 레그', note: '각 5,000 OV + 2 Exec' },
        { label: '하부 조직 요건', value: '총 6명 이상의 Executive', note: '각 Premier 레그당 2 Exec' }
      ],
      guideTips: [
        '조직 총 볼륨 최소 15,000 OV 이상 (각 5,000 OV × 3개 레그)',
        '단순 볼륨이 아닌 각 레그가 2명의 Executive를 가진 Premier 구조 완성이 필수'
      ]
    },
    {
      id: 'performance_pool',
      label: '퍼포먼스풀',
      title: '리더십 퍼포먼스 풀 (5지분)',
      summary: '실버 대비 5배의 리더십 풀 지분 획득으로 소득 대폭 상향',
      criteriaList: [
        { label: '골드 기본 지분', value: '리더십 퍼포먼스 풀 5지분', note: '실버(1지분)의 5배 배당' },
        { label: '추가 지분 조건', value: '직접 후원 파트너 첫 Premier 승급 시', note: '+1지분 추가 부여' },
        { label: '유니레벨 7레벨', value: '7레벨(7%) 100% 개방', note: '최대 수당 요율 적용' }
      ],
      guideTips: [
        '골드 직급의 가장 강력한 소득 도약 요소인 리더십 풀 5지분 배당',
        '유니레벨 전체 7단계(최대 7%)가 완전히 개방되어 깊은 조직의 볼륨 수당 전액 수령'
      ]
    },
    {
      id: 'team_building',
      label: '조직관리',
      title: 'GOLD 3 Premier 레그 구조',
      summary: '각각 5,000 OV와 2개 Executive를 보유한 3개 레그 육성',
      criteriaList: [
        { label: '레그 1', value: 'Premier (5,000 OV / 2 Exec)', note: '직접 후원 파트너' },
        { label: '레그 2', value: 'Premier (5,000 OV / 2 Exec)', note: '직접 후원 파트너' },
        { label: '레그 3', value: 'Premier (5,000 OV / 2 Exec)', note: '직접 후원 파트너' }
      ],
      guideTips: [
        '총 6명의 Executive와 3명의 Premier가 유기적으로 연결된 견고한 조직',
        '다음 직급(플래티넘: 3 Silver, 다이아몬드: 4 Silver) 도약을 위한 4번째 예비 레그 준비 권장'
      ]
    },
    {
      id: 'roadmap',
      label: '다이아몬드로직',
      title: '다이아몬드 도약 로드맵',
      summary: '골드 완성 후 다이아몬드(4개 실버 레그) 구축 비전',
      criteriaList: [
        { label: '다음 단계 (Platinum)', value: '3개 독립 Silver 레그', note: '파트너의 실버 승급' },
        { label: '최종 목표 (Diamond)', value: '4개 독립 Silver 레그', note: '다이아몬드 풀 자격' },
        { label: 'P3 보너스', value: '3단계 $1,500 매월 고정 유지', note: '39명 안정적 복제' }
      ],
      guideTips: [
        '골드 달성 즉시 4번째 레그를 발굴하여 다이아몬드(4 Silver) 기틀 마련',
        '파트너들이 스스로 엘리트 및 실버로 성장할 수 있는 복제 시스템 정착'
      ]
    }
  ]
};
