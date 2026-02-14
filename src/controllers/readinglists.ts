import express from 'express';
import models from '../models/index.js';
import type { Request, Response, NextFunction } from 'express';
// import { tokenExtractor } from '../utils/middleware.js';

const router = express.Router();
const { User, Blog, Reading } = models;

interface ReadingRequest {
  blogId: number;
  userId: number;
}
router.post('/', async (req: Request<unknown, unknown, ReadingRequest>, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.body.userId);
    const blog = await Blog.findByPk(req.body.blogId);

    if (!(user && blog)) {
      return res.status(404).json({ error: 'Invalid user or blog' });
    }

    const addedReading = await Reading.create({ blogId: blog.id, userId: user.id });

    return res.status(201).json(addedReading);
  } catch (error) {
    return next(error);
  }
});

export default router;
