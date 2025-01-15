// src/api/auth.ts
import axiosInstance from "./axios/axiosConfig";
import type { User } from 'types/users';

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/api/v1/users/login', data);
  
  return response.data;
};
