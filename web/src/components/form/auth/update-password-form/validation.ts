import { z } from 'zod';

const password = z.string().min(1, 'Password is required').min(7, 'Password must be at least 7 characters long');
const currentPassword = z.string().min(1, 'Current password is required');

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

export const changePasswordValidationSchema = z.object({ currentPassword, password });

export const updateUserValidationSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is required',
        invalid_type_error: 'Gender must be male, female, or other'
    }),
    email: z.string().email('Invalid email').optional()
});
