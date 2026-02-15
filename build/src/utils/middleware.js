import { parseString } from './utils.js';
import models from '../models/index.js';
import jwt from 'jsonwebtoken';
import * as z from 'zod';
import config from './config.js';
import { Op } from 'sequelize';
const { User, Blog, Session } = models;
const { SECRET } = config;
export const blogFinder = async (req, res, next) => {
    const parsedBlogId = parseString(req.params.id);
    res.locals.blog = await Blog.findByPk(parsedBlogId, {
        include: { model: User, attributes: ['name'] },
    });
    next();
};
const TOKEN_START = 7;
export const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization?.toLowerCase().startsWith('bearer ')) {
        try {
            res.locals.decodedToken = jwt.verify(authorization.substring(TOKEN_START), z.string().parse(SECRET));
        }
        catch {
            return res.status(401).json({ error: 'Token invalid' });
        }
    }
    else {
        return res.status(401).json({ error: 'Token missing' });
    }
    return next();
};
export const isAuthenticated = async (req, res, next) => {
    // const user = await User.findByPk(res.locals.decodedToken.id);
    // if (!user?.isLoggedIn) return res.status(401).json({ error: 'Unauthorized' });
    // Get extract user from token and make sure that expired token cannot be used to authenticate
    const authorization = req.get('authorization');
    if (authorization?.toLowerCase().startsWith('bearer') && req.session.user) {
        try {
            const token = z.string().parse(authorization.substring(TOKEN_START));
            console.log(token);
            const userId = req.session.user.id;
            console.log(userId);
            const activeSession = await Session.findOne({
                where: { [Op.and]: [{ userId }, { token }] },
            });
            if (!activeSession?.isLoggedIn)
                res.status(401).json({ error: 'Unauthorized' });
            return next();
        }
        catch (error) {
            return next(error);
        }
    }
    else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};
//# sourceMappingURL=middleware.js.map