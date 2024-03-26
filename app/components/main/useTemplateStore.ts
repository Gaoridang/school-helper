import { create } from "zustand";

type TemplateStates = {
  templateId: number;
  type: string;
};

type TemplateActions = {
  setTemplateId: (templateId: number) => void;
  setType: (type: string) => void;
};

type TemplateStore = TemplateStates & TemplateActions;

export const useTemplateStore = create<TemplateStore>()((set) => ({
  templateId: 0,
  type: "self",
  setTemplateId: (templateId: number) => set({ templateId }),
  setType: (type: string) => set({ type }),
}));
