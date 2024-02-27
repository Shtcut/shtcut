import { validateYulObj } from '@shtcut/_shared';
import * as Yup from 'yup';

const email = Yup.string().email('Email must be a valid email address').required('Email is required');

export const forgotPasswordValues = {
    email: '',
}
export const forgotPasswordValidationSchema = validateYulObj({ email });