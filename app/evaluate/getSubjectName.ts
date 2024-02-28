export const getSubjectName = (en: string) => {
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
  }
};
