// TODO: Write handle logout route
import express from 'express';
import type { Request, Response } from 'express';
import { isAuthenticated, tokenExtractor } from '../utils/middleware.js';
import models from '../models/index.js';

const router = express.Router();
const { User } = models;

router.delete('/', tokenExtractor, isAuthenticated, async (req: Request, res: Response) => {});
