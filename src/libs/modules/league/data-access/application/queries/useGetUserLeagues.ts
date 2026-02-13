import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { LeagueEntity } from '../../../domain/entities';
import { useLeagueRepositoryFactory } from '../../dependency-injection/useLeagueRepositoryFactory';

const createKeysGetUserLeagues = () => ['GET', 'LEAGUES', 'USER'];

type UseGetUserLeaguesOptions = {
  config?: Omit<UseQueryOptions<LeagueEntity[], Error>, 'queryKey' | 'queryFn'>;
};

export function useGetUserLeagues({ config = {} }: UseGetUserLeaguesOptions = {}) {
  const repository = useLeagueRepositoryFactory();

  const queryKey = useMemo(() => createKeysGetUserLeagues(), []);

  const { data, error, refetch, isFetching } = useQuery<LeagueEntity[], Error>({
    ...config,
    queryKey,
    queryFn: async () => {
      const leaguesData = await repository.getUserLeagues();
      return leaguesData.map(league => new LeagueEntity(league));
    },
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
}
