'use client';

import { Dict } from '@shtcut-ui/react';
import { AppButton, TextField } from '@shtcut/components/_shared';
import { Formik } from 'formik';
import { updatePasswordValidationSchema, updatePasswordValues } from './validation';

type UpdatePasswordFormProps = {
    isLoading: boolean;
    handleUpdatePasswordSubmit: (payload: Dict) => void;
};

export const UpdatePasswordForm = (props: UpdatePasswordFormProps) => {
    const { isLoading, handleUpdatePasswordSubmit } = props;

    return (
        <Formik
            enableReinitialize
            initialValues={updatePasswordValues}
            validationSchema={updatePasswordValidationSchema}
            onSubmit={handleUpdatePasswordSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <form className="space-y-5 w-[96] mx-auto md:w-2/3 items-center" onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            label="Reset code"
                            labelClassName="font-normal"
                            className="w-full mt-2 h-12 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
                            type="text"
                            placeholder="Enter the reset code"
                            name="resetPasswordCode"
                            value={values.resetPasswordCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errorText={errors.resetPasswordCode && touched.resetPasswordCode ? errors.resetPasswordCode : undefined}
                        />
                    </div>
                    <div>
                        <TextField
                            label="New Password"
                            labelClassName="font-normal"
                            className="w-full mt-2 h-12 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
                            type="password"
                            placeholder="Enter your new password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errorText={errors.password && touched.password ? errors.password : undefined}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Confirm Password"
                            labelClassName="font-normal"
                            className="w-full mt-2 h-12 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
                            type="password"
                            placeholder="Confirm new password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errorText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : undefined}
                        />
                    </div>
                    <AppButton
                        htmlType="submit"
                        loadingLabel="Loading...."
                        disabled={isSubmitting || isLoading}
                        loading={isLoading}
                        className="w-full h-12 px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150"
                    >
                        Update Password
                    </AppButton>
                </form>
            )}
        </Formik>
    );
};
