// Data normalization utilities
export function normalize(str) {
  if (!str) return "";
  if (str.includes("화이트")) return "white";
  if (str.includes("블루") || str.includes("파랑")) return "blue";
  if (str.includes("브라운") || str.includes("갈색")) return "brown";
  if (str.includes("퍼플") || str.includes("보라")) return "purple";
  if (str.includes("블랙") || str.includes("검정")) return "black";
  if (str.includes("남")) return "male";
  if (str.includes("여")) return "female";
  return "";
}