import { TeamRepository, CreateTeamDataT, UpdateTeamDataT } from '../../domain/repositories';
import { TeamT } from '../../domain/entities';
import { teamApi } from './api';

export class ApiTeamAdapter implements TeamRepository {
  async createTeam(data: CreateTeamDataT): Promise<TeamT> {
    return await teamApi.createTeam({
      entryId: data.entryId,
      picks: data.picks.map((pick) => ({
        playerId: pick.playerId,
        playerCategory: pick.playerCategory,
      })),
    });
  }

  async getTeamByEntryId(entryId: number): Promise<TeamT> {
    return await teamApi.getTeamByEntryId(entryId);
  }

  async getTeamById(teamId: number): Promise<TeamT> {
    return await teamApi.getTeamById(teamId);
  }

  async updateTeam(teamId: number, data: UpdateTeamDataT): Promise<TeamT> {
    return await teamApi.updateTeam(teamId, {
      picks: data.picks?.map((pick) => ({
        playerId: pick.playerId,
        playerCategory: pick.playerCategory,
      })),
    });
  }

  async deleteTeam(teamId: number): Promise<void> {
    await teamApi.deleteTeam(teamId);
  }
}
