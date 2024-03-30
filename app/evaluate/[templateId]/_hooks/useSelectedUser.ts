import { create } from "zustand";

type SelectedUserState = {
  selectedUser: { id: string; name: string };
  setSelectedUser: (user: { id: string; name: string }) => void;
};

export const useSelectedUser = create<SelectedUserState>((set) => ({
  selectedUser: { id: "", name: "" },
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
