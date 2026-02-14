import Blog from './blog.js';
import User from './user.js';
import Reading from './reading.js';
import Session from './session.js';

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasOne(Session);
Session.belongsTo(User);

User.belongsToMany(Blog, { through: Reading, as: 'readings' });
Blog.belongsToMany(User, { through: Reading });

export default { Blog, User, Reading, Session };
