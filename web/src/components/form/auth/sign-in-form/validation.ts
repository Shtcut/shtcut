import { z } from 'zod';

const email = z.string().email('Email must be a valid email address').min(1, 'Email is required');
const password = z.string().min(1, 'Password field is required').min(7, 'Password must be at least 7 characters long');

export const signInValues = {
    email: '',
    password: ''
};
export const signInValidationSchema = z.object({ email, password });
