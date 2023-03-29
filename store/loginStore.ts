import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IAuth {
  isAuthenticated: boolean;
  token: string | null;
  user: any | null;
  setLoginResponseData: (loginData: any) => void;
  logOut: () => void;
}

export const useLoginStore = create<IAuth>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      setLoginResponseData: (authResponse) => {
        set(authResponse);
      },
      logOut: () => {
        set({
          isAuthenticated: false,
          token: null,
          user: null,
        });
      },
    }),
    {
      name: "login-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
