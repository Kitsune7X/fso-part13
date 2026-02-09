import dotenv from 'dotenv';
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT ?? 3003;
const SECRET = process.env.SECRET;
export default {
    DATABASE_URL,
    PORT,
    SECRET,
};
//# sourceMappingURL=config.js.map