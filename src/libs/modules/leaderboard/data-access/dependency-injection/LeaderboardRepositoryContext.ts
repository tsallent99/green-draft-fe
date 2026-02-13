import { createGenericContext } from '@libs/shared/dependency-injection-context';
import { LeaderboardRepository } from '../../domain/repositories';

const { useContext, createContextProvider: provideLeaderboardRepository } =
  createGenericContext<LeaderboardRepository>('LeaderboardRepository');

function useLeaderboardRepositoryAdapterFactory() {
  return useContext().value;
}

export { provideLeaderboardRepository, useLeaderboardRepositoryAdapterFactory };
