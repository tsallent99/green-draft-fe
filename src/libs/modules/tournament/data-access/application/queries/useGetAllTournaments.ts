import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { TournamentEntity } from '../../../domain/entities';
import { useTournamentRepositoryFactory } from '../../dependency-injection/useTournamentRepositoryFactory';

const createKeysGetAllTournaments = () => ['GET', 'TOURNAMENTS', 'ALL'];

type UseGetAllTournamentsOptions = {
  config?: Omit<UseQueryOptions<TournamentEntity[], Error>, 'queryKey' | 'queryFn'>;
};

export function useGetAllTournaments({ config = {} }: UseGetAllTournamentsOptions = {}) {
  const repository = useTournamentRepositoryFactory();

  const queryKey = useMemo(() => createKeysGetAllTournaments(), []);

  const { data, error, refetch, isFetching } = useQuery<TournamentEntity[], Error>({
    ...config,
    queryKey,
    queryFn: async () => {
      const tournamentsData = await repository.getAllTournaments();
      return tournamentsData.map(tournament => new TournamentEntity(tournament));
    },
  });

  return {
    data,
    error,
    refetch,
    isFetching,
  };
}
