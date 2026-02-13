import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { EntryEntity } from '@modules/entry/domain/entities';
import { JoinLeagueDataT } from '../../../domain/repositories';
import { useLeagueRepositoryFactory } from '../../dependency-injection/useLeagueRepositoryFactory';

type UseJoinLeagueOptions = {
  config?: Omit<UseMutationOptions<EntryEntity, Error, JoinLeagueDataT>, 'mutationFn'>;
};

export function useJoinLeague({ config = {} }: UseJoinLeagueOptions = {}) {
  const repository = useLeagueRepositoryFactory();

  const { mutate, mutateAsync, data, error, isPending } = useMutation<
    EntryEntity,
    Error,
    JoinLeagueDataT
  >({
    ...config,
    mutationFn: async (data: JoinLeagueDataT) => {
      const entryData = await repository.joinLeague(data);
      return new EntryEntity(entryData);
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
