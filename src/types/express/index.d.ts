import type Blog from '../../models/blog.ts';
import { DecodedToken } from '../types.ts';

declare global {
  namespace Express {
    interface Locals {
      blog: Blog | null;
      decodedToken: DecodedToken;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}
