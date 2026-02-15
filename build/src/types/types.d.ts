import * as z from 'zod';
import { NewBlogSchema, NewUserSchema } from '../utils/utils.js';
import User from '../models/user.js';
import Blog from '../models/blog.js';
import type { JwtPayload } from 'jsonwebtoken';
import { migrator } from '../utils/db.js';
export type NewBlog = z.infer<typeof NewBlogSchema>;
export type NewUser = z.infer<typeof NewUserSchema>;
export type ResponseUser = Partial<User>;
export type NewUsername = Pick<NewUser, 'username'>;
export type LoginUser = Omit<NewUser, 'name'>;
export interface DecodedToken extends JwtPayload {
    id: number;
    username: string;
}
export interface UserIdParams {
    id: number;
}
export interface UsernameParams {
    username: string;
}
export type ResponseBlog = Partial<Blog>;
export type Migration = typeof migrator._types.migration;
//# sourceMappingURL=types.d.ts.map