'use client';

import { Dict } from '@shtcut-ui/react';
import { NavLink } from '@shtcut/components';
import { Formik } from 'formik';
import { signInValidationSchema, signInValues } from './validation';
import { AppButton, TextField } from '@shtcut/components/_shared';

type SignInFormProps = {
    isLoading: boolean;
    handleLoginSubmit: (payload: Dict) => void;
};

export const SignInForm = (props: SignInFormProps) => {
    const { isLoading, handleLoginSubmit } = props;

    const handleFormSubmit = (values) => {
        handleLoginSubmit(values);
    };

    return (
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
    );
};
