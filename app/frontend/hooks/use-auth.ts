// src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { login, LoginData, LoginResponse } from '../api/auth';
import type { User } from 'types/users';

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('auth', JSON.stringify(data.user)); 
    },
  });
};
