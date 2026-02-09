import * as z from 'zod';
import { NewBlogSchema, NewUserSchema } from '../utils/utils.js';
import User from '../models/user.js';
import type { JwtPayload } from 'jsonwebtoken';
export type NewBlog = z.infer<typeof NewBlogSchema>;
export type NewUser = z.infer<typeof NewUserSchema>;
export type ResponseUser = Partial<User>;
export type NewUsername = Pick<NewUser, 'username'>;
export type LoginUser = Omit<NewUser, 'name'>;
export interface DecodedToken extends JwtPayload {
    id: number;
    username: string;
}
export interface UserParams {
    username: string;
}
//# sourceMappingURL=types.d.ts.map