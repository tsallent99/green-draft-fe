import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { TeamEntity } from '../../../domain/entities';
import { useTeamRepositoryFactory } from '../../dependency-injection/useTeamRepositoryFactory';

const createKeysGetTeamById = (teamId: number) => ['GET', 'TEAM', 'BY_ID', teamId];

type UseGetTeamByIdOptions = {
  teamId: number;
  config?: Omit<UseQueryOptions<TeamEntity, Error>, 'queryKey' | 'queryFn'>;
};

export function useGetTeamById({ teamId, config = {} }: UseGetTeamByIdOptions) {
  const repository = useTeamRepositoryFactory();

  const queryKey = useMemo(() => createKeysGetTeamById(teamId), [teamId]);

  const { data, error, refetch, isFetching } = useQuery<TeamEntity, Error>({
    ...config,
    queryKey,
    queryFn: async () => {
      const teamData = await repository.getTeamById(teamId);
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
