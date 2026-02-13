import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useTeamRepositoryFactory } from '../../dependency-injection/useTeamRepositoryFactory';

type UseDeleteTeamOptions = {
  config?: Omit<UseMutationOptions<void, Error, number>, 'mutationFn'>;
};

export function useDeleteTeam({ config = {} }: UseDeleteTeamOptions = {}) {
  const repository = useTeamRepositoryFactory();

  const { mutate, mutateAsync, data, error, isPending } = useMutation<void, Error, number>({
    ...config,
    mutationFn: (teamId: number) => repository.deleteTeam(teamId),
  });

  return {
    deleteTeam: mutate,
    deleteTeamAsync: mutateAsync,
    data,
    error,
    isPending,
  };
}
