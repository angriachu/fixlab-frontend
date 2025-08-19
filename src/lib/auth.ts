import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = { id: string; name: string; email?: string; phone?: string };

type AuthState = {
  user: User | null;
  accessToken: string | null;
  setAuth: (p: { user: User; accessToken: string | null }) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: ({ user, accessToken }) => set({ user, accessToken }),
      clearAuth: () => set({ user: null, accessToken: null }),
    }),
    {
      name: "fixlab-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ user: s.user, accessToken: s.accessToken }),
    }
  )
);
