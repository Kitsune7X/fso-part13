// TODO: Write handle logout route
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import { isAuthenticated, tokenExtractor } from '../utils/middleware.js';
import models from '../models/index.js';
import { Op } from 'sequelize';

const router = express.Router();
const { User, Session } = models;

router.delete('/', tokenExtractor, isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(res.locals.decodedToken.id);
    if (!user?.isLoggedIn) return res.status(401).json({ error: 'Unauthorized' });

    user.isLoggedIn = false;

    await user.save();

    const activeSession = await Session.findOne({
      where: { [Op.and]: [{ userId: req.session.user?.id, token: req.session.user?.token }] },
    });

    if (!activeSession) return res.status(401).json({ error: 'Unauthorized' });
    await activeSession.destroy();

    req.session.destroy((error) => {
      if (error) return next(error);
    });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
});

export default router;
