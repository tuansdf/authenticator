import { create } from "zustand";
import { persist } from "zustand/middleware";

type Otp = {
  id: string | number;
  name: string;
  secret: string;
};

interface OtpStore {
  otps: Otp[];
  add: (a: Otp) => void;
  remove: (id: string | number) => void;
}

export const useOtpStore = create<OtpStore>()(
  persist(
    (set, get) => ({
      otps: [],
      add: (toAdd) => set({ otps: [...get().otps, toAdd] }),
      remove: (removeId) =>
        set({ otps: get().otps.filter((item) => item.id !== removeId) }),
    }),
    {
      name: "otps",
    },
  ),
);
