import { createGenericContext } from '@libs/shared/dependency-injection-context';
import { EntryRepository } from '../../domain/repositories';

const { useContext, createContextProvider: provideEntryRepository } =
  createGenericContext<EntryRepository>('EntryRepository');

function useEntryRepositoryAdapterFactory() {
  return useContext().value;
}

export { provideEntryRepository, useEntryRepositoryAdapterFactory };
