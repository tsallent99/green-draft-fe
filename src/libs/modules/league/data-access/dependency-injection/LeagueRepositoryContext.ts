import { createGenericContext } from '@libs/shared/dependency-injection-context';
import { LeagueRepository } from '../../domain/repositories';

const { useContext, createContextProvider: provideLeagueRepository } =
  createGenericContext<LeagueRepository>('LeagueRepository');

function useLeagueRepositoryAdapterFactory() {
  return useContext().value;
}

export { provideLeagueRepository, useLeagueRepositoryAdapterFactory };
