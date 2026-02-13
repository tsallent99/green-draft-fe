import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { EntryEntity } from '../../../domain/entities';
import { useEntryRepositoryFactory } from '../../dependency-injection/useEntryRepositoryFactory';

const createKeysGetEntryById = (entryId: number) => ['GET', 'ENTRY', 'BY_ID', entryId];

type UseGetEntryByIdOptions = {
  entryId: number;
  config?: Omit<UseQueryOptions<EntryEntity, Error>, 'queryKey' | 'queryFn'>;
};

export function useGetEntryById({ entryId, config = {} }: UseGetEntryByIdOptions) {
  const repository = useEntryRepositoryFactory();

  const queryKey = useMemo(() => createKeysGetEntryById(entryId), [entryId]);

  const { data, error, refetch, isFetching } = useQuery<EntryEntity, Error>({
    ...config,
    queryKey,
    queryFn: async () => {
      const entryData = await repository.getEntryById(entryId);
      return new EntryEntity(entryData);
    },
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
}
