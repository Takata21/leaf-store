import { Context } from 'https://deno.land/x/hono@v4.0.0-rc.2/mod.ts';
import jwt from 'npm:jsonwebtoken';

import { JWT_SECRET } from '../config.ts';

export const verifyToken = async (c: Context, next: () => Promise<void>) => {
	const token = c.req.header('authorization');
	if (!token) {
		return c.json({ message: 'Unauthorized' }, 401);
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		console.log(decoded);
		c.set('userId', decoded.id);
		await next();
	} catch (error) {
		console.error(error);
		return c.json({ message: 'Unauthorized' }, 401);
	}
};
