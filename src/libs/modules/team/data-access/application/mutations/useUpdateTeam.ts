import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { TeamEntity } from '../../../domain/entities';
import { UpdateTeamDataT } from '../../../domain/repositories';
import { useTeamRepositoryFactory } from '../../dependency-injection/useTeamRepositoryFactory';

type UpdateTeamVariablesT = {
  teamId: number;
  data: UpdateTeamDataT;
};

type UseUpdateTeamOptions = {
  config?: Omit<UseMutationOptions<TeamEntity, Error, UpdateTeamVariablesT>, 'mutationFn'>;
};

export function useUpdateTeam({ config = {} }: UseUpdateTeamOptions = {}) {
  const repository = useTeamRepositoryFactory();

  const { mutate, mutateAsync, data, error, isPending } = useMutation<
    TeamEntity,
    Error,
    UpdateTeamVariablesT
  >({
    ...config,
    mutationFn: async ({ teamId, data }: UpdateTeamVariablesT) => {
      const teamData = await repository.updateTeam(teamId, data);
      return new TeamEntity(teamData);
    },
  });

  return {
    updateTeam: mutate,
    updateTeamAsync: mutateAsync,
    data,
    error,
    isPending,
  };
}
