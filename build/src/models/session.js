import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db.js';
class Session extends Model {
}
Session.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    isLoggedIn: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'session',
});
export default Session;
//# sourceMappingURL=session.js.map