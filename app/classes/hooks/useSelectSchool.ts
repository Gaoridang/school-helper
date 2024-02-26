import { create } from "zustand";

interface SelectSchoolState {
  selectedSchool: string;
  setSelectedSchool: (school: string) => void;
}

export const useSelectSchool = create<SelectSchoolState>((set) => ({
  selectedSchool: "",
  setSelectedSchool: (selectedSchool) => set({ selectedSchool }),
}));
