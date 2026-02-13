import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { EntryEntity } from '../../../domain/entities';
import { UpdateEntryDataT } from '../../../domain/repositories';
import { useEntryRepositoryFactory } from '../../dependency-injection/useEntryRepositoryFactory';

type UpdateEntryVariablesT = {
  entryId: number;
  data: UpdateEntryDataT;
};

type UseUpdateEntryOptions = {
  config?: Omit<UseMutationOptions<EntryEntity, Error, UpdateEntryVariablesT>, 'mutationFn'>;
};

export function useUpdateEntry({ config = {} }: UseUpdateEntryOptions = {}) {
  const repository = useEntryRepositoryFactory();

  const { mutate, mutateAsync, data, error, isPending } = useMutation<
    EntryEntity,
    Error,
    UpdateEntryVariablesT
  >({
    ...config,
    mutationFn: async ({ entryId, data }: UpdateEntryVariablesT) => {
      const entryData = await repository.updateEntry(entryId, data);
      return new EntryEntity(entryData);
    },
  });

  return {
    updateEntry: mutate,
    updateEntryAsync: mutateAsync,
    data,
    error,
    isPending,
  };
}
