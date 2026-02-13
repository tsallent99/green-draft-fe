import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { TournamentEntity } from '../../../domain/entities';
import { useTournamentRepositoryFactory } from '../../dependency-injection/useTournamentRepositoryFactory';

const createKeysGetTournamentById = (tournamentId: number) => [
  'GET',
  'TOURNAMENT',
  'BY_ID',
  tournamentId,
];

type UseGetTournamentByIdOptions = {
  tournamentId: number;
  config?: Omit<UseQueryOptions<TournamentEntity, Error>, 'queryKey' | 'queryFn'>;
};

export function useGetTournamentById({
  tournamentId,
  config = {},
}: UseGetTournamentByIdOptions) {
  const repository = useTournamentRepositoryFactory();

  const queryKey = useMemo(() => createKeysGetTournamentById(tournamentId), [tournamentId]);

  const { data, error, refetch, isFetching } = useQuery<TournamentEntity, Error>({
    ...config,
    queryKey,
    queryFn: async () => {
      const tournamentData = await repository.getTournamentById(tournamentId);
      return new TournamentEntity(tournamentData);
    },
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
}
