import * as z from 'zod';
export const NewBlogSchema = z.object({
    author: z.string().optional(),
    title: z.string(),
    url: z.string(),
    likes: z.number().optional(),
    yearWritten: z.number(),
});
export const NewUserSchema = z.object({
    username: z.email('Invalid Email address'),
    name: z.string(),
    password: z.string().min(7),
});
export const parseString = (str) => {
    const result = z.string().safeParse(str);
    if (!result.success) {
        throw new Error(result.error.message);
    }
    return result.data;
};
export const ReadStatusSchema = z.object({
    read: z.boolean(),
});
//# sourceMappingURL=utils.js.map