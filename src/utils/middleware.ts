import { parseString } from './utils.js';
import type { Request, Response, NextFunction } from 'express';
import models from '../models/index.js';
import type { DecodedToken } from '../types/types.js';
import jwt from 'jsonwebtoken';
import * as z from 'zod';
import config from './config.js';

const { User, Blog } = models;
const { SECRET } = config;

export const blogFinder = async (req: Request, res: Response, next: NextFunction) => {
  const parsedBlogId = parseString(req.params.id);
  res.locals.blog = await Blog.findByPk(parsedBlogId, {
    include: { model: User, attributes: ['name'] },
  });
  next();
};

export const tokenExtractor = (req: Request, res: Response, next: NextFunction) => {
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
