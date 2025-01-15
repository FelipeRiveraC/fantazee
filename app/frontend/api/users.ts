import authedAxios from "./axios/authedAxios";

import type { User } from 'types/users';

export interface UserResponse {
  user: User;
}

export interface UserCreateForm {
  name: string;
  email: string;
  password: string;
}

export interface UserCreateRequest {
  user: UserCreateForm;
}

export const getUser = async (id: string): Promise<UserResponse> => {
  const response = await authedAxios.get<UserResponse>(`/api/v1/users/${id}`);

  return response.data;
}

export const createUser = async (user: UserCreateForm): Promise<UserResponse> => {
  const response = await authedAxios.post<UserResponse>('/api/v1/users', { user });

  return response.data;
}