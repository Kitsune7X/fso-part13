declare const router: import("express-serve-static-core").Router;
declare module 'express-session' {
    interface SessionData {
        user: {
            token: string;
            username: string;
            id: number;
        };
    }
}
export default router;
//# sourceMappingURL=login.d.ts.map