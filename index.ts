import express from 'express';
import * as z from 'zod';
import type { Request, Response, NextFunction } from 'express';
import blogRouter from './src/controllers/blogs.js';
import userRouter from './src/controllers/users.js';
import config from './src/utils/config.js';
import { connectToDatabase } from './src/utils/db.js';

const app = express();
const { PORT } = config;

app.use(express.json());

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ error: error.issues });
  } else if (error instanceof Error) {
    res.status(500).json({ error: error.message });
  } else {
    next(error);
  }
};

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

app.use(errorMiddleware);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

void start();
