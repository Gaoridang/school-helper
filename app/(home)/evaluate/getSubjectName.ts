export const getSubjectName = (en: string | null) => {
  switch (en) {
    case "korean":
      return "국어";
    case "math":
      return "수학";
    case "english":
      return "영어";
    case "science":
      return "과학";
    case "social":
      return "사회";
    case "history":
      return "역사";
    case "tech":
      return "기술";
    case "music":
      return "음악";
    case "art":
      return "미술";
    case "physical":
      return "체육";
    case "ethics":
      return "도덕";
    case "activity":
      return "창체";
    case "home_eco":
      return "가정";
    case "career":
      return "진로";
    default:
      return en;
  }
};

// object literal

export const subject = {
  korean: "국어",
  math: "수학",
  english: "영어",
  science: "과학",
  social: "사회",
  history: "역사",
  tech: "기술",
  music: "음악",
  art: "미술",
  physical: "체육",
  ethics: "도덕",
  activity: "창체",
  home_eco: "가정",
  career: "진로",
} as const;

export const colors = {
  korean: "bg-red-100",
  math: "bg-yellow-100",
  english: "bg-green-100",
  science: "bg-blue-100",
  social: "bg-indigo-100",
  history: "bg-purple-100",
  tech: "bg-pink-100",
  music: "bg-rose-100",
  art: "bg-orange-100",
  physical: "bg-cyan-100",
  ethics: "bg-lime-100",
  activity: "bg-amber-100",
  home_eco: "bg-emerald-100",
  career: "bg-violet-100",
} as const;
