import { useMutation } from '@tanstack/react-query';
import { createUser } from '../api/users'; // Your create user API function
import type { UserCreateForm} from 'api/users'; // Types

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user: UserCreateForm) => createUser(user),
    retry: 1,
  });
};
