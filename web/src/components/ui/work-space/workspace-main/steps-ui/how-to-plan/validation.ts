import { z } from 'zod';

const name = z.string().min(1, 'Name of workspace is required');
const capacity = z.string().min(1, 'Please select your workspace capacity');

export const workspaceValidation = {
    name: '',
    capacity: ''
};
export const signInValidationSchema = z.object({ name, capacity });