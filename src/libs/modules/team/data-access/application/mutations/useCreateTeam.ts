import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { TeamEntity } from '../../../domain/entities';
import { CreateTeamDataT } from '../../../domain/repositories';
import { useTeamRepositoryFactory } from '../../dependency-injection/useTeamRepositoryFactory';

type UseCreateTeamOptions = {
  config?: Omit<UseMutationOptions<TeamEntity, Error, CreateTeamDataT>, 'mutationFn'>;
};

export function useCreateTeam({ config = {} }: UseCreateTeamOptions = {}) {
  const repository = useTeamRepositoryFactory();

  const { mutate, mutateAsync, data, error, isPending } = useMutation<
    TeamEntity,
    Error,
    CreateTeamDataT
  >({
    ...config,
    mutationFn: async (data: CreateTeamDataT) => {
      const teamData = await repository.createTeam(data);
      return new TeamEntity(teamData);
    },
  });

  return {
    createTeam: mutate,
    createTeamAsync: mutateAsync,
    data,
    error,
    isPending,
  };
}
