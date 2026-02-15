import express from 'express';
import bcrypt from 'bcrypt';
import models from '../models/index.js';
import config from '../utils/config.js';
import jwt from 'jsonwebtoken';
import * as z from 'zod';
import { isAuthenticated } from '../utils/middleware.js';
const router = express.Router();
const { User, Session } = models;
const { SECRET } = config;
router.post('/', async (req, res, next) => {
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
        user.isLoggedIn = true;
        await user.save();
        await Session.create({ token, userId: user.id, isLoggedIn: true });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 1000,
        });
        req.session.user = Object.assign(userForToken, { token, isLoggedIn: true });
        // console.log(req.session);
        req.session.save();
        return res.status(200).json({ token, username: user.username, name: user.name });
    }
    catch (error) {
        return next(error);
    }
});
router.get('/session', isAuthenticated, (_req, res) => {
    res.send('Hello!!!!!!!!');
});
export default router;
//# sourceMappingURL=login.js.map