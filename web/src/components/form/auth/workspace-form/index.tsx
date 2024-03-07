'use client';

import { Card, Dict, InputGroup, Input } from '@shtcut-ui/react';
import { Logo, NavLink } from '@shtcut/components';
import { Formik } from 'formik';
import { workspaceValidationSchema, workspaceValues } from './validation';
import { AppAlert, AppButton, TextField } from '@shtcut/components/_shared';
import { get } from 'lodash';

type WorkspaceFormProps = {
    isLoading: boolean;
    module: string;
    handleWorkspaceSubmit: (payload: Dict) => void;
    error?: Dict;
};

const { Addon } = InputGroup;

export const WorkspaceForm = (props: WorkspaceFormProps) => {
    const { isLoading, handleWorkspaceSubmit, error } = props;

    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

    const handleFormSubmit = (values) => {
        handleWorkspaceSubmit(values);
    };

    return (
        <Card className=" block w-full bg-white border-b border-gray-200  p-4 py-6 sm:p-6 sm:rounded-lg text-gray-600 space-y-8">
            <div className="text-center">
                <NavLink href="/">
                    <Logo width={150} className="mx-auto" />
                </NavLink>
                <div className="mt-5 space-y-2 w-full mx-auto md:w-1/2">
                    <h3 className="text-gray-800 text-2xl font-poppins font-bold sm:text-3xl">Create Workspace</h3>
                    <p className="font-poppins font-thin items-center w-full">
                        Create a Workspace to start creating and managing your short links, domains, QR codes and many
                        more on SHTCUT
                    </p>
                </div>
            </div>

            {error && errorMessage && (
                <AppAlert variant="destructive" className="mx-auto md:w-2/3 items-center" description={errorMessage} />
            )}

            <Formik
                enableReinitialize
                initialValues={workspaceValues}
                validationSchema={workspaceValidationSchema}
                onSubmit={handleFormSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <form className="space-y-5 w-[96] mx-auto md:w-2/3 items-center" onSubmit={handleSubmit}>
                        <TextField
                            label="Workspace name"
                            labelClassName="font-normal"
                            className="w-full mt-2 h-12 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg"
                            type="text"
                            placeholder="WeWork workspace"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            errorText={errors.name && touched.name ? errors.name : undefined}
                        />

                        <div className="flex items-center text-gray-400 border rounded-md">
                            <InputGroup>
                                <Addon>app.shtcut.link</Addon>
                                <input
                                    type="text"
                                    placeholder="www.example.com"
                                    id="website-url"
                                    className="w-full p-2.5 ml-2 bg-transparent outline-none"
                                />
                            </InputGroup>
                        </div>

                        <InputGroup className="mb-4">
                            <Addon className="">@</Addon>
                            <Input
                                type="text"
                                placeholder="www.example.com"
                                id="website-url"
                            />
                        </InputGroup>
                        <AppButton
                            htmlType="submit"
                            loadingLabel="Loading...."
                            disabled={isSubmitting || isLoading}
                            loading={isLoading}
                            className="w-full h-12 px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150"
                        >
                            Create Workspace
                        </AppButton>
                    </form>
                )}
            </Formik>
            <div className="relative w-3/5 mx-auto">
                <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto"></p>
            </div>
        </Card>
    );
};
