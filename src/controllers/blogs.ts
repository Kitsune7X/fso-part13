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
	const blogs: Blog[] = await Blog.findAll();

	res.status(200).json(blogs);
});

router.post('/', async (req: Request<unknown, unknown, NewBlog>, res: Response) => {
	const parsedBody = NewBlogSchema.parse(req.body);
	const addedBlog = await Blog.create(parsedBody);
	res.status(201).json(addedBlog);
});

router.delete('/:id', blogFinder, async (_req, res) => {
	const blog = res.locals.blog;
	if (blog) {
		await blog.destroy();
	}
	res.status(204).end();
});
