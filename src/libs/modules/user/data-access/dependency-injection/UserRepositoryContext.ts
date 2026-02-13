import { createGenericContext } from '@libs/shared/dependency-injection-context';
import { UserRepository } from '../../domain/repositories';

const { useContext, createContextProvider: provideUserRepository } =
  createGenericContext<UserRepository>('UserRepository');

function useUserRepositoryAdapterFactory() {
  return useContext().value;
}

export { provideUserRepository, useUserRepositoryAdapterFactory };
