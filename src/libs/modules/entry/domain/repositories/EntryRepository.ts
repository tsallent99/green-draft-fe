import { EntryT, PaymentStatus } from '../entities';

// Get my entries
export type GetMyEntriesFnT = () => Promise<EntryT[]>;

// Get entry by ID
export type GetEntryByIdFnT = (entryId: number) => Promise<EntryT>;

// Update entry
export type UpdateEntryDataT = {
  paymentStatus?: PaymentStatus;
  totalScore?: number;
};

export type UpdateEntryFnT = (
  entryId: number,
  data: UpdateEntryDataT
) => Promise<EntryT>;

// Delete entry (leave league)
export type DeleteEntryFnT = (entryId: number) => Promise<void>;

export interface EntryRepository {
  getMyEntries: GetMyEntriesFnT;
  getEntryById: GetEntryByIdFnT;
  updateEntry: UpdateEntryFnT;
  deleteEntry: DeleteEntryFnT;
}
