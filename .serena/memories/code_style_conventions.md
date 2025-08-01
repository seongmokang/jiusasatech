# 코드 스타일 및 컨벤션

## JavaScript/React 스타일
- **함수형 컴포넌트** 사용 (React Hooks 패턴)
- **카멜케이스** 변수명 (todayCount, isDrawing)
- **파스칼케이스** 컴포넌트명 (Dashboard, BeltColumns)
- **인라인 스타일** 주로 사용 (CSS-in-JS 패턴)

## 파일 구조
- 컴포넌트별 개별 파일 (.js 확장자)
- 기능별 디렉토리 분리 (components/layout, components/ui)
- 상대 경로 import 사용

## React 패턴
- **useState, useEffect** 훅 사용
- **props drilling** 패턴 (상태 전달)
- **조건부 렌더링** {condition && <Component />}
- **이벤트 핸들러** on[Event] 네이밍

## CSS 스타일
- 인라인 스타일 객체 주로 사용
- 반응형 디자인을 위한 미디어 쿼리
- flexbox 레이아웃 활용
- CSS 애니메이션 (@keyframes)

## 네이밍 컨벤션
- 상수: UPPER_SNAKE_CASE (APP_BACKGROUND_COLOR)
- 함수: camelCase (fetchAttendanceData)
- 컴포넌트: PascalCase (RouletteAnimation)