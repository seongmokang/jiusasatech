# 코드베이스 구조

## 디렉토리 구조
```
jiusasa/
├── jiusasa-dashboard/          # 메인 React 애플리케이션
│   ├── public/                 # 정적 파일
│   ├── src/
│   │   ├── components/         # 재사용 가능한 컴포넌트
│   │   │   ├── layout/         # Header, Footer 등 레이아웃 컴포넌트
│   │   │   ├── ui/             # StudentCard, RouletteAnimation 등 UI 컴포넌트
│   │   │   └── common/         # 공통 컴포넌트
│   │   ├── pages/              # 페이지 컴포넌트
│   │   │   ├── Dashboard/      # 대시보드 관련 컴포넌트
│   │   │   └── Bracket/        # 대진표 관련 컴포넌트
│   │   ├── services/           # API 서비스 (fetchAttendance)
│   │   ├── utils/              # 유틸리티 함수 (dateUtils, normalize)
│   │   ├── constants/          # 설정 상수
│   │   ├── hooks/              # 커스텀 React 훅
│   │   └── assets/             # 이미지, 로고 등
│   ├── package.json
│   └── README.md
└── server/                     # 백엔드 서버 (존재 여부 확인 필요)
```

## 주요 컴포넌트
- **App.js**: 메인 애플리케이션, 라우팅 설정
- **Dashboard/**: 출석 현황 대시보드
- **Bracket/**: 대진표 시스템
- **Header**: 네비게이션, 추첨 기능
- **Footer**: 하단 정보 및 광고
- **RouletteAnimation**: 추첨 애니메이션