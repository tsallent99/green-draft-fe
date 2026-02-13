import { UserT } from '../entities';

// Register
export type RegisterUserDataT = {
  email: string;
  username: string;
  password: string;
  fullName?: string;
};

export type RegisterUserFnT = (data: RegisterUserDataT) => Promise<UserT>;

// Login
export type LoginUserDataT = {
  email: string;
  password: string;
};

export type LoginResponseT = {
  accessToken: string;
  tokenType: string;
  user: UserT;
};

export type LoginUserFnT = (data: LoginUserDataT) => Promise<LoginResponseT>;

// Get current user
export type GetCurrentUserFnT = () => Promise<UserT>;

// Get user by ID
export type GetUserByIdFnT = (userId: number) => Promise<UserT>;

export interface UserRepository {
  register: RegisterUserFnT;
  login: LoginUserFnT;
  getCurrentUser: GetCurrentUserFnT;
  getUserById: GetUserByIdFnT;
}
