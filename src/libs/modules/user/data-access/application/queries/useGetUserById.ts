import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { UserEntity } from '../../../domain/entities';
import { useUserRepositoryFactory } from '../../dependency-injection/useUserRepositoryFactory';

const createKeysGetUserById = (userId: number) => ['GET', 'USER', 'BY_ID', userId];

type UseGetUserByIdOptions = {
  userId: number;
  config?: Omit<UseQueryOptions<UserEntity, Error>, 'queryKey' | 'queryFn'>;
};

export function useGetUserById({ userId, config = {} }: UseGetUserByIdOptions) {
  const repository = useUserRepositoryFactory();

  const queryKey = useMemo(() => createKeysGetUserById(userId), [userId]);

  const { data, error, refetch, isFetching } = useQuery<UserEntity, Error>({
    ...config,
    queryKey,
    queryFn: async () => {
      const userData = await repository.getUserById(userId);
      return new UserEntity(userData);
    },
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
}
