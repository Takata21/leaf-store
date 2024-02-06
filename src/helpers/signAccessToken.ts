import { create } from 'https://deno.land/x/djwt@v3.0.1/dist/mod.js';
import { key } from './signAccessToken.ts';

export const signAccessToken = (userId: string) => {
	return new Promise((resolve, reject) => {
		if (!userId) {
			reject(new Error('userId is required'));
		}
		resolve(create({ alg: 'HS512', typ: 'JWT' }, { id: userId }, key));
	});
};
import { decode, verify } from 'https://deno.land/x/djwt@v3.0.1/dist/mod.js';

export const key = await crypto.subtle.generateKey(
	{ name: 'HMAC', hash: 'SHA-512' },
	true,
	['sign', 'verify'],
);
