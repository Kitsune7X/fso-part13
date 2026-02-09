import express from 'express';
import models from '../models/index.js';
import { NewBlogSchema } from '../utils/utils.js';
import { parseString } from '../utils/utils.js';
import jwt from 'jsonwebtoken';
import config from '../utils/config.js';
import * as z from 'zod';
const router = express.Router();
const { Blog, User } = models;
const { SECRET } = config;
const blogFinder = async (req, res, next) => {
    const parsedBlogId = parseString(req.params.id);
    res.locals.blog = await Blog.findByPk(parsedBlogId, {
        attributes: { exclude: ['userId'] },
        include: { model: User, attributes: ['name'] },
    });
    next();
};
const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization?.toLowerCase().startsWith('bearer ')) {
        try {
            res.locals.decodedToken = jwt.verify(authorization.substring(7), z.string().parse(SECRET));
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
router.get('/', async (_req, res) => {
    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: { model: User, attributes: ['name'] },
    });
    if (blogs) {
        return res.status(200).json(blogs);
    }
    return res.status(404).end();
});
router.get('/:id', blogFinder, (_req, res) => {
    const blog = res.locals.blog;
    if (blog) {
        return res.status(200).json(blog);
    }
    return res.status(404).end();
});
router.post('/', tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(res.locals.decodedToken.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const parsedBody = NewBlogSchema.parse(req.body);
        const addedBlog = await Blog.create({ ...parsedBody, userId: user.id });
        return res.status(201).json(addedBlog);
    }
    catch (error) {
        return next(error);
    }
});
router.delete('/:id', blogFinder, tokenExtractor, async (_req, res, next) => {
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
    }
    catch (error) {
        return next(error);
    }
});
router.patch('/:id', blogFinder, async (_req, res, next) => {
    try {
        const blog = res.locals.blog;
        if (blog) {
            blog.likes = blog.likes ? blog.likes + 1 : 1;
            await blog.save();
            return res.status(200).json(blog);
        }
        return res.status(404).end();
    }
    catch (error) {
        return next(error);
    }
});
export default router;
//# sourceMappingURL=blogs.js.map