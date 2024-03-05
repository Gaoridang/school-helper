import { create } from "zustand";

type SelectedUserState = {
  selectedUser: string;
  setSelectedUser: (user: string) => void;
};

export const useSelectedUser = create<SelectedUserState>((set) => ({
  selectedUser: "",
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
