// TODO: Initialize a table that store the session
import { DataTypes } from 'sequelize';
export const up = async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'is_logged_in', {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    });
    await queryInterface.createTable('sessions', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        is_logged_in: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
};
export const down = async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'is_logged_in');
    await queryInterface.dropTable('sessions');
};
//# sourceMappingURL=20260214_01_session_management.js.map