import type { Request, Response, NextFunction } from 'express';
export declare const blogFinder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const tokenExtractor: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const isAuthenticated: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=middleware.d.ts.map