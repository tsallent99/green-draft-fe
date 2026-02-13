import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { LeaderboardDetailedEntity } from '../../../domain/entities';
import { useLeaderboardRepositoryFactory } from '../../dependency-injection/useLeaderboardRepositoryFactory';

const createKeysGetLeaderboardByLeagueId = (leagueId: number) => [
  'GET',
  'LEADERBOARD',
  'BY_LEAGUE_ID',
  leagueId,
];

type UseGetLeaderboardByLeagueIdOptions = {
  leagueId: number;
  config?: Omit<UseQueryOptions<LeaderboardDetailedEntity, Error>, 'queryKey' | 'queryFn'>;
};

export function useGetLeaderboardByLeagueId({
  leagueId,
  config = {},
}: UseGetLeaderboardByLeagueIdOptions) {
  const repository = useLeaderboardRepositoryFactory();

  const queryKey = useMemo(() => createKeysGetLeaderboardByLeagueId(leagueId), [leagueId]);

  const { data, error, refetch, isFetching } = useQuery<LeaderboardDetailedEntity, Error>({
    ...config,
    queryKey,
    queryFn: async () => {
      const leaderboardData = await repository.getLeaderboardByLeagueId(leagueId);
      return new LeaderboardDetailedEntity(leaderboardData);
    },
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
}
