import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import models from '../models/index.js';
import type { NewBlog, ResponseBlog } from '../types/types.js';
import { NewBlogSchema } from '../utils/utils.js';
import * as z from 'zod';
import { Op } from 'sequelize';
import { blogFinder, tokenExtractor } from '../utils/middleware.js';

const router = express.Router();
const { Blog, User } = models;

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedQuery = req.query.search ? z.string().parse(req.query.search) : undefined;

    const where = parsedQuery
      ? {
          [Op.or]: [{ title: { [Op.iLike]: `%${parsedQuery}%` } }, { author: { [Op.iLike]: `%${parsedQuery}%` } }],
        }
      : {};

    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: { model: User, attributes: ['name'] },
      where,
      order: [['likes', 'DESC']],
    });
    if (blogs) {
      return res.status(200).json(blogs);
    }
    return res.status(404).end();
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', blogFinder, (_req: Request, res: Response) => {
  const blog = res.locals.blog;

  if (blog) {
    const blogJSON = blog.toJSON<ResponseBlog>();
    delete blogJSON.userId;
    return res.status(200).json(blogJSON);
  }
  return res.status(404).end();
});

router.post('/', tokenExtractor, async (req: Request<unknown, unknown, NewBlog>, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(res.locals.decodedToken.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const parsedBody = NewBlogSchema.parse(req.body);
    const addedBlog = await Blog.create({ ...parsedBody, userId: user.id });
    return res.status(201).json(addedBlog);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', tokenExtractor, blogFinder, async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = res.locals.blog;
    const user = await User.findByPk(res.locals.decodedToken.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (blog.userId === user.id) {
      await blog.destroy();
      return res.status(204).end();
    }
    return res.status(403).json({ error: 'Unauthorized' });
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id', blogFinder, async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = res.locals.blog;
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
