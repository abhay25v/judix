import { create } from 'zustand';
import { authAPI } from './endpoints';
import type { User } from './types';

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  fetchMe: () => Promise<boolean>;
  logout: () => Promise<boolean>;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authAPI.register({ name, email, password });
      set({ user: data.user, isLoading: false });
      return { success: true, message: data.message };
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Registration failed';
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authAPI.login({ email, password });
      set({ user: data.user, isLoading: false });
      return { success: true, message: data.message };
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Login failed';
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  fetchMe: async () => {
    try {
      const { data } = await authAPI.getMe();
      set({ user: data.user });
      return true;
    } catch {
      set({ user: null });
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await authAPI.logout();
      set({ user: null, isLoading: false });
      return true;
    } catch {
      set({ isLoading: false });
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));
