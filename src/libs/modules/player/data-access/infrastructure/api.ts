import { httpClient } from "@libs/shared/backend/data-access-http-client";
import {
	PlayerResponseDtoT,
	PlayerWithOddsDtoT,
	playerResponseDtoSchema,
	playerWithOddsDtoSchema,
} from "./api.dto";
import { z } from "zod";

const BASE_URL = "/players";

export const playerApi = {
	getAllPlayers: async (): Promise<PlayerResponseDtoT[]> => {
		const response = await httpClient.get(BASE_URL);
		const validation = z
			.array(playerResponseDtoSchema)
			.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},

	getPlayerById: async (playerId: number): Promise<PlayerResponseDtoT> => {
		const response = await httpClient.get(`${BASE_URL}/${playerId}`);
		const validation = playerResponseDtoSchema.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},

	getPlayersWithOdds: async (
		tournamentId: number,
		category?: number,
	): Promise<PlayerWithOddsDtoT[]> => {
		const params = category ? { category } : {};
		const response = await httpClient.get(`${BASE_URL}/odds/${tournamentId}`, {
			params,
		});
		const validation = z
			.array(playerWithOddsDtoSchema)
			.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},
};
