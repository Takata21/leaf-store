// deno-lint-ignore-file
// authors.ts
import { Hono } from 'https://deno.land/x/hono@v4.0.0-rc.2/mod.ts';
import User from '../models/User.ts';
import { signAccessToken } from '../helpers/signAccessToken.ts';
import { validateLogin, validateUser } from '../libs/schemas/auth.validator.ts';
import { verifyToken } from '../middlewares/auth.middlewares.ts';
const app = new Hono();

app.post('/login', async (c) => {
	const body = await c.req.json();

	const result = validateLogin(body);

	if (!result.success) {
		return c.json({ error: JSON.parse(result.error.message) }, 400);
	}
	// console.log(body);

	const userFound = await User.findOne({ email: body.email });

	if (!userFound) return c.json({ error: 'The user does not exists' }, 401);

	const isMatch = await userFound.validPassword(body.password);

	if (!isMatch) return c.json({ error: 'email or password invalid' }, 401);

	const token = await signAccessToken(userFound.id);

	return c.json({
		token: token,
		user: {
			id: userFound.id,
			username: userFound.username,
			email: userFound.email,
		},
	});
});

// CREATE USER
app.post('/register', async (c) => {
	const body = await c.req.json();
	// userSchema
	const result = validateUser(body);

	if (!result.success) {
		return c.json({ error: JSON.parse(result.error.message) }, 400);
	}

	try {
		const userFound = await User.findOne({ email: body.email });

		const usernameExists = await User.findOne({ username: body.username });

		if (usernameExists) {
			return c.json({ error: 'Username already taken' }, 400);
		}

		if (userFound) {
			return c.json({ error: 'Email already registered' }, 400); // 400 Bad Request
		}

		const newUser = new User({
			username: body.username,
			image: body.image,
			email: body.email,
			password: body.password,
		});
		newUser.password = await newUser.generateHash(newUser.password);

		const userSaved = await newUser.save();

		const token = await signAccessToken(userSaved.id);
		// console.log(token);
		return c.json({
			token: token,
			user: {
				id: userSaved.id,
				username: userSaved.username,
				email: userSaved.email,
			},
		});
	} catch (error) {
		console.log(error);
		return c.json({ error: 'Registration failed. Please try again' }, 500);
	}
});

app.get('/profile', verifyToken, async (c) => {
	const userId = c.get('userId') as string;
	try {
		const user = await User.find({ _id: userId }).select(
			'-password',
		);
		if (!user) {
			return c.json({ error: 'User not found' }, 401);
		}

		return c.json(user);
	} catch (error) {
		console.log(error);
		return c.json({ error: 'An unexpected error occurred.' }, 500);
	}
});

export default app;
