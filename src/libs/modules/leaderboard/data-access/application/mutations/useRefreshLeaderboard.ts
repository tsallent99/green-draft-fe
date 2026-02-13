import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { LeaderboardEntity } from '../../../domain/entities';
import { useLeaderboardRepositoryFactory } from '../../dependency-injection/useLeaderboardRepositoryFactory';

type UseRefreshLeaderboardOptions = {
  config?: Omit<UseMutationOptions<LeaderboardEntity, Error, number>, 'mutationFn'>;
};

export function useRefreshLeaderboard({ config = {} }: UseRefreshLeaderboardOptions = {}) {
  const repository = useLeaderboardRepositoryFactory();

  const { mutate, mutateAsync, data, error, isPending } = useMutation<
    LeaderboardEntity,
    Error,
    number
  >({
    ...config,
    mutationFn: async (leagueId: number) => {
      const leaderboardData = await repository.refreshLeaderboard(leagueId);
      return new LeaderboardEntity(leaderboardData);
    },
  });

  return {
    refreshLeaderboard: mutate,
    refreshLeaderboardAsync: mutateAsync,
    data,
    error,
    isPending,
  };
}
