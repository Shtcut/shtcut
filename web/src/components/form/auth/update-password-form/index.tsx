'use client';

import { Card, Dict } from '@shtcut-ui/react';
import { AppAlert, AppButton, TextField } from '@shtcut/components/_shared';
import { Formik } from 'formik';
import { updatePasswordValidationSchema, updatePasswordValues } from './validation';
import { Logo, NavLink } from '@shtcut/components';
import { get } from 'lodash';

type UpdatePasswordFormProps = {
    isLoading: boolean;
    handleUpdatePasswordSubmit: (payload: Dict) => void;
    error?: Dict;
};

export const UpdatePasswordForm = (props: UpdatePasswordFormProps) => {
    const { isLoading, handleUpdatePasswordSubmit, error } = props;

    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

    return (
        <Card className=" block w-full bg-white border-b border-gray-200 p-4 py-6 sm:p-6 sm:rounded-lg text-gray-600 space-y-8">
            <div className="text-center">
                <NavLink href="/">
                    <Logo width={150} className="mx-auto" />
                </NavLink>
                <div className="mt-5 space-y-2 w-full mx-auto md:w-1/2">
                    <h3 className="text-gray-800 text-2xl font-poppins font-bold sm:text-3xl">Update Password</h3>
                    <p className="font-poppins font-thin items-center">
                        Set the new password for your account so you can login and access all features.
                    </p>
                </div>
            </div>

            {error && errorMessage && (
                <AppAlert variant="destructive" className="mx-auto md:w-2/3 items-center" description={errorMessage} />
            )}

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
                                errorText={
                                    errors.resetPasswordCode && touched.resetPasswordCode
                                        ? errors.resetPasswordCode
                                        : undefined
                                }
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
                                errorText={
                                    errors.confirmPassword && touched.confirmPassword
                                        ? errors.confirmPassword
                                        : undefined
                                }
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
            <div className="relative w-3/5 mx-auto" />
            <div className="grid grid-cols-4 w-full sm:w-64 mx-auto gap-x-4" />
        </Card>
    );
};
