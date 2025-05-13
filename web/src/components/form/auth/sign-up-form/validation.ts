import { z } from 'zod';

const email = z.string().email('Email must be a valid email address').min(1, 'Email is required');
const password = z.string().min(1, 'Password field is required').min(7, 'Password must be at least 7 characters long');
const firstName = z.string().min(1, 'First name field is required');
const lastName = z.string().min(1, 'Last name field is required');

export const signInValues = {
    email: '',
    password: ''
};

export const signUpValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
};
export const signUpValidationSchema = z.object({ firstName, lastName, email, password });

const emailSchema = z.union([z.string().email({ message: 'Invalid email address' }), z.literal('')]);

export const inviteFormSchema = z.object({
    emails: z.array(emailSchema).refine((emails) => emails.filter((email) => email !== '').length > 0, {
        message: 'At least one email is required'
    })
});

export const createRoleSchema = z.object({
    title: z.string().min(1, { message: 'Role name is required' }),
    permissions: z.array(z.string()).min(1, { message: 'At least one permission must be selected' })
});

export const updateRoleSchema = z.object({
    title: z.string().min(1, { message: 'Role name is required' })
});
