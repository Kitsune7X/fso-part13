import { DataTypes } from 'sequelize';
import type { Migration } from '../types/types.js';

export const up: Migration = async ({ context: queryInterface }) => {
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

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('users', 'is_logged_in');
  await queryInterface.dropTable('sessions');
};
