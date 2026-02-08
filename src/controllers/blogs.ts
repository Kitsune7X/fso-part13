import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import Blog from '../models/blog.js';
import type { NewBlog } from '../types/types.js';
import { NewBlogSchema } from '../utils/utils.js';
import { parseString } from '../utils/utils.js';

const router = express.Router();

const blogFinder = async (req: Request, res: Response, next: NextFunction) => {
	const parsedBlogId = parseString(req.params.id);
	res.locals.blog = await Blog.findByPk(parsedBlogId);
	next();
};

router.get('/', async (_req: Request, res: Response) => {
	const blogs: Blog[] | null = await Blog.findAll();
	if (blogs) {
		return res.status(200).json(blogs);
	}
	return res.status(404).end();
});

router.get('/:id', blogFinder, (_req: Request, res: Response) => {
	const blog: Blog | null = res.locals.blog;

	if (blog) {
		return res.status(200).json(blog);
	}
	return res.status(404).end();
});

router.post('/', async (req: Request<unknown, unknown, NewBlog>, res: Response, next: NextFunction) => {
	try {
		const parsedBody = NewBlogSchema.parse(req.body);
		const addedBlog = await Blog.create(parsedBody);
		return res.status(201).json(addedBlog);
	} catch (error) {
		return next(error);
	}
});

router.delete('/:id', blogFinder, async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const blog: Blog | null = res.locals.blog;
		if (blog) {
			await blog.destroy();
			return res.status(204).end();
		}
		return res.status(404).end();
	} catch (error) {
		return next(error);
	}
});

router.patch('/:id', blogFinder, async (_req: Request, res: Response<Blog, Blog>, next: NextFunction) => {
	try {
		const blog: Blog | null = res.locals.blog;
		if (blog) {
			blog.likes = blog.likes ? blog.likes + 1 : 1;
			await blog.save();
			return res.status(200).json(blog);
		}
		return res.status(404).end();
	} catch (error) {
		return next(error);
	}
});

export default router;
