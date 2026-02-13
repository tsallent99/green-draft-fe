import { TeamT } from '../entities';

// Create team
export type CreateTeamPickDataT = {
  playerId: number;
  playerCategory: number;
};

export type CreateTeamDataT = {
  entryId: number;
  picks: CreateTeamPickDataT[];
};

export type CreateTeamFnT = (data: CreateTeamDataT) => Promise<TeamT>;

// Get team by entry ID
export type GetTeamByEntryIdFnT = (entryId: number) => Promise<TeamT>;

// Get team by ID
export type GetTeamByIdFnT = (teamId: number) => Promise<TeamT>;

// Update team
export type UpdateTeamDataT = {
  picks?: CreateTeamPickDataT[];
};

export type UpdateTeamFnT = (
  teamId: number,
  data: UpdateTeamDataT
) => Promise<TeamT>;

// Delete team
export type DeleteTeamFnT = (teamId: number) => Promise<void>;

export interface TeamRepository {
  createTeam: CreateTeamFnT;
  getTeamByEntryId: GetTeamByEntryIdFnT;
  getTeamById: GetTeamByIdFnT;
  updateTeam: UpdateTeamFnT;
  deleteTeam: DeleteTeamFnT;
}
