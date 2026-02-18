import { LeagueT } from '../entities';
import { EntryT } from '@modules/entry/domain/entities';

// Create league
export type CreateLeagueDataT = {
  name: string;
  tournamentId: number;
  entryFee: number;
  maxParticipants?: number;
};

export type CreateLeagueResponseT = {
  league: LeagueT;
  checkoutUrl: string | null;
};

export type CreateLeagueFnT = (data: CreateLeagueDataT) => Promise<CreateLeagueResponseT>;

// Get user leagues (created or joined)
export type GetUserLeaguesFnT = () => Promise<LeagueT[]>;

// Get league by ID
export type GetLeagueByIdFnT = (leagueId: number) => Promise<LeagueT>;

// Join league
export type JoinLeagueDataT = {
  invitationCode: string;
};

export type JoinLeagueResponseT = {
  entry: EntryT;
  checkoutUrl: string | null;
};

export type JoinLeagueFnT = (data: JoinLeagueDataT) => Promise<JoinLeagueResponseT>;

// Get league entries
export type GetLeagueEntriesFnT = (leagueId: number) => Promise<EntryT[]>;

// Delete league
export type DeleteLeagueFnT = (leagueId: number) => Promise<void>;

export interface LeagueRepository {
  createLeague: CreateLeagueFnT;

  getUserLeagues: GetUserLeaguesFnT;
  getLeagueById: GetLeagueByIdFnT;
  joinLeague: JoinLeagueFnT;
  getLeagueEntries: GetLeagueEntriesFnT;
  deleteLeague: DeleteLeagueFnT;
}
