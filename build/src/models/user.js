import { sequelize } from '../utils/db.js';
import { DataTypes, Model } from 'sequelize';
class User extends Model {
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    underscored: true,
    modelName: 'user',
});
export default User;
//# sourceMappingURL=user.js.map