import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { EntryEntity } from '../../../domain/entities';
import { useEntryRepositoryFactory } from '../../dependency-injection/useEntryRepositoryFactory';

const createKeysGetMyEntries = () => ['GET', 'ENTRIES', 'MY'];

type UseGetMyEntriesOptions = {
  config?: Omit<UseQueryOptions<EntryEntity[], Error>, 'queryKey' | 'queryFn'>;
};

export function useGetMyEntries({ config = {} }: UseGetMyEntriesOptions = {}) {
  const repository = useEntryRepositoryFactory();

  const queryKey = useMemo(() => createKeysGetMyEntries(), []);

  const { data, error, refetch, isFetching } = useQuery<EntryEntity[], Error>({
    ...config,
    queryKey,
    queryFn: async () => {
      const entriesData = await repository.getMyEntries();
      return entriesData.map(entry => new EntryEntity(entry));
    },
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
}
