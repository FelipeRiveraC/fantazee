import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/users';

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
    enabled: !!id,
    retry: 1,
  });
};
