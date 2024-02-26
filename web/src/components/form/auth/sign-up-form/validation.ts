import { validateYulObj } from '@shtcut/_shared';
import * as Yup from 'yup';

const email = Yup.string().email('Email must be a valid email address').required('Email is required');
const password = Yup.string().required('Password field is required'); 
const firstName = Yup.string().required('First name field is required'); 
const lastName = Yup.string().required('Last name field is required'); 

export const signUpValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}
export const signUpValidationSchema = validateYulObj({ firstName, lastName, email, password });