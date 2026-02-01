import * as z from 'zod';

export const NewBlogSchema = z.object({
	author: z.string().optional(),
	title: z.string(),
	url: z.string(),
	likes: z.number().optional(),
});
