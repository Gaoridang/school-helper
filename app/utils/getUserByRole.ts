import { User } from "./getUserInfo";

export const getUserByRole = (data: User | null) => {
  if (!data) return null;
  if (data.role === "teacher") {
    return `${data.user.school} ${data.user.grade} ${data.user.class_number}`;
  }
  if (data.role === "student") {
    return data.user.name;
  }
};
