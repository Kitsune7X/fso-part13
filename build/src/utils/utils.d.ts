import * as z from 'zod';
export declare const NewBlogSchema: z.ZodObject<{
    author: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    url: z.ZodString;
    likes: z.ZodOptional<z.ZodNumber>;
    yearWritten: z.ZodNumber;
}, z.core.$strip>;
export declare const NewUserSchema: z.ZodObject<{
    username: z.ZodEmail;
    name: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const parseString: (str: string | string[] | undefined) => string;
export declare const ReadStatusSchema: z.ZodObject<{
    read: z.ZodBoolean;
}, z.core.$strip>;
//# sourceMappingURL=utils.d.ts.map