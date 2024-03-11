import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { create } from "zustand";
import { addDays } from "date-fns";

type DateStore = {
  date: DateRange;
  setDate: SelectRangeEventHandler;
};

export const useDate = create<DateStore>()((set) => ({
  date: {
    from: new Date(),
    to: addDays(new Date(), 4),
  },
  setDate: (date) => set({ date }),
}));
