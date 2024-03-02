import z from "zod";


export const SignupSchema = z.object({
    email: z.string(),
    name: z.string().optional(),
    password: z.string()
});


export const SigninSchema = z.object({
    email: z.string(),
    password: z.string()
})


export const BlogPostSchema = z.object({
    title: z.string(),
    content: z.string()
})

export const BlogUpdateSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    published: z.boolean().optional()
})


export type SignupType = z.infer<typeof SignupSchema>;
export type SigninType = z.infer<typeof SigninSchema>;
export type BlogPostSchema = z.infer<typeof BlogPostSchema>;
export type BlogUpdateSchema = z.infer<typeof BlogUpdateSchema>;