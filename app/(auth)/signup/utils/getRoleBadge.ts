export const getRoleBadge = (role: string) => {
  switch (role) {
    case "teacher":
      return "선생님";
    case "student":
      return "학생";
    case "parents":
      return "부모님";
    default:
      return "";
  }
};
