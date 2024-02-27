import { validateYulObj } from '@shtcut/_shared';
import * as Yup from 'yup';

const password = Yup.string().required('Password is required');
const confirmPassword = Yup.string().required('Confirm password is required');
const resetPasswordCode = Yup.string().required('Reset code is required');

export const updatePasswordValues = {
    password: '',
    confirmPassword: '',
    resetPasswordCode: '',
}
export const updatePasswordValidationSchema = validateYulObj({ password, confirmPassword, resetPasswordCode });