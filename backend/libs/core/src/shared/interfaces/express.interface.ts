import 'express';

// Extend Express interfaces
declare global {
    namespace Express {
        interface Request {
            currentWorkspace?: string;
        }
    }
} 