// TODO: export Database url and port config
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

const PORT = process.env.PORT ?? 3003;

export default {
	DATABASE_URL,
	PORT,
};
