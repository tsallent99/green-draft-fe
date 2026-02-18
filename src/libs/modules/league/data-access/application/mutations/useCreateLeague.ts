import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { LeagueEntity } from '../../../domain/entities';
import { CreateLeagueDataT } from '../../../domain/repositories';
import { useLeagueRepositoryFactory } from '../../dependency-injection/useLeagueRepositoryFactory';

type CreateLeagueResultT = {
  league: LeagueEntity;
  checkoutUrl: string | null;
};

type UseCreateLeagueOptions = {
  config?: Omit<UseMutationOptions<CreateLeagueResultT, Error, CreateLeagueDataT>, 'mutationFn'>;
};

export function useCreateLeague({ config = {} }: UseCreateLeagueOptions = {}) {
  const repository = useLeagueRepositoryFactory();

  const { mutate, mutateAsync, data, error, isPending } = useMutation<
    CreateLeagueResultT,
    Error,
    CreateLeagueDataT
  >({
    ...config,
    mutationFn: async (data: CreateLeagueDataT) => {
      const response = await repository.createLeague(data);
      return {
        league: new LeagueEntity(response.league),
        checkoutUrl: response.checkoutUrl,
      };
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
