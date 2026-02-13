import { z } from 'zod';

// User Create DTO
export const userCreateDtoSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  fullName: z.string().nullable().optional(),
  password: z.string(),
});
export type UserCreateDtoT = z.infer<typeof userCreateDtoSchema>;

// User Login DTO
export const userLoginDtoSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type UserLoginDtoT = z.infer<typeof userLoginDtoSchema>;

// User Response DTO
export const userResponseDtoSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  username: z.string(),
  fullName: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type UserResponseDtoT = z.infer<typeof userResponseDtoSchema>;

// Login Response DTO
export const loginResponseDtoSchema = z.object({
  accessToken: z.string(),
  tokenType: z.string(),
  user: userResponseDtoSchema,
});
export type LoginResponseDtoT = z.infer<typeof loginResponseDtoSchema>;
