// Application configuration constants
export const REFRESH_INTERVAL = 60000; // 60 seconds
export const ROULETTE_DURATION = 3000; // 3 seconds
export const APP_BACKGROUND_COLOR = "#faf8f2";

// Belt column width ratios based on student/match count
// Used for both Dashboard (student count) and Bracket (match count)
export const BELT_WIDTH_RATIOS = {
  ONE_STUDENT: 0.2,    // 1명/1대진: 20%
  TWO_STUDENTS: 0.25,  // 2명/2대진: 25%
  THREE_OR_MORE: 0.3   // 3명 이상/3대진 이상: 30%
};