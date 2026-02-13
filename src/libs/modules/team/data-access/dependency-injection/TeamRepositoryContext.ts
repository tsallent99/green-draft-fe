import { createGenericContext } from '@libs/shared/dependency-injection-context';
import { TeamRepository } from '../../domain/repositories';

const { useContext, createContextProvider: provideTeamRepository } =
  createGenericContext<TeamRepository>('TeamRepository');

function useTeamRepositoryAdapterFactory() {
  return useContext().value;
}

export { provideTeamRepository, useTeamRepositoryAdapterFactory };
