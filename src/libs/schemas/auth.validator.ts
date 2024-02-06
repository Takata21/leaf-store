import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

export interface User {
	username: string; // String with length between 5 and 15
	image?: string; // Optional property
	email: string; // Valid email format
	password: string; // String with minimum length of 8
}

export const userSchema = z.object({
	username: z.string().min(5).max(15),
	image: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
});

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export function validateUser(input: User) {
	return userSchema.safeParse(input);
}

export function validateLogin(input: { username: string; password: string }) {
	return loginSchema.safeParse(input);
}
