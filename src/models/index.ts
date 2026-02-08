import Blog from './blog.js';
import User from './user.js';

User.hasMany(Blog);
Blog.belongsTo(User);
void Blog.sync({ alter: true });
void User.sync({ alter: true });

export default { Blog, User };
