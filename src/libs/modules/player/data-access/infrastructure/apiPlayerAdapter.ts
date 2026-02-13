import { PlayerRepository, GetPlayersWithOddsParamsT, PlayerWithOddsT } from '../../domain/repositories';
import { PlayerT } from '../../domain/entities';
import { playerApi } from './api';

export class ApiPlayerAdapter implements PlayerRepository {
  async getAllPlayers(): Promise<PlayerT[]> {
    const response = await playerApi.getAllPlayers();
    return response;
  }

  async getPlayerById(playerId: number): Promise<PlayerT> {
    const response = await playerApi.getPlayerById(playerId);
    return response;
  }

  async getPlayersWithOdds(params: GetPlayersWithOddsParamsT): Promise<PlayerWithOddsT[]> {
    const response = await playerApi.getPlayersWithOdds(
      params.tournamentId,
      params.category
    );
    return response;
  }
}
