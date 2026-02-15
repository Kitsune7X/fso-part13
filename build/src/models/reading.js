import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db.js';
class Reading extends Model {
}
Reading.init({
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
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'readinglist',
});
export default Reading;
//# sourceMappingURL=reading.js.map