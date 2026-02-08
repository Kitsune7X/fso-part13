import type Blog from '../../models/blog.ts';

declare global {
  namespace Express {
    interface Locals {
      blog: Blog | null;
    }
  }
}
