import { create } from "zustand";

type ClassStore = {
  selectedClassId: string;
  setSelectedClassId: (classId: string) => void;
};

export const useClass = create<ClassStore>((set) => ({
  selectedClassId: "",
  setSelectedClassId: (selectedClassId: string) => set({ selectedClassId }),
}));
