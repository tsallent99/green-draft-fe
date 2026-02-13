import { EntryRepository, UpdateEntryDataT } from '../../domain/repositories';
import { EntryT } from '../../domain/entities';
import { entryApi } from './api';

export class ApiEntryAdapter implements EntryRepository {
  async getMyEntries(): Promise<EntryT[]> {
    return await entryApi.getMyEntries();
  }

  async getEntryById(entryId: number): Promise<EntryT> {
    return await entryApi.getEntryById(entryId);
  }

  async updateEntry(entryId: number, data: UpdateEntryDataT): Promise<EntryT> {
    return await entryApi.updateEntry(entryId, {
      paymentStatus: data.paymentStatus,
      totalScore: data.totalScore,
    });
  }

  async deleteEntry(entryId: number): Promise<void> {
    await entryApi.deleteEntry(entryId);
  }
}
