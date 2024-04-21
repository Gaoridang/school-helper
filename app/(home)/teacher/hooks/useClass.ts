import { create } from "zustand";
import { persist } from "zustand/middleware";

type ClassStore = {
  selectedClassId: string;
  setSelectedClassId: (classId: string) => void;
};

// ()()로 안 하면 에러가 난다.
export const useClass = create<ClassStore>()(
  persist(
    (set) => ({
      selectedClassId: "",
      setSelectedClassId: (classId) => set({ selectedClassId: classId }),
    }),
    {
      name: "selectedClassId",
    },
  ),
);
