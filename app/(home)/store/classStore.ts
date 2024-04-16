import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ClassState {
  classId: string;
  setClassId: (id: string) => void;
}

const useClassStore = create<ClassState>()(
  persist(
    (set) => ({
      classId: "",
      setClassId: (id) => set({ classId: id }),
    }),
    {
      name: "classId",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useClassStore;
