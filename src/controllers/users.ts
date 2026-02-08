import express from 'express';
import models from '../models/index.js';
import bcrypt from 'bcrypt';
import { NewUserSchema } from '../utils/utils.js';
import type { ResponseUser, NewUsername, UserParams } from '../types/types.js';
import type { Request } from 'express';

const router = express.Router();
const { User, Blog } = models;

router.post('/', async (req, res, next) => {
  try {
    const saltRounds = 10;
    const parsedNewUser = NewUserSchema.parse(req.body);

    const passwordHash = await bcrypt.hash(parsedNewUser.password, saltRounds);

    const createdUser = await User.create({ username: parsedNewUser.username, name: parsedNewUser.name, passwordHash });

    const createdUserJSON = createdUser.toJSON<ResponseUser>();
    delete createdUserJSON.passwordHash;
    return res.status(201).send(createdUserJSON);
  } catch (error) {
    return next(error);
  }
});

router.get('/', async (_req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['passwordHash'] }, include: Blog });

  if (users) {
    return res.status(200).json(users);
  }
  return res.status(404).end();
});

router.patch('/:username', async (req: Request<UserParams, unknown, NewUsername>, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
      attributes: { exclude: ['passwordHash'] },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = req.body.username;
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
});

export default router;
