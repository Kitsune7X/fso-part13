import express from 'express';
import bcrypt from 'bcrypt';
import type { LoginUser } from '../types/types.js';
import type { Request } from 'express';
import models from '../models/index.js';
import config from '../utils/config.js';
import jwt from 'jsonwebtoken';
import * as z from 'zod';

const router = express.Router();
const { User } = models;
const { SECRET } = config;

router.post('/', async (req: Request<unknown, unknown, LoginUser>, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    const passwordCorrect = user === null ? false : await bcrypt.compare(req.body.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, z.string().parse(SECRET));

    return res.status(200).json({ token, username: user.username, name: user.name });
  } catch (error) {
    return next(error);
  }
});

export default router;
