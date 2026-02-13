import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { UserEntity } from '../../../domain/entities';
import { useUserRepositoryFactory } from '../../dependency-injection/useUserRepositoryFactory';

const createKeysGetCurrentUser = () => ['GET', 'USER', 'CURRENT'];

type UseGetCurrentUserOptions = {
  config?: Omit<UseQueryOptions<UserEntity, Error>, 'queryKey' | 'queryFn'>;
};

export function useGetCurrentUser({ config = {} }: UseGetCurrentUserOptions = {}) {
  const repository = useUserRepositoryFactory();

  const queryKey = useMemo(() => createKeysGetCurrentUser(), []);

  const { data, error, refetch, isFetching } = useQuery<UserEntity, Error>({
    ...config,
    queryKey,
    queryFn: async () => {
      const userData = await repository.getCurrentUser();
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
