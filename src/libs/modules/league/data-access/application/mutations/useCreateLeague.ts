import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { LeagueEntity } from '../../../domain/entities';
import { CreateLeagueDataT } from '../../../domain/repositories';
import { useLeagueRepositoryFactory } from '../../dependency-injection/useLeagueRepositoryFactory';

type UseCreateLeagueOptions = {
  config?: Omit<UseMutationOptions<LeagueEntity, Error, CreateLeagueDataT>, 'mutationFn'>;
};

export function useCreateLeague({ config = {} }: UseCreateLeagueOptions = {}) {
  const repository = useLeagueRepositoryFactory();

  const { mutate, mutateAsync, data, error, isPending } = useMutation<
    LeagueEntity,
    Error,
    CreateLeagueDataT
  >({
    ...config,
    mutationFn: async (data: CreateLeagueDataT) => {
      const leagueData = await repository.createLeague(data);
      return new LeagueEntity(leagueData);
    },
  });

  return {
    createLeague: mutate,
    createLeagueAsync: mutateAsync,
    data,
    error,
    isPending,
  };
}
