import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { PlayerEntity } from '../../../domain/entities';
import { usePlayerRepositoryFactory } from '../../dependency-injection/usePlayerRepositoryFactory';

const createKeysGetAllPlayers = () => ['GET', 'PLAYERS', 'ALL'];

type UseGetAllPlayersOptions = {
  config?: Omit<UseQueryOptions<PlayerEntity[], Error>, 'queryKey' | 'queryFn'>;
};

export function useGetAllPlayers({ config = {} }: UseGetAllPlayersOptions = {}) {
  const repository = usePlayerRepositoryFactory();

  const queryKey = useMemo(() => createKeysGetAllPlayers(), []);

  const { data, error, refetch, isFetching } = useQuery<PlayerEntity[], Error>({
    ...config,
    queryKey,
    queryFn: async () => {
      const playersData = await repository.getAllPlayers();
      return playersData.map(player => new PlayerEntity(player));
    },
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
}
