import { validateYulObj } from '@shtcut/_shared';
import * as Yup from 'yup';

const name = Yup.string().required('Workspace name is required');
const slug = Yup.string().required('Slug name is required');

export const workspaceValues = {
    name: '',
    slug: ''
};
export const workspaceValidationSchema = validateYulObj({ name, slug });
