import * as z from 'zod';
import { NewBlogSchema } from '../utils/utils.js';

export type NewBlog = z.infer<typeof NewBlogSchema>;

// export interface Blog extends NewBlog {
// 	id: number;
// }
