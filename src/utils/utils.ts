import * as z from 'zod';

export const NewBlogSchema = z.object({
	author: z.string().optional(),
	title: z.string(),
	url: z.string(),
	likes: z.number().optional(),
});

export const parseString = (str: string | undefined) => {
	const result = z.string().safeParse(str);

	if (!result.success) {
		throw new Error(result.error.message);
	}
	return result.data;
};
