import { httpClient } from "@libs/shared/backend/data-access-http-client";
import {
	UserCreateDtoT,
	UserLoginDtoT,
	UserResponseDtoT,
	LoginResponseDtoT,
	userResponseDtoSchema,
	loginResponseDtoSchema,
} from "./api.dto";

const BASE_URL = "/users";

export const userApi = {
	register: async (data: UserCreateDtoT): Promise<UserResponseDtoT> => {
		const response = await httpClient.post(`${BASE_URL}/register`, data);
		const validation = userResponseDtoSchema.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},

	login: async (data: UserLoginDtoT): Promise<LoginResponseDtoT> => {
		const response = await httpClient.post(`${BASE_URL}/login`, data);
		const validation = loginResponseDtoSchema.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},

	getCurrentUser: async (): Promise<UserResponseDtoT> => {
		const response = await httpClient.get(`${BASE_URL}/me`);
		const validation = userResponseDtoSchema.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},

	getUserById: async (userId: number): Promise<UserResponseDtoT> => {
		const response = await httpClient.get(`${BASE_URL}/${userId}`);
		const validation = userResponseDtoSchema.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},
};
