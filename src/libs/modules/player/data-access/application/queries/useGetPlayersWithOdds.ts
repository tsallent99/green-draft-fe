import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { PlayerWithOddsT, GetPlayersWithOddsParamsT } from '../../../domain/repositories';
import { usePlayerRepositoryFactory } from '../../dependency-injection/usePlayerRepositoryFactory';

const createKeysGetPlayersWithOdds = (params: GetPlayersWithOddsParamsT) => [
  'GET',
  'PLAYERS',
  'WITH_ODDS',
  params.tournamentId,
  params.category,
];

type UseGetPlayersWithOddsOptions = {
  params: GetPlayersWithOddsParamsT;
  config?: Omit<UseQueryOptions<PlayerWithOddsT[], Error>, 'queryKey' | 'queryFn'>;
};

export function useGetPlayersWithOdds({ params, config = {} }: UseGetPlayersWithOddsOptions) {
  const repository = usePlayerRepositoryFactory();

  const queryKey = useMemo(() => createKeysGetPlayersWithOdds(params), [params]);

  const { data, error, refetch, isFetching } = useQuery<PlayerWithOddsT[], Error>({
    ...config,
    queryKey,
    queryFn: () => repository.getPlayersWithOdds(params),
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
}
