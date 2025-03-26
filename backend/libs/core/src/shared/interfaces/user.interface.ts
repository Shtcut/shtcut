import { Types } from 'mongoose';

export interface User {
    _id: Types.ObjectId;
    publicId: string;
    email: string;
    firstName: string;
    lastName: string;
}

declare global {
    namespace Express {
        interface User {
            _id: Types.ObjectId;
            publicId: string;
            email: string;
            firstName: string;
            lastName: string;
        }
    }
}
