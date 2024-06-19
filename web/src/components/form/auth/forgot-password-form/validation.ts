import { z } from 'zod';


const email = z.string().email('Email must be a valid email address').min(1, 'Email is required');

export const forgotPasswordValidationSchema = z.object({ email });
