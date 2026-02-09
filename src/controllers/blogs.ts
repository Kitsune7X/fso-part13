import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import models from '../models/index.js';
import type { NewBlog } from '../types/types.js';
import { NewBlogSchema } from '../utils/utils.js';
import { parseString } from '../utils/utils.js';
import jwt from 'jsonwebtoken';
import config from '../utils/config.js';
import * as z from 'zod';
import type { DecodedToken } from '../types/types.js';

const router = express.Router();
const { Blog, User } = models;
const { SECRET } = config;

const blogFinder = async (req: Request, res: Response, next: NextFunction) => {
  const parsedBlogId = parseString(req.params.id);
  res.locals.blog = await Blog.findByPk(parsedBlogId, {
    include: { model: User, attributes: ['name'] },
  });
  next();
};

const tokenExtractor = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.get('authorization');

  if (authorization?.toLowerCase().startsWith('bearer ')) {
    try {
      res.locals.decodedToken = jwt.verify(authorization.substring(7), z.string().parse(SECRET)) as DecodedToken;
    } catch {
      return res.status(401).json({ error: 'Token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'Token missing' });
  }
  return next();
};

router.get('/', async (_req: Request, res: Response) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: { model: User, attributes: ['name'] },
  });
  if (blogs) {
    return res.status(200).json(blogs);
  }
  return res.status(404).end();
});

router.get('/:id', blogFinder, (_req: Request, res: Response) => {
  const blog = res.locals.blog;

  if (blog) {
    return res.status(200).json(blog);
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

router.delete('/:id', blogFinder, tokenExtractor, async (_req: Request, res: Response, next: NextFunction) => {
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
    return res.status(401).json({ error: 'Unauthorized' });
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
