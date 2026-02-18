import { LeagueRepository, CreateLeagueDataT, CreateLeagueResponseT, JoinLeagueDataT, JoinLeagueResponseT } from '../../domain/repositories';
import { LeagueT, LeagueStatus } from '../../domain/entities';
import { EntryT, PaymentStatus } from '@modules/entry/domain/entities';

const mockLeagues: LeagueT[] = [
  {
    id: 1,
    name: 'Masters 2024 Pool',
    creatorId: 1,
    tournamentId: 1,
    entryFee: 50,
    invitationCode: 'ABC123',
    status: LeagueStatus.OPEN,
    maxParticipants: 50,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
];

const mockEntries: EntryT[] = [
  {
    id: 1,
    userId: 1,
    leagueId: 1,
    paymentStatus: PaymentStatus.PAID,
    totalScore: 0,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
];

let nextLeagueId = 2;
let nextEntryId = 2;
const currentUserId = 1;

export class LeagueFakeAdapter implements LeagueRepository {
  async createLeague(data: CreateLeagueDataT): Promise<CreateLeagueResponseT> {
    const newLeague: LeagueT = {
      id: nextLeagueId++,
      name: data.name,
      creatorId: currentUserId,
      tournamentId: data.tournamentId,
      entryFee: data.entryFee,
      invitationCode: Math.random().toString(36).substring(7).toUpperCase(),
      status: LeagueStatus.OPEN,
      maxParticipants: data.maxParticipants ?? 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockLeagues.push(newLeague);
    return { league: newLeague, checkoutUrl: null };
  }

  async getUserLeagues(): Promise<LeagueT[]> {
    return mockLeagues.filter(
      (league) =>
        league.creatorId === currentUserId ||
        mockEntries.some(
          (entry) => entry.leagueId === league.id && entry.userId === currentUserId
        )
    );
  }

  async getLeagueById(leagueId: number): Promise<LeagueT> {
    const league = mockLeagues.find((l) => l.id === leagueId);
    if (!league) {
      throw new Error('League not found');
    }
    return league;
  }

  async joinLeague(data: JoinLeagueDataT): Promise<JoinLeagueResponseT> {
    const league = mockLeagues.find((l) => l.invitationCode === data.invitationCode);
    if (!league) {
      throw new Error('Invalid invitation code');
    }

    const existingEntry = mockEntries.find(
      (e) => e.leagueId === league.id && e.userId === currentUserId
    );
    if (existingEntry) {
      throw new Error('Already joined this league');
    }

    const newEntry: EntryT = {
      id: nextEntryId++,
      userId: currentUserId,
      leagueId: league.id,
      paymentStatus: PaymentStatus.PENDING,
      totalScore: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockEntries.push(newEntry);
    return { entry: newEntry, checkoutUrl: null };
  }

  async getLeagueEntries(leagueId: number): Promise<EntryT[]> {
    return mockEntries.filter((e) => e.leagueId === leagueId);
  }

  async deleteLeague(leagueId: number): Promise<void> {
    const index = mockLeagues.findIndex((l) => l.id === leagueId);
    if (index === -1) {
      throw new Error('League not found');
    }
    mockLeagues.splice(index, 1);
  }
}
