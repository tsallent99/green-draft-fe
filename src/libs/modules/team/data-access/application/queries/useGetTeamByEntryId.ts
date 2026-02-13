import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { TeamEntity } from '../../../domain/entities';
import { useTeamRepositoryFactory } from '../../dependency-injection/useTeamRepositoryFactory';

const createKeysGetTeamByEntryId = (entryId: number) => ['GET', 'TEAM', 'BY_ENTRY_ID', entryId];

type UseGetTeamByEntryIdOptions = {
  entryId: number;
  config?: Omit<UseQueryOptions<TeamEntity, Error>, 'queryKey' | 'queryFn'>;
};

export function useGetTeamByEntryId({ entryId, config = {} }: UseGetTeamByEntryIdOptions) {
  const repository = useTeamRepositoryFactory();

  const queryKey = useMemo(() => createKeysGetTeamByEntryId(entryId), [entryId]);

  const { data, error, refetch, isFetching } = useQuery<TeamEntity, Error>({
    ...config,
    queryKey,
    queryFn: async () => {
      const teamData = await repository.getTeamByEntryId(entryId);
      return new TeamEntity(teamData);
    },
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
}
