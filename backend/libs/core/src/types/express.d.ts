import 'express';

declare module 'express' {
    export interface Request {
        currentWorkspace?: string;
    }
} 