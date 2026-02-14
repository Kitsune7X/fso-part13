import express from 'express';
import models from '../models/index.js';
import type { Request, Response, NextFunction } from 'express';
import { tokenExtractor } from '../utils/middleware.js';
import { parseString, ReadStatusSchema } from '../utils/utils.js';

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

// TODO: Impletment changing blog reading status

router.patch('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const parsedId = parseString(req.params.id);
    const user = await User.findByPk(res.locals.decodedToken.id);

    if (!user) {
      return res.status(404).json({ error: 'Invalid user' });
    }

    const readingList = await Reading.findByPk(parsedId);

    if (!readingList) {
      return res.status(404).json({ error: 'Invalid reading list id' });
    }

    if (user.id !== readingList.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const parsedBody = ReadStatusSchema.parse(req.body);
    readingList.read = parsedBody.read;
    await readingList.save();

    return res.status(200).json(readingList);
  } catch (error) {
    return next(error);
  }
});

export default router;
