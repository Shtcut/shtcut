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
