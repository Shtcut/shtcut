'use client';

import { CommonProps, Dict, FormContainer, FormItem, Input } from '@shtcut-ui/react';
import { NavLink } from '@shtcut/components';
import { Field, Form, Formik } from 'formik';
import { signInValidationSchema, signInValues } from './validation';
import { AppAlert } from '@shtcut/components/_shared';
import { get } from 'lodash';
import { SocialLogin } from '../social-login';
import { PasswordInput } from '@shtcut/components/_shared';

interface SignInFormProps extends CommonProps {
    isLoading: boolean;
    handleLoginSubmit: (payload: Dict) => void;
    error?: Dict;
}

export const SignInForm = (props: SignInFormProps) => {
    const { isLoading, handleLoginSubmit, error, className } = props;

    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

    const handleFormSubmit = (values) => {
        handleLoginSubmit(values);
    };

    return (
        <div className={className}>
            {error && errorMessage && (
                <AppAlert variant="destructive" className="mx-auto md:w-2/3 items-center" description={errorMessage} />
            )}

            <Formik
                enableReinitialize
                initialValues={signInValues}
                validationSchema={signInValidationSchema}
                onSubmit={handleFormSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Email"
                                invalid={(errors.email && touched.email) as boolean}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={values.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    component={Input}
                                    disabled={isSubmitting || isLoading}
                                />
                            </FormItem>
                            <FormItem
                                label="Password"
                                invalid={(errors.password && touched.password) as boolean}
                                errorMessage={errors.password}
                            >
                                <Field
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    placeholder="name@example.com"
                                    component={PasswordInput}
                                    disabled={isSubmitting || isLoading}
                                />
                            </FormItem>

                            {/* <div className="flex justify-between mb-6">
                                <Field className="mb-0" />
                            </div> */}
                        </FormContainer>
                    </Form>
                )}
            </Formik>
{/* 
            <div className="relative w-3/5 mx-auto">
                <span className="block w-full h-px bg-gray-300"></span>
                <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
                    Or continue with
                </p>
            </div>
            <SocialLogin />
            <div className="text-center">
                <div className="font-poppins font-normal">
                    Don`t have an account?
                    <NavLink href="/auth/sign-up" className="px-1 text-blue-600 hover:text-blue-500">
                        Sign up
                    </NavLink>
                </div>
            </div> */}
        </div>
    );
};
