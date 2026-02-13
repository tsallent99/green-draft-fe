import { createGenericContext } from '@libs/shared/dependency-injection-context';
import { PlayerRepository } from '../../domain/repositories';

const { useContext, createContextProvider: providePlayerRepository } =
  createGenericContext<PlayerRepository>('PlayerRepository');

function usePlayerRepositoryAdapterFactory() {
  return useContext().value;
}

export { providePlayerRepository, usePlayerRepositoryAdapterFactory };
