import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { LeagueEntity } from '../../../domain/entities';
import { useLeagueRepositoryFactory } from '../../dependency-injection/useLeagueRepositoryFactory';

const createKeysGetLeagueById = (leagueId: number) => ['GET', 'LEAGUE', 'BY_ID', leagueId];

type UseGetLeagueByIdOptions = {
  leagueId: number;
  config?: Omit<UseQueryOptions<LeagueEntity, Error>, 'queryKey' | 'queryFn'>;
};

export function useGetLeagueById({ leagueId, config = {} }: UseGetLeagueByIdOptions) {
  const repository = useLeagueRepositoryFactory();

  const queryKey = useMemo(() => createKeysGetLeagueById(leagueId), [leagueId]);

  const { data, error, refetch, isFetching } = useQuery<LeagueEntity, Error>({
    ...config,
    queryKey,
    queryFn: async () => {
      const leagueData = await repository.getLeagueById(leagueId);
      return new LeagueEntity(leagueData);
    },
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
}
