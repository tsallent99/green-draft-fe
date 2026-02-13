import { UserRepository, RegisterUserDataT, LoginUserDataT } from '../../domain/repositories';
import { UserT } from '../../domain/entities';
import { userApi } from './api';

export class ApiUserAdapter implements UserRepository {
  async register(data: RegisterUserDataT): Promise<UserT> {
    return await userApi.register({
      email: data.email,
      username: data.username,
      password: data.password,
      fullName: data.fullName ?? null,
    });
  }

  async login(data: LoginUserDataT) {
    const response = await userApi.login({
      email: data.email,
      password: data.password,
    });

    return {
      accessToken: response.accessToken,
      tokenType: response.tokenType,
      user: response.user,
    };
  }

  async getCurrentUser(): Promise<UserT> {
    return await userApi.getCurrentUser();
  }

  async getUserById(userId: number): Promise<UserT> {
    return await userApi.getUserById(userId);
  }
}
