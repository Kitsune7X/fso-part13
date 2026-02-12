import { DataTypes } from 'sequelize';
import type { Migration } from '../types/types.js';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('blogs', 'year_written', {
    type: DataTypes.INTEGER,
    validate: {
      min: { args: [1991], msg: 'Year written need to be after 1991' },
      max: { args: [new Date().getFullYear()], msg: 'Year written must not later than current year' },
    },
    allowNull: false,
    defaultValue: new Date().getFullYear(),
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('blogs', 'year_written');
};
