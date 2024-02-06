import { load } from 'https://deno.land/std@0.212.0/dotenv/mod.ts';

const env = await load();
export const PORT = env['PORT'] || 8787;
export const MONGODB_URL = env['MONGODB_URL'];
export const JWT_SECRET = env['JWT_SECRET'];
