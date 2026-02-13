import { PlayerRepository, GetPlayersWithOddsParamsT, PlayerWithOddsT } from '../../domain/repositories';
import { PlayerT } from '../../domain/entities';

const mockPlayers: PlayerT[] = [
  {
    id: 1,
    name: 'Rory McIlroy',
    country: 'Northern Ireland',
    worldRanking: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Jon Rahm',
    country: 'Spain',
    worldRanking: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    name: 'Scottie Scheffler',
    country: 'USA',
    worldRanking: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const mockPlayersWithOdds: Record<number, PlayerWithOddsT[]> = {
  1: [
    {
      playerId: 1,
      playerName: 'Rory McIlroy',
      category: 1,
      odds: 8.5,
      country: 'Northern Ireland',
      worldRanking: 1,
    },
    {
      playerId: 2,
      playerName: 'Jon Rahm',
      category: 1,
      odds: 9.0,
      country: 'Spain',
      worldRanking: 2,
    },
    {
      playerId: 3,
      playerName: 'Scottie Scheffler',
      category: 2,
      odds: 12.0,
      country: 'USA',
      worldRanking: 3,
    },
  ],
};

export class PlayerFakeAdapter implements PlayerRepository {
  async getAllPlayers(): Promise<PlayerT[]> {
    return [...mockPlayers];
  }

  async getPlayerById(playerId: number): Promise<PlayerT> {
    const player = mockPlayers.find((p) => p.id === playerId);
    if (!player) {
      throw new Error('Player not found');
    }
    return player;
  }

  async getPlayersWithOdds(params: GetPlayersWithOddsParamsT): Promise<PlayerWithOddsT[]> {
    const players = mockPlayersWithOdds[params.tournamentId] || [];
    if (params.category) {
      return players.filter((p) => p.category === params.category);
    }
    return players;
  }
}
