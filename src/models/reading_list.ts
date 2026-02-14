import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db.js';

class ReadingList extends Model {
  declare id: number;
  declare userId: number;
  declare blogId: number;
}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'reading_list',
  },
);

export default ReadingList;
