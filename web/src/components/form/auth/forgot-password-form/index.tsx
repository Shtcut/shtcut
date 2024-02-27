'use client';

import { Card, Dict } from '@shtcut-ui/react';
import { Logo, NavLink } from '@shtcut/components';
import { Formik } from 'formik';
import { forgotPasswordValidationSchema, forgotPasswordValues } from './validation';
import { AppAlert, AppButton, TextField } from '@shtcut/components/_shared';
import { get } from 'lodash';

type ForgotPasswordFormProps = {
    isLoading: boolean;
    handleForgotPasswordSubmit: (payload: Dict) => void;
    error?: string;
};

export const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
    const { isLoading, handleForgotPasswordSubmit, error } = props;

    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

    return (
        <Card className=" block w-full bg-white border-b border-gray-200 p-4 py-6 sm:p-6 sm:rounded-lg text-gray-600 space-y-8">
            <div className="text-center">
                <NavLink href="/">
                    <Logo width={150} className="mx-auto" />
                </NavLink>
                <div className="mt-5 space-y-2 w-full mx-auto md:w-1/2">
                    <h3 className="text-gray-800 text-2xl font-poppins font-bold sm:text-3xl">New Password</h3>
                    <p className="font-poppins font-thin items-center">
                        Enter your email for the verification process, we will send 6 digits code to your email.
                    </p>
                </div>
            </div>
            {error && errorMessage && (
                <AppAlert variant="destructive" className="mx-auto md:w-2/3 items-center" description={errorMessage} />
            )}

            <Formik
                enableReinitialize
                initialValues={forgotPasswordValues}
                validationSchema={forgotPasswordValidationSchema}
                onSubmit={handleForgotPasswordSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <form className="space-y-5 w-[96] mx-auto md:w-2/3 items-center" onSubmit={handleSubmit}>
                        <TextField
                            label="EMAIL"
                            labelClassName="font-normal"
                            className="w-full mt-2 h-12 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
                            type="email"
                            placeholder="name@example.com"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errorText={errors.email && touched.email ? errors.email : undefined}
                        />
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-x-3">
                                <span>
                                    Forgot Password?
                                    <NavLink
                                        href="/auth/forgot-password"
                                        className="px-1 font-normal text-blue-600 hover:text-blue-500"
                                    >
                                        Click Here
                                    </NavLink>
                                </span>
                            </div>
                        </div>
                        <AppButton
                            htmlType="submit"
                            loadingLabel="Loading...."
                            disabled={isSubmitting || isLoading}
                            loading={isLoading}
                            className="w-full h-12 px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150"
                        >
                            Continue
                        </AppButton>
                    </form>
                )}
            </Formik>
            <div className="relative w-3/5 mx-auto" />
            <div className="grid grid-cols-4 w-full sm:w-64 mx-auto gap-x-4" />
        </Card>
    );
};
