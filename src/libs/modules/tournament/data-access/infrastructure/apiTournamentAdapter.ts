import { TournamentRepository } from '../../domain/repositories';
import { TournamentT } from '../../domain/entities';
import { tournamentApi } from './api';

export class ApiTournamentAdapter implements TournamentRepository {
  async getAllTournaments(): Promise<TournamentT[]> {
    return await tournamentApi.getAllTournaments();
  }

  async getTournamentById(tournamentId: number): Promise<TournamentT> {
    return await tournamentApi.getTournamentById(tournamentId);
  }
}
