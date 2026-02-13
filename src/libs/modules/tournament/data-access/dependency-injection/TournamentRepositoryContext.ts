import { createGenericContext } from '@libs/shared/dependency-injection-context';
import { TournamentRepository } from '../../domain/repositories';

const { useContext, createContextProvider: provideTournamentRepository } =
  createGenericContext<TournamentRepository>('TournamentRepository');

function useTournamentRepositoryAdapterFactory() {
  return useContext().value;
}

export { provideTournamentRepository, useTournamentRepositoryAdapterFactory };
