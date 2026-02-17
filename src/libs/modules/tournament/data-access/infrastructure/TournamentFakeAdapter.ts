import { TournamentRepository } from '../../domain/repositories';
import { TournamentT, TournamentStatus } from '../../domain/entities';

const mockTournaments: TournamentT[] = [
  {
    id: 1,
    name: 'The Masters',
    location: 'Augusta National Golf Club',
    startDate: new Date('2024-04-11T00:00:00Z'),
    endDate: new Date('2024-04-14T00:00:00Z'),
    status: TournamentStatus.UPCOMING,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 2,
    name: 'PGA Championship',
    location: 'Valhalla Golf Club',
    startDate: new Date('2024-05-16T00:00:00Z'),
    endDate: new Date('2024-05-19T00:00:00Z'),
    status: TournamentStatus.UPCOMING,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 3,
    name: 'U.S. Open',
    location: 'Pinehurst Resort',
    startDate: new Date('2024-06-13T00:00:00Z'),
    endDate: new Date('2024-06-16T00:00:00Z'),
    status: TournamentStatus.UPCOMING,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
];

export class TournamentFakeAdapter implements TournamentRepository {
  async getAllTournaments(): Promise<TournamentT[]> {
    return [...mockTournaments];
  }

  async getTournamentById(tournamentId: number): Promise<TournamentT> {
    const tournament = mockTournaments.find((t) => t.id === tournamentId);
    if (!tournament) {
      throw new Error('Tournament not found');
    }
    return tournament;
  }
}
