import express from 'express';
import models from '../models/index.js';
import { sequelize } from '../utils/db.js';
const router = express.Router();
const { Blog } = models;
router.get('/', async (_req, res) => {
    const authors = await Blog.findAll({
        group: 'author',
        attributes: [
            'author',
            [sequelize.fn('COUNT', sequelize.col('author')), 'articles'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
        ],
        order: [['likes', 'DESC']],
    });
    return res.status(200).json(authors);
});
export default router;
//# sourceMappingURL=authors.js.map