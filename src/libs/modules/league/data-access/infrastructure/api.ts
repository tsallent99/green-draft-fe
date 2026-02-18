import { httpClient } from "@libs/shared/backend/data-access-http-client";
import {
	LeagueCreateDtoT,
	LeagueResponseDtoT,
	LeagueJoinDtoT,
	EntryResponseDtoT,
	CreateLeagueResponseDtoT,
	JoinLeagueResponseDtoT,
	leagueResponseDtoSchema,
	createLeagueResponseDtoSchema,
	entryResponseDtoSchema,
	joinLeagueResponseDtoSchema,
} from "./api.dto";
import { z } from "zod";

const BASE_URL = "/leagues";

export const leagueApi = {
	createLeague: async (data: LeagueCreateDtoT): Promise<CreateLeagueResponseDtoT> => {
		const response = await httpClient.post(BASE_URL, data);
		const validation = createLeagueResponseDtoSchema.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},

	getUserLeagues: async (): Promise<LeagueResponseDtoT[]> => {
		const response = await httpClient.get(BASE_URL);
		const validation = z
			.array(leagueResponseDtoSchema)
			.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},

	getLeagueById: async (leagueId: number): Promise<LeagueResponseDtoT> => {
		const response = await httpClient.get(`${BASE_URL}/${leagueId}`);
		const validation = leagueResponseDtoSchema.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},

	joinLeague: async (data: LeagueJoinDtoT): Promise<JoinLeagueResponseDtoT> => {
		const response = await httpClient.post(`${BASE_URL}/join`, data);
		const validation = joinLeagueResponseDtoSchema.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},

	getLeagueEntries: async (leagueId: number): Promise<EntryResponseDtoT[]> => {
		const response = await httpClient.get(`${BASE_URL}/${leagueId}/entries`);
		const validation = z.array(entryResponseDtoSchema).safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},

	deleteLeague: async (leagueId: number): Promise<void> => {
		await httpClient.delete(`${BASE_URL}/${leagueId}`);
	},
};
