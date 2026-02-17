import { httpClient } from "@libs/shared/backend/data-access-http-client";
import {
	TeamCreateDtoT,
	TeamUpdateDtoT,
	TeamResponseDtoT,
	teamResponseDtoSchema,
} from "./api.dto";

const BASE_URL = "/teams";

export const teamApi = {
	createTeam: async (data: TeamCreateDtoT): Promise<TeamResponseDtoT> => {
		const response = await httpClient.post(BASE_URL, data);
		const validation = teamResponseDtoSchema.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},

	getTeamByEntryId: async (entryId: number): Promise<TeamResponseDtoT> => {
		const response = await httpClient.get(`${BASE_URL}/entry/${entryId}`);
		const validation = teamResponseDtoSchema.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},

	getTeamById: async (teamId: number): Promise<TeamResponseDtoT> => {
		const response = await httpClient.get(`${BASE_URL}/${teamId}`);
		const validation = teamResponseDtoSchema.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},

	updateTeam: async (
		teamId: number,
		data: TeamUpdateDtoT,
	): Promise<TeamResponseDtoT> => {
		const response = await httpClient.put(`${BASE_URL}/${teamId}`, data);
		const validation = teamResponseDtoSchema.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},

	deleteTeam: async (teamId: number): Promise<void> => {
		await httpClient.delete(`${BASE_URL}/${teamId}`);
	},
};
