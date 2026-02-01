// import express from 'express';
import dotenv from 'dotenv';
import { QueryTypes, Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL!);

// const app = express();

// app.get('/api/blogs', (_req, res) => {
// 	res.json('Hello!');
// });

// const PORT = process.env.PORT ?? 3003;

// app.listen(PORT, () => {
// 	console.log(`Server connected on port ${PORT}`);
// });

const main = async () => {
	try {
		await sequelize.authenticate();
		const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT });
		console.log(blogs);

		sequelize.close();
	} catch (error) {
		console.error('Unable to connect to the database');
	}
};

main();
