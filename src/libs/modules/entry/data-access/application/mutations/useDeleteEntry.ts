import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useEntryRepositoryFactory } from '../../dependency-injection/useEntryRepositoryFactory';

type UseDeleteEntryOptions = {
  config?: Omit<UseMutationOptions<void, Error, number>, 'mutationFn'>;
};

export function useDeleteEntry({ config = {} }: UseDeleteEntryOptions = {}) {
  const repository = useEntryRepositoryFactory();

  const { mutate, mutateAsync, data, error, isPending } = useMutation<void, Error, number>({
    ...config,
    mutationFn: (entryId: number) => repository.deleteEntry(entryId),
  });

  return {
    deleteEntry: mutate,
    deleteEntryAsync: mutateAsync,
    data,
    error,
    isPending,
  };
}
