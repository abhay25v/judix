import api from './api';
import type { Task, User } from './types';

export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post<{ success: boolean; message: string; user: User }>('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post<{ success: boolean; message: string; user: User }>('/auth/login', data),
  getMe: () => api.get<{ success: boolean; user: User }>('/auth/me'),
  logout: () => api.post<{ success: boolean; message: string }>('/auth/logout'),
};

export const tasksAPI = {
  create: (data: { title: string; description?: string }) =>
    api.post<{ success: boolean; task: Task }>('/tasks', data),
  getAll: (params?: { search?: string; completed?: 'true' | 'false' }) =>
    api.get<{ success: boolean; count: number; tasks: Task[] }>('/tasks', { params }),
  update: (id: string, data: Partial<Pick<Task, 'title' | 'description' | 'completed'>>) =>
    api.put<{ success: boolean; task: Task }>(`/tasks/${id}`, data),
  delete: (id: string) => api.delete<{ success: boolean; message: string }>(`/tasks/${id}`),
};
