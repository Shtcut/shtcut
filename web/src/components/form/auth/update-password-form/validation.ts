import { z } from 'zod';

const password = z.string().min(1, 'Password is required').min(7, 'Password must be at least 7 characters long');
const confirmPassword = z
    .string()
    .min(1, 'Confirm password is required')
    .min(7, 'Confirm Password must be at least 7 characters long');
const resetPasswordCode = z.string().min(1, 'Reset code is required');

export const updatePasswordValidationSchema = z
    .object({ password, confirmPassword, resetPasswordCode })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    });
