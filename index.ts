import express from 'express';
import dotenv from 'dotenv';
import { DataTypes, Model, Sequelize } from 'sequelize';
import * as z from 'zod';
import type { Request, Response, NextFunction } from 'express';
import { NewBlogSchema } from './src/utils/utils.js';
import type { NewBlog } from './src/types/types.js';

dotenv.config();

const databaseUrlParseResult = z.string().safeParse(process.env.DATABASE_URL);

if (!databaseUrlParseResult.success) {
	throw new Error('Incorrect DATABASE_URL');
}

const sequelize = new Sequelize(databaseUrlParseResult.data);

class Blog extends Model {
	declare id: number;
	declare author?: string;
	declare url: string;
	declare title: string;
	declare likes?: number;
}

Blog.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			unique: true,
		},
		author: {
			type: DataTypes.STRING,
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		likes: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
	},
	{ sequelize, underscored: true, timestamps: false, modelName: 'blog' },
);

Blog.sync();

const app = express();

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

app.get('/api/blogs', async (_req: Request, res: Response) => {
	const blogs: Blog[] = await Blog.findAll();

	res.json(blogs);
});

app.post('/api/blogs', async (req: Request<unknown, unknown, NewBlog>, res: Response) => {
	const parsedBody = NewBlogSchema.parse(req.body);
	const addedBlog = await Blog.create(parsedBody);
	res.status(201).json(addedBlog);
});

app.delete('/api/blogs/:id', async (req, res) => {
	const parsedId = z.string().parse(req.params.id);

	const blogToDelete = await Blog.findByPk(parsedId);

	if (!blogToDelete) {
		throw new Error('Invalid blog');
	}

	await Blog.destroy({
		where: {
			id: blogToDelete.id,
		},
	});

	res.status(204).end();
});

app.use(errorMiddleware);

const PORT = process.env.PORT ?? 3003;

app.listen(PORT, () => {
	console.log(`Server connected on port ${PORT}`);
});

// TODO: Break the app into smaller chunks and import
