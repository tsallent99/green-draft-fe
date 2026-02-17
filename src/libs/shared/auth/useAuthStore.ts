import { create } from "zustand";
import { queryClient } from "@/lib/queryClient";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("accessToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
  login: (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    set({ token: accessToken, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    queryClient.clear();
    set({ token: null, isAuthenticated: false });
  },
}));
