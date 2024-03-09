import { z } from 'zod';


const name = z.string().min(1,'Workspace name is required');
const slug = z.string().min(1, 'Slug name is required');

export const workspaceValues = {
    name: '',
    slug: ''
};
export const workspaceValidationSchema = z.object({ name, slug });
