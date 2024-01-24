import { Hono } from 'https://deno.land/x/hono@v4.0.0-rc.2/mod.ts';
import {
	cors,
	logger,
} from 'https://deno.land/x/hono@v4.0.0-rc.2/middleware.ts';

import auth from './routes/auth.route.ts';
import productsRoutes from './routes/products.route.ts';
import { createCategories } from './utils/initialCategorySetup.ts';
import './config/mongoose.ts';

const app = new Hono();
createCategories();
app.use(cors({ origin: '*' }));

export const customLogger = (message: string, ...rest: string[]) => {
	console.log(message, ...rest);
};

app.use('*', logger(customLogger));
app.get('/', (c) => c.json('hello'));

app.route('/api/auth', auth);

app.route('/api/', productsRoutes);

Deno.serve({ port: 8787 }, app.fetch);
console.log('server on port:8787');
