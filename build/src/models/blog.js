import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db.js';
class Blog extends Model {
}
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    author: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    yearWritten: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: { args: [1991], msg: 'Year written need to be after 1991' },
            max: { args: [new Date().getFullYear()], msg: 'Year written must not later than current year' },
        },
        defaultValue: new Date().getFullYear(),
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog',
});
export default Blog;
//# sourceMappingURL=blog.js.map