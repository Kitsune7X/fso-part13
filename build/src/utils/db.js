// TODO: Write initialize Db module
import { Sequelize } from 'sequelize';
import config from './config.js';
import { parseString } from './utils.js';
const { DATABASE_URL } = config;
const parsedDatabaseUrl = parseString(DATABASE_URL);
export const sequelize = new Sequelize(parsedDatabaseUrl);
export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the Database');
    }
    catch (error) {
        console.error('Unable to connect to the database', error);
        return process.exit(1);
    }
};
//# sourceMappingURL=db.js.map