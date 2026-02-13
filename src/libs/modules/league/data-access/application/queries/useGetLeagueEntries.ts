import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { EntryEntity } from '@modules/entry/domain/entities';
import { useLeagueRepositoryFactory } from '../../dependency-injection/useLeagueRepositoryFactory';

const createKeysGetLeagueEntries = (leagueId: number) => [
  'GET',
  'LEAGUE',
  'ENTRIES',
  leagueId,
];

type UseGetLeagueEntriesOptions = {
  leagueId: number;
  config?: Omit<UseQueryOptions<EntryEntity[], Error>, 'queryKey' | 'queryFn'>;
};

export function useGetLeagueEntries({ leagueId, config = {} }: UseGetLeagueEntriesOptions) {
  const repository = useLeagueRepositoryFactory();

  const queryKey = useMemo(() => createKeysGetLeagueEntries(leagueId), [leagueId]);

  const { data, error, refetch, isFetching } = useQuery<EntryEntity[], Error>({
    ...config,
    queryKey,
    queryFn: async () => {
      const entriesData = await repository.getLeagueEntries(leagueId);
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
