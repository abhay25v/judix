export type User = {
  id: string;
  name: string;
  email: string;
};

export type Task = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiSuccess<T> = {
  success: boolean;
  message?: string;
} & T;
