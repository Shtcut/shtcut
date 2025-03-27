import { Document } from 'mongoose';

export interface AuthUser {
    _id: string | any;
    publicId?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    [key: string]: any;
}

declare global {
    namespace Express {
        interface User {
            _id: string | any;
            publicId?: string;
            email?: string;
            firstName?: string;
            lastName?: string;
        }
    }
}
