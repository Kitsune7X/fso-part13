import * as z from 'zod';
import { NewBlogSchema, NewUserSchema } from '../utils/utils.js';
import User from '../models/user.js';

export type NewBlog = z.infer<typeof NewBlogSchema>;

export type NewUser = z.infer<typeof NewUserSchema>;

export type ResponseUser = Partial<User>;

export type NewUsername = Pick<NewUser, 'username'>;

export interface UserParams {
  username: string;
}
