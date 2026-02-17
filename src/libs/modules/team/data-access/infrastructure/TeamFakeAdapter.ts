import { TeamRepository, CreateTeamDataT, UpdateTeamDataT } from '../../domain/repositories';
import { TeamT } from '../../domain/entities';
import { TeamPickT } from '../../domain/entities/TeamPick.entity';

const mockTeams: TeamT[] = [];
let nextTeamId = 1;
let nextPickId = 1;

export class TeamFakeAdapter implements TeamRepository {
  async createTeam(data: CreateTeamDataT): Promise<TeamT> {
    const picks: TeamPickT[] = data.picks.map((pick) => ({
      id: nextPickId++,
      teamId: nextTeamId,
      playerId: pick.playerId,
      playerCategory: pick.playerCategory,
      playerScore: 0,
      createdAt: new Date(),
    }));

    const totalCategoryPoints = data.picks.reduce(
      (sum, pick) => sum + pick.playerCategory,
      0
    );

    const newTeam: TeamT = {
      id: nextTeamId++,
      entryId: data.entryId,
      isValid: totalCategoryPoints >= 13 && data.picks.length === 5,
      totalCategoryPoints: totalCategoryPoints,
      picks,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockTeams.push(newTeam);
    return newTeam;
  }

  async getTeamByEntryId(entryId: number): Promise<TeamT> {
    const team = mockTeams.find((t) => t.entryId === entryId);
    if (!team) {
      throw new Error('Team not found');
    }
    return team;
  }

  async getTeamById(teamId: number): Promise<TeamT> {
    const team = mockTeams.find((t) => t.id === teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    return team;
  }

  async updateTeam(teamId: number, data: UpdateTeamDataT): Promise<TeamT> {
    const teamIndex = mockTeams.findIndex((t) => t.id === teamId);
    if (teamIndex === -1) {
      throw new Error('Team not found');
    }

    const team = mockTeams[teamIndex];

    if (data.picks) {
      const picks: TeamPickT[] = data.picks.map((pick) => ({
        id: nextPickId++,
        teamId: teamId,
        playerId: pick.playerId,
        playerCategory: pick.playerCategory,
        playerScore: 0,
        createdAt: new Date(),
      }));

      const totalCategoryPoints = data.picks.reduce(
        (sum, pick) => sum + pick.playerCategory,
        0
      );

      team.picks = picks;
      team.totalCategoryPoints = totalCategoryPoints;
      team.isValid = totalCategoryPoints >= 13 && data.picks.length === 5;
    }

    team.updatedAt = new Date();
    mockTeams[teamIndex] = team;

    return team;
  }

  async deleteTeam(teamId: number): Promise<void> {
    const index = mockTeams.findIndex((t) => t.id === teamId);
    if (index === -1) {
      throw new Error('Team not found');
    }
    mockTeams.splice(index, 1);
  }
}
