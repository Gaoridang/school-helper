import { create } from "zustand";

interface ConfettiStore {
  isActive: boolean;
  setActive: (active: boolean) => void;
}

const useConfettiStore = create<ConfettiStore>((set) => ({
  isActive: false,
  setActive: (active) => set({ isActive: active }),
}));

export default useConfettiStore;
