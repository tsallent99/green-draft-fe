import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { PlayerEntity } from '../../../domain/entities';
import { usePlayerRepositoryFactory } from '../../dependency-injection/usePlayerRepositoryFactory';

const createKeysGetPlayerById = (playerId: number) => ['GET', 'PLAYER', 'BY_ID', playerId];

type UseGetPlayerByIdOptions = {
  playerId: number;
  config?: Omit<UseQueryOptions<PlayerEntity, Error>, 'queryKey' | 'queryFn'>;
};

export function useGetPlayerById({ playerId, config = {} }: UseGetPlayerByIdOptions) {
  const repository = usePlayerRepositoryFactory();

  const queryKey = useMemo(() => createKeysGetPlayerById(playerId), [playerId]);

  const { data, error, refetch, isFetching } = useQuery<PlayerEntity, Error>({
    ...config,
    queryKey,
    queryFn: async () => {
      const playerData = await repository.getPlayerById(playerId);
      return new PlayerEntity(playerData);
    },
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
}
