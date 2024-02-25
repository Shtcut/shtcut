import { validateYulObj } from '@shtcut/_shared';
import * as Yup from 'yup';

const email = Yup.string().email('Email must be a valid email address').required('Email is required');
const password = Yup.string().required('Password field is required'); 

export const signInValues = {
    email: '',
    password: '',
}
export const signInValidationSchema = validateYulObj({ email, password });