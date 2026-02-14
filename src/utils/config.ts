import dotenv from 'dotenv';
import * as z from 'zod';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

const PORT = process.env.PORT ?? 3003;

const SECRET = process.env.SECRET;

const SESSION_SECRET = z.string().parse(process.env.SESSION_SECRET);

export default {
  DATABASE_URL,
  PORT,
  SECRET,
  SESSION_SECRET,
};
