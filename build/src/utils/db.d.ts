import { Sequelize } from 'sequelize';
import { Umzug } from 'umzug';
export declare const sequelize: Sequelize;
export declare const migrator: Umzug<import("sequelize").QueryInterface>;
export declare const rollbackMigration: () => Promise<void>;
export declare const connectToDatabase: () => Promise<undefined>;
//# sourceMappingURL=db.d.ts.map