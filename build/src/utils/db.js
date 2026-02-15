import { Sequelize } from 'sequelize';
import config from './config.js';
import { parseString } from './utils.js';
import { Umzug, SequelizeStorage } from 'umzug';
// Convert __dirname for ES Module
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const { DATABASE_URL } = config;
const parsedDatabaseUrl = parseString(DATABASE_URL);
export const sequelize = new Sequelize(parsedDatabaseUrl);
export const migrator = new Umzug({
    migrations: {
        glob: ['../migrations/*.ts', { cwd: __dirname }],
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
});
const runMigration = async () => {
    const migration = await migrator.up();
    console.log('Migration up to date', {
        files: migration.map((mig) => mig.name),
    });
};
export const rollbackMigration = async () => {
    await sequelize.authenticate();
    await migrator.down();
};
export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await runMigration();
        console.log('Connected to the Database');
    }
    catch (error) {
        console.error('Unable to connect to the database', error);
        return process.exit(1);
    }
};
//# sourceMappingURL=db.js.map