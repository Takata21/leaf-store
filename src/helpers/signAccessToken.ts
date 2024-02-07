import jwt from 'npm:jsonwebtoken';
import { JWT_SECRET } from '../config.ts';

export const signAccessToken = (userId: string) => {
	return new Promise((resolve, reject) => {
		if (!userId) {
			reject(new Error('userId is required'));
		}
		jwt.sign(
			{ id: userId },
			JWT_SECRET,
			(err: Error, token: string) => {
				if (err) return reject(err);
				resolve(token);
			},
		);
	});
};
