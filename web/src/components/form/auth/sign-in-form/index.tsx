'use client';

import { Card, Dict } from '@shtcut-ui/react';
import { Logo, NavLink } from '@shtcut/components';
import { Formik } from 'formik';
import { signInValidationSchema, signInValues } from './validation';
import { AppAlert, AppButton, TextField } from '@shtcut/components/_shared';
import { get } from 'lodash';
import { SocialLogin } from '../social-login';

type SignInFormProps = {
    isLoading: boolean;
    handleLoginSubmit: (payload: Dict) => void;
    error?: Dict;
};

export const SignInForm = (props: SignInFormProps) => {
    const { isLoading, handleLoginSubmit, error } = props;

    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

    const handleFormSubmit = (values) => {
        handleLoginSubmit(values);
    };

    return (
        <Card className=" block w-full bg-white border-b border-gray-200  p-4 py-6 sm:p-6 sm:rounded-lg text-gray-600 space-y-8">
            <div className="text-center">
                <NavLink href="/">
                    <Logo width={150} className="mx-auto" />
                </NavLink>
                <div className="mt-5 space-y-2 w-full mx-auto md:w-1/2">
                    <h3 className="text-gray-800 text-2xl font-poppins font-bold sm:text-3xl">Login</h3>
                    <p className="font-poppins font-thin items-center">
                        Welcome back! Login to get started with SHTCUT If not yet registered, click on sign up to create
                        an account
                    </p>
                </div>
            </div>

            {error &&errorMessage && (
                <AppAlert variant="destructive" className="mx-auto md:w-2/3 items-center" description={errorMessage} />
            )}

            <Formik
                enableReinitialize
                initialValues={signInValues}
                validationSchema={signInValidationSchema}
                onSubmit={handleFormSubmit}
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
                        <TextField
                            label="Password"
                            labelClassName="font-normal"
                            className="w-full mt-2 h-12 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            showPasswordIcon={false}
                            value={values.password}
                            errorText={errors.password && touched.password ? errors.password : undefined}
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
                            Sign In
                        </AppButton>
                    </form>
                )}
            </Formik>

            <div className="relative w-3/5 mx-auto">
                <span className="block w-full h-px bg-gray-300"></span>
                <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
                    Or continue with
                </p>
            </div>
            <SocialLogin/>
            <div className="text-center">
                <div className="font-poppins font-thin">
                    Don`t have an account?
                    <NavLink href="/auth/sign-up" className="px-1 text-blue-600 hover:text-blue-500">
                        Sign up
                    </NavLink>
                </div>
            </div>
        </Card>
    );
};
