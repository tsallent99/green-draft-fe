import { z } from 'zod';
import { zodValidationHandler } from '@libs/shared/utils';

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  username: z.string(),
  fullName: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserT = z.infer<typeof userSchema>;

export class UserEntity {
  private _user: UserT;

  public get user(): UserT {
    return this._user;
  }

  public get id(): number {
    return this._user.id;
  }

  public get email(): string {
    return this._user.email;
  }

  public get username(): string {
    return this._user.username;
  }

  public get fullName(): string | null {
    return this._user.fullName;
  }

  public get createdAt(): Date {
    return this._user.createdAt;
  }

  public get updatedAt(): Date {
    return this._user.updatedAt;
  }

  constructor(userData: unknown) {
    const validation = userSchema.safeParse(userData);
    this._validateUserData(validation);
    this._user = validation.data;
  }

  private _validateUserData(
    validation: {
      success: boolean;
      data?: UserT;
    }
  ): asserts validation is { success: true; data: UserT } {
    zodValidationHandler(validation);
  }
}
