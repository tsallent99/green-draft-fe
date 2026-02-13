import { LeagueRepository, CreateLeagueDataT, JoinLeagueDataT } from '../../domain/repositories';
import { LeagueT } from '../../domain/entities';
import { EntryT } from '@modules/entry/domain/entities';
import { leagueApi } from './api';

export class ApiLeagueAdapter implements LeagueRepository {
  async createLeague(data: CreateLeagueDataT): Promise<LeagueT> {
    return await leagueApi.createLeague({
      name: data.name,
      tournamentId: data.tournamentId,
      entryFee: data.entryFee,
      maxParticipants: data.maxParticipants,
    });
  }

  async getUserLeagues(): Promise<LeagueT[]> {
    return await leagueApi.getUserLeagues();
  }

  async getLeagueById(leagueId: number): Promise<LeagueT> {
    return await leagueApi.getLeagueById(leagueId);
  }

  async joinLeague(data: JoinLeagueDataT): Promise<EntryT> {
    return await leagueApi.joinLeague({
      invitationCode: data.invitationCode,
    });
  }

  async getLeagueEntries(leagueId: number): Promise<EntryT[]> {
    return await leagueApi.getLeagueEntries(leagueId);
  }

  async deleteLeague(leagueId: number): Promise<void> {
    await leagueApi.deleteLeague(leagueId);
  }
}
