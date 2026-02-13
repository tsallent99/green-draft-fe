import { EntryRepository, UpdateEntryDataT } from '../../domain/repositories';
import { EntryT, PaymentStatus } from '../../domain/entities';

const mockEntries: EntryT[] = [
  {
    id: 1,
    userId: 1,
    leagueId: 1,
    paymentStatus: PaymentStatus.PAID,
    totalScore: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const currentUserId = 1;

export class EntryFakeAdapter implements EntryRepository {
  async getMyEntries(): Promise<EntryT[]> {
    return mockEntries.filter((e) => e.userId === currentUserId);
  }

  async getEntryById(entryId: number): Promise<EntryT> {
    const entry = mockEntries.find((e) => e.id === entryId && e.userId === currentUserId);
    if (!entry) {
      throw new Error('Entry not found');
    }
    return entry;
  }

  async updateEntry(entryId: number, data: UpdateEntryDataT): Promise<EntryT> {
    const entryIndex = mockEntries.findIndex(
      (e) => e.id === entryId && e.userId === currentUserId
    );
    if (entryIndex === -1) {
      throw new Error('Entry not found');
    }

    const entry = mockEntries[entryIndex];

    if (data.paymentStatus !== undefined) {
      entry.paymentStatus = data.paymentStatus;
    }
    if (data.totalScore !== undefined) {
      entry.totalScore = data.totalScore;
    }

    entry.updatedAt = new Date().toISOString();
    mockEntries[entryIndex] = entry;

    return entry;
  }

  async deleteEntry(entryId: number): Promise<void> {
    const index = mockEntries.findIndex(
      (e) => e.id === entryId && e.userId === currentUserId
    );
    if (index === -1) {
      throw new Error('Entry not found');
    }
    mockEntries.splice(index, 1);
  }
}
