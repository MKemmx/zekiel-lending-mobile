import { create } from "zustand";

interface IAuth {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  token: string | null;
  user: any | null;
  login: (loginData: any) => void;
  register: (registerData: any) => void;
  logout: () => void;
}

export const useLoginStore = create<IAuth>((set) => ({
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null,
  user: null,
  login: (loginData) => {
    set({
      isAuthenticated: true,
      loading: false,
      error: null,
      token: null,
      user: null,
    });
  },
  register: (registerData) => set((state: any) => ({})),
  logout: () => {
    set({
      isAuthenticated: false,
      loading: false,
      error: null,
      token: null,
      user: null,
    });
  },
}));
