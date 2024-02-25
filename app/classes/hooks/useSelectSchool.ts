import { create } from "zustand";

interface SelectSchoolState {
  school: string;
  grade: string;
  classNumber: string;
  setSchool: (school: string) => void;
  setGrade: (grade: string) => void;
  setClassNumber: (classNumber: string) => void;
}

export const useSelectSchool = create<SelectSchoolState>((set) => ({
  school: "",
  grade: "",
  classNumber: "",
  setSchool: (school) => set({ school }),
  setGrade: (grade) => set({ grade }),
  setClassNumber: (classNumber) => set({ classNumber }),
}));
