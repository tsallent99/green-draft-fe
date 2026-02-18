import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { JoinLeagueDataT, JoinLeagueResponseT } from '../../../domain/repositories';
import { useLeagueRepositoryFactory } from '../../dependency-injection/useLeagueRepositoryFactory';

type UseJoinLeagueOptions = {
  config?: Omit<UseMutationOptions<JoinLeagueResponseT, Error, JoinLeagueDataT>, 'mutationFn'>;
};

export function useJoinLeague({ config = {} }: UseJoinLeagueOptions = {}) {
  const repository = useLeagueRepositoryFactory();

  const { mutate, mutateAsync, data, error, isPending } = useMutation<
    JoinLeagueResponseT,
    Error,
    JoinLeagueDataT
  >({
    ...config,
    mutationFn: async (data: JoinLeagueDataT) => {
      return await repository.joinLeague(data);
    },
  });

  return {
    joinLeague: mutate,
    joinLeagueAsync: mutateAsync,
    data,
    error,
    isPending,
  };
}
