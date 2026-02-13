import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useLeagueRepositoryFactory } from '../../dependency-injection/useLeagueRepositoryFactory';

type UseDeleteLeagueOptions = {
  config?: Omit<UseMutationOptions<void, Error, number>, 'mutationFn'>;
};

export function useDeleteLeague({ config = {} }: UseDeleteLeagueOptions = {}) {
  const repository = useLeagueRepositoryFactory();

  const { mutate, mutateAsync, data, error, isPending } = useMutation<void, Error, number>({
    ...config,
    mutationFn: (leagueId: number) => repository.deleteLeague(leagueId),
  });

  return {
    deleteLeague: mutate,
    deleteLeagueAsync: mutateAsync,
    data,
    error,
    isPending,
  };
}
