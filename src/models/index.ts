import Blog from './blog.js';
import User from './user.js';

void Blog.sync();
void User.sync();

export default { Blog, User };
