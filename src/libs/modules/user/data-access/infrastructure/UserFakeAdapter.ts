import { UserRepository, RegisterUserDataT, LoginUserDataT, LoginResponseT } from '../../domain/repositories';
import { UserT } from '../../domain/entities';

const mockUsers: UserT[] = [
  {
    id: 1,
    email: 'john@example.com',
    username: 'johndoe',
    fullName: 'John Doe',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    email: 'jane@example.com',
    username: 'janedoe',
    fullName: 'Jane Doe',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

let currentUserId = 1;
let nextId = 3;

export class UserFakeAdapter implements UserRepository {
  async register(data: RegisterUserDataT): Promise<UserT> {
    const newUser: UserT = {
      id: nextId++,
      email: data.email,
      username: data.username,
      fullName: data.fullName ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return newUser;
  }

  async login(data: LoginUserDataT): Promise<LoginResponseT> {
    const user = mockUsers.find((u) => u.email === data.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    currentUserId = user.id;
    return {
      accessToken: 'mock-access-token-' + user.id,
      tokenType: 'bearer',
      user,
    };
  }

  async getCurrentUser(): Promise<UserT> {
    const user = mockUsers.find((u) => u.id === currentUserId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getUserById(userId: number): Promise<UserT> {
    const user = mockUsers.find((u) => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
